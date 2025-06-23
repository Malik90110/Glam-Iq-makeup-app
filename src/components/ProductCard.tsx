
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Star, ShoppingBag } from 'lucide-react';

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

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite, onToggleFavorite }) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow border-gray-200">
      <div className="flex justify-between items-start gap-4">
        <div className="flex gap-4 flex-1">
          {/* Product Swatch */}
          <div className="flex-shrink-0">
            <div
              className="w-12 h-12 rounded-full border-2 border-gray-200 shadow-sm"
              style={{ backgroundColor: product.swatchColor }}
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
              <Badge variant="outline" className={`text-xs ${
                product.budget === 'budget' ? 'border-green-300 text-green-600' :
                product.budget === 'mid-range' ? 'border-blue-300 text-blue-600' :
                'border-purple-300 text-purple-600'
              }`}>
                {product.budget}
              </Badge>
              <span className="text-lg font-semibold text-gray-800">{product.brand}</span>
            </div>
            <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
            <p className="text-sm text-purple-600 font-medium mb-2">{product.shade}</p>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              </div>
              <p className="text-lg font-bold text-pink-600">{product.price}</p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-500">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleFavorite(product.id)}
          className={isFavorite ? "text-red-500" : "text-gray-400"}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
