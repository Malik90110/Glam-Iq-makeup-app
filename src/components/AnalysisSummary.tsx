
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Star, Share2 } from 'lucide-react';

interface AnalysisResult {
  skinTone: string;
  undertone: string;
  faceShape: string;
  currentMakeup: {
    foundation: string;
    eyes: string;
    lips: string;
    feedback: string[];
  };
  skincareTips: string[];
}

interface AnalysisSummaryProps {
  analysis: AnalysisResult;
  onShare: () => void;
}

const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({ analysis, onShare }) => {
  return (
    <Card className="p-6 bg-white border-pink-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-pink-500" />
          <h2 className="text-2xl font-bold text-gray-800">Your Beauty Analysis</h2>
        </div>
        <Button onClick={onShare} variant="outline" size="sm" className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-pink-50 rounded-lg">
          <p className="text-sm text-gray-600">Skin Tone</p>
          <p className="font-semibold text-pink-700">{analysis.skinTone}</p>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600">Undertone</p>
          <p className="font-semibold text-purple-700">{analysis.undertone}</p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Face Shape</p>
          <p className="font-semibold text-blue-700">{analysis.faceShape}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg mb-4">
        <h3 className="font-semibold text-gray-800 mb-2">AI Feedback</h3>
        <ul className="space-y-1">
          {analysis.currentMakeup.feedback.map((feedback, index) => (
            <li key={index} className="text-gray-700 text-sm flex items-start gap-2">
              <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              {feedback}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-500" />
          Skincare Tips
        </h3>
        <ul className="space-y-1">
          {analysis.skincareTips.map((tip, index) => (
            <li key={index} className="text-gray-700 text-sm">• {tip}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default AnalysisSummary;
