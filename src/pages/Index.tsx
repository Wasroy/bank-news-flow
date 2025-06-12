
import { useState } from 'react';
import Navigation from '../components/Navigation';
import AdminPage from '../components/AdminPage';
import ReaderPage from '../components/ReaderPage';
import WeeklyReviewsPage from '../components/WeeklyReviewsPage';

const Index = () => {
  const [currentView, setCurrentView] = useState<'admin' | 'reader' | 'weekly-reviews'>('reader');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'admin':
        return <AdminPage />;
      case 'weekly-reviews':
        return <WeeklyReviewsPage />;
      default:
        return <ReaderPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      {renderCurrentView()}
    </div>
  );
};

export default Index;
