
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SavedLooks from '@/components/SavedLooks';

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

interface SavedTabContentProps {
  user: any;
  savedLooks: SavedLook[];
  onDeleteLook: (lookId: string) => void;
}

const SavedTabContent: React.FC<SavedTabContentProps> = ({ user, savedLooks, onDeleteLook }) => {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="bg-white/60 backdrop-blur-sm p-12 rounded-3xl border border-white/50 max-w-md mx-auto shadow-2xl">
          <Heart className="w-16 h-16 text-rose-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Sign In Required</h3>
          <p className="text-gray-600 mb-6 text-lg">Please sign in to save and view your glamorous makeup looks.</p>
          <Button
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-lg border border-white/30 text-lg px-8 py-3"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
      <SavedLooks
        savedLooks={savedLooks}
        onDeleteLook={onDeleteLook}
      />
    </div>
  );
};

export default SavedTabContent;
