
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Heart, Sparkles } from 'lucide-react';

interface CustomTabsListProps {
  savedLooksCount: number;
}

const CustomTabsList: React.FC<CustomTabsListProps> = ({ savedLooksCount }) => {
  return (
    <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/60 backdrop-blur-sm border border-white/40 shadow-xl rounded-2xl">
      <TabsTrigger 
        value="analyze" 
        className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
      >
        <Camera className="w-5 h-5" />
        Analyze
      </TabsTrigger>
      <TabsTrigger 
        value="brands"
        className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
      >
        <Sparkles className="w-5 h-5" />
        Brands
      </TabsTrigger>
      <TabsTrigger 
        value="saved"
        className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-rose-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
      >
        <Heart className="w-5 h-5" />
        Saved ({savedLooksCount})
      </TabsTrigger>
    </TabsList>
  );
};

export default CustomTabsList;
