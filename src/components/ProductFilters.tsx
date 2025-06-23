
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface ProductFiltersProps {
  selectedOccasion: 'everyday' | 'evening' | 'special';
  selectedBudget: 'all' | 'budget' | 'mid-range' | 'luxury';
  onOccasionChange: (occasion: 'everyday' | 'evening' | 'special') => void;
  onBudgetChange: (budget: 'all' | 'budget' | 'mid-range' | 'luxury') => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedOccasion,
  selectedBudget,
  onOccasionChange,
  onBudgetChange
}) => {
  return (
    <div className="space-y-4">
      {/* Occasion Filter */}
      <div className="flex gap-2">
        <Button
          variant={selectedOccasion === 'everyday' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onOccasionChange('everyday')}
          className="flex items-center gap-2"
        >
          <Sun className="w-4 h-4" />
          Everyday
        </Button>
        <Button
          variant={selectedOccasion === 'evening' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onOccasionChange('evening')}
          className="flex items-center gap-2"
        >
          <Moon className="w-4 h-4" />
          Evening
        </Button>
        <Button
          variant={selectedOccasion === 'special' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onOccasionChange('special')}
          className="flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Special
        </Button>
      </div>

      {/* Budget Filter */}
      <div className="flex gap-2">
        {['all', 'budget', 'mid-range', 'luxury'].map((budget) => (
          <Badge
            key={budget}
            variant={selectedBudget === budget ? 'default' : 'outline'}
            className="cursor-pointer capitalize"
            onClick={() => onBudgetChange(budget as any)}
          >
            {budget === 'all' ? 'All Budgets' : budget}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ProductFilters;
