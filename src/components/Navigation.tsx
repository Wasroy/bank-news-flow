
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Users } from 'lucide-react';

interface NavigationProps {
  currentView: 'admin' | 'reader';
  onViewChange: (view: 'admin' | 'reader') => void;
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">FinNews Pro</h1>
              <p className="text-sm text-muted-foreground">Plateforme de curation d'actualités bancaires</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant={currentView === 'admin' ? 'default' : 'outline'}
              onClick={() => onViewChange('admin')}
              className="flex items-center space-x-2"
            >
              <Shield className="h-4 w-4" />
              <span>Administration</span>
            </Button>
            
            <Button
              variant={currentView === 'reader' ? 'default' : 'outline'}
              onClick={() => onViewChange('reader')}
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Lecture</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
