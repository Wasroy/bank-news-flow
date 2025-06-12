
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Zap } from 'lucide-react';
import { triggerNewsGeneration } from '../utils/newsTransform';

interface GenerateNewsButtonProps {
  onNewsGenerated: () => void;
}

const GenerateNewsButton = ({ onNewsGenerated }: GenerateNewsButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const success = await triggerNewsGeneration();
      if (success) {
        // Attendre un peu pour que le fichier soit mis à jour
        setTimeout(() => {
          onNewsGenerated();
          setIsGenerating(false);
        }, 2000);
      } else {
        setIsGenerating(false);
        alert('Erreur lors de la génération des actualités. Vérifiez que le serveur backend est démarré.');
      }
    } catch (error) {
      setIsGenerating(false);
      alert('Erreur lors de la génération des actualités.');
    }
  };

  return (
    <Button
      onClick={handleGenerate}
      disabled={isGenerating}
      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
    >
      {isGenerating ? (
        <>
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Génération en cours...</span>
        </>
      ) : (
        <>
          <Zap className="h-4 w-4" />
          <span>Générer de nouvelles actualités</span>
        </>
      )}
    </Button>
  );
};

export default GenerateNewsButton;
