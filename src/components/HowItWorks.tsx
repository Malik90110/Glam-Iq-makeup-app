
import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <div className="mt-8 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-pink-200">
          <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-pink-600 font-bold">1</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Capture</h3>
          <p className="text-gray-600 text-sm">Take a selfie or upload your photo</p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-purple-200">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-purple-600 font-bold">2</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Analyze</h3>
          <p className="text-gray-600 text-sm">AI analyzes your skin tone and features</p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-blue-200">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-blue-600 font-bold">3</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Recommend</h3>
          <p className="text-gray-600 text-sm">Get personalized product suggestions</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
