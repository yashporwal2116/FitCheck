import React, { useState } from 'react';
import { Product } from '../types';
import { Sparkles, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onTryOn: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onTryOn, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);

  return (
    <div className="group flex flex-col gap-4">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#111] rounded-lg">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => onTryOn(product)}
            className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Sparkles className="w-4 h-4" />
            Virtual Try-On
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">{product.gender} • {product.category}</span>
            <h3 className="font-medium text-lg mt-1">{product.name}</h3>
          </div>
          <p className="font-semibold text-lg">₹{product.price.toLocaleString('en-IN')}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 text-xs flex items-center justify-center rounded-full border transition-colors ${
                  selectedSize === size 
                    ? 'border-white bg-white text-black' 
                    : 'border-gray-700 text-gray-400 hover:border-gray-500'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <button 
            onClick={() => onAddToCart(product, selectedSize)}
            className="p-2 bg-[#222] hover:bg-[#333] rounded-full transition-colors"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
