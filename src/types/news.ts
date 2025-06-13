
export interface NewsItem {
  id: string;
  title: string;
  content: string;
  author?: string;
  source?: string;
  theme: NewsTheme;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  aiClassification: NewsTheme;
  url?: string;
}

export type NewsTheme = 
  | 'Actualité Secteur Assurance'
  | 'Actualité Secteur Banque'
  | 'Actualité financière'
  | 'Citations ACPR'
  | 'Cryptomonnaies'
  | 'Comptabilité'
  | 'Environnement professionnel'
  | 'Immobilier'
  | 'Indicateurs économiques'
  | 'Mutualité & Prévoyance'
  | 'Questions macroéconomiques'
  | 'Supervision & Régulation';

export const NEWS_THEMES: NewsTheme[] = [
  'Actualité Secteur Assurance',
  'Actualité Secteur Banque',
  'Actualité financière',
  'Citations ACPR',
  'Cryptomonnaies',
  'Comptabilité',
  'Environnement professionnel',
  'Immobilier',
  'Indicateurs économiques',
  'Mutualité & Prévoyance',
  'Questions macroéconomiques',
  'Supervision & Régulation'
];

export const THEME_COLORS: Record<NewsTheme, string> = {
  'Indicateurs économiques': 'bg-blue-100 text-blue-800',
  'Citations ACPR': 'bg-purple-100 text-purple-800',
  'Supervision & Régulation': 'bg-red-100 text-red-800',
  'Actualité Secteur Assurance': 'bg-green-100 text-green-800',
  'Actualité Secteur Banque': 'bg-indigo-100 text-indigo-800',
  'Mutualité & Prévoyance': 'bg-yellow-100 text-yellow-800',
  'Actualité financière': 'bg-pink-100 text-pink-800',
  'Cryptomonnaies': 'bg-orange-100 text-orange-800',
  'Questions macroéconomiques': 'bg-teal-100 text-teal-800',
  'Comptabilité': 'bg-cyan-100 text-cyan-800',
  'Immobilier': 'bg-emerald-100 text-emerald-800',
  'Environnement professionnel': 'bg-slate-100 text-slate-800'
};
