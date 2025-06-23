
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Crown, DollarSign } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  tier: 'budget' | 'mid-range' | 'luxury';
  rating: number;
  priceRange: string;
  specialties: string[];
  logo?: string;
}

interface BrandSelectorProps {
  selectedTiers: string[];
  onTierChange: (tiers: string[]) => void;
  onBrandSelect: (brand: Brand) => void;
}

const BrandSelector: React.FC<BrandSelectorProps> = ({
  selectedTiers,
  onTierChange,
  onBrandSelect
}) => {
  const brands: Brand[] = [
    // Budget Tier
    {
      id: 'elf',
      name: 'e.l.f. Cosmetics',
      tier: 'budget',
      rating: 4.2,
      priceRange: '$1-15',
      specialties: ['Value', 'Accessibility', 'Trendy Colors']
    },
    {
      id: 'maybelline',
      name: 'Maybelline',
      tier: 'budget',
      rating: 4.3,
      priceRange: '$5-20',
      specialties: ['Drugstore Favorite', 'Wide Range', 'Reliable']
    },
    {
      id: 'nyx',
      name: 'NYX Professional',
      tier: 'budget',
      rating: 4.4,
      priceRange: '$5-25',
      specialties: ['Professional Quality', 'Bold Colors', 'Inclusive']
    },
    
    // Mid-Range Tier
    {
      id: 'urban-decay',
      name: 'Urban Decay',
      tier: 'mid-range',
      rating: 4.5,
      priceRange: '$25-65',
      specialties: ['Edgy', 'Eyeshadow Palettes', 'Long-Wearing']
    },
    {
      id: 'fenty',
      name: 'Fenty Beauty',
      tier: 'mid-range',
      rating: 4.7,
      priceRange: '$20-50',
      specialties: ['Inclusive Shades', 'High Quality', 'Innovation']
    },
    {
      id: 'rare-beauty',
      name: 'Rare Beauty',
      tier: 'mid-range',
      rating: 4.6,
      priceRange: '$20-48',
      specialties: ['Natural Finish', 'Mental Health Advocacy', 'Easy Application']
    },
    
    // Luxury Tier
    {
      id: 'charlotte-tilbury',
      name: 'Charlotte Tilbury',
      tier: 'luxury',
      rating: 4.8,
      priceRange: '$35-120',
      specialties: ['Red Carpet Looks', 'Premium Packaging', 'Professional Formulas']
    },
    {
      id: 'pat-mcgrath',
      name: 'Pat McGrath Labs',
      tier: 'luxury',
      rating: 4.9,
      priceRange: '$38-128',
      specialties: ['Editorial Quality', 'Innovative Textures', 'Luxury Experience']
    },
    {
      id: 'tom-ford',
      name: 'Tom Ford Beauty',
      tier: 'luxury',
      rating: 4.7,
      priceRange: '$54-150',
      specialties: ['Sophisticated', 'Premium Ingredients', 'Timeless Elegance']
    }
  ];

  const toggleTier = (tier: string) => {
    if (selectedTiers.includes(tier)) {
      onTierChange(selectedTiers.filter(t => t !== tier));
    } else {
      onTierChange([...selectedTiers, tier]);
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'budget':
        return <DollarSign className="w-4 h-4" />;
      case 'mid-range':
        return <Star className="w-4 h-4" />;
      case 'luxury':
        return <Crown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'budget':
        return 'border-green-300 text-green-600 bg-green-50';
      case 'mid-range':
        return 'border-blue-300 text-blue-600 bg-blue-50';
      case 'luxury':
        return 'border-purple-300 text-purple-600 bg-purple-50';
      default:
        return 'border-gray-300 text-gray-600 bg-gray-50';
    }
  };

  const filteredBrands = selectedTiers.length > 0
    ? brands.filter(brand => selectedTiers.includes(brand.tier))
    : brands;

  return (
    <Card className="p-6 bg-white border-pink-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Choose Your Preferred Brands
      </h3>

      {/* Tier Filter */}
      <div className="flex gap-2 mb-6">
        {['budget', 'mid-range', 'luxury'].map((tier) => (
          <Button
            key={tier}
            variant={selectedTiers.includes(tier) ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleTier(tier)}
            className={`flex items-center gap-2 ${
              selectedTiers.includes(tier) ? getTierColor(tier) : ''
            }`}
          >
            {getTierIcon(tier)}
            {tier.charAt(0).toUpperCase() + tier.slice(1).replace('-', ' ')}
          </Button>
        ))}
      </div>

      {/* Brand Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBrands.map((brand) => (
          <Card
            key={brand.id}
            className="p-4 hover:shadow-md transition-shadow cursor-pointer border-gray-200 hover:border-pink-300"
            onClick={() => onBrandSelect(brand)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-800">{brand.name}</h4>
                <Badge className={getTierColor(brand.tier)}>
                  {brand.tier}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{brand.rating}</span>
                </div>
                <span className="text-sm text-gray-500">{brand.priceRange}</span>
              </div>
              
              <div>
                <p className="text-xs text-gray-600 mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {brand.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default BrandSelector;
