
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Calendar, TrendingUp, Users, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import GlowUpChallenge from './GlowUpChallenge';
import SkincareRecommendations from './SkincareRecommendations';
import BeautyReport from './BeautyReport';
import CommunityFeedback from './CommunityFeedback';

interface PremiumFeaturesProps {
  userAnalysis?: any;
  savedLooks?: any[];
}

const PremiumFeatures: React.FC<PremiumFeaturesProps> = ({ userAnalysis, savedLooks = [] }) => {
  const { user } = useAuth();
  const [activeFeature, setActiveFeature] = useState('challenge');
  const [isPremium, setIsPremium] = useState(false); // This would come from user subscription status

  const premiumFeatures = [
    {
      id: 'challenge',
      title: '7-Day Glow-Up Challenge',
      description: 'Daily beauty tasks to enhance your routine',
      icon: Calendar,
      component: GlowUpChallenge
    },
    {
      id: 'skincare',
      title: 'AI Skincare Suggestions',
      description: 'Personalized skincare based on your analysis',
      icon: Sparkles,
      component: SkincareRecommendations
    },
    {
      id: 'report',
      title: 'Monthly Beauty Report',
      description: 'Track your progress and get improvement tips',
      icon: TrendingUp,
      component: BeautyReport
    },
    {
      id: 'community',
      title: 'Community Feedback',
      description: 'Share looks and get tips from others',
      icon: Users,
      component: CommunityFeedback
    }
  ];

  const handleUpgrade = () => {
    // This would integrate with your payment system
    console.log('Upgrade to premium clicked');
  };

  if (!user) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50">
        <Crown className="w-12 h-12 text-purple-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Features</h3>
        <p className="text-gray-600 mb-4">Sign in to access exclusive beauty tools and challenges</p>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
          Sign In to Continue
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Crown className="w-8 h-8 text-purple-500" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Premium Features</h2>
            <p className="text-gray-600">Unlock your beauty potential</p>
          </div>
        </div>
        {!isPremium && (
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-purple-300 text-purple-600">
              Free Trial: 7 days left
            </Badge>
            <Button 
              onClick={handleUpgrade}
              className="bg-gradient-to-r from-purple-500 to-pink-500"
            >
              Upgrade Now
            </Button>
          </div>
        )}
      </div>

      <Tabs value={activeFeature} onValueChange={setActiveFeature} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
          {premiumFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium">{feature.title.split(' ')[0]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {premiumFeatures.map((feature) => {
          const Component = feature.component;
          return (
            <TabsContent key={feature.id} value={feature.id} className="mt-6">
              <Component 
                userAnalysis={userAnalysis}
                savedLooks={savedLooks}
                isPremium={isPremium}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default PremiumFeatures;
