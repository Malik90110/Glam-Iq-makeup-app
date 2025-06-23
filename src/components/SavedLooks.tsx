
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Trash2, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  brand: string;
  name: string;
  shade: string;
  category: string;
  price: string;
  description: string;
}

interface SavedLook {
  id: string;
  name: string;
  date: string;
  products: Product[];
}

interface SavedLooksProps {
  savedLooks: SavedLook[];
  onDeleteLook: (lookId: string) => void;
}

const SavedLooks: React.FC<SavedLooksProps> = ({ savedLooks, onDeleteLook }) => {
  const handleDeleteLook = (lookId: string) => {
    onDeleteLook(lookId);
    toast({ title: "Look deleted successfully" });
  };

  if (savedLooks.length === 0) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-pink-50 to-purple-50">
        <Sparkles className="w-12 h-12 text-pink-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Saved Looks Yet</h3>
        <p className="text-gray-600">Analyze a photo to get personalized recommendations and save your favorite looks!</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Heart className="w-6 h-6 text-pink-500" />
        <h2 className="text-2xl font-bold text-gray-800">Your Saved Looks</h2>
      </div>

      {savedLooks.map((look) => (
        <Card key={look.id} className="p-6 bg-white border-pink-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{look.name}</h3>
              <p className="text-sm text-gray-500">Saved on {look.date}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteLook(look.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid gap-3">
            {look.products.map((product) => (
              <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <span className="font-medium text-gray-800">{product.brand}</span>
                  </div>
                  <p className="text-sm text-gray-700">{product.name} - {product.shade}</p>
                </div>
                <span className="font-semibold text-pink-600">{product.price}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SavedLooks;
