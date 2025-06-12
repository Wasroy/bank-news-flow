import { NewsItem, NewsTheme } from "../src/types/news"

export async function getWeeklyDigest(): Promise<NewsItem[]> {
	console.log("Fetching weekly digest from server...");
	const arrArticles = await fetch("http://localhost:3000/process-pdfs")
	const articles = await arrArticles.json()
	let newsItems: NewsItem[] = []
	if (articles) {
		for (const article of articles) {
			const { file, metadata } = article
			const { title, author, date, publisher, summary, category } = metadata;
			const newsItem: NewsItem = {
				id: (newsItems.length + 1).toString(),
				title: title,
				author: author,
				source: publisher,
				content: summary,
				theme: category,
				status: 'pending' as 'pending' | 'approved' | 'rejected',
				createdAt: date || new Date().toISOString(),
				aiClassification: category as NewsTheme
			}
			newsItems.push(newsItem);
		}
	}
	return newsItems;
}