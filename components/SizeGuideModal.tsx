import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Ruler, CheckCircle2, Sparkles } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sizes = [
  {
    size: "2.4",
    title: "Small (ছোট হাত)",
    diameterCm: "5.7 cm",
    diameterInch: "2.25 ইঞ্চি",
    description: "যাদের হাত বেশ চিকন বা টিনএজ আপুদের জন্য পারফেক্ট সাইজ।"
  },
  {
    size: "2.6",
    title: "Medium (সাধারণ/স্ট্যান্ডার্ড)",
    diameterCm: "6.0 cm",
    diameterInch: "2.37 ইঞ্চি",
    description: "সবচেয়ে জনপ্রিয় সাইজ। অধিকাংশ আপুদের হাতে একদম নিখুঁত ফিট হয়।"
  },
  {
    size: "2.8",
    title: "Large (বড় হাত)",
    diameterCm: "6.3 cm",
    diameterInch: "2.50 ইঞ্চি",
    description: "যাদের হাতের কব্জি তুলনামূলক একটু চওড়া বা ভারী, তাদের জন্য স্বস্তিদায়ক।"
  }
];

const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-rose-100 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-rose-100 bg-rose-50/40 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center">
                <Ruler size={16} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-zinc-900">চুড়ির সাইজ গাইড (Size Chart)</h3>
                <p className="text-xs text-rose-600 font-medium">কীভাবে আপনার নিখুঁত সাইজ বাছাই করবেন</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
            {/* Quick Measurement Tip */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
              <span className="font-bold flex items-center gap-1 mb-1 text-amber-800">
                <Sparkles size={14} className="text-amber-600" />
                সহজে সাইজ মাপার নিয়ম:
              </span>
              আপনার নিয়মিত পরা একটি আরামদায়ক চুড়ি সমতল টেবিলে রাখুন। এবার একটি সাধারণ স্কেল দিয়ে চুড়ির <strong>ভেতরের এক প্রান্ত থেকে অন্য প্রান্ত পর্যন্ত (Inner Diameter)</strong> মাপুন। নিচে দেয়া চার্টের সাথে মিলিয়ে সাইজ নিশ্চিত করুন।
            </div>

            {/* Size Cards */}
            <div className="space-y-3">
              {sizes.map((item) => (
                <div 
                  key={item.size}
                  className="p-4 rounded-2xl border border-rose-100 bg-white hover:border-rose-300 transition-colors shadow-sm flex items-start justify-between gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex flex-col items-center justify-center font-bold flex-shrink-0 shadow-sm">
                    <span className="text-xs uppercase tracking-tighter">Size</span>
                    <span className="text-base leading-none font-serif">{item.size}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-zinc-900">{item.title}</h4>
                      <span className="text-xs font-serif font-bold text-rose-600">{item.diameterCm} ({item.diameterInch})</span>
                    </div>
                    <p className="text-xs text-zinc-500 font-light mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Confidence Badge */}
            <div className="flex items-center gap-2 text-xs text-zinc-500 justify-center pt-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>কনফিউশন থাকলে হোয়াটসঅ্যাপে আমাদের মেসেজ দিলেও সাহায্য করা হবে!</span>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              বুঝেছি, কালেকশন দেখুন
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SizeGuideModal;
