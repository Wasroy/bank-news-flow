import { NewsItem } from '../types/news';

export function getRealActualNews(): NewsItem[] {
  return [
  {
    "id": "1",
    "title": "Faut-il souscrire les risques aggravés ?",
    "content": "Trouver un porteur de risques peut s’avérer complexe pour des personnes présentant des risques aggravés, que ce soit en assurance emprunteur, en prévoyance individuelle comme en assurance auto. Des niches de marché différentes qui nécessitent toutes expertise technique et pilotage des portefeuilles au cordeau pour dégager des résultats.",
    "theme": "Immobilier",
    "status": "approved",
    "createdAt": "2024-07-16T12:00:00Z",
    "aiClassification": "Actualité Secteur Assurance"
  },
  {
    "id": "2",
    "title": "Ces entreprises qui s'engagent auprès des athlètes",
    "content": "Le monde de l'assurance soutient et accompagne des sportifs qualifiés pour les Jeux de Paris 2024. Avec des approches, mais aussi des intérêts différents.",
    "author": "",
    "source": "",
    "theme": "Actualité Secteur Assurance",
    "status": "pending",
    "createdAt": "2024-07-15T12:00:00Z",
    "aiClassification": "Actualité Secteur Assurance"
  },
  {
    "id": "3",
    "title": "Assurance emprunteur : les taux continuent de baisser",
    "content": "Les taux de l’assurance emprunteur continuent de baisser, mais la concurrence reste vive. Les assureurs doivent s’adapter aux nouvelles réglementations et aux attentes des consommateurs.",
    "theme": "Actualité Secteur Assurance",
    "status": "approved",
    "createdAt": "2024-07-17T12:00:00Z",
    "aiClassification": "Actualité Secteur Assurance"
  },
  {
    "id": "4",
    "title": "L'impact des nouvelles technologies sur l'assurance",
    "content": "Les nouvelles technologies transforment le secteur de l'assurance, offrant de nouvelles opportunités et défis pour les assureurs.",
    "theme": "Actualité Secteur Banque",
    "status": "approved",
    "createdAt": "2024-07-18T12:00:00Z",
    "aiClassification": "Actualité Secteur Banque"
  }
];
}
