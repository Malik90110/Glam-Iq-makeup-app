
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Sun, Moon, Calendar, MapPin } from 'lucide-react';

interface ContextAwareRecommendationsProps {
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  occasion: 'work' | 'casual' | 'date' | 'party' | 'special';
  season: 'spring' | 'summer' | 'fall' | 'winter';
}

const ContextAwareRecommendations: React.FC<ContextAwareRecommendationsProps> = ({
  timeOfDay,
  occasion,
  season
}) => {
  const getTimeBasedTips = () => {
    switch (timeOfDay) {
      case 'morning':
        return {
          icon: <Sun className="w-4 h-4" />,
          title: 'Morning Fresh Look',
          tips: [
            'Light, dewy foundation for a natural glow',
            'Neutral eyeshadows that won\'t crease',
            'Long-wearing products for all-day comfort',
            'SPF-infused makeup for sun protection'
          ]
        };
      case 'afternoon':
        return {
          icon: <Clock className="w-4 h-4" />,
          title: 'Midday Refresh',
          tips: [
            'Touch up with powder to control shine',
            'Reapply lip color for lasting impact',
            'Consider cream blush for a natural flush',
            'Waterproof mascara if it\'s warm outside'
          ]
        };
      case 'evening':
        return {
          icon: <Moon className="w-4 h-4" />,
          title: 'Evening Glamour',
          tips: [
            'Bold lip colors for dramatic effect',
            'Smoky eyeshadows for depth and mystery',
            'Highlight and contour for dimension',
            'Setting spray to lock in your look'
          ]
        };
      default:
        return {
          icon: <Clock className="w-4 h-4" />,
          title: 'Anytime Beauty',
          tips: ['Versatile looks that work any time of day']
        };
    }
  };

  const getOccasionTips = () => {
    switch (occasion) {
      case 'work':
        return {
          icon: <Calendar className="w-4 h-4" />,
          title: 'Professional Polish',
          tips: [
            'Neutral colors that enhance your natural beauty',
            'Matte or satin finishes for a sophisticated look',
            'Subtle contouring for definition',
            'Classic red or nude lip colors'
          ]
        };
      case 'casual':
        return {
          icon: <MapPin className="w-4 h-4" />,
          title: 'Effortless Everyday',
          tips: [
            'Tinted moisturizer for light coverage',
            'Cream products for easy blending',
            'Natural-looking brows and lashes',
            'Lip tint or gloss for a fresh finish'
          ]
        };
      case 'date':
        return {
          icon: <Calendar className="w-4 h-4" />,
          title: 'Romantic Allure',
          tips: [
            'Soft, romantic colors like pinks and roses',
            'Subtle shimmer on eyes for sparkle',
            'Perfect winged eyeliner for definition',
            'Long-lasting lip color that won\'t transfer'
          ]
        };
      case 'party':
        return {
          icon: <Calendar className="w-4 h-4" />,
          title: 'Party Perfect',
          tips: [
            'Bold, vibrant colors that photograph well',
            'Glitter or metallic accents for fun',
            'Dramatic lashes for eye-catching appeal',
            'Statement lip or eye - not both'
          ]
        };
      case 'special':
        return {
          icon: <Calendar className="w-4 h-4" />,
          title: 'Special Occasion Glam',
          tips: [
            'Full coverage foundation for flawless photos',
            'Airbrush or HD makeup techniques',
            'False lashes for extra drama',
            'Professional-grade, long-wearing products'
          ]
        };
      default:
        return {
          icon: <Calendar className="w-4 h-4" />,
          title: 'Universal Tips',
          tips: ['Adaptable looks for any occasion']
        };
    }
  };

  const getSeasonalTips = () => {
    const seasonalAdvice = {
      spring: {
        colors: ['Fresh pastels', 'Coral and peach tones', 'Light pinks'],
        tips: ['Light, breathable formulas', 'Dewy finish for fresh skin', 'Floral-inspired looks']
      },
      summer: {
        colors: ['Bright, vibrant hues', 'Tropical oranges and blues', 'Sun-kissed golds'],
        tips: ['Waterproof everything', 'SPF protection essential', 'Bronzed, glowing skin']
      },
      fall: {
        colors: ['Rich berries and plums', 'Warm oranges and reds', 'Deep earth tones'],
        tips: ['Matte finishes for cooler weather', 'Vampy lip colors', 'Cozy, warm-toned looks']
      },
      winter: {
        colors: ['Cool-toned reds', 'Icy blues and silvers', 'Classic black and white'],
        tips: ['Hydrating formulas for dry skin', 'Bold, dramatic looks', 'Long-wearing for holidays']
      }
    };

    return seasonalAdvice[season];
  };

  const timeBasedTips = getTimeBasedTips();
  const occasionTips = getOccasionTips();
  const seasonalTips = getSeasonalTips();

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Smart Recommendations for You
      </h3>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/70 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2 text-blue-600">
            {timeBasedTips.icon}
            <h4 className="font-medium">{timeBasedTips.title}</h4>
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            {timeBasedTips.tips.map((tip, index) => (
              <li key={index}>• {tip}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white/70 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2 text-purple-600">
            {occasionTips.icon}
            <h4 className="font-medium">{occasionTips.title}</h4>
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            {occasionTips.tips.map((tip, index) => (
              <li key={index}>• {tip}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white/70 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2 text-pink-600">
            <Calendar className="w-4 h-4" />
            <h4 className="font-medium">Seasonal {season.charAt(0).toUpperCase() + season.slice(1)}</h4>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-xs font-medium text-gray-700 mb-1">Trending Colors:</p>
              <div className="flex flex-wrap gap-1">
                {seasonalTips.colors.map((color, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {color}
                  </Badge>
                ))}
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              {seasonalTips.tips.map((tip, index) => (
                <li key={index}>• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContextAwareRecommendations;
