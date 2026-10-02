import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { STORE_INFO } from '../constants';
import { WhatsAppIcon } from './Icons';

const FloatingWhatsApp = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // Hide tooltip after 8 seconds or keep it friendly
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const whatsAppUrl = `${STORE_INFO.whatsappLink}?text=${encodeURIComponent("Hi Pretty Pocket! 🌸 I would like to inquire about products and place an order.")}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Friendly Tooltip Prompt */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-xl border border-rose-100 text-xs text-zinc-800"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-medium">হোয়াটসঅ্যাপে সরাসরি অর্ডার করুন!</span>
            <button 
              onClick={() => setShowTooltip(false)}
              className="text-zinc-400 hover:text-zinc-600 ml-1"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-2xl shadow-emerald-700/50 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsating Ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-pulse pointer-events-none" />
        
        <WhatsAppIcon size={28} />

        {/* Online Status Dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white shadow-sm" />
      </motion.a>
    </div>
  );
};

export default FloatingWhatsApp;
