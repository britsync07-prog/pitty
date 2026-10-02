import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Product } from '../types';

const Collection = () => {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return allProducts;
    return allProducts.filter(item => item.category === selectedCategory);
  }, [allProducts, selectedCategory]);

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

  return (
    <section id="collection" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-serif mb-4">Latest Collection</h2>
        <div className="w-16 h-[1px] bg-zinc-300 mx-auto mb-10"></div>

        {/* Clean Category Filters */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs uppercase tracking-[0.2em] font-medium pb-2 transition-colors duration-300 relative ${
                selectedCategory === cat ? 'text-black' : 'text-zinc-400 hover:text-black'
              }`}
            >
              {cat}
              {selectedCategory === cat && (
                <motion.div 
                  layoutId="activeFilterUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black"
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Clean Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: (index % 6) * 0.08 }}
            className="group cursor-pointer"
            onClick={() => navigateToProduct(product.id)}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-6">
              <img 
                src={product.image} 
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-white tracking-widest uppercase text-sm border border-white px-6 py-3">
                  View
                </span>
              </div>
            </div>
            <div className="flex justify-between items-start px-1 gap-4">
              <h3 className="font-serif text-lg text-zinc-900 group-hover:text-black transition-colors">{product.name}</h3>
              <p className="text-zinc-600 text-sm font-medium whitespace-nowrap">
                {product.price.includes('৳') ? product.price : `৳${product.price}`}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Collection;
