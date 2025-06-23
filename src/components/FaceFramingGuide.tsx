
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, CheckCircle } from 'lucide-react';

interface FaceFramingGuideProps {
  isVisible: boolean;
}

const FaceFramingGuide: React.FC<FaceFramingGuideProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Face oval guide */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <svg
            width="250"
            height="320"
            viewBox="0 0 250 320"
            className="drop-shadow-lg"
          >
            <ellipse
              cx="125"
              cy="160"
              rx="100"
              ry="140"
              fill="none"
              stroke="rgba(236, 72, 153, 0.8)"
              strokeWidth="3"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
          </svg>
          
          {/* Positioning guides */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <Badge variant="outline" className="bg-white/90 text-pink-600 border-pink-300">
              Align face here
            </Badge>
          </div>
        </div>
      </div>

      {/* Corner instructions */}
      <Card className="absolute top-4 left-4 p-3 bg-white/95 backdrop-blur-sm border-pink-200 max-w-48">
        <div className="flex items-start gap-2">
          <Camera className="w-4 h-4 text-pink-500 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-gray-800">Perfect Position</p>
            <p className="text-xs text-gray-600">Center your face in the oval guide</p>
          </div>
        </div>
      </Card>

      {/* Quality checklist */}
      <Card className="absolute bottom-4 right-4 p-3 bg-white/95 backdrop-blur-sm border-pink-200 max-w-52">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span className="text-gray-700">Good lighting ✓</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span className="text-gray-700">Face centered ✓</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span className="text-gray-700">Clear features ✓</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FaceFramingGuide;
