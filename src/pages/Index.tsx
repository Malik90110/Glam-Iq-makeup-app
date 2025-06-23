import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import OnboardingTutorial from '@/components/OnboardingTutorial';
import AppHeader from '@/components/AppHeader';
import BrandSelector from '@/components/BrandSelector';
import HeroSection from '@/components/HeroSection';
import BackgroundElements from '@/components/BackgroundElements';
import LoadingScreen from '@/components/LoadingScreen';
import CustomTabsList from '@/components/CustomTabsList';
import AnalyzeTabContent from '@/components/AnalyzeTabContent';
import SavedTabContent from '@/components/SavedTabContent';
import { Product, SavedLook } from '@/types';

const Index = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [savedLooks, setSavedLooks] = useState<SavedLook[]>([]);
  const [activeTab, setActiveTab] = useState('analyze');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<any[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  // Show onboarding for new users
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  const handlePhotoCapture = (imageData: string) => {
    setCapturedImage(imageData);
  };

  const handleSaveLook = (products: Product[]) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const newLook: SavedLook = {
      id: Date.now().toString(),
      name: `Look ${savedLooks.length + 1}`,
      date: new Date().toLocaleDateString(),
      products
    };
    setSavedLooks(prev => [...prev, newLook]);
  };

  const handleDeleteLook = (lookId: string) => {
    setSavedLooks(prev => prev.filter(look => look.id !== lookId));
  };

  const resetAnalysis = () => {
    setCapturedImage(null);
  };

  const handleSignOut = async () => {
    await signOut();
    setSavedLooks([]);
    setCapturedImage(null);
    setActiveTab('analyze');
  };

  const handleBrandSelect = (brand: any) => {
    console.log('Selected brand:', brand);
  };

  const handleTierChange = (tiers: string[]) => {
    setSelectedTiers(tiers);
  };

  const handleVirtualTryOn = (products: Product[]) => {
    setSelectedProducts(products);
    setShowVirtualTryOn(true);
  };

  const getCurrentTimeContext = (): 'morning' | 'afternoon' | 'evening' => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  const getCurrentSeason = (): 'spring' | 'summer' | 'fall' | 'winter' => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-25 to-purple-50 relative overflow-hidden">
      <BackgroundElements />
      
      <OnboardingTutorial isOpen={showOnboarding} onClose={handleOnboardingClose} />
      
      <AppHeader 
        user={user}
        onShowOnboarding={() => setShowOnboarding(true)}
        onSignOut={handleSignOut}
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <HeroSection />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CustomTabsList savedLooksCount={savedLooks.length} />

          <TabsContent value="analyze" className="space-y-6">
            <AnalyzeTabContent
              capturedImage={capturedImage}
              selectedProducts={selectedProducts}
              showVirtualTryOn={showVirtualTryOn}
              onPhotoCapture={handlePhotoCapture}
              onSaveLook={handleSaveLook}
              onVirtualTryOn={handleVirtualTryOn}
              onResetAnalysis={resetAnalysis}
              onCloseVirtualTryOn={() => setShowVirtualTryOn(false)}
              getCurrentTimeContext={getCurrentTimeContext}
              getCurrentSeason={getCurrentSeason}
            />
          </TabsContent>

          <TabsContent value="brands">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
                <BrandSelector
                  selectedTiers={selectedTiers}
                  onTierChange={handleTierChange}
                  onBrandSelect={handleBrandSelect}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <div className="max-w-4xl mx-auto">
              <SavedTabContent
                user={user}
                savedLooks={savedLooks}
                onDeleteLook={handleDeleteLook}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
