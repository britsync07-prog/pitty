import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    
    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);
    if (!element && id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: t('nav.collection'), id: 'collection' },
    { name: t('nav.featured'), id: 'featured' },
    { name: t('nav.about'), id: 'about' },
    { name: t('nav.contact'), id: 'contact' },
  ];

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div 
          className="text-2xl font-serif tracking-wider cursor-pointer font-medium uppercase flex items-center gap-3 text-zinc-900"
          onClick={() => scrollTo('hero')}
        >
          <img 
            src="/logo.webp" 
            alt="Pretty Pocket Logo" 
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
          />
          <span>Pretty Pocket</span>
        </div>

        {/* Desktop Nav & Language */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium tracking-widest uppercase text-zinc-800 hover:text-black transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center bg-zinc-100 p-0.5 rounded-full border border-zinc-200">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                language === 'en'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('bn')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                language === 'bn'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              বাংলা
            </button>
          </div>
        </div>

        {/* Mobile Header Controls: Language Toggle + Menu */}
        <div className="md:hidden flex items-center gap-2.5">
          <div className="flex items-center bg-zinc-100 p-0.5 rounded-full border border-zinc-200">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                language === 'en'
                  ? 'bg-black text-white'
                  : 'text-zinc-600'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('bn')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                language === 'bn'
                  ? 'bg-black text-white'
                  : 'text-zinc-600'
              }`}
            >
              বাং
            </button>
          </div>

          <button 
            className="text-zinc-900 p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-6 px-4 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-lg font-serif tracking-widest uppercase text-zinc-800 hover:text-black transition-colors"
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
