import Fastify from 'fastify';
import { BlobServiceClient } from '@azure/storage-blob';
import { DocumentAnalysisClient, AzureKeyCredential } from '@azure/ai-form-recognizer';
import { AzureOpenAI } from 'openai';
// import { AzureKeyCredential } from '@azure/openai';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';

dotenv.config()
const fastify = Fastify({
	logger: true
})

// Azure config
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;
const FORM_RECOGNIZER_ENDPOINT = process.env.AZURE_FORM_RECOGNIZER_ENDPOINT;
const FORM_RECOGNIZER_KEY = process.env.AZURE_FORM_RECOGNIZER_KEY;
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY;
const AZURE_OPENAI_DEPLOYMENT = "o4-mini";
const AZURE_OPENAI_API_VERSION = "2024-12-01-preview";

// Azure clients
const blobClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobClient.getContainerClient(CONTAINER_NAME);
const formRecognizerClient = new DocumentAnalysisClient(
	FORM_RECOGNIZER_ENDPOINT,
	new AzureKeyCredential(FORM_RECOGNIZER_KEY)
);

const client = new AzureOpenAI({
	endpoint: AZURE_OPENAI_ENDPOINT,
	apiKey: AZURE_OPENAI_API_KEY,
	deployment: AZURE_OPENAI_DEPLOYMENT,
	apiVersion: AZURE_OPENAI_API_VERSION,
})

async function getTextFromPDF(blobUrl) {
	const poller = await formRecognizerClient.beginAnalyzeDocumentFromUrl("prebuilt-read", blobUrl);
	const result = await poller.pollUntilDone();

	let cleanText = "";
	for (const page of result.pages) {
	console.log(`📄 Page ${page.pageNumber}`);
    for (const line of page.lines) {
		// const	lastChar = line.content.at(line.content.length - 1);
		// if (lastChar === "-")
      	// 	cleanText += line.content;
		// else if (/[a-zA-Z0-9.,;:!?]/.test(lastChar)) // alphanumeric or punctuation
	  	// 	cleanText += line.content + " ";
		// else
			cleanText += line.content + "\n";
    }
  }
//   console.log("📝 Cleaned text extracted from PDF:\n", cleanText);
  return cleanText;
}

async function cleanText(text) {
	console.log("📝 Original text:", text);
	const response = await client.chat.completions.create({
    messages: [
      { role:"system", content: "You're an AI assistant that helps magazine archive staff check articles. You'll receive each time, one or two pages of magazine transformed in pure text by Document Intelligence with layout-aware parsing. As a result of magazine's layout, sometimes parts of different article or ads show up on the same page. For example, a page can contains: header -> the ending of article A -> then full, main article B -> then the beginning of article C -> footer.\nIn the text given, you should first contextually recognize texts related to the ONE MAIN article, if you found multiple themed section, the main article should be the section taking up the most text. If, contextually, no multiple articles found in the text, don't do any modification, return the original text. Otherwise: Remove all lines related to other articles and ads, but you should still keep lines containing possibly publish date, author names, magazine's names. Return the cleaned text." },
      { role:"user", content: `Text: ${text}` }
    ],
    	max_completion_tokens: 4096,
		model: AZURE_OPENAI_API_VERSION
  });
    // parse the response to json
    let cleanedText = response.choices[0].message.content;
    if (!cleanedText) {
        throw new Error("No cleaned text returned from text");
    }
	// Check the metadata
	console.log("📝 Cleaned text:", cleanedText);
	return cleanedText;
}

async function getMetadataFromText(text) {
	const response = await client.chat.completions.create({
    messages: [
      { role:"system", content: "You're an AI assistant that helps French finance industry lawmakers summarize industry news. You'll receive the first two pages of text from an article related to the financial industry, converted by Azure Document Intelligence by layout-aware parsing of the PDF (so you have to take into account the correction of possible information noise). For the sake of information accuracy, while ensuring that your answer comes from the content of the article, try to find the title of this article (usually a sentence with a subject and a predicate), the author (there may be more than one), the date of publication in YYYY-MM-DD format (or the first of the month if it is not exact day), the publisher, and the abstract (usually a paragraph under the title, if the article is in English please translate it into French), the category (choose the most relevant one among: Indicateurs économiques, Citations ACPR, Supervision & Régulation, Actualité Secteur Assurance, Actualité Secteur Banque, Mutualité & Prévoyance. Actualité financière, Cryptomonnaies, Questions macroéconomiques, Comptabilité, Immobilier, Environnement professionnel). Double check the title and make sure it correponds to the central idea of the text. If you are not sure about an attribute, fill in “N/A”. Return this metadata in one json object (without any leading or trailing quote characters)." },
      { role:"user", content: `Text: ${text}` }
    ],
    	max_completion_tokens: 4096,
		model: AZURE_OPENAI_API_VERSION
  });
    // parse the response to json
    let metadata = response.choices[0].message.content;
    if (!metadata) {
        throw new Error("No metadata extracted from text");
    }
	// Check the metadata
	console.log("📝 Raw metadata:", metadata);
	// Remove any leading or trailing characters that are not part of a JSON object
	const jsonStart = metadata.indexOf('{');
	const jsonEnd = metadata.lastIndexOf('}');
	if (jsonStart === -1 || jsonEnd === -1 || jsonStart >= jsonEnd) {
		throw new Error("Invalid metadata format");
	}
	if (jsonStart > 0 || jsonEnd < metadata.length - 1)
		metadata = metadata.substring(jsonStart, jsonEnd + 1);
	
    const res = JSON.parse(metadata);
    console.log("📝 Metadata extracted:", res);
    return res;
}

// Main: loop through PDFs in blob storage, analyze each
async function processAllPdfs() {
	const output = [];
	let pdfCount = 0; // Changed from const to let

	for await (const blob of containerClient.listBlobsFlat()) {
		if (!blob.name.toLowerCase().endsWith(".pdf")) continue;
		
		// Get a blob client for the specific blob
		const blobClient = containerClient.getBlobClient(blob.name);
		
		// Generate SAS URL with read permissions (valid for 1 hour)
		const sasUrl = await blobClient.generateSasUrl({
			permissions: "r", // "r" for read
			expiresOn: new Date(new Date().valueOf() + 3600 * 1000)
		});
		
		console.log(` Processing: ${blob.name}`);

		try {
			const text = await getTextFromPDF(sasUrl);
			const cleanedText = await cleanText(text);
			const metadata = await getMetadataFromText(cleanedText);
			output.push({ file: blob.name, metadata: metadata });
		} catch (err) {
			console.error(`Failed to process ${blob.name}:`, err.message);
			output.push({ file: blob.name, error: err.message });
		}
		
		pdfCount++; // Increment counter
		if (pdfCount >= 10) break; // Limit to 3 PDFs for testing
	}

	fs.writeFileSync("extracted_texts.json", JSON.stringify(output));
	return output;
	console.log("✅ Text extraction completed. Output saved to extracted_texts.json");
}

// Define API routes
fastify.get('/', async (request, reply) => {
	return { status: 'Server is running' };
});

// Endpoint to trigger PDF processing
fastify.get('/process-pdfs', async (request, reply) => {
	try {
		await processAllPdfs();
		return { status: 'success', message: 'PDF processing completed' };
	} catch (error) {
		fastify.log.error(error);
		return { status: 'error', message: error.message };
	}
});

// Start the server
const start = async () => {
  try {
    const address = await fastify.listen({ port: 3000 });
    console.log(`Server listening at ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();