import { NewsItem } from '../types/news';

export function getRealActualNews(): NewsItem[] {
  return [
  {
    "id": "1",
    "title": "Faut-il souscrire les risques aggravés ?",
    "content": "Un risque aggravé se définit comme un risque statistiquement supérieur à une population de référence, exposant l’assuré à un refus de couverture. En 2022, parmi 4 millions de demandes d’assurance de prêt, 9,5 % présentaient un risque aggravé, contre 12,1 % en 2021. Cette baisse résulte de deux mesures de la loi Lemoine (juin et septembre 2022) : la suppression du questionnaire de santé pour certains montants et échéances de prêts et la non-déclaration obligatoire des pathologies (cancer, hépatite C) après cinq ans de rémission.",
    "author": "Geneviève Allaire",
    "source": "La Tribune de l'assurance",
    "theme": "Actualité Secteur Assurance",
    "status": "approved",
    "createdAt": "2024-07-01",
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
    "createdAt": "",
    "aiClassification": "Actualité Secteur Assurance"
  }
];
}
