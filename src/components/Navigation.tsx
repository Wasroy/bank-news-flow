
import { Button } from '@/components/ui/button';
import { Settings, Users, Archive } from 'lucide-react';

interface NavigationProps {
  currentView: 'admin' | 'reader' | 'weekly-reviews';
  onViewChange: (view: 'admin' | 'reader' | 'weekly-reviews') => void;
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              ActualRisk Pro
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant={currentView === 'reader' ? 'default' : 'ghost'}
              onClick={() => onViewChange('reader')}
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Lecteur</span>
            </Button>
            
            <Button
              variant={currentView === 'admin' ? 'default' : 'ghost'}
              onClick={() => onViewChange('admin')}
              className="flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span>Administration</span>
            </Button>

            <Button
              variant={currentView === 'weekly-reviews' ? 'default' : 'ghost'}
              onClick={() => onViewChange('weekly-reviews')}
              className="flex items-center space-x-2"
            >
              <Archive className="h-4 w-4" />
              <span>Revues Hebdo</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
