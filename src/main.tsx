import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { NewsProvider } from './components/NewsContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <NewsProvider>
    <App />
  </NewsProvider>
);
