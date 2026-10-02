import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowLeft, Sparkles, Truck, ShieldCheck } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { PRODUCTS, STORE_INFO } from '../constants';

const ProductDetail = ({ id }: { id: string }) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Check if item exists in seeded catalog first
    const seeded = PRODUCTS.find(p => String(p.id) === String(id));
    if (seeded) {
      setProduct(seeded);
      setActiveImage(seeded.image);
      setImages(seeded.images || [seeded.image]);
      setLoading(false);
      window.scrollTo(0, 0);
      return;
    }

    // Otherwise fetch from database
    fetch(`/api/collections?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setProduct(data);
          setActiveImage(data.image);
          try {
            setImages(JSON.parse(data.images || "[]"));
          } catch(e) {
            setImages([data.image]);
          }
        }
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse font-serif text-2xl text-rose-400">Pretty Pocket...</div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-40 pb-20 text-center px-4">
        <h2 className="font-serif text-2xl text-zinc-800 mb-4">Product Not Found</h2>
        <a 
          href="/#collection" 
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-500 text-white text-xs font-semibold uppercase tracking-wider"
        >
          <ArrowLeft size={16} />
          <span>Back to Collection</span>
        </a>
      </div>
      <Footer />
    </div>
  );

  const priceStr = product.price.includes('৳') ? product.price : `৳${product.price}`;

  const whatsAppOrderLink = `${STORE_INFO.whatsappLink}?text=${encodeURIComponent(
    `Hi Pretty Pocket! 🌸\nI would like to order:\n- Item: ${product.name}\n- Price: ${priceStr}\n\nPlease share delivery details.`
  )}`;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Back Link */}
        <div className="mb-8">
          <a 
            href="/#collection" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-zinc-500 hover:text-rose-600 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to All Collections</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Gallery Side */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-rose-50/40 rounded-3xl overflow-hidden relative group border border-rose-100 shadow-sm"
            >
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
              
              {/* Navigation Arrows if multiple images */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={() => {
                      const idx = images.indexOf(activeImage);
                      const nextIdx = (idx - 1 + images.length) % images.length;
                      setActiveImage(images[nextIdx]);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-zinc-800 shadow-md"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => {
                      const idx = images.indexOf(activeImage);
                      const nextIdx = (idx + 1) % images.length;
                      setActiveImage(images[nextIdx]);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-zinc-800 shadow-md"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </motion.div>
            
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {images.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`flex-shrink-0 w-20 aspect-square rounded-xl overflow-hidden bg-rose-50 border-2 transition-all ${
                      activeImage === img ? 'border-rose-500 scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Side */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-rose-500">
                  {product.category || 'Pretty Pocket Collection'}
                </span>
                <h1 className="text-3xl sm:text-5xl font-serif text-zinc-900 mt-1 mb-2">
                  {product.name}
                </h1>
                {product.banglaName && (
                  <p className="text-base text-zinc-500 font-light">
                    {product.banglaName}
                  </p>
                )}
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-rose-600">
                  {priceStr}
                </span>
                {product.badge && (
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
                    {product.badge}
                  </span>
                )}
              </div>
              
              <div className="w-full h-px bg-rose-100" />
              
              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400">Product Details</h3>
                <p className="text-zinc-600 leading-relaxed font-light whitespace-pre-wrap text-sm sm:text-base">
                  {product.description || "Authentic high quality item from Pretty Pocket."}
                </p>
              </div>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400">Available Options</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v: string, idx: number) => (
                      <span key={idx} className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 text-xs font-medium border border-rose-200/60">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a 
                  href={whatsAppOrderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-all tracking-wider uppercase text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-600/30 hover:scale-[1.02]"
                >
                  <MessageCircle size={20} />
                  <span>Order Now via WhatsApp</span>
                </a>

                <a 
                  href={STORE_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-rose-200 hover:border-rose-400 text-zinc-800 hover:text-rose-600 py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-colors tracking-wider uppercase text-xs font-semibold"
                >
                  <span>Inquire on Instagram</span>
                </a>
              </div>

              {/* Trust & Delivery Boxes */}
              <div className="pt-6 grid grid-cols-2 gap-4 border-t border-rose-100">
                <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100 flex items-start gap-3">
                  <Truck size={18} className="text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-zinc-900 mb-1">Cash on Delivery</h4>
                    <p className="text-xs text-zinc-500 font-light leading-relaxed">
                      Dhaka inside 24-48 hrs. Nationwide Bangladesh 3-5 days.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 flex items-start gap-3">
                  <ShieldCheck size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-zinc-900 mb-1">Quality Guaranteed</h4>
                    <p className="text-xs text-zinc-500 font-light leading-relaxed">
                      Safe packaging & premium quality checked items.
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
