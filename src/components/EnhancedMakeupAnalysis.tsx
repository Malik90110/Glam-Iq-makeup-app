
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import AnalysisLoading from './AnalysisLoading';
import AnalysisSummary from './AnalysisSummary';
import ProductFilters from './ProductFilters';
import ProductCard from './ProductCard';
import { Palette } from 'lucide-react';

interface Product {
  id: string;
  brand: string;
  name: string;
  shade: string;
  category: string;
  price: string;
  description: string;
  image?: string;
  rating: number;
  reviews: number;
  budget: 'budget' | 'mid-range' | 'luxury';
  occasions: string[];
  swatchColor?: string;
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
  recommendations: {
    everyday: Product[];
    evening: Product[];
    special: Product[];
  };
  skincareTips: string[];
}

interface EnhancedMakeupAnalysisProps {
  imageData: string;
  onSaveLook: (products: Product[]) => void;
  onVirtualTryOn?: (products: Product[]) => void;
}

const EnhancedMakeupAnalysis: React.FC<EnhancedMakeupAnalysisProps> = ({ 
  imageData, 
  onSaveLook,
  onVirtualTryOn 
}) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedOccasion, setSelectedOccasion] = useState<'everyday' | 'evening' | 'special'>('everyday');
  const [selectedBudget, setSelectedBudget] = useState<'all' | 'budget' | 'mid-range' | 'luxury'>('all');

  useEffect(() => {
    analyzeImage();
  }, [imageData]);

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Enhanced mock analysis results
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
      recommendations: {
        everyday: [
          {
            id: "1",
            brand: "Fenty Beauty",
            name: "Pro Filt'r Soft Matte Foundation",
            shade: "310 (Medium with warm undertones)",
            category: "Foundation",
            price: "$39",
            description: "Perfect match for your warm medium skin tone",
            rating: 4.5,
            reviews: 2847,
            budget: 'mid-range',
            occasions: ['everyday', 'work'],
            swatchColor: '#D4A574'
          },
          {
            id: "2",
            brand: "Glossier",
            name: "Cloud Paint",
            shade: "Puff",
            category: "Blush",
            price: "$22",
            description: "Gel-cream blush for a natural flush",
            rating: 4.3,
            reviews: 1923,
            budget: 'mid-range',
            occasions: ['everyday', 'natural'],
            swatchColor: '#E8B4B8'
          }
        ],
        evening: [
          {
            id: "3",
            brand: "Urban Decay",
            name: "Naked Heat Eyeshadow Palette",
            shade: "Warm neutrals",
            category: "Eyeshadow",
            price: "$54",
            description: "Warm-toned palette perfect for your coloring",
            rating: 4.7,
            reviews: 3421,
            budget: 'mid-range',
            occasions: ['evening', 'date night'],
            swatchColor: '#B8860B'
          },
          {
            id: "4",
            brand: "Charlotte Tilbury",
            name: "Matte Revolution Lipstick",
            shade: "Pillow Talk",
            category: "Lipstick",
            price: "$38",
            description: "Universally flattering nude-pink",
            rating: 4.8,
            reviews: 5234,
            budget: 'luxury',
            occasions: ['evening', 'special'],
            swatchColor: '#C19A6B'
          }
        ],
        special: [
          {
            id: "5",
            brand: "Pat McGrath Labs",
            name: "LUST: Gloss",
            shade: "Bronze Venus",
            category: "Lip Gloss",
            price: "$29",
            description: "High-shine gloss with bronze undertones",
            rating: 4.6,
            reviews: 987,
            budget: 'luxury',
            occasions: ['special', 'party'],
            swatchColor: '#CD7F32'
          }
        ]
      },
      skincareTips: [
        "Use a hydrating primer to enhance your natural glow",
        "SPF is essential - look for foundations with built-in protection",
        "Consider a vitamin C serum for extra radiance"
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
      const allProducts = [
        ...analysis.recommendations.everyday,
        ...analysis.recommendations.evening,
        ...analysis.recommendations.special
      ];
      onSaveLook(allProducts);
      toast({ title: "Look saved successfully!" });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My AI Makeup Analysis',
        text: `Check out my personalized makeup recommendations from AI Makeup Advisor!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied to clipboard!" });
    }
  };

  const handleVirtualTryOn = () => {
    const currentProducts = getCurrentProducts();
    if (onVirtualTryOn && currentProducts.length > 0) {
      onVirtualTryOn(currentProducts);
    }
  };

  const getCurrentProducts = () => {
    if (!analysis) return [];
    const products = analysis.recommendations[selectedOccasion];
    if (selectedBudget === 'all') return products;
    return products.filter(product => product.budget === selectedBudget);
  };

  if (isAnalyzing) {
    return <AnalysisLoading />;
  }

  if (!analysis) return null;

  return (
    <div className="space-y-6">
      <AnalysisSummary analysis={analysis} onShare={handleShare} />

      {/* Product Recommendations */}
      <Card className="p-6 bg-white border-pink-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recommended Products</h2>
          <div className="flex gap-3">
            {onVirtualTryOn && getCurrentProducts().length > 0 && (
              <Button 
                onClick={handleVirtualTryOn}
                variant="outline"
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                <Palette className="w-4 h-4 mr-2" />
                Try Virtually
              </Button>
            )}
            <Button onClick={handleSaveLook} className="bg-gradient-to-r from-pink-500 to-purple-500">
              Save This Look
            </Button>
          </div>
        </div>

        <ProductFilters
          selectedOccasion={selectedOccasion}
          selectedBudget={selectedBudget}
          onOccasionChange={setSelectedOccasion}
          onBudgetChange={setSelectedBudget}
        />

        <div className="grid gap-4 mt-6">
          {getCurrentProducts().map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.has(product.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default EnhancedMakeupAnalysis;
