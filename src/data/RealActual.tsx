import { NewsItem } from '../types/news';

export function getRealActualNews(): NewsItem[] {
  return [
  {
    "id": "1",
    "title": "9,5 % des demandes d’assurance de prêt présentent un risque aggravé de santé",
    "content": "Trouver un porteur de risques peut s’avérer complexe pour des personnes présentant des risques aggravés, que ce soit en assurance emprunteur, en prévoyance individuelle comme en assurance auto. Des niches de marché différentes qui nécessitent toutes expertise technique et pilotage des portefeuilles au cordeau pour dégager des résultats.",
    "author": "Geneviève Allaire",
    "source": "La Tribune de l’assurance",
    "theme": "Actualité Secteur Assurance",
    "status": "approved",
    "createdAt": "2024-07-01",
    "aiClassification": "Actualité Secteur Assurance"
  },
  {
    "id": "2",
    "title": "Ces entreprises qui s’engagent auprès des athlètes",
    "content": "Le compte à rebours est lancé. À partir du 26 juillet, Paris accueillera plusieurs milliers d’athlètes pour les Jeux olympiques, puis paralympiques. Parmi ces sportifs de haut niveau, certains bénéficient d’un soutien particulier : celui d’entreprises qui ont constitué leur propre équipe.",
    "author": "N. Thouet, M.-C. Carrère, M. François, V. Gersin, G. Perrin, S. Vié",
    "source": "L’Argus de l’Assurance",
    "theme": "Actualité Secteur Assurance",
    "status": "pending",
    "createdAt": "2024-07-05",
    "aiClassification": "Actualité Secteur Assurance"
  },
  {
    "id": "3",
    "title": "Estaly se pose en partenaire des commerçants",
    "content": "En s’appuyant sur l’intelligence artificielle, Estaly permet d’intégrer des offres d’assurance affinitaire dans le parcours client.",
    "author": "Fabienne Colin",
    "source": "L’Argus de l’Assurance",
    "theme": "Actualité Secteur Assurance",
    "status": "approved",
    "createdAt": "2024-07-05",
    "aiClassification": "Actualité Secteur Assurance"
  },
  {
    "id": "4",
    "title": "FTX-linked defunct bank Silvergate to pay $63 mn to settle civil charges",
    "content": "La banque défaillante Silvergate, liée à FTX, s’acquittera de 63 millions de dollars pour régler des poursuites civiles intentées par des régulateurs fédéraux et étatiques, en lien avec son effondrement à la suite de la fraude massive qui a fait tomber l’échange de cryptomonnaies FTX. Ce montant couvre les pénalités prononcées par la Securities and Exchange Commission (SEC), la Réserve fédérale et le California Department of Financial Protection and Innovation. Silvergate a vu ses dépôts chuter de manière spectaculaire après l’implosion de son principal client, FTX.",
    "author": "Tabby Kinder; Stephen Gandel; Brooke Masters",
    "source": "Financial Times Europe",
    "theme": "Supervision & Régulation",
    "status": "approved",
    "createdAt": "2024-07-03",
    "aiClassification": "Supervision & Régulation"
  }
];
}
