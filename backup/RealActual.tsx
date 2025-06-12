import { NewsItem } from '../types/news';

export function getRealActualNews(): NewsItem[] {
  return [
  {
    "id": "1",
    "title": "Faut-il souscrire les risques aggravés ?",
    "content": "Trouver un porteur de risques peut s’avérer complexe pour des personnes présentant des risques aggravés, que ce soit en assurance emprunteur, en prévoyance individuelle comme en assurance auto. Des niches de marché différentes qui nécessitent toutes expertise technique et pilotage des portefeuilles au cordeau pour dégager des résultats.",
    "author": "Geneviève Allaire",
    "source": "La Tribune de l’assurance (Option Finance)",
    "theme": "Actualité Secteur Assurance",
    "status": "approved",
    "createdAt": "2024-07-01T00:00:00Z",
    "aiClassification": "Actualité Secteur Assurance"
  },
  {
    "id": "2",
    "title": "Ces entreprises qui s’engagent auprès des athlètes",
    "content": "Le monde de l’assurance soutient et accompagne des sportifs qualifiés pour les Jeux de Paris 2024. Avec des approches, mais aussi des intérêts différents.",
    "author": "N/A",
    "source": "N/A",
    "theme": "Actualité Secteur Assurance",
    "status": "pending",
    "createdAt": "N/A",
    "aiClassification": "Actualité Secteur Assurance"
  }
];
}
