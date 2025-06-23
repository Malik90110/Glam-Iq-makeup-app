import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Droplets, Sun, Moon, AlertCircle } from 'lucide-react';

interface SkincareProduct {
  id: string;
  name: string;
  type: string;
  description: string;
  suitableFor: string[];
  timeOfDay: 'morning' | 'evening' | 'both';
  priority: 'high' | 'medium' | 'low';
}

interface SkincareRecommendationsProps {
  userAnalysis?: any;
  savedLooks?: any[];
  isPremium: boolean;
}

const SkincareRecommendations: React.FC<SkincareRecommendationsProps> = ({ 
  userAnalysis, 
  savedLooks, 
  isPremium 
}) => {
  const [selectedConcern, setSelectedConcern] = useState('hydration');

  const getSkincareRecommendations = (): SkincareProduct[] => {
    return [
      {
        id: '1',
        name: 'Hyaluronic Acid Serum',
        type: 'Serum',
        description: 'Intensely hydrates and plumps the skin',
        suitableFor: ['Dry', 'Normal', 'Sensitive'],
        timeOfDay: 'both',
        priority: 'high'
      },
      {
        id: '2',
        name: 'Vitamin C Serum',
        type: 'Serum',
        description: 'Brightens skin and protects against damage',
        suitableFor: ['Normal', 'Oily', 'Combination'],
        timeOfDay: 'morning',
        priority: 'medium'
      },
      {
        id: '3',
        name: 'Retinol Night Cream',
        type: 'Cream',
        description: 'Reduces wrinkles and improves skin texture',
        suitableFor: ['Normal', 'Oily', 'Mature'],
        timeOfDay: 'evening',
        priority: 'high'
      },
      {
        id: '4',
        name: 'Gentle Cleansing Milk',
        type: 'Cleanser',
        description: 'Gently removes impurities without drying',
        suitableFor: ['Dry', 'Sensitive'],
        timeOfDay: 'both',
        priority: 'high'
      }
    ];
  };

  if (!isPremium) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-green-50 to-teal-50">
        <Sparkles className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Skincare Recommendations</h3>
        <p className="text-gray-600 mb-6">Get personalized skincare advice based on your unique skin analysis</p>
        <div className="bg-white p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-2">Unlock personalized recommendations:</h4>
          <ul className="text-sm text-gray-600 space-y-1 text-left">
            <li>✨ AI-driven product suggestions</li>
            <li>💧 Solutions for your specific skin concerns</li>
            <li>📅 Morning and evening routine guidance</li>
            <li>🛡️ Ingredients tailored to your skin type</li>
            <li>🌱 Expert tips for a healthy glow</li>
          </ul>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-teal-500">
          Upgrade for Personalized Skincare
        </Button>
      </Card>
    );
  }

  const recommendations = getSkincareRecommendations();

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">Personalized Skincare</h3>
              <p className="text-gray-600">AI-driven recommendations for your skin</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700">
            {userAnalysis?.skinType || 'Normal'} Skin
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            className={`p-4 rounded-lg text-center cursor-pointer transition-colors ${
              selectedConcern === 'hydration' ? 'bg-teal-100 text-teal-800' : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => setSelectedConcern('hydration')}
          >
            <Droplets className="w-6 h-6 text-teal-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Hydration</h4>
            <p className="text-sm text-gray-600">For dry and dehydrated skin</p>
          </div>
          <div 
            className={`p-4 rounded-lg text-center cursor-pointer transition-colors ${
              selectedConcern === 'protection' ? 'bg-teal-100 text-teal-800' : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => setSelectedConcern('protection')}
          >
            <Sun className="w-6 h-6 text-teal-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Protection</h4>
            <p className="text-sm text-gray-600">Against sun and environmental damage</p>
          </div>
          <div 
            className={`p-4 rounded-lg text-center cursor-pointer transition-colors ${
              selectedConcern === 'repair' ? 'bg-teal-100 text-teal-800' : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => setSelectedConcern('repair')}
          >
            <Moon className="w-6 h-6 text-teal-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Repair</h4>
            <p className="text-sm text-gray-600">For nighttime skin recovery</p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {recommendations.map((product) => (
          <Card key={product.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                {product.type === 'Serum' ? <Droplets className="w-6 h-6" /> : 
                 product.type === 'Cream' ? <Sun className="w-6 h-6" /> : 
                 <AlertCircle className="w-6 h-6" />}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{product.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex flex-wrap gap-2">
                  {product.suitableFor.map((skinType, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skinType}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkincareRecommendations;
