
import { NewsItem } from '../types/news';

export function generateMockNews(): NewsItem[] {
  return [
    {
      id: '1',
      title: 'Hausse des taux directeurs de la BCE',
      content: 'La Banque centrale européenne a décidé de relever ses taux directeurs de 0,25 point de base, portant le taux de refinancement à 4,75%. Cette décision vise à lutter contre l\'inflation persistante dans la zone euro.',
      author: 'Marie Dubois',
      source: 'Reuters Finance',
      theme: 'Questions macroéconomiques',
      status: 'approved',
      createdAt: '2024-12-10T08:00:00Z',
      aiClassification: 'Questions macroéconomiques'
    },
    {
      id: '2',
      title: 'Nouvelles règles de solvabilité pour les assureurs',
      content: 'L\'ACPR publie de nouvelles directives concernant les ratios de solvabilité des compagnies d\'assurance, avec une entrée en vigueur prévue pour le premier trimestre 2025.',
      author: 'Pierre Martin',
      source: 'L\'Argus de l\'Assurance',
      theme: 'Actualité Secteur Assurance',
      status: 'approved',
      createdAt: '2024-12-10T09:15:00Z',
      aiClassification: 'Actualité Secteur Assurance'
    },
    {
      id: '3',
      title: 'Bitcoin franchit la barre des 45 000 dollars',
      content: 'La cryptomonnaie phare poursuit sa progression et atteint un nouveau sommet depuis 18 mois, alimentée par l\'optimisme des investisseurs institutionnels.',
      author: 'Thomas Leroy',
      source: 'CryptoNews France',
      theme: 'Cryptomonnaies',
      status: 'approved',
      createdAt: '2024-12-10T10:30:00Z',
      aiClassification: 'Cryptomonnaies'
    }
  ];
}
