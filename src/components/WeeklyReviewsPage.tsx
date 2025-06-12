
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Eye, FileText } from 'lucide-react';

interface WeeklyReview {
  id: string;
  weekNumber: number;
  year: number;
  startDate: string;
  endDate: string;
  totalNews: number;
  approvedNews: number;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
}

// Données mockup pour les revues hebdomadaires
const mockWeeklyReviews: WeeklyReview[] = [
  {
    id: '1',
    weekNumber: 991,
    year: 2025,
    startDate: '2024-12-02',
    endDate: '2024-12-08',
    totalNews: 15,
    approvedNews: 12,
    status: 'published',
    createdAt: '2024-12-08T10:00:00Z'
  },
  {
    id: '2',
    weekNumber: 990,
    year: 2025,
    startDate: '2024-11-25',
    endDate: '2024-12-01',
    totalNews: 18,
    approvedNews: 14,
    status: 'published',
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    id: '3',
    weekNumber: 989,
    year: 2025,
    startDate: '2024-11-18',
    endDate: '2024-11-24',
    totalNews: 20,
    approvedNews: 16,
    status: 'published',
    createdAt: '2024-11-24T10:00:00Z'
  },
  {
    id: '4',
    weekNumber: 988,
    year: 2025,
    startDate: '2024-11-11',
    endDate: '2024-11-17',
    totalNews: 13,
    approvedNews: 10,
    status: 'published',
    createdAt: '2024-11-17T10:00:00Z'
  },
  {
    id: '5',
    weekNumber: 987,
    year: 2025,
    startDate: '2024-11-04',
    endDate: '2024-11-10',
    totalNews: 22,
    approvedNews: 19,
    status: 'archived',
    createdAt: '2024-11-10T10:00:00Z'
  }
];

const WeeklyReviewsPage = () => {
  const [reviews] = useState<WeeklyReview[]>(mockWeeklyReviews);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publiée';
      case 'draft':
        return 'Brouillon';
      case 'archived':
        return 'Archivée';
      default:
        return status;
    }
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    const end = new Date(endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    return `${start} - ${end}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Revues Hebdomadaires
          </h1>
          <p className="text-gray-600">
            Consultez et gérez les revues de presse hebdomadaires précédentes
          </p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total des revues</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviews.length}</div>
              <p className="text-xs text-muted-foreground">revues archivées</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Publiées</CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {reviews.filter(r => r.status === 'published').length}
              </div>
              <p className="text-xs text-muted-foreground">en ligne</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Actualités totales</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {reviews.reduce((sum, review) => sum + review.approvedNews, 0)}
              </div>
              <p className="text-xs text-muted-foreground">actualités validées</p>
            </CardContent>
          </Card>
        </div>

        {/* Liste des revues */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Historique des revues hebdomadaires
          </h2>
          
          <div className="grid gap-4">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Semaine {review.weekNumber} - {review.year}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatDateRange(review.startDate, review.endDate)}
                      </p>
                    </div>
                    <Badge variant="secondary" className={getStatusColor(review.status)}>
                      {getStatusLabel(review.status)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-6 text-sm text-gray-600">
                      <span>
                        <strong>{review.approvedNews}</strong> actualités validées
                      </span>
                      <span>
                        <strong>{review.totalNews}</strong> actualités totales
                      </span>
                      <span>
                        Créée le {new Date(review.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReviewsPage;
