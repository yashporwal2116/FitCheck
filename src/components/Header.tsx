import React from 'react';
import { Search } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  cartCount: number;
  activeTab: string;
  searchQuery: string;
  onTabChange: (tab: string) => void;
  onSearchChange: (query: string) => void;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  cartCount,
  activeTab,
  searchQuery,
  onTabChange,
  onSearchChange,
  onLoginClick,
  onLogoutClick
}) => {
  const navItems = ['Home', 'Men', 'Women', 'Try On'];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0a0a] border-b border-gray-800">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onTabChange('Home')}
          >
            <div className="bg-white text-black font-bold text-xl w-10 h-10 flex items-center justify-center rounded-md">
              FC
            </div>
            <span className="font-semibold text-lg tracking-wide hidden sm:block">Fit Check</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => onTabChange(item)}
                className={`text-sm font-medium transition-colors ${
                  activeTab === item ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => onTabChange('Cart')}
              className={`text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'Cart' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Cart
              <span className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </button>
          </nav>

          {/* Search & Auth */}
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-[#141414] border border-gray-800 text-sm rounded-md pl-10 pr-4 py-2 focus:outline-none focus:border-gray-600 text-white w-64 transition-colors"
              />
            </div>

            <div className="flex items-center gap-4 border-l border-gray-800 pl-6">
              {user ? (
                <>
                  <span className="text-sm font-medium">{user.name}</span>
                  <button 
                    onClick={onLogoutClick}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={onLoginClick}
                  className="text-sm font-medium hover:text-gray-300 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
