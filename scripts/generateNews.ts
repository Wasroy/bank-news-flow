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
  const rawArticlesPath = path.resolve("src", "data", "extracted_texts.json");
  const rawArticles = JSON.parse(fs.readFileSync(rawArticlesPath, "utf-8"));

  let index = 1;
  const formattedNews: any[] = [];

  for (const article of rawArticles) {
    if (article.error) continue;

    const meta = article.metadata;
    const filename = article.file;

    // Limiter la taille du résumé pour éviter dépassement
    const abstract = (meta.abstract || '').slice(0, 1000);

    const prompt = `
Reformate cet article JSON au format indiqué. Répond uniquement avec un objet JSON, sans texte autour.

Données :
{
  "id": "${filename}",
  "title": "${meta.title}",
  "abstract": "${abstract}",
  "author": "${Array.isArray(meta.author) ? meta.author.join(', ') : meta.author || 'N/A'}",
  "publisher": "${meta.publisher || 'N/A'}",
  "category": "${meta.category}",
  "date": "${meta.date || 'N/A'}"
}

Format souhaité :
{
  "id": "...",
  "title": "...",
  "content": "...",
  "author": "...",
  "source": "...",
  "theme": "...",
  "status": "approved" ou "pending",
  "createdAt": contenu de date,
  "aiClassification": idem que theme
}
`.trim();

    console.log(`🧠 Envoi de l'article ${index}...`);

    try {
      const completion = await client.chat.completions.create({
        model: "o4-mini",
        messages: [
          { role: "system", content: "Tu es un assistant qui reformate des articles économiques." },
          { role: "user", content: prompt },
        ],
        max_completion_tokens: 3000,
      });

      const result = completion.choices[0].message.content!;
      console.log("💬 Réponse brute ↓↓↓");
      console.log(result);

      if (!result || result.trim().length === 0) {
        console.error("❌ Réponse vide de l'IA. Article ignoré.");
        continue;
      }

      let parsed;
      try {
        parsed = JSON.parse(result);
      } catch (err) {
        console.error("❌ JSON mal formé. Voici le contenu brut ↓↓↓");
        console.error(result);
        continue;
      }

      formattedNews.push(parsed);
      index++;

      if (formattedNews.length >= 10) break;
    } catch (err) {
      console.error(`❌ Erreur lors du traitement de l'article ${index}`, err);
    }
  }

  const fileContent = `import { NewsItem } from '../types/news';

export function getRealActualNews(): NewsItem[] {
  return ${JSON.stringify(formattedNews, null, 2)};
}
`;

  const outputPath = path.resolve("src", "data", "RealActual.tsx");
  fs.writeFileSync(outputPath, fileContent);
  console.log(`📝 Fichier RealActual.tsx mis à jour avec ${formattedNews.length} actualités !`);
}

main().catch((err) => {
  console.error("Erreur :", err);
});
