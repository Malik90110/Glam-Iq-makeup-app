
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Heart } from 'lucide-react';

interface MobileTabsListProps {
  savedLooksCount: number;
}

const MobileTabsList: React.FC<MobileTabsListProps> = ({ savedLooksCount }) => {
  return (
    <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/60 backdrop-blur-sm border border-white/40 shadow-xl rounded-2xl h-14">
      <TabsTrigger 
        value="analyze" 
        className="flex flex-col items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl transition-all duration-300 text-sm"
      >
        <Camera className="w-5 h-5" />
        <span className="text-xs">Analyze</span>
      </TabsTrigger>
      <TabsTrigger 
        value="saved"
        className="flex flex-col items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-rose-500 data-[state=active]:text-white rounded-xl transition-all duration-300 text-sm"
      >
        <Heart className="w-5 h-5" />
        <span className="text-xs">Saved ({savedLooksCount})</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default MobileTabsList;
