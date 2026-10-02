import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown, Filter, X, RotateCcw } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Product } from '../types';

const FILTER_CATEGORIES = CATEGORIES.filter(c => c !== 'All');

const Collection = () => {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [sortBy, setSortBy] = useState<'featured' | 'low-to-high' | 'high-to-low'>('featured');

  // Accordion Sections (inspired by screenshot)
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    category: true,
    price: true,
    sort: true,
  });

  // Mobile Filter Drawer Toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    fetch('/api/collections')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            price: item.price.includes('৳') ? item.price : `৳${item.price}`,
            category: item.category || 'Bangles & Jewelry',
            image: item.image,
            images: item.images ? (typeof item.images === 'string' ? JSON.parse(item.images) : item.images) : [item.image],
            description: item.description || ''
          }));
          setDbProducts(formatted);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch collections", err);
        setLoading(false);
      });
  }, []);

  const allProducts: Product[] = useMemo(() => {
    if (dbProducts.length > 0) return dbProducts;
    return PRODUCTS;
  }, [dbProducts]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(1500);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategories.length > 0 || maxPrice < 1500;

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(item => {
        // Category Filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(item.category || '')) {
          return false;
        }

        // Price Filter
        const numPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
        if (numPrice > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = parseFloat(String(a.price).replace(/[^0-9.]/g, '')) || 0;
        const priceB = parseFloat(String(b.price).replace(/[^0-9.]/g, '')) || 0;

        if (sortBy === 'low-to-high') return priceA - priceB;
        if (sortBy === 'high-to-low') return priceB - priceA;
        return 0; // featured default
      });
  }, [allProducts, selectedCategories, maxPrice, sortBy]);

  const navigateToProduct = (id: string | number) => {
    window.history.pushState({}, '', `/product/${id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (loading) {
    return (
      <section className="py-24 sm:py-32 text-center">
        <div className="animate-pulse font-serif text-xl text-zinc-400">Loading Collection...</div>
      </section>
    );
  }

  // Sidebar Filter Component
  const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="w-full">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6">
        <h3 className="font-serif text-2xl text-zinc-900 tracking-wide">Filters</h3>
        {hasActiveFilters && (
          <button 
            onClick={clearAllFilters}
            className="text-xs uppercase tracking-wider text-zinc-500 hover:text-black flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Category Section */}
      <div className="border-b border-zinc-100 pb-6 mb-6">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between text-left group"
        >
          <span className="text-xs font-semibold tracking-widest text-zinc-900 uppercase">
            Category
          </span>
          <span className="text-zinc-500 group-hover:text-black transition-colors">
            {openSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>

        {openSections.category && (
          <div className="mt-4 space-y-3">
            {FILTER_CATEGORIES.map(cat => {
              const isChecked = selectedCategories.includes(cat);
              return (
                <label 
                  key={cat} 
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryToggle(cat)}
                    className="w-4 h-4 rounded-none border-zinc-300 text-black focus:ring-0 cursor-pointer accent-black"
                  />
                  <span className={`text-sm tracking-wide transition-colors ${isChecked ? 'text-black font-medium' : 'text-zinc-600 group-hover:text-black'}`}>
                    {cat}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Price Range Bar Section */}
      <div className={`${isMobile ? '' : 'border-b border-zinc-100'} pb-6 mb-6`}>
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-left group"
        >
          <span className="text-xs font-semibold tracking-widest text-zinc-900 uppercase">
            Price Range
          </span>
          <span className="text-zinc-500 group-hover:text-black transition-colors">
            {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>

        {openSections.price && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-600 font-medium">
              <span>৳50</span>
              <span className="text-black font-semibold bg-zinc-100 px-2 py-1">Up to ৳{maxPrice}</span>
              <span>৳1500</span>
            </div>
            <input
              type="range"
              min={50}
              max={1500}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
            <div className="flex flex-wrap gap-2 pt-1">
              {[150, 300, 600, 1000, 1500].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setMaxPrice(preset)}
                  className={`text-[11px] px-2.5 py-1 border transition-colors ${
                    maxPrice === preset ? 'border-black bg-black text-white' : 'border-zinc-200 text-zinc-600 hover:border-black'
                  }`}
                >
                  Under ৳{preset}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Sort By Section (Visible on Desktop Sidebar) */}
      {!isMobile && (
        <div className="border-b border-zinc-100 pb-6 mb-6">
          <button
            onClick={() => toggleSection('sort')}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="text-xs font-semibold tracking-widest text-zinc-900 uppercase">
              Sort By
            </span>
            <span className="text-zinc-500 group-hover:text-black transition-colors">
              {openSections.sort ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>

          {openSections.sort && (
            <div className="mt-4 space-y-3">
              {[
                { id: 'featured', label: 'Featured / Newest' },
                { id: 'low-to-high', label: 'Price: Low to High' },
                { id: 'high-to-low', label: 'Price: High to Low' },
              ].map(opt => {
                const isSelected = sortBy === opt.id;
                return (
                  <label 
                    key={opt.id} 
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="desktopSortOrder"
                      checked={isSelected}
                      onChange={() => setSortBy(opt.id as any)}
                      className="w-4 h-4 border-zinc-300 text-black focus:ring-0 cursor-pointer accent-black"
                    />
                    <span className={`text-sm tracking-wide transition-colors ${isSelected ? 'text-black font-medium' : 'text-zinc-600 group-hover:text-black'}`}>
                      {opt.label}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <section id="collection" className="py-12 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 sm:mb-16"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-3 text-zinc-900">Latest Collection</h2>
        <div className="w-16 h-[1px] bg-zinc-300 mx-auto"></div>
      </motion.div>

      {/* Mobile Filter & Sort Controls (Matching Screenshot 2026-10-03 003829.png) */}
      <div className="lg:hidden mb-6 space-y-3">
        {/* Row 1: Filters button + Product Count */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-200 text-sm text-zinc-900 bg-white hover:border-black transition-colors"
          >
            <Filter size={15} className="text-zinc-800" />
            <span>Filters {hasActiveFilters ? `(${selectedCategories.length + (maxPrice < 1500 ? 1 : 0)})` : ''}</span>
          </button>

          <span className="text-sm text-zinc-600 font-normal">
            {filteredProducts.length} Products
          </span>
        </div>

        {/* Row 2: Sort By Dropdown (Directly under Filters button) */}
        <div className="relative inline-block">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="appearance-none bg-white border border-zinc-200 px-4 py-2 pr-9 text-sm text-zinc-800 rounded-none focus:outline-none focus:border-black cursor-pointer font-normal"
          >
            <option value="featured">Sort by: Newest</option>
            <option value="low-to-high">Sort by: Price: Low to High</option>
            <option value="high-to-low">Sort by: Price: High to Low</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-700" />
        </div>
      </div>

      {/* Main Two-Column Layout (Left: Filters on Desktop, Right: Product Grid) */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        
        {/* Desktop Left-Side Filter Sidebar */}
        <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 sticky top-28">
          <FilterSidebar isMobile={false} />
        </aside>

        {/* Right Side: Products Grid */}
        <main className="flex-1 w-full">
          {/* Top Bar for Desktop */}
          <div className="hidden lg:flex items-center justify-between mb-8 pb-4 border-b border-zinc-100">
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-light">
              Showing {filteredProducts.length} of {allProducts.length} products
            </span>
            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">Active filters:</span>
                {selectedCategories.map(c => (
                  <span key={c} className="text-xs bg-zinc-100 text-zinc-800 px-2.5 py-1 flex items-center gap-1.5">
                    {c}
                    <button onClick={() => handleCategoryToggle(c)} className="hover:text-black">
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {maxPrice < 1500 && (
                  <span className="text-xs bg-zinc-100 text-zinc-800 px-2.5 py-1 flex items-center gap-1.5">
                    ≤ ৳{maxPrice}
                    <button onClick={() => setMaxPrice(1500)} className="hover:text-black">
                      <X size={12} />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-zinc-500 hover:text-black underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-zinc-200">
              <p className="font-serif text-lg text-zinc-700 mb-2">No products match your filters</p>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 font-light">Try adjusting the price range or category selections.</p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            /* Product Grid: Exactly 2 products per row on phone (grid-cols-2), 3 on desktop */
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
                  className="group cursor-pointer flex flex-col"
                  onClick={() => navigateToProduct(product.id)}
                >
                  {/* Image Card with Original View Button */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-2.5 sm:mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 text-white tracking-widest uppercase text-xs sm:text-sm border border-white px-3 sm:px-6 py-1.5 sm:py-3 font-medium">
                        View
                      </span>
                    </div>
                  </div>

                  {/* Card Title & Price (Optimized for Mobile) */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start px-0.5 sm:px-1 gap-1 sm:gap-3">
                    <h3 className="font-serif text-xs sm:text-base md:text-lg text-zinc-900 group-hover:text-black transition-colors leading-tight line-clamp-2 sm:line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-zinc-600 text-xs sm:text-sm font-medium whitespace-nowrap">
                      {product.price.includes('৳') ? product.price : `৳${product.price}`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer (Categories and Price Range) */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 p-6 overflow-y-auto shadow-2xl lg:hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-200">
                  <span className="font-serif text-xl text-zinc-900">Filters</span>
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 text-zinc-500 hover:text-black"
                  >
                    <X size={20} />
                  </button>
                </div>

                <FilterSidebar isMobile={true} />
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-200">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-black text-white py-3.5 text-xs uppercase tracking-widest font-medium hover:bg-zinc-800 transition-colors"
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Collection;
