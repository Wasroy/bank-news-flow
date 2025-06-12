import { NewsItem } from '../types/news';

export function generateMockNews(): NewsItem[] {
  return [
  {
    "id": "1",
    "title": "Croissance économique mondiale ralentie au T3",
    "content": "Selon le FMI, la croissance mondiale est estimée à 2,8 % au troisième trimestre, contre 3,1 % lors de la période précédente. Les incertitudes géopolitiques et les tensions commerciales expliquent en partie ce ralentissement.",
    "theme": "economy",
    "status": "pending",
    "createdAt": "2023-10-10T09:00:00.000Z",
    "aiClassification": "economy"
  },
  {
    "id": "2",
    "title": "Les taux d'intérêt bancaires à leur plus haut depuis 15 ans",
    "content": "Les banques centrales maintiennent des taux directeurs élevés pour contenir l'inflation. En conséquence, les taux des prêts immobiliers ont atteint des niveaux rarement vus depuis 2008.",
    "theme": "finance",
    "status": "pending",
    "createdAt": "2023-10-10T09:00:00.000Z",
    "aiClassification": "finance"
  },
  {
    "id": "3",
    "title": "Wall Street termine en légère hausse",
    "content": "La Bourse de New York a clôturé en hausse de 0,4 % grâce à de bons résultats trimestriels des géants technologiques. Les investisseurs restent toutefois prudents face aux indicateurs macroéconomiques.",
    "theme": "markets",
    "status": "pending",
    "createdAt": "2023-10-10T09:00:00.000Z",
    "aiClassification": "markets"
  },
  {
    "id": "4",
    "title": "IA et cybersécurité : un marché en plein essor",
    "content": "Le secteur de la cybersécurité investit massivement dans l'intelligence artificielle pour détecter et contrer les cyberattaques. Les analystes prévoient une croissance annuelle de 12 % d'ici 2027.",
    "theme": "technology",
    "status": "pending",
    "createdAt": "2023-10-10T09:00:00.000Z",
    "aiClassification": "technology"
  },
  {
    "id": "5",
    "title": "Levée de fonds record pour une fintech européenne",
    "content": "Une jeune entreprise de paiements numériques vient de lever 200 millions d'euros lors de son dernier tour de table. Cet investissement doit permettre d'accélérer son expansion en Asie du Sud-Est.",
    "theme": "startups",
    "status": "pending",
    "createdAt": "2023-10-10T09:00:00.000Z",
    "aiClassification": "startups"
  },
  {
    "id": "6",
    "title": "Prix du pétrole : une remontée inattendue",
    "content": "Les cours du baril ont gagné 5 % cette semaine, portés par des coupes de production annoncées par plusieurs pays membres de l'OPEP+. Ce regain de tension pourrait relancer l'inflation à l'échelle globale.",
    "theme": "energy",
    "status": "pending",
    "createdAt": "2023-10-10T09:00:00.000Z",
    "aiClassification": "energy"
  },
  {
    "id": "7",
    "title": "La demande de logements neufs reste soutenue",
    "content": "Malgré la hausse des taux immobiliers, les mises en chantier de logements collectifs ont progressé de 8 % au troisième trimestre. Les aides publiques et les taux attractifs pour les primo-accédants jouent un rôle clé.",
    "theme": "real estate",
    "status": "pending",
    "createdAt": "2023-10-10T09:00:00.000Z",
    "aiClassification": "real estate"
  },
  {
    "id": "8",
    "title": "Commerce de détail : le e-commerce continue de dominer",
    "content": "Les ventes en ligne représentent désormais 22 % du total du commerce de détail, avec une croissance de 14 % sur un an. Les enseignes traditionnelles multiplient les investissements dans le click-and-collect.",
    "theme": "retail",
    "status": "pending",
    "createdAt": "2023-10-10T09:00:00.000Z",
    "aiClassification": "retail"
  },
  {
    "id": "9",
    "title": "Bitcoin franchit de nouveau la barre des 35 000 dollars",
    "content": "La première cryptomonnaie a gagné 8 % cette semaine, portée par l'intérêt croissant des fonds d'investissement. Les régulateurs surveillent de près les mouvements pour prévenir les risques systémiques.",
    "theme": "cryptocurrency",
    "status": "pending",
    "createdAt": "2023-10-10T09:00:00.000Z",
    "aiClassification": "cryptocurrency"
  },
  {
    "id": "10",
    "title": "Accord commercial majeur signé entre deux régions",
    "content": "L'Union européenne et l'ASEAN viennent de finaliser un traité de libre-échange réduisant de 70 % les droits de douane sur les biens industriels. Les échanges pourraient augmenter de 20 % en cinq ans.",
    "theme": "trade",
    "status": "pending",
    "createdAt": "2023-10-10T09:00:00.000Z",
    "aiClassification": "trade"
  }
];
}
