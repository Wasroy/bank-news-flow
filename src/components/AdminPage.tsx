
import { useState, useEffect } from 'react';
import { NewsItem, NewsTheme } from '../types/news';
import { getExtractedNews } from '../utils/newsTransform';
import NewsCard from './NewsCard';
import GenerateNewsButton from './GenerateNewsButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Clock, CheckCircle, XCircle } from 'lucide-react';

const AdminPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadNews = async () => {
    setIsLoading(true);
    try {
      const extractedNews = await getExtractedNews();
      setNews(extractedNews);
    } catch (error) {
      console.error('Erreur lors du chargement des actualités:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

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

  const handleNewsGenerated = () => {
    loadNews();
  };

  // Statistiques
  const stats = {
    total: news.length,
    pending: news.filter(item => item.status === 'pending').length,
    approved: news.filter(item => item.status === 'approved').length,
    rejected: news.filter(item => item.status === 'rejected').length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des actualités...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Administration des actualités - Azure AI
              </h1>
              <p className="text-gray-600">
                Gérez la validation et la classification des actualités générées par Azure AI Foundry
              </p>
            </div>
            <GenerateNewsButton onNewsGenerated={handleNewsGenerated} />
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
