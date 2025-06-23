
import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import CameraCapture from '@/components/CameraCapture';
import EnhancedMakeupAnalysis from '@/components/EnhancedMakeupAnalysis';
import ContextAwareRecommendations from '@/components/ContextAwareRecommendations';
import HowItWorks from '@/components/HowItWorks';
import VirtualTryOn from '@/components/VirtualTryOn';
import SocialSharing from '@/components/SocialSharing';
import { Product } from '@/types';

interface MobileAnalyzeContentProps {
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

const MobileAnalyzeContent: React.FC<MobileAnalyzeContentProps> = ({
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
      <div className="space-y-4">
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-2xl">
          <CameraCapture onPhotoCapture={onPhotoCapture} />
        </div>
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-2xl">
          <ContextAwareRecommendations 
            timeOfDay={getCurrentTimeContext()}
            occasion="casual"
            season={getCurrentSeason()}
          />
        </div>
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-2xl">
          <HowItWorks />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-xl">
        <h2 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
          ✨ Analysis Results
        </h2>
        <div className="flex gap-2">
          {selectedProducts.length > 0 && (
            <Button
              onClick={() => onVirtualTryOn(selectedProducts)}
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg border border-white/30"
            >
              <Palette className="w-4 h-4 mr-1" />
              Try-On
            </Button>
          )}
          <button
            onClick={onResetAnalysis}
            className="text-rose-600 hover:text-rose-800 underline font-medium text-sm"
          >
            New Photo
          </button>
        </div>
      </div>
      
      {showVirtualTryOn ? (
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-2xl">
          <VirtualTryOn
            imageData={capturedImage}
            selectedProducts={selectedProducts}
            onClose={onCloseVirtualTryOn}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-xl">
            <h3 className="font-semibold text-gray-800 mb-3 text-base">Your Photo</h3>
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full rounded-xl shadow-lg border-2 border-white/40 max-h-80 object-cover"
            />
            <div className="mt-4">
              <SocialSharing lookName="My AI Makeup Analysis" imageData={capturedImage} />
            </div>
          </div>
          
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-2xl">
            <EnhancedMakeupAnalysis
              imageData={capturedImage}
              onSaveLook={onSaveLook}
              onVirtualTryOn={onVirtualTryOn}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileAnalyzeContent;
