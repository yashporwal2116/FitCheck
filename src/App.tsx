import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { TryOnModal } from './components/TryOnModal';
import { CartView } from './components/CartView';
import { AuthModal } from './components/AuthModal';
import { products } from './data/products';
import { Product, CartItem, User } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Filter products based on tab and search
  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    if (activeTab === 'Men') {
      filtered = filtered.filter(p => p.gender === 'Men');
    } else if (activeTab === 'Women') {
      filtered = filtered.filter(p => p.gender === 'Women');
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeTab, searchQuery]);

  const handleAddToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.id === existing.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { id: `${product.id}-${size}-${Date.now()}`, product, size, quantity: 1 }];
    });
    // Optional: Show a toast notification here
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    alert('Order placed successfully! (Mock Checkout)');
    setCart([]);
    setActiveTab('Home');
  };

  const renderContent = () => {
    if (activeTab === 'Cart') {
      return (
        <CartView 
          items={cart} 
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateCartQuantity}
          onCheckout={handleCheckout}
        />
      );
    }

    return (
      <>
        {activeTab === 'Home' && !searchQuery && (
          <Hero 
            onShopClick={() => {
              document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onTryOnClick={() => {
              setActiveTab('Try On');
            }}
          />
        )}

        <section id="products-grid" className="px-6 max-w-[1400px] mx-auto py-16">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-serif">
              {searchQuery ? `Search Results for "${searchQuery}"` : 
               activeTab === 'Home' ? 'Latest Arrivals' : 
               activeTab === 'Try On' ? 'Select an item to try on' :
               `${activeTab}'s Collection`}
            </h3>
            <span className="text-sm text-gray-500">{filteredProducts.length} Items</span>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onTryOn={(p) => setSelectedProduct(p)}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              No products found matching your criteria.
            </div>
          )}
        </section>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <Header 
        user={user}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        activeTab={activeTab}
        searchQuery={searchQuery}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSearchQuery('');
        }}
        onSearchChange={setSearchQuery}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogoutClick={() => setUser(null)}
      />
      
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 mt-auto">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-white text-black font-bold text-lg w-8 h-8 flex items-center justify-center rounded">
              FC
            </div>
            <span className="font-semibold tracking-wide">Fit Check</span>
          </div>
          <p className="text-gray-500 text-sm">© 2025 Fit Check Studio. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals */}
      <TryOnModal 
        product={selectedProduct!} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={setUser}
      />
    </div>
  );
}

export default App;
