
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Star, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  brand: string;
  name: string;
  shade: string;
  category: string;
  price: string;
  description: string;
  image?: string;
}

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
  recommendations: Product[];
}

interface MakeupAnalysisProps {
  imageData: string;
  onSaveLook: (products: Product[]) => void;
}

const MakeupAnalysis: React.FC<MakeupAnalysisProps> = ({ imageData, onSaveLook }) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    analyzeImage();
  }, [imageData]);

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis results with real product recommendations
    const mockAnalysis: AnalysisResult = {
      skinTone: "Medium",
      undertone: "Warm",
      faceShape: "Oval",
      currentMakeup: {
        foundation: "Light coverage detected",
        eyes: "Natural look with subtle definition",
        lips: "Natural lip color",
        feedback: [
          "Your natural glow is beautiful!",
          "Consider adding a subtle blush for more dimension",
          "A warm-toned lipstick would complement your undertone perfectly"
        ]
      },
      recommendations: [
        {
          id: "1",
          brand: "Fenty Beauty",
          name: "Pro Filt'r Soft Matte Foundation",
          shade: "310 (Medium with warm undertones)",
          category: "Foundation",
          price: "$39",
          description: "Perfect match for your warm medium skin tone"
        },
        {
          id: "2",
          brand: "NARS",
          name: "Blush",
          shade: "Orgasm",
          category: "Blush",
          price: "$32",
          description: "Peachy-pink with golden undertones"
        },
        {
          id: "3",
          brand: "MAC",
          name: "Lipstick",
          shade: "Velvet Teddy",
          category: "Lipstick",
          price: "$26",
          description: "Warm nude that complements your undertone"
        },
        {
          id: "4",
          brand: "Urban Decay",
          name: "Naked Heat Eyeshadow Palette",
          shade: "Warm neutrals",
          category: "Eyeshadow",
          price: "$54",
          description: "Warm-toned palette perfect for your coloring"
        },
        {
          id: "5",
          brand: "Tarte",
          name: "Shape Tape Concealer",
          shade: "29N Medium Neutral",
          category: "Concealer",
          price: "$29",
          description: "High coverage concealer in your perfect shade"
        }
      ]
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(productId)) {
      newFavorites.delete(productId);
      toast({ title: "Removed from favorites" });
    } else {
      newFavorites.add(productId);
      toast({ title: "Added to favorites" });
    }
    setFavorites(newFavorites);
  };

  const handleSaveLook = () => {
    if (analysis) {
      onSaveLook(analysis.recommendations);
      toast({ title: "Look saved successfully!" });
    }
  };

  if (isAnalyzing) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="space-y-4">
          <div className="animate-spin mx-auto w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full"></div>
          <h3 className="text-xl font-semibold text-gray-800">Analyzing Your Photo</h3>
          <p className="text-gray-600">Our AI is examining your skin tone, features, and current makeup...</p>
        </div>
      </Card>
    );
  }

  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* Analysis Summary */}
      <Card className="p-6 bg-white border-pink-200">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-pink-500" />
          <h2 className="text-2xl font-bold text-gray-800">Your Beauty Analysis</h2>
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

        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Current Look Feedback</h3>
          <ul className="space-y-1">
            {analysis.currentMakeup.feedback.map((feedback, index) => (
              <li key={index} className="text-gray-700 text-sm flex items-start gap-2">
                <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                {feedback}
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Product Recommendations */}
      <Card className="p-6 bg-white border-pink-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recommended Products</h2>
          <Button onClick={handleSaveLook} className="bg-gradient-to-r from-pink-500 to-purple-500">
            Save This Look
          </Button>
        </div>

        <div className="grid gap-4">
          {analysis.recommendations.map((product) => (
            <Card key={product.id} className="p-4 hover:shadow-md transition-shadow border-gray-200">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <span className="text-lg font-semibold text-gray-800">{product.brand}</span>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-sm text-purple-600 font-medium mb-2">{product.shade}</p>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <p className="text-lg font-bold text-pink-600">{product.price}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(product.id)}
                  className={favorites.has(product.id) ? "text-red-500" : "text-gray-400"}
                >
                  <Heart className={`w-5 h-5 ${favorites.has(product.id) ? "fill-current" : ""}`} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MakeupAnalysis;
