import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/bookingStore';
import { CATALOG_PRODUCTS } from '../utils/mockData';
import FurnitureCard from '../components/shared/FurnitureCard';
import Select from '../components/ui/select';
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from '../components/ui/dialog';
import Button from '../components/ui/button';
import { ShoppingBag, Search, SlidersHorizontal, ArrowLeftRight, Heart, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CatalogPage = () => {
  const navigate = useNavigate();
  const { addBooking } = useBookingStore();

  // Search, filter, and sort state variables
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // rating | price-asc | price-desc

  // Wishlist and Compare items states
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);

  // Detail Modal popup state
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', 'Sofa', 'Tables', 'Chairs', 'Lighting', 'Decor', 'Cabinets'];
  const styles = ['All', 'modern', 'minimalist', 'scandinavian', 'luxury', 'industrial', 'contemporary', 'bohemian', 'traditional'];

  // Handler functions
  const handleAddToWishlist = (prod) => {
    if (wishlist.includes(prod.id)) {
      setWishlist(wishlist.filter(id => id !== prod.id));
    } else {
      setWishlist([...wishlist, prod.id]);
    }
  };

  const handleCompare = (prod) => {
    if (compareList.find(p => p.id === prod.id)) {
      setCompareList(compareList.filter(p => p.id !== prod.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare a maximum of 3 items at a time.');
        return;
      }
      setCompareList([...compareList, prod]);
    }
  };

  const handleBookNow = (prod) => {
    addBooking(prod);
    alert(`${prod.name} has been successfully booked! Checking order tracking timeline.`);
    navigate('/booking');
  };

  // Filter & Sort Logic
  const filteredProducts = CATALOG_PRODUCTS.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
    const matchesStyle = selectedStyle === 'All' || prod.style === selectedStyle;
    return matchesSearch && matchesCategory && matchesStyle;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <ShoppingBag size={18} className="text-primary" />
            <span>Furniture & Decor Catalog</span>
          </h2>
          <p className="text-xs text-muted">Browse and book AI-recommended pieces configured for room space clearances</p>
        </div>
      </div>

      {/* Catalog Search & Filters HUD */}
      <div className="glass-panel p-5 rounded-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search bar */}
          <div className="relative md:col-span-2">
            <input
              type="text"
              placeholder="Search chairs, tables, light fixtures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-input pl-10 text-xs py-2.5"
            />
            <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          </div>

          {/* Style selector */}
          <Select
            options={styles.map(s => ({ value: s, label: s === 'All' ? 'All Styles' : s.toUpperCase() }))}
            value={selectedStyle}
            onChange={setSelectedStyle}
            placeholder=""
          />

          {/* Sort selector */}
          <Select
            options={[
              { value: 'rating', label: 'Highest Rated' },
              { value: 'price-asc', label: 'Price: Low to High' },
              { value: 'price-desc', label: 'Price: High to Low' }
            ]}
            value={sortBy}
            onChange={setSortBy}
            placeholder=""
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 border-t border-border pt-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold select-none transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-glow'
                  : 'bg-surface/40 text-muted hover:text-primary border border-border hover:border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => (
          <FurnitureCard
            key={prod.id}
            product={prod}
            onBookNow={handleBookNow}
            onAddToWishlist={handleAddToWishlist}
            onCompare={handleCompare}
            isWishlisted={wishlist.includes(prod.id)}
            isCompared={compareList.some(p => p.id === prod.id)}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="glass-panel p-8 rounded-xl text-center text-muted text-xs">
          No catalog products matching selected criteria. Reset filters to review items.
        </div>
      )}

      {/* Compare Spec Drawer Overlay */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border p-5 shadow-premium max-w-4xl mx-auto rounded-t-xl"
          >
            <div className="flex justify-between items-center pb-3 border-b border-border mb-4">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <ArrowLeftRight size={14} className="text-primary" />
                <span>Comparing Products ({compareList.length} of 3)</span>
              </span>
              <button
                onClick={() => setCompareList([])}
                className="p-1 text-muted hover:text-primary rounded-lg hover:bg-white/5"
              >
                <X size={15} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {compareList.map((prod) => (
                <div key={prod.id} className="glass-panel p-3 rounded-lg flex flex-col justify-between relative">
                  <button
                    onClick={() => handleCompare(prod)}
                    className="absolute right-2 top-2 p-1 text-muted hover:text-primary rounded-full bg-surface border border-border"
                  >
                    <X size={10} />
                  </button>
                  
                  <div className="space-y-1">
                    <span className="text-[9px] text-primary font-bold uppercase">{prod.category}</span>
                    <h5 className="text-xs font-bold text-white truncate pr-4">{prod.name}</h5>
                    <div className="text-[10px] text-muted space-y-0.5 mt-2">
                      <p>Price: <strong className="text-white">${prod.price}</strong></p>
                      <p className="truncate">Style: {prod.style.toUpperCase()}</p>
                      <p className="truncate">Dims: {prod.dimensions}</p>
                      <p className="truncate text-muted">Materials: {prod.materials}</p>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full mt-3 text-[10px] py-1.5"
                    onClick={() => handleBookNow(prod)}
                  >
                    Book Item
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default CatalogPage;
