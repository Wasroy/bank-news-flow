# Bank News Flow

## Project Overview
Bank News Flow is a web application designed to process and analyze financial news articles. It leverages Azure services for document analysis and OpenAI for text processing and metadata extraction. The application provides a streamlined workflow for extracting, cleaning, and categorizing financial news.

## Features
- **PDF Processing**: Extract text from PDF files using Azure Form Recognizer.
- **Text Cleaning**: Remove irrelevant content and focus on the main article using OpenAI.
- **Metadata Extraction**: Extract metadata such as title, author, publication date, and category.
- **News Categorization**: Classify news articles into predefined themes.
- **Admin Dashboard**: Manage and review extracted news articles.
  - Approve or reject news items.
  - Edit content and themes of news articles.
- **Reader View**: Browse categorized news articles.

## Technologies Used
- **Backend**: Node.js, Fastify
- **Frontend**: React, TypeScript, Tailwind CSS
- **Azure Services**:
  - Azure Form Recognizer
  - Azure Blob Storage
  - Azure OpenAI
- **Other Libraries**:
  - Shadcn UI
  - Radix UI
  - Class Variance Authority
  - Lucide React (icons)

## Installation

### Prerequisites
- Node.js & npm installed ([Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Azure account with access to Form Recognizer and OpenAI services.

### Steps
1. Clone the repository:
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>