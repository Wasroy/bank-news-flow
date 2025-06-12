import 'dotenv/config';
import fs from "fs";
import path from "path";
import { AzureOpenAI } from "openai";

const client = new AzureOpenAI({
  endpoint: process.env.AZURE_OPENAI_ENDPOINT!,
  apiKey: process.env.AZURE_API_KEY!,
  deployment: "o4-mini",
  apiVersion: "2024-12-01-preview",
});

async function main() {
  const prompt = `
Tu es un assistant qui génère une revue de presse hebdomadaire. Génère 10 actualités économiques courtes, chacune avec :
- id (put the id as a string, e.g. "1")
- title
- content
- theme : choisi parmi : 'Indicateurs économiques','Citations ACPR','Supervision & Régulation','Actualité Secteur Assurance','Actualité Secteur Banque','Mutualité & Prévoyance','Actualité financière','Cryptomonnaies','Questions macroéconomiques','Comptabilité','Immobilier','Environnement professionnel'
- status: "pending"
- createdAt: date ISO maintenant
- aiClassification: choisi parmis : 'Indicateurs économiques','Citations ACPR','Supervision & Régulation','Actualité Secteur Assurance','Actualité Secteur Banque','Mutualité & Prévoyance','Actualité financière','Cryptomonnaies','Questions macroéconomiques','Comptabilité','Immobilier','Environnement professionnel'
Répond uniquement avec un tableau JSON d'objets.
`;

  const completion = await client.chat.completions.create({
    model: "o4-mini",
    messages: [
      { role: "system", content: "Tu es un assistant utile pour une revue de presse économique." },
      { role: "user", content: prompt },
    ],
    max_completion_tokens: 3000,
  });

  const rawJson = completion.choices[0].message.content!;
  const newsItems = JSON.parse(rawJson);

  const fileContent = `import { NewsItem } from '../types/news';

export function generateMockNews(): NewsItem[] {
  return ${JSON.stringify(newsItems, null, 2)};
}
`;

  const outputPath = path.resolve("src", "data", "RealActual.tsx");
  fs.writeFileSync(outputPath, fileContent);
  console.log("Fichier mockNews.tsx mis à jour avec les actualités générées !");
}

main().catch((err) => {
  console.error("Erreur :", err);
});