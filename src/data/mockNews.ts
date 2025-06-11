
import { NewsItem, NewsTheme } from '../types/news';

const themes: NewsTheme[] = [
  'Indicateurs économiques',
  'Citations ACPR',
  'Supervision & Régulation',
  'Actualité Secteur Assurance',
  'Actualité Secteur Banque',
  'Mutualité & Prévoyance',
  'Actualité financière',
  'Cryptomonnaies',
  'Questions macroéconomiques',
  'Comptabilité',
  'Immobilier',
  'Environnement professionnel'
];

const sampleTitles: Record<NewsTheme, string[]> = {
  'Indicateurs économiques': [
    'Le PIB français progresse de 0,3% au troisième trimestre',
    'L\'inflation européenne ralentit à 2,4% en novembre',
    'Taux de chômage stable à 7,4% dans la zone euro'
  ],
  'Citations ACPR': [
    'L\'ACPR renforce ses exigences en matière de cybersécurité',
    'Nouvelles recommandations sur les stress tests climatiques',
    'Mise à jour du guide sur les modèles internes'
  ],
  'Supervision & Régulation': [
    'Publication du rapport annuel de surveillance bancaire',
    'Nouvelles directives sur la gouvernance des risques',
    'Renforcement des contrôles anti-blanchiment'
  ],
  'Actualité Secteur Assurance': [
    'Solvabilité II : nouvelles mesures transitoires',
    'Croissance du marché de l\'assurance-vie en 2024',
    'Innovation dans l\'assurance paramétrique'
  ],
  'Actualité Secteur Banque': [
    'Fusion stratégique entre deux banques régionales',
    'Lancement d\'une nouvelle néobanque européenne',
    'Investissements dans les technologies de paiement'
  ],
  'Mutualité & Prévoyance': [
    'Réforme des retraites complémentaires en cours',
    'Développement des solutions de prévoyance collective',
    'Nouvelles garanties santé pour les seniors'
  ],
  'Actualité financière': [
    'Les marchés européens terminent en hausse',
    'Émission obligataire record pour l\'État français',
    'Performance des fonds ESG au troisième trimestre'
  ],
  'Cryptomonnaies': [
    'Adoption croissante des CBDC en Europe',
    'Régulation des actifs numériques : MiCA en vigueur',
    'Bitcoin franchit un nouveau seuil psychologique'
  ],
  'Questions macroéconomiques': [
    'Politique monétaire de la BCE : nouveau cycle',
    'Impact de la géopolitique sur les chaînes d\'approvisionnement',
    'Transition énergétique et financement vert'
  ],
  'Comptabilité': [
    'Nouvelles normes IFRS 17 pour l\'assurance',
    'Mise à jour des standards ESG reporting',
    'Digitalisation des processus comptables'
  ],
  'Immobilier': [
    'Ralentissement du marché immobilier résidentiel',
    'Investissements dans l\'immobilier commercial',
    'Impact des taux sur le crédit immobilier'
  ],
  'Environnement professionnel': [
    'Télétravail : nouvelles pratiques post-pandémie',
    'Formation continue dans le secteur financier',
    'Diversité et inclusion en finance'
  ]
};

function generateContent(theme: NewsTheme, title: string): string {
  const contents: Record<NewsTheme, string> = {
    'Indicateurs économiques': `Les derniers chiffres publiés par l'INSEE confirment une croissance modérée de l'économie française. Cette performance s'inscrit dans un contexte international complexe, marqué par des tensions géopolitiques persistantes. Les analystes restent optimistes quant aux perspectives à moyen terme, notamment grâce aux investissements dans la transition écologique. L'emploi continue de progresser, bien que le rythme se soit quelque peu ralenti par rapport aux trimestres précédents.`,
    'Citations ACPR': `L'Autorité de contrôle prudentiel et de résolution a publié de nouvelles orientations concernant la gestion des risques dans le secteur bancaire. Ces recommandations visent à renforcer la résilience des établissements face aux défis contemporains. Les institutions financières devront adapter leurs procédures dans les prochains mois. Un délai de mise en conformité de six mois a été accordé pour l'implémentation des nouvelles mesures.`,
    'Supervision & Régulation': `Le régulateur européen intensifie ses contrôles sur les pratiques de gouvernance des institutions financières. Cette initiative s'inscrit dans le cadre du renforcement du cadre prudentiel post-crise. Les établissements devront démontrer leur capacité à gérer efficacement les risques émergents. Un accent particulier est mis sur la transparence et la responsabilisation des dirigeants.`,
    'Actualité Secteur Assurance': `Le secteur de l'assurance connaît une transformation profonde avec l'émergence de nouvelles technologies et l'évolution des besoins clients. Les compagnies investissent massivement dans la digitalisation de leurs services. Cette modernisation permet d'améliorer l'expérience client tout en optimisant les coûts opérationnels. Les partenariats avec les fintechs se multiplient pour accélérer l'innovation.`,
    'Actualité Secteur Banque': `Les banques européennes affichent des résultats solides malgré un environnement économique incertain. La hausse des taux d'intérêt a favorisé l'amélioration des marges d'intérêt. Parallèlement, les établissements renforcent leurs provisions pour faire face aux risques de crédit. L'accent est mis sur l'efficacité opérationnelle et la transformation digitale.`,
    'Mutualité & Prévoyance': `Le secteur mutualiste adapte son offre aux nouveaux besoins sociétaux et démographiques. L'allongement de l'espérance de vie et l'évolution du marché du travail nécessitent de repenser les produits de prévoyance. Les mutuelles développent des solutions innovantes pour accompagner leurs adhérents tout au long de leur parcours professionnel. La solidarité intergénérationnelle reste au cœur du modèle mutualiste.`,
    'Actualité financière': `Les marchés financiers évoluent dans un contexte de volatilité accrue, influencé par les décisions des banques centrales et les tensions géopolitiques. Les investisseurs recherchent des opportunités dans un environnement complexe. Les stratégies d'investissement s'adaptent aux nouvelles réalités économiques. La diversification géographique et sectorielle reste une priorité pour la gestion des portefeuilles.`,
    'Cryptomonnaies': `L'écosystème des actifs numériques continue d'évoluer avec l'entrée en vigueur de nouvelles réglementations européennes. Les institutions financières traditionnelles s'intéressent de plus en plus à ces nouveaux instruments. Le développement des monnaies numériques de banque centrale représente un enjeu majeur pour l'avenir du système financier. La technologie blockchain trouve de nouvelles applications dans divers secteurs.`,
    'Questions macroéconomiques': `L'économie mondiale fait face à des défis structurels majeurs, notamment la transition énergétique et le vieillissement démographique. Les politiques budgétaires et monétaires s'adaptent à ces nouveaux paradigmes. La coopération internationale devient cruciale pour relever ces défis globaux. Les investissements dans l'innovation et la formation sont identifiés comme des leviers essentiels de croissance.`,
    'Comptabilité': `L'évolution des normes comptables internationales répond aux besoins croissants de transparence et de comparabilité. Les entreprises du secteur financier doivent adapter leurs systèmes d'information pour intégrer ces nouvelles exigences. La digitalisation des processus comptables permet d'améliorer la qualité et la rapidité de reporting. L'audit et le contrôle interne se renforcent pour garantir la fiabilité des informations financières.`,
    'Immobilier': `Le marché immobilier traverse une période de transition marquée par l'évolution des taux d'intérêt et des politiques publiques. Les investisseurs institutionnels adaptent leurs stratégies face à ces nouveaux paramètres. Le développement durable devient un critère déterminant dans les décisions d'investissement immobilier. Les nouvelles technologies transforment la gestion et la valorisation des actifs immobiliers.`,
    'Environnement professionnel': `Le monde du travail dans le secteur financier connaît une transformation profonde avec l'adoption généralisée du télétravail et des nouvelles technologies. Les entreprises repensent leurs espaces de travail et leurs modes de collaboration. La formation continue devient essentielle pour accompagner l'évolution des métiers. L'attractivité des talents constitue un enjeu stratégique pour les institutions financières.`
  };
  
  return contents[theme];
}

export function generateMockNews(): NewsItem[] {
  const news: NewsItem[] = [];
  let id = 1;

  // Générer environ 4 actualités par thème pour avoir ~50 actualités
  themes.forEach(theme => {
    const titles = sampleTitles[theme];
    for (let i = 0; i < Math.min(4, titles.length); i++) {
      const title = titles[i] || `Actualité ${theme} ${i + 1}`;
      const statuses: ('pending' | 'approved' | 'rejected')[] = ['pending', 'approved', 'rejected'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      news.push({
        id: id.toString(),
        title,
        content: generateContent(theme, title),
        theme,
        status: randomStatus,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        aiClassification: theme
      });
      id++;
    }
  });

  // Ajouter quelques actualités supplémentaires pour atteindre ~50
  while (news.length < 50) {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const statuses: ('pending' | 'approved' | 'rejected')[] = ['pending', 'approved', 'rejected'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    news.push({
      id: id.toString(),
      title: `Actualité complémentaire ${randomTheme}`,
      content: generateContent(randomTheme, `Actualité complémentaire ${randomTheme}`),
      theme: randomTheme,
      status: randomStatus,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      aiClassification: randomTheme
    });
    id++;
  }

  return news.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
