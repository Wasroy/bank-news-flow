# ActualRisk

## Présentation du projet

**ActualRisk** est une application web conçue pour automatiser et faciliter la veille financière et documentaire à la Banque de France. Elle utilise les services Azure pour l’analyse documentaire et les modèles OpenAI pour la synthèse et la catégorisation des articles. Cette solution vise à assister les documentalistes et analystes dans la production hebdomadaire d’une revue de presse synthétique et thématique.

## Fonctionnalités

- **Traitement de fichiers PDF** : Extraction de texte depuis des fichiers PDF (OCR) à l’aide d’Azure Form Recognizer.
- **Nettoyage du texte** : Suppression des éléments non pertinents pour ne garder que le cœur de l’article.
- **Extraction de métadonnées** : Titre, auteur, date de publication, thème principal.
- **Classification thématique** : Attribution automatique des articles à des thèmes prédéfinis.
- **Tableau de bord administrateur** :
  - Visualisation des articles générés par l’IA.
  - Validation, édition et reclassement des actualités.
- **Vue lecteur** : Consultation des actualités validées, organisées par thème, sans possibilité d’édition.

## Technologies utilisées

- **Backend** : Node.js, Fastify
- **Frontend** : React, TypeScript, Tailwind CSS
- **Services Azure** :
  - Azure Form Recognizer
  - Azure Blob Storage
  - Azure OpenAI (gpt-35-turbo)
- **Bibliothèques supplémentaires** :
  - Shadcn UI
  - Radix UI
  - Class Variance Authority
  - Lucide React (icônes)

## Installation

### Prérequis

- Node.js et npm installés (recommandé via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Compte Azure avec accès à OpenAI et Form Recognizer
- Accès au portail Azure et création des ressources nécessaires

### Étapes

1. Cloner le dépôt :
   ```bash
   git clone <VOTRE_URL_GIT>
   cd <NOM_DU_PROJET>
