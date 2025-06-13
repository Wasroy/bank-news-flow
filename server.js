import Fastify from 'fastify';
import { BlobServiceClient } from '@azure/storage-blob';
import { DocumentAnalysisClient, AzureKeyCredential } from '@azure/ai-form-recognizer';
import { AzureOpenAI } from 'openai';
import dotenv from 'dotenv';
import fs from 'node:fs';
import puppeteer from 'puppeteer';
import fastifyCors from '@fastify/cors';
import { exec } from 'child_process';

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
		  { role:"system", content: "You're an AI assistant that helps French financial workers archive industry news. You'll receive each time, one or two pages of magazine transformed in pure text by Document Intelligence with layout-aware parsing. First, concatenate lines to assemble the text. Then, find the publish date, author names, magazine's name, to attach in the beginning of your answer. Return the cleaned text." },
		  { role:"user", content: `Text: ${text}` }
		],
		max_completion_tokens: 8192, // Increased for handling larger magazine content
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
      { role:"system", content: "You're an AI assistant that helps French finance industry lawmakers summarize industry news. You'll receive a text of an article related to the financial/bank/insurance industry. While ensuring that your answer comes from the text given, take into account possible missing text / scanning recognition errors. Your task: Find the 'title' (remove titre de rubrique), the 'author', the 'date' of publication in YYYY-MM-DD format (or the first of the month if it is not exact day), the 'publisher', and the 'abstract' (usually a paragraph of ~3 sentence under the title, if it's in English please translate it into French), the 'category' (choose the most relevant one among: Indicateurs économiques, Citations ACPR, Supervision & Régulation, Actualité Secteur Assurance, Actualité Secteur Banque, Mutualité & Prévoyance. Actualité financière, Cryptomonnaies, Questions macroéconomiques, Comptabilité, Immobilier, Environnement professionnel). If you are not sure about an attribute, fill in “N/A”. Return this metadata in one json object (without any leading or trailing quote characters)." },
      { role:"user", content: `Text: ${text}` }
    ],
    	max_completion_tokens: 8192,
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

	for await (const blob of containerClient
		.listBlobsFlat({prefix: 'articles_a_tester'})) {
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
			const cleanedText = await cleanText(text); // works not as expected
			const metadata = await getMetadataFromText(cleanedText);
			// const metadata = await getMetadataFromText(text);
			output.push({ file: blob.name, metadata: metadata });
		} catch (err) {
			console.error(`Failed to process ${blob.name}:`, err.message);
			output.push({ file: blob.name, error: err.message });
		}
		
		pdfCount++; // Increment counter
		if (pdfCount >= 5) break; // Limit to 5 PDFs for testing
	}

	fs.writeFileSync("src/data/extracted_texts.json", JSON.stringify(output));
	console.log("✅ Text extraction completed. Output saved to extracted_texts.json");
	return output;
}

// Define API routes
fastify.get('/', async (request, reply) => {
	return { status: 'Server is running' };
});

// Endpoint to trigger PDF processing
fastify.get('/process-pdfs', async (request, reply) => {
    try {
        const output = await processAllPdfs();
        return { status: 'success', message: 'PDF processing completed', output };
    } catch (error) {
        fastify.log.error(error);
        return { status: 'error', message: error.message };
    }
});

import util from 'util';
const execPromise = util.promisify(exec);

fastify.post('/generate-news', async (request, reply) => {
  try {
    console.log('🟡 Backend : lancement de generateNews.ts via npx tsx...');
    const { stdout, stderr } = await execPromise('npx tsx scripts/generateNews.ts');

    if (stderr && stderr.trim() !== '') {
      console.warn("⚠️ stderr de generateNews.ts :", stderr);
    }

    console.log("✅ stdout de generateNews.ts ↓↓↓");
    console.log(stdout);

    reply.send({
      status: 'success',
      message: 'Génération terminée',
      output: stdout
    });
  } catch (error) {
    console.error("❌ Erreur exec generateNews.ts :", error);
    reply.status(500).send({
      status: 'error',
      message: 'Erreur lors de la génération',
      details: error.message || 'Erreur inconnue'
    });
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

// Register CORS before your routes
await fastify.register(fastifyCors, {
  origin: 'http://localhost:8080', // Allow your Vite frontend
  methods: ['POST', 'GET'],        // Allow POST and GET
  credentials: true                // If you need cookies/auth
});
start();