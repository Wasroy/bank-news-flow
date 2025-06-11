
import { useState } from 'react';
import Navigation from '../components/Navigation';
import AdminPage from '../components/AdminPage';
import ReaderPage from '../components/ReaderPage';

const Index = () => {
  const [currentView, setCurrentView] = useState<'admin' | 'reader'>('reader');

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      {currentView === 'admin' ? <AdminPage /> : <ReaderPage />}
    </div>
  );
};

export default Index;
