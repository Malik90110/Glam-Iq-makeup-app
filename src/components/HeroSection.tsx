
import React from 'react';
import { Crown } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="text-center mb-12 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-3xl blur-xl"></div>
      <div className="relative z-10 bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-2xl">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Crown className="w-12 h-12 text-rose-500" />
          <h2 className="text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Glam IQ
          </h2>
          <Crown className="w-12 h-12 text-purple-500" />
        </div>
        <p className="text-xl text-gray-700 mb-8 font-medium">
          Your AI-powered beauty companion for flawless, personalized makeup looks
        </p>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <img 
              src="/images/lipstick-makeup.jpg" 
              alt="Colorful lipsticks and makeup products" 
              className="rounded-2xl shadow-2xl object-cover w-full h-64 border-4 border-white/50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
          <div className="relative">
            <img 
              src="/images/makeup-tools.jpg" 
              alt="Professional makeup brushes and cosmetic tools" 
              className="rounded-2xl shadow-2xl object-cover w-full h-64 border-4 border-white/50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
