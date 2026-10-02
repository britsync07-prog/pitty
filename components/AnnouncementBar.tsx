import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, Gift, Sparkles, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../constants';

const announcements = [
  {
    id: 1,
    icon: Truck,
    text: "সারা বাংলাদেশে ক্যাশ অন হোম ডেলিভারি সুবিধা! (Dhaka 24-48 hrs)",
    cta: "অর্ডার করুন",
    href: "#collection"
  },
  {
    id: 2,
    icon: Gift,
    text: "স্পেশাল অফার: ৬ ডজন কাশ্মীরি চুড়িতে ফ্রি ডেলিভারি + সিক্রেট গিফট! 🎁",
    cta: "অফারটি দেখুন",
    href: "#featured"
  },
  {
    id: 3,
    icon: Sparkles,
    text: "Quality guaranteed, pocket-friendly price! সেরা প্রডাক্টস Under ৳299 ✨",
    cta: "কালেকশন",
    href: "#collection"
  },
  {
    id: 4,
    icon: MessageCircle,
    text: `যেকোনো প্রশ্নে বা অর্ডারে সরাসরি হোয়াটসঅ্যাপ করুন: ${STORE_INFO.phone}`,
    cta: "WhatsApp Chat",
    href: `${STORE_INFO.whatsappLink}?text=${encodeURIComponent("Hi Pretty Pocket! I have a question.")}`
  }
];

const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = announcements[currentIndex];
  const Icon = current.icon;

  return (
    <div className="bg-gradient-to-r from-rose-600 via-amber-600 to-rose-700 text-white text-[11px] sm:text-xs py-2 px-4 relative z-50 overflow-hidden shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-2 text-center"
          >
            <Icon size={14} className="text-amber-200 flex-shrink-0 animate-pulse" />
            <span className="font-medium tracking-wide">
              {current.text}
            </span>
            <a
              href={current.href}
              className="ml-2 font-bold underline underline-offset-2 hover:text-amber-200 transition-colors uppercase tracking-wider text-[10px] hidden sm:inline"
            >
              {current.cta} &rarr;
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnnouncementBar;
