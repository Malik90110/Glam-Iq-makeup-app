
import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import CameraCapture from '@/components/CameraCapture';
import EnhancedMakeupAnalysis from '@/components/EnhancedMakeupAnalysis';
import ContextAwareRecommendations from '@/components/ContextAwareRecommendations';
import HowItWorks from '@/components/HowItWorks';
import VirtualTryOn from '@/components/VirtualTryOn';
import SocialSharing from '@/components/SocialSharing';

interface Product {
  id: string;
  brand: string;
  name: string;
  shade: string;
  category: string;
  price: string;
  description: string;
}

interface AnalyzeTabContentProps {
  capturedImage: string | null;
  selectedProducts: Product[];
  showVirtualTryOn: boolean;
  onPhotoCapture: (imageData: string) => void;
  onSaveLook: (products: Product[]) => void;
  onVirtualTryOn: (products: Product[]) => void;
  onResetAnalysis: () => void;
  onCloseVirtualTryOn: () => void;
  getCurrentTimeContext: () => 'morning' | 'afternoon' | 'evening';
  getCurrentSeason: () => 'spring' | 'summer' | 'fall' | 'winter';
}

const AnalyzeTabContent: React.FC<AnalyzeTabContentProps> = ({
  capturedImage,
  selectedProducts,
  showVirtualTryOn,
  onPhotoCapture,
  onSaveLook,
  onVirtualTryOn,
  onResetAnalysis,
  onCloseVirtualTryOn,
  getCurrentTimeContext,
  getCurrentSeason
}) => {
  if (!capturedImage) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
          <CameraCapture onPhotoCapture={onPhotoCapture} />
        </div>
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
          <ContextAwareRecommendations 
            timeOfDay={getCurrentTimeContext()}
            occasion="casual"
            season={getCurrentSeason()}
          />
        </div>
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
          <HowItWorks />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-xl">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
          ✨ Analysis Results
        </h2>
        <div className="flex gap-3">
          {selectedProducts.length > 0 && (
            <Button
              onClick={() => onVirtualTryOn(selectedProducts)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg border border-white/30"
            >
              <Palette className="w-4 h-4 mr-2" />
              Virtual Try-On
            </Button>
          )}
          <button
            onClick={onResetAnalysis}
            className="text-rose-600 hover:text-rose-800 underline font-medium"
          >
            Analyze Another Photo
          </button>
        </div>
      </div>
      
      {showVirtualTryOn ? (
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
          <VirtualTryOn
            imageData={capturedImage}
            selectedProducts={selectedProducts}
            onClose={onCloseVirtualTryOn}
          />
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-xl">
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Your Photo</h3>
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full rounded-xl shadow-lg border-2 border-white/40"
              />
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-xl">
              <SocialSharing lookName="My AI Makeup Analysis" imageData={capturedImage} />
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
              <EnhancedMakeupAnalysis
                imageData={capturedImage}
                onSaveLook={onSaveLook}
                onVirtualTryOn={onVirtualTryOn}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzeTabContent;
