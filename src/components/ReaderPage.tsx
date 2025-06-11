
import { useState, useMemo } from 'react';
import { NewsItem, NewsTheme, NEWS_THEMES, THEME_COLORS } from '../types/news';
import { generateMockNews } from '../data/mockNews';
import NewsCard from './NewsCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ReaderPage = () => {
  const [selectedTheme, setSelectedTheme] = useState<NewsTheme | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Obtenir uniquement les actualités approuvées
  const allNews = useMemo(() => 
    generateMockNews().filter(item => item.status === 'approved'),
    []
  );

  // Filtrer les actualités
  const filteredNews = useMemo(() => {
    let filtered = allNews;
    
    if (selectedTheme !== 'all') {
      filtered = filtered.filter(item => item.theme === selectedTheme);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [allNews, selectedTheme, searchTerm]);

  // Statistiques par thème
  const themeStats = useMemo(() => {
    const stats: Record<NewsTheme, number> = {} as Record<NewsTheme, number>;
    NEWS_THEMES.forEach(theme => {
      stats[theme] = allNews.filter(item => item.theme === theme).length;
    });
    return stats;
  }, [allNews]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Actualités Financières Validées
          </h1>
          <p className="text-gray-600">
            Consultez les dernières actualités du secteur bancaire et financier
          </p>
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
                Tous ({allNews.length})
              </Button>
              {NEWS_THEMES.map((theme) => (
                <Button
                  key={theme}
                  variant={selectedTheme === theme ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTheme(theme)}
                  className="mb-2"
                >
                  <Badge className={`${THEME_COLORS[theme]} mr-2`}>
                    {themeStats[theme]}
                  </Badge>
                  {theme}
                </Button>
              ))}
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
              <NewsCard
                key={item.id}
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
