import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

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
    <section ref={ref} id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0 origin-bottom"
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="/hero-banner.webp" 
          alt="Pretty Pocket Cover" 
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/727243110_122093666301377917_8066216397650906534_n.jpg';
          }}
        />
      </motion.div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <img 
            src="/logo.webp" 
            alt="Pretty Pocket Logo" 
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full shadow-2xl mb-6 sm:mb-8 mx-auto border-2 border-white/40"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/756530775_122111785431377917_292904860190451540_n.jpg';
            }}
          />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white mb-4 sm:mb-6 tracking-wide drop-shadow-lg"
        >
          Pretty Pocket
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xs sm:text-base md:text-xl text-zinc-100 font-light tracking-widest uppercase mb-8 sm:mb-12 drop-shadow px-2"
        >
          Your daily dose of glam, without breaking the bank
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          onClick={scrollToCollection}
          className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black text-xs sm:text-sm tracking-[0.2em] uppercase overflow-hidden hover:text-white transition-colors duration-500 shadow-xl"
        >
          <span className="relative z-10">View Collection</span>
          <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
