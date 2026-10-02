import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { InstagramIcon } from './Icons';
import AnnouncementBar from './AnnouncementBar';
import { STORE_INFO, LOGO_IMAGE } from '../constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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
        top: element.offsetTop - 90,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Collection', id: 'collection' },
    { name: 'Viral Deals', id: 'featured' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'FAQ', id: 'faq' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navbar */}
      <div 
        className={`transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-rose-100/70 py-2.5' 
            : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Brand Logo & Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollTo('hero')}
          >
          <div className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-rose-300 to-amber-200 shadow-md transition-transform duration-300 group-hover:scale-105">
            <img 
              src={LOGO_IMAGE} 
              alt={STORE_INFO.name} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className={`text-xl sm:text-2xl font-serif tracking-wider font-semibold transition-colors ${
              isScrolled ? 'text-zinc-900' : 'text-white'
            }`}>
              {STORE_INFO.name}
            </span>
            <span className={`text-[10px] tracking-[0.25em] uppercase font-light -mt-1 transition-colors ${
              isScrolled ? 'text-rose-600' : 'text-rose-200'
            }`}>
              {STORE_INFO.tagline}
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-xs font-semibold tracking-widest uppercase transition-colors relative group py-1 ${
                isScrolled ? 'text-zinc-700 hover:text-rose-600' : 'text-zinc-100 hover:text-white'
              }`}
            >
              {link.name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-rose-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* Quick Order Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={STORE_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-colors ${
              isScrolled ? 'text-zinc-600 hover:text-rose-600 hover:bg-rose-50' : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Instagram"
          >
            <InstagramIcon size={19} />
          </a>

          <a
            href={`${STORE_INFO.whatsappLink}?text=${encodeURIComponent("Hi Pretty Pocket! I'd like to check your available products.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wider transition-all duration-300 shadow-md hover:shadow-emerald-600/30"
          >
            <MessageCircle size={15} />
            <span>Order on WhatsApp</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden p-2 rounded-lg ${
            isScrolled ? 'text-zinc-900' : 'text-white'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>

    {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-xl border-b border-rose-100 py-6 px-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-base font-serif tracking-wider uppercase text-zinc-800 hover:text-rose-600 transition-colors py-2 border-b border-zinc-100"
              >
                {link.name}
              </button>
            ))}

            <div className="pt-2 flex flex-col gap-3">
              <a
                href={`${STORE_INFO.whatsappLink}?text=${encodeURIComponent("Hi Pretty Pocket! I'd like to place an order.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-600 text-white text-sm font-semibold tracking-wider shadow-md"
              >
                <MessageCircle size={17} />
                <span>Chat & Order on WhatsApp</span>
              </a>

              <a
                href={STORE_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-full bg-rose-50 text-rose-600 text-sm font-medium border border-rose-200"
              >
                <InstagramIcon size={17} />
                <span>Follow on Instagram (@prettypoket)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
