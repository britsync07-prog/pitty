import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ShoppingBag, Check, Copy, X } from 'lucide-react';
import { WhatsAppIcon, MessengerIcon } from './Icons';
import Navbar from './Navbar';
import Footer from './Footer';
import { PRODUCTS } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const ProductDetail = ({ id }: { id: string }) => {
  const { language, t, translateProduct, getOrderMessage, getWhatsappOrderUrl } = useLanguage();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [showMessengerModal, setShowMessengerModal] = useState(false);
  const [copiedAgain, setCopiedAgain] = useState(false);

  const currentProduct = product ? translateProduct(product) : null;

  const getOrderText = () => {
    if (!currentProduct) return '';
    return getOrderMessage(currentProduct.name, currentProduct.price);
  };

  const handleMessengerClick = () => {
    const text = getOrderText();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setShowMessengerModal(true);
  };

  useEffect(() => {
    fetch(`/api/collections?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.name) {
          setProduct(data);
          setActiveImage(data.image);
          try {
            setImages(JSON.parse(data.images || "[]"));
          } catch(e) {
            setImages([data.image]);
          }
        } else {
          // Fallback to constants
          const fallback = PRODUCTS.find(p => String(p.id) === String(id));
          if (fallback) {
            setProduct(fallback);
            setActiveImage(fallback.image);
            setImages(fallback.images || [fallback.image]);
          }
        }
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch(() => {
        const fallback = PRODUCTS.find(p => String(p.id) === String(id));
        if (fallback) {
          setProduct(fallback);
          setActiveImage(fallback.image);
          setImages(fallback.images || [fallback.image]);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse font-serif text-2xl text-zinc-300">Pretty Pocket</div>
    </div>
  );

  if (!product || !currentProduct) return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-40 pb-20 text-center font-serif text-xl text-zinc-600">
        {language === 'bn' ? 'পণ্যটি খুঁজে পাওয়া যায়নি' : 'Product not found'}
      </div>
      <Footer />
    </div>
  );

  const priceStr = currentProduct.price;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[3/4] bg-zinc-100 overflow-hidden relative group"
            >
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={() => {
                      const idx = images.indexOf(activeImage);
                      const nextIdx = (idx - 1 + images.length) % images.length;
                      setActiveImage(images[nextIdx]);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => {
                      const idx = images.indexOf(activeImage);
                      const nextIdx = (idx + 1) % images.length;
                      setActiveImage(images[nextIdx]);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </motion.div>
            
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {images.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`flex-shrink-0 w-20 aspect-[3/4] bg-zinc-100 border-2 transition-colors ${activeImage === img ? 'border-black' : 'border-transparent'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 mb-8">
                <a href="/" className="hover:text-black">{t('productDetail.home')}</a>
                <span>/</span>
                <span className="text-zinc-900">{t('productDetail.collection')}</span>
              </nav>

              <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-4">{currentProduct.name}</h1>
              <p className="text-2xl text-zinc-600 font-light mb-8">{currentProduct.price}</p>
              
              <div className="w-full h-[1px] bg-zinc-100 mb-8"></div>
              
              <div className="space-y-6 mb-12">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-900">{t('productDetail.description')}</h3>
                <p className="text-zinc-600 leading-relaxed font-light whitespace-pre-wrap">
                  {currentProduct.description || t('productDetail.noDescription')}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a 
                  href={getWhatsappOrderUrl(currentProduct.name, currentProduct.price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-black text-white py-4 px-8 flex items-center justify-center gap-3 hover:bg-zinc-800 transition-colors tracking-widest uppercase text-xs sm:text-sm font-medium shadow-sm"
                >
                  <WhatsAppIcon size={18} />
                  {t('productDetail.orderWhatsapp')}
                </a>
                <button 
                  type="button"
                  onClick={handleMessengerClick}
                  className="w-full border border-black text-black bg-white py-4 px-8 flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-colors tracking-widest uppercase text-xs sm:text-sm font-medium"
                >
                  <MessengerIcon size={18} />
                  {t('productDetail.orderMessenger')}
                </button>
              </div>

              <div className="mt-16 grid grid-cols-2 gap-8 border-t border-zinc-100 pt-8">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2">{t('productDetail.deliveryTitle')}</h4>
                  <p className="text-xs text-zinc-400">{t('productDetail.deliveryDesc')}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2">{t('productDetail.authTitle')}</h4>
                  <p className="text-xs text-zinc-400">{t('productDetail.authDesc')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Messenger Order Guidance Modal */}
      <AnimatePresence>
        {showMessengerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-zinc-100"
            >
              <button 
                onClick={() => setShowMessengerModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-black p-1 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center mx-auto mb-4">
                <Check size={24} />
              </div>

              <h3 className="text-xl font-serif text-center text-zinc-900 mb-2">{t('productDetail.modalTitle')}</h3>
              <p className="text-xs text-zinc-500 text-center mb-5 font-light leading-relaxed">
                {t('productDetail.modalDesc')}
              </p>

              <div className="bg-zinc-50 border border-zinc-200 p-4 mb-5 text-xs text-zinc-700 whitespace-pre-wrap font-sans leading-relaxed select-all">
                {getOrderText()}
              </div>

              <div className="flex flex-col gap-2.5">
                <a 
                  href="https://m.me/61591337513485"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowMessengerModal(false)}
                  className="w-full bg-black text-white py-4 px-6 flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors uppercase tracking-widest text-xs font-semibold text-center"
                >
                  <MessengerIcon size={18} />
                  {t('productDetail.modalOpen')}
                </a>

                <button 
                  type="button"
                  onClick={() => {
                    navigator?.clipboard?.writeText(getOrderText());
                    setCopiedAgain(true);
                    setTimeout(() => setCopiedAgain(false), 2000);
                  }}
                  className="w-full py-2.5 text-center text-xs text-zinc-500 hover:text-black tracking-wider uppercase font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Copy size={13} />
                  {copiedAgain ? t('productDetail.modalCopiedAgain') : t('productDetail.modalCopyAgain')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
