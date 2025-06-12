import { useState } from 'react';
import { NewsItem, NewsTheme } from '../types/news';
import { getRealActualNews } from '../data/RealActual'; // Importez la nouvelle fonction
import { getWeeklyDigest } from '../../scripts/getWeeklyDigest'; 
import NewsCard from './NewsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, Clock, CheckCircle, XCircle, RefreshCw, Zap } from 'lucide-react';
import { useNews } from './NewsContext';
import { exec } from 'child_process';

const AdminPage = () => {
  const { news, setNews } = useNews();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleApprove = (id: string) => {
    setNews(news.map(item => 
      item.id === id ? { ...item, status: 'approved' as const } : item
    ));
  };

  const handleReject = (id: string) => {
    setNews(news.map(item => 
      item.id === id ? { ...item, status: 'rejected' as const } : item
    ));
  };

  const handleThemeChange = (id: string, theme: NewsTheme) => {
    setNews(news.map(item => 
      item.id === id ? { ...item, theme } : item
    ));
  };

  const handleContentEdit = (id: string, content: string) => {
    setNews(news.map(item => 
      item.id === id ? { ...item, content } : item
    ));
  };

  // Fonction pour générer de nouvelles actualités
const handleGenerateNews = async () => {
  setIsGenerating(true);
  console.log('Génération des actualités en cours...');

  try {
    // Step 1: Call getWeeklyDigest to generate extracted_texts.json
    const freshNews = await getWeeklyDigest();
    console.log('Fichier extracted_texts.json mis à jour avec les nouvelles actualités.');

    // Step 2: Call the backend endpoint to execute generateNews.ts
    const response = await fetch('/generate-news', { method: 'POST' });
    const result = await response.json();

    if (result.status === 'success') {
      console.log('generateNews.ts exécuté avec succès.');

      // Step 3: Load updated news from RealActual.tsx
      const updatedNews = await import('../data/RealActual').then(module => module.getRealActualNews());
      setNews(updatedNews);
      console.log('Actualités mises à jour depuis RealActual.tsx.');
    } else {
      console.error('Erreur lors de l\'exécution de generateNews.ts:', result.message);
    }
  } catch (error) {
    console.error('Erreur lors de la génération:', error);
  } finally {
    setIsGenerating(false);
  }
};

const handleExportPDF = () => {
    // Replace this with the actual HTML you want to export
  const htmlContent = document.documentElement.outerHTML;
  
  fetch('http://localhost:3000/export', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ html: htmlContent })
  })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.blob();
    })
    .then(blob => {
      // Create a link to download the PDF
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'newsletter.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('Error exporting PDF:', error);
    });
}

  // Statistiques
  const stats = {
    total: news.length,
    pending: news.filter(item => item.status === 'pending').length,
    approved: news.filter(item => item.status === 'approved').length,
    rejected: news.filter(item => item.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête avec bouton de génération */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Administration des actualités - Simon
              </h1>
              <p className="text-gray-600">
                Gérez la validation et la classification des actualités générées par l'IA
              </p>
            </div>
            <Button
              onClick={handleGenerateNews}
              disabled={isGenerating}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Génération...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  Générer les actualités
                </>
              )}
            </Button>
            <Button
              onClick={handleExportPDF}
              className="bg-green-600 hover:bg-green-700 text-white ml-2"
              size="lg"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Exporter la newsletter
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">actualités</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">à traiter</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Validées</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
              <p className="text-xs text-muted-foreground">publiées</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejetées</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <p className="text-xs text-muted-foreground">écartées</p>
            </CardContent>
          </Card>
        </div>

        {/* Liste des actualités */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Actualités à traiter ({stats.pending} en attente)
          </h2>
          
          <div className="grid gap-6">
            {news.map((item) => (
              <NewsCard
                key={item.id}
                news={item}
                isAdmin={true}
                onApprove={handleApprove}
                onReject={handleReject}
                onThemeChange={handleThemeChange}
                onContentEdit={handleContentEdit}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
