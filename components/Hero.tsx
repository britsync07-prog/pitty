import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, MessageCircle, ArrowDown, ShieldCheck, Truck, Heart } from 'lucide-react';
import { STORE_INFO, LOGO_IMAGE, HERO_BG_IMAGE } from '../constants';

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={ref} id="hero" className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#241716]">
      {/* Background with Parallax & Soft Gradient Overlay */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0 origin-bottom"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-[#241716]/95 z-10" />
        <img 
          src={HERO_BG_IMAGE} 
          alt="Pretty Pocket Hero Background" 
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Main Hero Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24 pb-16 flex flex-col items-center">
        
        {/* Floating Brand Badge / Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-6"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-[3px] bg-gradient-to-tr from-amber-300 via-rose-300 to-amber-200 shadow-2xl shadow-rose-900/40">
            <img 
              src={LOGO_IMAGE} 
              alt="Pretty Pocket Logo Emblem" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-lg border border-white/40 flex items-center gap-1">
            <Sparkles size={11} />
            <span>Under ৳299</span>
          </div>
        </motion.div>
        
        {/* Slogan Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-rose-200 text-xs sm:text-sm font-medium tracking-wider mb-4"
        >
          <Heart size={14} className="text-rose-400 fill-rose-400 animate-pulse" />
          <span>{STORE_INFO.tagline}</span>
        </motion.div>

        {/* Store Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white mb-4 tracking-wide drop-shadow-md font-medium"
        >
          Pretty Pocket
        </motion.h1>

        {/* Subtitle / Promise */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-base sm:text-xl md:text-2xl text-rose-100/90 font-light max-w-2xl mb-8 leading-relaxed font-sans"
        >
          {STORE_INFO.subTagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto"
        >
          <button
            onClick={scrollToCollection}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-600 hover:to-amber-700 text-white text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase rounded-full shadow-lg shadow-rose-900/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>Explore Collection</span>
            <ArrowDown size={16} />
          </button>

          <a
            href={`${STORE_INFO.whatsappLink}?text=${encodeURIComponent("Hi Pretty Pocket! I saw your website and would like to browse products.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase rounded-full shadow-lg shadow-emerald-950/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} />
            <span>Order via WhatsApp</span>
          </a>
        </motion.div>

        {/* Trust Badges Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-white/15 text-white/80 text-xs sm:text-sm max-w-3xl w-full"
        >
          <div className="flex items-center justify-center gap-2 bg-white/5 py-2 px-3 rounded-lg backdrop-blur-sm">
            <Truck size={18} className="text-amber-300 flex-shrink-0" />
            <span className="text-left font-light leading-tight">Cash on Delivery inside Dhaka & BD</span>
          </div>

          <div className="flex items-center justify-center gap-2 bg-white/5 py-2 px-3 rounded-lg backdrop-blur-sm">
            <ShieldCheck size={18} className="text-amber-300 flex-shrink-0" />
            <span className="text-left font-light leading-tight">Quality Guaranteed, Best Price</span>
          </div>

          <div className="col-span-2 md:col-span-1 flex items-center justify-center gap-2 bg-white/5 py-2 px-3 rounded-lg backdrop-blur-sm">
            <Sparkles size={18} className="text-amber-300 flex-shrink-0" />
            <span className="text-left font-light leading-tight">Trending Bangles & Cute Gifts</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
