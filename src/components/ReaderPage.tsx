import { useState, useMemo } from 'react';
import { NewsItem, NewsTheme, NEWS_THEMES, THEME_COLORS } from '../types/news';
import { useNews } from './NewsContext';
import NewsCard from './NewsCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, RefreshCw, Search, SortAsc } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ReaderPage = () => {
  const { news } = useNews();
  const [selectedTheme, setSelectedTheme] = useState<NewsTheme | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'theme' | 'date'>('theme');

  const filteredNews = useMemo(() => {
    let filtered = news.filter(item => item.status === 'approved');

    if (selectedTheme !== 'all') {
      filtered = filtered.filter(item => item.theme === selectedTheme);
    }

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === 'theme') {
      filtered = [...filtered].sort((a, b) => a.theme.localeCompare(b.theme));
    } else if (sortBy === 'date') {
      filtered = [...filtered].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return filtered;
  }, [news, selectedTheme, searchTerm, sortBy]);
  
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
  // Statistiques par thème
  const themeStats = useMemo(() => {
    const stats: Record<NewsTheme, number> = {} as Record<NewsTheme, number>;
    NEWS_THEMES.forEach(theme => {
      stats[theme] = news.filter(item => item.theme === theme).length;
    });
    return stats;
  }, [news]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête avec bouton d'export */}
        <div className="flex justify-between items-start">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Actualités Financières n°992
            </h1>
            <p className="text-gray-600">
              Consultez les dernières actualités du secteur bancaire et financier validées par la Banque de France.
            </p>
          </div>
          <Button
            onClick={handleExportPDF}
            className="bg-green-600 hover:bg-green-700 text-white ml-2"
            size="lg">
            <RefreshCw className="h-5 w-5 mr-2" />
            Exporter la newsletter
          </Button>
        </div>
        {/* Barre de recherche */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher dans les actualités..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Filtres par thème */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtrer par thème</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTheme === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTheme('all')}
                className="mb-2"
              >
                Tous ({news.length})
              </Button>
              {NEWS_THEMES.map((theme) => (
                <Button
                  key={theme}
                  variant={selectedTheme === theme ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTheme(theme)}
                  className="mb-2"
                >
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold mr-2 ${THEME_COLORS[theme]}`}>
                    {themeStats[theme]}
                  </span>
                  {theme}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* Trier par */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SortAsc className="h-5 w-5" />
              <span>Trier par</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'theme' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('theme')}
              >
                Thème
              </Button>
              <Button
                variant={sortBy === 'date' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('date')}
              >
                Date
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Résultats */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedTheme === 'all' 
                ? `Toutes les actualités (${filteredNews.length})`
                : `${selectedTheme} (${filteredNews.length})`
              }
            </h2>
            
            {searchTerm && (
              <p className="text-sm text-gray-600">
                Résultats pour "{searchTerm}"
              </p>
            )}
          </div>
        </div>

        {/* Liste des actualités */}
        {filteredNews.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500 text-lg">
                Aucune actualité trouvée pour les critères sélectionnés.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredNews.map((item) => (
              <NewsCard key={item.id}
                news={item}
                isAdmin={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReaderPage;
