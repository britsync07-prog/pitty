import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, MessageCircle, X, Sparkles, ShoppingBag, Check, ExternalLink, ChevronRight, Ruler, Truck } from 'lucide-react';
import FastCheckoutModal from './FastCheckoutModal';
import SizeGuideModal from './SizeGuideModal';
import { PRODUCTS, CATEGORIES, STORE_INFO } from '../constants';
import { Product } from '../types';

const Collection = () => {
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [budgetFilter, setBudgetFilter] = useState<'all' | 'under100' | 'under299' | 'combos'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    fetch('/api/collections')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Map DB items to conform with Product type
          const formatted = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            banglaName: item.banglaName || '',
            price: item.price.includes('৳') ? item.price : `৳${item.price}`,
            numericPrice: parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0,
            category: item.category || 'Bangles & Jewelry',
            image: item.image,
            images: item.images ? (typeof item.images === 'string' ? JSON.parse(item.images) : item.images) : [item.image],
            badge: item.badge || 'New',
            description: item.description || '',
            stock: item.stock || 'In Stock',
            details: item.details || [],
            variants: item.variants || []
          }));
          setDbProducts(formatted);
        }
        setLoading(false);
      })
      .catch(() => {
        // Fallback to seeded products
        setLoading(false);
      });
  }, []);

  // Merge seeded and DB products (preferring DB products if available, fallback to seeded)
  const allProducts: Product[] = useMemo(() => {
    if (dbProducts.length > 0) {
      return dbProducts;
    }
    return PRODUCTS;
  }, [dbProducts]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return allProducts.filter(item => {
      // Category Filter
      if (selectedCategory !== 'All Products' && item.category !== selectedCategory) {
        return false;
      }

      // Budget Quick Filter
      if (budgetFilter === 'under100' && item.numericPrice > 100) {
        return false;
      }
      if (budgetFilter === 'under299' && item.numericPrice > 299) {
        return false;
      }
      if (budgetFilter === 'combos' && !item.name.toLowerCase().includes('combo') && !item.badge?.toLowerCase().includes('combo') && !item.description.toLowerCase().includes('combo')) {
        return false;
      }

      // Search Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesBangla = item.banglaName?.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBangla && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.numericPrice - b.numericPrice;
      if (sortBy === 'price-desc') return b.numericPrice - a.numericPrice;
      return 0; // featured default
    });
  }, [allProducts, selectedCategory, budgetFilter, searchQuery, sortBy]);

  const generateWhatsAppOrderLink = (product: Product) => {
    const text = `Hi Pretty Pocket! 🌸\nI would like to order:\n- Item: ${product.name}\n- Price: ${product.price}\n\nPlease let me know about delivery details.`;
    return `${STORE_INFO.whatsappLink}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="collection" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-rose-500 mb-3 block">
          Pocket-Friendly Luxury
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-zinc-900 mb-4 tracking-tight">
          Trending Pretty Collection
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base font-light">
          Explore our viral bangles, pocket-friendly cosmetics, adorable bouquets, and everyday glam essentials.
        </p>
        <div className="w-20 h-0.5 bg-gradient-to-r from-rose-300 via-amber-300 to-rose-300 mx-auto mt-6 rounded-full" />
      </motion.div>

      {/* Filter & Search Bar */}
      <div className="mb-12 space-y-6">
        {/* Top Controls: Search + Budget Tabs */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search churi, fan, bouquet, nails..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-rose-200/80 bg-rose-50/30 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-400 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Budget Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider hidden sm:inline mr-1">
              Budget:
            </span>
            <button
              onClick={() => setBudgetFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                budgetFilter === 'all'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              All Prices
            </button>
            <button
              onClick={() => setBudgetFilter('under100')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all flex items-center gap-1 ${
                budgetFilter === 'under100'
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/20'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60'
              }`}
            >
              <Sparkles size={12} />
              <span>Under ৳100</span>
            </button>
            <button
              onClick={() => setBudgetFilter('under299')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                budgetFilter === 'under299'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60'
              }`}
            >
              Under ৳299
            </button>
            <button
              onClick={() => setBudgetFilter('combos')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                budgetFilter === 'combos'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/60'
              }`}
            >
              Combos & Deals
            </button>
          </div>
        </div>

        {/* Category Filter Pills & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2 border-t border-zinc-100">
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-rose-500 to-amber-600 text-white shadow-md shadow-rose-500/20'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 transition-all flex items-center gap-1 whitespace-nowrap ml-1 shadow-sm"
              title="চুড়ির সাইজ মাপার নিয়ম দেখুন"
            >
              <Ruler size={13} className="text-rose-500" />
              <span>সাইজ গাইড</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-zinc-500 whitespace-nowrap">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent border border-zinc-200 rounded-lg px-2.5 py-1 text-zinc-800 focus:outline-none focus:border-rose-400"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Count Indicator */}
      <div className="mb-8 flex justify-between items-center text-xs text-zinc-400">
        <span>Showing <strong className="text-zinc-700">{filteredProducts.length}</strong> items</span>
        {searchQuery && (
          <span>Search results for "{searchQuery}"</span>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-rose-50/40 rounded-2xl border border-rose-100 p-8">
          <Sparkles className="mx-auto text-rose-400 mb-3" size={32} />
          <h3 className="font-serif text-xl text-zinc-800 mb-2">No matching products found</h3>
          <p className="text-zinc-500 text-sm max-w-md mx-auto mb-6">
            Try adjusting your search query or reset the category filters to see more of our cute collection.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All Products');
              setBudgetFilter('all');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 bg-zinc-900 text-white text-xs font-semibold rounded-full hover:bg-zinc-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
              className="group flex flex-col bg-white rounded-2xl border border-rose-100/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-rose-200 transition-all duration-300"
            >
              {/* Product Thumbnail */}
              <div 
                className="relative aspect-square overflow-hidden bg-rose-50/50 cursor-pointer"
                onClick={() => setActiveModalProduct(product)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Badge Overlay */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-rose-600 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm border border-rose-100">
                    {product.badge}
                  </div>
                )}

                {/* Stock Status */}
                {product.stock && (
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                    {product.stock}
                  </div>
                )}

                {/* Hover Quick Action */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                  <span className="px-4 py-2 rounded-full bg-white text-zinc-900 text-xs font-semibold tracking-wider uppercase shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    View Details
                  </span>
                </div>
              </div>

              {/* Product Info & Actions */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wider text-rose-500 mb-1">
                    {product.category}
                  </div>

                  <h3 
                    onClick={() => setActiveModalProduct(product)}
                    className="font-serif text-base font-medium text-zinc-900 group-hover:text-rose-600 transition-colors line-clamp-1 cursor-pointer mb-1"
                  >
                    {product.name}
                  </h3>

                  {product.banglaName && (
                    <p className="text-xs text-zinc-500 font-light mb-3 line-clamp-1">
                      {product.banglaName}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-1.5 mt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-light">Price</span>
                    <span className="font-serif text-base sm:text-lg font-bold text-rose-600">
                      {product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Fast 1-Step COD Checkout */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCheckoutProduct(product);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-semibold tracking-wide transition-all shadow-sm shadow-rose-600/20 hover:scale-105"
                      title="ক্যাশ অন ডেলিভারিতে অর্ডার করুন"
                    >
                      <Truck size={12} />
                      <span>অর্ডার</span>
                    </button>

                    {/* Order via WhatsApp Button */}
                    <a
                      href={generateWhatsAppOrderLink(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-center p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm hover:shadow-emerald-600/30 hover:scale-105"
                      title="WhatsApp-এ অর্ডার বা মেসেজ করুন"
                    >
                      <MessageCircle size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-rose-100 max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-zinc-600 hover:text-black shadow-md transition-colors"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-rose-50 shadow-inner">
                    <img 
                      src={activeModalProduct.image} 
                      alt={activeModalProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">
                        {activeModalProduct.category}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-zinc-900 mt-1">
                        {activeModalProduct.name}
                      </h3>
                      {activeModalProduct.banglaName && (
                        <p className="text-sm text-zinc-500 font-light mt-0.5">
                          {activeModalProduct.banglaName}
                        </p>
                      )}
                    </div>

                    <div className="text-2xl font-bold text-rose-600 font-serif">
                      {activeModalProduct.price}
                    </div>

                    {activeModalProduct.badge && (
                      <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">
                        {activeModalProduct.badge}
                      </span>
                    )}

                    <div className="pt-2 flex flex-col gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          const prod = activeModalProduct;
                          setActiveModalProduct(null);
                          setCheckoutProduct(prod);
                        }}
                        className="w-full py-3.5 px-6 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.02]"
                      >
                        <Truck size={17} />
                        <span>১-ক্লিকে ক্যাش অন ডেলিভারি অর্ডার</span>
                      </button>

                      <a
                        href={generateWhatsAppOrderLink(activeModalProduct)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                      >
                        <MessageCircle size={17} />
                        <span>হোয়াটসঅ্যাপে মেসেজ দিয়ে অর্ডার</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="pt-4 border-t border-zinc-100">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-400 mb-2">Description</h4>
                  <p className="text-zinc-600 text-sm leading-relaxed whitespace-pre-line font-light">
                    {activeModalProduct.description}
                  </p>
                </div>

                {/* Variants / Sizes if any */}
                {activeModalProduct.variants && activeModalProduct.variants.length > 0 && (
                  <div className="pt-4 border-t border-zinc-100">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-400 mb-2">Options / Sizes Available</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeModalProduct.variants.map((v, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-rose-50 text-rose-800 text-xs font-medium border border-rose-200/60">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery Note */}
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 text-xs text-amber-900 flex items-center gap-3">
                  <Sparkles size={16} className="text-amber-600 flex-shrink-0" />
                  <span>
                    <strong>Cash on Delivery Available:</strong> Home delivery inside Dhaka and all across Bangladesh. Simply message us on WhatsApp with your address and contact!
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 1-Step Fast Cash-on-Delivery Checkout Modal */}
      <FastCheckoutModal 
        product={checkoutProduct} 
        isOpen={Boolean(checkoutProduct)} 
        onClose={() => setCheckoutProduct(null)} 
      />

      {/* Bangle Sizing Chart Modal */}
      <SizeGuideModal 
        isOpen={isSizeGuideOpen} 
        onClose={() => setIsSizeGuideOpen(false)} 
      />
    </section>
  );
};

export default Collection;
