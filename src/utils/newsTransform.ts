
import { NewsItem, NewsTheme } from '../types/news';

interface ExtractedTextItem {
  file: string;
  metadata?: {
    title: string;
    author?: string | string[];
    date: string;
    publisher: string;
    abstract: string;
    category: string;
  };
  error?: string;
}

// Mapping des catégories du backend vers nos thèmes
const categoryToThemeMap: Record<string, NewsTheme> = {
  'Indicateurs économiques': 'Indicateurs économiques',
  'Citations ACPR': 'Citations ACPR',
  'Supervision & Régulation': 'Supervision & Régulation',
  'Actualité Secteur Assurance': 'Actualité Secteur Assurance',
  'Actualité Secteur Banque': 'Actualité Secteur Banque',
  'Mutualité & Prévoyance': 'Mutualité & Prévoyance',
  'Actualité financière': 'Actualité financière',
  'Cryptomonnaies': 'Cryptomonnaies',
  'Questions macroéconomiques': 'Questions macroéconomiques',
  'Comptabilité': 'Comptabilité',
  'Immobilier': 'Immobilier',
  'Environnement professionnel': 'Environnement professionnel'
};

function mapCategoryToTheme(category: string): NewsTheme {
  return categoryToThemeMap[category] || 'Actualité financière';
}

function formatAuthor(author: string | string[] | undefined): string {
  if (!author) return 'N/A';
  if (Array.isArray(author)) return author.join(', ');
  return author;
}

export function transformExtractedDataToNews(extractedData: ExtractedTextItem[]): NewsItem[] {
  const validItems = extractedData.filter(item => item.metadata && !item.error);
  
  return validItems.map((item, index) => {
    const metadata = item.metadata!;
    const theme = mapCategoryToTheme(metadata.category);
    
    return {
      id: `extracted-${index + 1}`,
      title: metadata.title || `Article ${index + 1}`,
      content: metadata.abstract || 'Contenu non disponible',
      theme,
      status: 'pending' as const,
      createdAt: metadata.date ? new Date(metadata.date).toISOString() : new Date().toISOString(),
      aiClassification: theme,
      source: {
        file: item.file,
        publisher: metadata.publisher,
        author: formatAuthor(metadata.author)
      }
    };
  });
}

export async function getExtractedNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch('/extracted_texts.json');
    if (!response.ok) {
      throw new Error('Impossible de charger les données extraites');
    }
    const extractedData: ExtractedTextItem[] = await response.json();
    return transformExtractedDataToNews(extractedData);
  } catch (error) {
    console.error('Erreur lors du chargement des actualités:', error);
    // Fallback vers les données mockées si le fichier n'existe pas
    const { generateMockNews } = await import('../data/mockNews');
    return generateMockNews();
  }
}

export async function triggerNewsGeneration(): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:3000/process-pdfs');
    return response.ok;
  } catch (error) {
    console.error('Erreur lors de la génération des actualités:', error);
    return false;
  }
}
