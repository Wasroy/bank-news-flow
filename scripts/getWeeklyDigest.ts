import { NewsItem, NewsTheme } from "../src/types/news"

export async function getWeeklyDigest() {
	console.log("Fetching weekly digest from server...");
	const arrArticles = await fetch("/process-pdfs");
	const articles = await arrArticles.json()
	const data = articles.output;
	console.log("Articles fetched:", data);
	
	return data;
}