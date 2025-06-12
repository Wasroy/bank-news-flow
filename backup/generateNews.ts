import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { AzureOpenAI } from 'openai';

const client = new AzureOpenAI({
  endpoint: process.env.AZURE_OPENAI_ENDPOINT!,
  apiKey: process.env.AZURE_API_KEY!,
  deployment: "o4-mini",
  apiVersion: "2024-12-01-preview",
});
console.log("✅ Script generateNews.ts lancé depuis le backend !");

async function main() {
  // Étape 1 : lire les articles bruts depuis un fichier JSON
  const rawArticlesPath = path.resolve("src","data" ,"extracted_texts.json");
  const rawArticles = JSON.parse(fs.readFileSync(rawArticlesPath, "utf-8"));

  const prompt = `
  Tu es un assistant chargé de convertir des métadonnées d'articles en objets formatés pour une revue de presse.
  
  Pour chaque entrée du tableau JSON ci-dessous, extrait uniquement la partie "metadata", et convertis-la en un objet contenant :
  
  - "id" : une chaîne de caractère unique (ex : "1", "2", ...)
  - "title" : le champ "title" d'origine
  - "content" : le champ "abstract"
  - "author" : le champ "authors" sans les [] (s'il est vide, N/A)
  - "source" : le champ "publisher" (s'il est vide, N/A)
  - "theme" : le champ "category"
  - "status" : choisis 6 "approved" et 4 "pending" aléatoirement
  - "createdAt" : le champ "date" au format ISO 8601 (ex : "2024-07-17T12:00:00Z") (s'il est vide, N/A)
  - "aiClassification" : reprends la valeur de "category"
  
  Voici les données à traiter :
  
  ${JSON.stringify(rawArticles, null, 2)}
  
  Répond uniquement avec un tableau JSON d’objets au format demandé. Pas d’explication, pas de texte autour.
  `;
  

  const completion = await client.chat.completions.create({
    model: "o4-mini",
    messages: [
      { role: "system", content: "Tu es un assistant qui reformate des articles économiques." },
      { role: "user", content: prompt },
    ],
    max_completion_tokens: 3000,
  });

  
  const rawJson = completion.choices[0].message.content!;

  console.log("Réponse brute de l'IA ↓↓↓");
  console.log(rawJson);
  

  const newsItems = JSON.parse(rawJson);

  const fileContent = `import { NewsItem } from '../types/news';

export function getRealActualNews(): NewsItem[] {
  return ${JSON.stringify(newsItems, null, 2)};
}
`;

  const outputPath = path.resolve("src", "data", "RealActual.tsx");
  fs.writeFileSync(outputPath, fileContent);
  console.log("Fichier RealActual.tsx mis à jour avec les actualités reformattées !");
}

main().catch((err) => {
  console.error("Erreur :", err);
});
