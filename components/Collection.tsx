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

  const hasActiveFilters = selectedCategories.length > 0 || maxPrice < 1500 || sortBy !== 'featured';

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
      <section className="py-32 text-center">
        <div className="animate-pulse font-serif text-xl text-zinc-400">Loading Collection...</div>
      </section>
    );
  }

  // Sidebar Filter Component (matching screenshot design)
  const FilterSidebar = () => (
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
      <div className="border-b border-zinc-100 pb-6 mb-6">
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

      {/* 3. Sort By Section */}
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
              { id: 'featured', label: 'Featured' },
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
                    name="sortOrder"
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
    </div>
  );

  return (
    <section id="collection" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-serif mb-4 text-zinc-900">Latest Collection</h2>
        <div className="w-16 h-[1px] bg-zinc-300 mx-auto"></div>
      </motion.div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-8 flex items-center justify-between">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 border border-zinc-300 text-sm tracking-wider uppercase text-zinc-900 hover:border-black transition-colors"
        >
          <Filter size={16} />
          <span>Filters {hasActiveFilters && `(${selectedCategories.length + (maxPrice < 1500 ? 1 : 0) + (sortBy !== 'featured' ? 1 : 0)})`}</span>
        </button>

        <span className="text-xs text-zinc-500 uppercase tracking-widest">
          {filteredProducts.length} Products
        </span>
      </div>

      {/* Main Two-Column Layout (Left: Filters, Right: Product Grid) */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        
        {/* Desktop Left-Side Filter Sidebar */}
        <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 sticky top-28">
          <FilterSidebar />
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
            <div className="py-24 text-center border border-dashed border-zinc-200">
              <p className="font-serif text-xl text-zinc-700 mb-2">No products match your filters</p>
              <p className="text-sm text-zinc-400 mb-6 font-light">Try adjusting the price range or category selections.</p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            /* Product Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                  className="group cursor-pointer"
                  onClick={() => navigateToProduct(product.id)}
                >
                  {/* Image Card with Original View Button */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-5">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-white tracking-widest uppercase text-sm border border-white px-6 py-3 font-medium">
                        View
                      </span>
                    </div>
                  </div>

                  {/* Card Title & Price */}
                  <div className="flex justify-between items-start px-1 gap-3">
                    <h3 className="font-serif text-base md:text-lg text-zinc-900 group-hover:text-black transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-zinc-600 text-sm font-medium whitespace-nowrap">
                      {product.price.includes('৳') ? product.price : `৳${product.price}`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer */}
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
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 p-6 overflow-y-auto shadow-2xl lg:hidden"
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-200">
                <span className="font-serif text-xl text-zinc-900">Filters</span>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-zinc-500 hover:text-black"
                >
                  <X size={20} />
                </button>
              </div>

              <FilterSidebar />

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
