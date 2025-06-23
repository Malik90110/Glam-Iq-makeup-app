
import React from 'react';

const BackgroundElements: React.FC = () => {
  return (
    <>
      {/* Glamorous background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-pink-100/40 to-purple-100/40"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
      
      {/* Floating glamour elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-40 left-32 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-40"></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full animate-pulse opacity-50"></div>
    </>
  );
};

export default BackgroundElements;
