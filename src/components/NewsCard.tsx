import React from 'react'; // Ajout de l'import React
import { useState } from 'react';
import { NewsItem, NewsTheme, NEWS_THEMES, THEME_COLORS } from '../types/news';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, Edit, Save, X } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
  isAdmin?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onThemeChange?: (id: string, theme: NewsTheme) => void;
  onContentEdit?: (id: string, content: string) => void;
  key?: React.Key;
}

const NewsCard = ({ 
  news, 
  isAdmin = false, 
  onApprove, 
  onReject, 
  onThemeChange,
  onContentEdit 
}: NewsCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(news.content);

  const handleSaveEdit = () => {
    if (onContentEdit) {
      onContentEdit(news.id, editedContent);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(news.content);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
            <a
              href={news.url || 'https://www.argusdelassurance.com/'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {news.title}
            </a>
          </CardTitle>
          <div className="flex flex-col items-end space-y-2">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${THEME_COLORS[news.theme]}`}>
              {news.theme}
            </span>
            {isAdmin && (
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(news.status)}`}>
                {news.status === 'pending' ? 'En attente' : 
                 news.status === 'approved' ? 'Validé' : 'Rejeté'}
              </span>
            )}
          </div>
        </div>
        
        {/* Author and Source information */}
        <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            {news.author && (
              <span>
                <strong>Auteur:</strong> {news.author}
              </span>
            )}
            {news.source && (
              <span>
                <strong>Source:</strong> {news.source}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {new Date(news.createdAt).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </CardHeader>
      
      <CardContent>
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[100px] resize-none text-base"
            />
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleSaveEdit} className="flex items-center space-x-1">
                <Save className="h-4 w-4" />
                <span>Sauvegarder</span>
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelEdit} className="flex items-center space-x-1">
                <X className="h-4 w-4" />
                <span>Annuler</span>
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 text-base leading-relaxed line-clamp-4">
            {news.content}
          </p>
        )}

        {isAdmin && (
          <div className="mt-4 space-y-3">
            {/* Sélection du thème */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Classification thématique :
              </label>
              <Select
                value={news.theme}
                onValueChange={(value: NewsTheme) => onThemeChange?.(news.id, value)}
              >
                <SelectTrigger className="w-64 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {NEWS_THEMES.map((theme) => (
                    <SelectItem key={theme} value={theme}>
                      {theme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Actions d'administration */}
            <div className="flex flex-wrap gap-2">
              {news.status === 'pending' && (
                <>
                  <Button
                    size="sm"
                    onClick={() => onApprove?.(news.id)}
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-1"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Valider</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onReject?.(news.id)}
                    className="flex items-center space-x-1"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Rejeter</span>
                  </Button>
                </>
              )}
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-1"
              >
                <Edit className="h-4 w-4" />
                <span>Modifier</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsCard;
