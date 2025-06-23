
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ArrowRight, ArrowLeft, Camera, Sparkles, Heart, Share2 } from 'lucide-react';

interface OnboardingTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to AI Makeup Advisor",
      description: "Get personalized makeup recommendations powered by AI",
      icon: <Sparkles className="w-12 h-12 text-pink-500" />,
      content: "Discover your perfect makeup look with our AI-powered beauty analysis. We'll analyze your photo and recommend products that complement your unique features."
    },
    {
      title: "Take or Upload Your Photo",
      description: "For best results, follow our photo guidelines",
      icon: <Camera className="w-12 h-12 text-purple-500" />,
      content: (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Photo Tips:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Ensure good, natural lighting</li>
              <li>• Face the camera directly</li>
              <li>• Remove glasses if possible</li>
              <li>• Keep hair away from face</li>
              <li>• Natural expression works best</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Get AI Analysis",
      description: "Our AI analyzes your skin tone, face shape, and features",
      icon: <Sparkles className="w-12 h-12 text-blue-500" />,
      content: "Our advanced AI will identify your skin tone, undertone, face shape, and current makeup. You'll receive personalized product recommendations from top beauty brands."
    },
    {
      title: "Save & Share Your Looks",
      description: "Keep track of your favorite recommendations",
      icon: <Heart className="w-12 h-12 text-red-500" />,
      content: "Save your favorite looks and share them with friends. Build your personal makeup collection and discover new products that work perfectly for you."
    },
    {
      title: "Ready to Start!",
      description: "Let's find your perfect makeup look",
      icon: <Share2 className="w-12 h-12 text-green-500" />,
      content: "You're all set! Start by taking a photo or uploading one from your gallery. Our AI will provide instant, personalized makeup recommendations just for you."
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white border-pink-200 relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="p-6 text-center">
          <div className="mb-4">
            {currentStepData.icon}
          </div>
          
          <Badge variant="outline" className="mb-3">
            Step {currentStep + 1} of {steps.length}
          </Badge>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {currentStepData.title}
          </h3>
          
          <p className="text-pink-600 text-sm mb-4">
            {currentStepData.description}
          </p>
          
          <div className="text-gray-700 text-sm mb-6">
            {typeof currentStepData.content === 'string' ? (
              <p>{currentStepData.content}</p>
            ) : (
              currentStepData.content
            )}
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-pink-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-pink-500 to-purple-500 flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingTutorial;
