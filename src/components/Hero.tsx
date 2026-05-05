import React from 'react';

interface HeroProps {
  onShopClick: () => void;
  onTryOnClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onTryOnClick }) => {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-8">
        <p className="text-gray-400 text-sm font-semibold tracking-[0.2em] uppercase">
          AI Styling Studio
        </p>
        <h1 className="font-serif text-6xl md:text-8xl leading-[1.1] font-bold">
          Wear<br />What Fits<br />You
        </h1>
        <p className="text-gray-400 max-w-md text-lg leading-relaxed">
          Shop fashion pieces, upload your image, and preview clothes in the virtual try-on studio before adding them to your bag.
        </p>
        <div className="flex items-center gap-4 pt-4">
          <button 
            onClick={onTryOnClick}
            className="bg-[#2a2a2a] hover:bg-[#333] text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            Try on now
          </button>
          <button 
            onClick={onShopClick}
            className="bg-transparent border border-gray-700 hover:border-gray-500 text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            Shop products
          </button>
        </div>
      </div>
      <div className="flex-1 w-full">
        <img 
          src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200" 
          alt="Model wearing leather jacket" 
          className="w-full h-[600px] object-cover rounded-2xl"
        />
      </div>
    </section>
  );
};
