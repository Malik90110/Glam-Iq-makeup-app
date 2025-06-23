
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Palette, Eye, Smile, Sparkles } from 'lucide-react';

interface MakeupPreset {
  id: string;
  name: string;
  description: string;
  eyeshadow: string;
  lipstick: string;
  blush: string;
  category: 'natural' | 'glam' | 'bold';
}

interface MakeupColors {
  eyeshadow: string;
  lipstick: string;
  blush: string;
}

interface MakeupSelectorProps {
  onMakeupChange: (colors: MakeupColors) => void;
  currentColors: MakeupColors;
}

const MAKEUP_PRESETS: MakeupPreset[] = [
  {
    id: 'natural-1',
    name: 'Soft Natural',
    description: 'Everyday natural look',
    eyeshadow: '#D2B48C',
    lipstick: '#C19A6B',
    blush: '#F5C6CB',
    category: 'natural'
  },
  {
    id: 'natural-2',
    name: 'Fresh Glow',
    description: 'Dewy and fresh',
    eyeshadow: '#E6D3A3',
    lipstick: '#E8B4B8',
    blush: '#FFB6C1',
    category: 'natural'
  },
  {
    id: 'glam-1',
    name: 'Golden Hour',
    description: 'Warm golden tones',
    eyeshadow: '#DAA520',
    lipstick: '#CD853F',
    blush: '#DDA0DD',
    category: 'glam'
  },
  {
    id: 'glam-2',
    name: 'Rose Gold',
    description: 'Romantic rose gold',
    eyeshadow: '#E75480',
    lipstick: '#DC143C',
    blush: '#F08080',
    category: 'glam'
  },
  {
    id: 'bold-1',
    name: 'Dramatic Red',
    description: 'Classic red lips',
    eyeshadow: '#8B4513',
    lipstick: '#DC143C',
    blush: '#FF6347',
    category: 'bold'
  },
  {
    id: 'bold-2',
    name: 'Purple Power',
    description: 'Bold purple statement',
    eyeshadow: '#9370DB',
    lipstick: '#8B008B',
    blush: '#DA70D6',
    category: 'bold'
  }
];

const LIPSTICK_SHADES = [
  { name: 'Nude Pink', color: '#E8B4B8' },
  { name: 'Coral', color: '#FF7F50' },
  { name: 'Classic Red', color: '#DC143C' },
  { name: 'Berry', color: '#8B008B' },
  { name: 'Mauve', color: '#E0B0FF' },
  { name: 'Brown', color: '#A0522D' },
  { name: 'Bright Pink', color: '#FF1493' },
  { name: 'Orange', color: '#FF4500' }
];

const EYESHADOW_PALETTES = [
  { name: 'Neutral', colors: ['#F5DEB3', '#D2B48C', '#CD853F', '#8B4513'] },
  { name: 'Warm', colors: ['#FFE4B5', '#DEB887', '#CD853F', '#A0522D'] },
  { name: 'Cool', colors: ['#E6E6FA', '#D8BFD8', '#9370DB', '#4B0082'] },
  { name: 'Bold', colors: ['#FF69B4', '#FF1493', '#DC143C', '#8B008B'] },
  { name: 'Earth', colors: ['#F4A460', '#D2691E', '#A0522D', '#654321'] }
];

const MakeupSelector: React.FC<MakeupSelectorProps> = ({ onMakeupChange, currentColors }) => {
  const [selectedTab, setSelectedTab] = useState('presets');
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [customColors, setCustomColors] = useState<MakeupColors>(currentColors);

  const handlePresetSelect = (preset: MakeupPreset) => {
    setSelectedPreset(preset.id);
    const newColors = {
      eyeshadow: preset.eyeshadow,
      lipstick: preset.lipstick,
      blush: preset.blush
    };
    setCustomColors(newColors);
    onMakeupChange(newColors);
  };

  const handleCustomColorChange = (type: keyof MakeupColors, color: string) => {
    const newColors = { ...customColors, [type]: color };
    setCustomColors(newColors);
    setSelectedPreset(''); // Clear preset selection when using custom
    onMakeupChange(newColors);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'natural': return <Sparkles className="w-4 h-4" />;
      case 'glam': return <Eye className="w-4 h-4" />;
      case 'bold': return <Smile className="w-4 h-4" />;
      default: return <Palette className="w-4 h-4" />;
    }
  };

  return (
    <Card className="p-4 bg-white border-pink-200">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-pink-500" />
        <h3 className="font-semibold text-gray-800">Makeup Styles</h3>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="presets">Presets</TabsTrigger>
          <TabsTrigger value="lipstick">Lipstick</TabsTrigger>
          <TabsTrigger value="eyeshadow">Eyeshadow</TabsTrigger>
        </TabsList>

        <TabsContent value="presets" className="space-y-4">
          <div className="space-y-3">
            {['natural', 'glam', 'bold'].map(category => (
              <div key={category}>
                <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize flex items-center gap-2">
                  {getCategoryIcon(category)}
                  {category}
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {MAKEUP_PRESETS.filter(preset => preset.category === category).map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetSelect(preset)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        selectedPreset === preset.id
                          ? 'border-pink-400 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{preset.name}</p>
                          <p className="text-xs text-gray-500">{preset.description}</p>
                        </div>
                        <div className="flex gap-1">
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: preset.eyeshadow }}
                            title="Eyeshadow"
                          />
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: preset.lipstick }}
                            title="Lipstick"
                          />
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: preset.blush }}
                            title="Blush"
                          />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lipstick" className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Lipstick Shades</h4>
            <div className="grid grid-cols-4 gap-2">
              {LIPSTICK_SHADES.map(shade => (
                <button
                  key={shade.name}
                  onClick={() => handleCustomColorChange('lipstick', shade.color)}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    customColors.lipstick === shade.color
                      ? 'border-pink-400 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-200'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full mx-auto mb-1 border border-gray-300"
                    style={{ backgroundColor: shade.color }}
                  />
                  <p className="text-xs text-center">{shade.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Custom Color</h4>
            <input
              type="color"
              value={customColors.lipstick}
              onChange={(e) => handleCustomColorChange('lipstick', e.target.value)}
              className="w-full h-10 rounded-md border border-gray-300 cursor-pointer"
            />
          </div>
        </TabsContent>

        <TabsContent value="eyeshadow" className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Eyeshadow Palettes</h4>
            <div className="space-y-3">
              {EYESHADOW_PALETTES.map(palette => (
                <div key={palette.name} className="border rounded-lg p-3">
                  <p className="text-sm font-medium mb-2">{palette.name}</p>
                  <div className="flex gap-1">
                    {palette.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => handleCustomColorChange('eyeshadow', color)}
                        className={`w-8 h-8 rounded border-2 transition-all ${
                          customColors.eyeshadow === color
                            ? 'border-pink-400'
                            : 'border-gray-300 hover:border-pink-200'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Custom Color</h4>
            <input
              type="color"
              value={customColors.eyeshadow}
              onChange={(e) => handleCustomColorChange('eyeshadow', e.target.value)}
              className="w-full h-10 rounded-md border border-gray-300 cursor-pointer"
            />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default MakeupSelector;
