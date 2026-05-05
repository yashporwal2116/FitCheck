import React from 'react';
import { CartItem } from '../types';
import { Trash2, ShoppingBag } from 'lucide-react';

interface CartViewProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
}

export const CartView: React.FC<CartViewProps> = ({ items, onRemove, onUpdateQuantity, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-700 mb-6" />
        <h2 className="text-3xl font-serif mb-4">Your cart is empty</h2>
        <p className="text-gray-400">Looks like you haven't added any items to your cart yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <h2 className="text-3xl font-serif mb-8">Shopping Cart</h2>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 p-4 bg-[#111] rounded-xl border border-gray-800">
              <img 
                src={item.product.image} 
                alt={item.product.name} 
                className="w-24 h-32 object-cover rounded-lg"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-lg">{item.product.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">Size: {item.size}</p>
                  </div>
                  <p className="font-semibold">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 bg-black rounded-lg p-1 border border-gray-800">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded-md transition-colors"
                    >-</button>
                    <span className="w-4 text-center text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded-md transition-colors"
                    >+</button>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-96">
          <div className="bg-[#111] rounded-xl p-6 border border-gray-800 sticky top-28">
            <h3 className="text-xl font-medium mb-6">Order Summary</h3>
            <div className="space-y-4 text-sm text-gray-300 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-gray-800 pt-4 flex justify-between text-white font-semibold text-lg">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-white text-black py-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
