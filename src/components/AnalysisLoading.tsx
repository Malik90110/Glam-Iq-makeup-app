
import React from 'react';
import { Card } from '@/components/ui/card';

const AnalysisLoading: React.FC = () => {
  return (
    <Card className="p-8 text-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="space-y-4">
        <div className="animate-spin mx-auto w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full"></div>
        <h3 className="text-xl font-semibold text-gray-800">Analyzing Your Photo</h3>
        <p className="text-gray-600">Our AI is examining your skin tone, features, and current makeup...</p>
        <div className="max-w-sm mx-auto bg-white/70 p-4 rounded-lg">
          <div className="text-left space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              Detecting skin tone and undertone
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              Analyzing facial features
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Generating personalized recommendations
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AnalysisLoading;
