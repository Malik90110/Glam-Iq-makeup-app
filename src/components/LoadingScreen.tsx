
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-200/20 via-pink-200/20 to-purple-200/20"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-pink-300/30 to-rose-300/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-xl"></div>
      <div className="text-center relative z-10">
        <div className="animate-spin mx-auto w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full mb-6 shadow-lg"></div>
        <p className="text-gray-700 text-lg font-medium">Loading your glamorous experience...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
