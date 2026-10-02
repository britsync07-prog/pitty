import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageCircle, Heart, Gift, ArrowRight } from 'lucide-react';
import { STORE_INFO } from '../constants';

const features = [
  {
    id: 1,
    tag: "Viral Sensation",
    title: "The Viral Churi & Bangles Collection",
    banglaTitle: "কাশ্মীরি, রেশমি, জেলি ও ঝুমকা চুড়ি",
    description: "Amader kache peye jaben most viral & trending Kashmiri churi, Jelly churi, Resmi churi, and Jhumka churi! Don't miss our exclusive 6-Dozen Mega Combo with FREE home delivery & an exciting secret gift. Handcrafted with rich oriental motifs and glass-like crystal reflections.",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=1200",
    badgeText: "Free Delivery on 6 Dozen",
    align: "left",
    ctaText: "Order Bangles on WhatsApp",
    inquiryText: "Hi Pretty Pocket! I'm interested in the Viral Churi & Bangles Collection combo."
  },
  {
    id: 2,
    tag: "Handcrafted With Love",
    title: "Crunchy Lays & Sweet Chocolate Bouquets",
    banglaTitle: "ক্রাঞ্চি লেইস ও সুইট কিন্ডারজয় বোকে",
    description: "Flowers are cute, but Lays are cuter 🌷🥔💗 A bouquet, but make it crunchy! Because flowers fade, but Lays don't. Surprise your favorite person with our customized Lays snack bouquets, Kinder Joy chocolate bouquets, and personalized photo frame combos.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=1200",
    badgeText: "Customizable With Any Snacks",
    align: "right",
    ctaText: "Customize a Bouquet",
    inquiryText: "Hi Pretty Pocket! I would like to customize a snack/chocolate bouquet."
  },
  {
    id: 3,
    tag: "Budget Steals",
    title: "Pocket Glam: Everything Under ৳99",
    banglaTitle: "মাত্র ৳৯৯-এ ডেইলি গ্ল্যাম এক্সেসরিজ",
    description: "Quality guaranteed, pocket-friendly price! Grab 100/200 Pcs soft colorful mini hairbands for only ৳99, 12-piece sparkling stone safety pins for ৳99, magnetic cat-eye false nails for ৳50, and sweet jingling ghungoor at ৳80. Glamour made truly accessible.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200",
    badgeText: "Steals From ৳50",
    align: "left",
    ctaText: "Shop Under ৳99 Deals",
    inquiryText: "Hi Pretty Pocket! I want to order the Under ৳99 items (Hairbands, Safety Pins, Nails)."
  }
];

const Featured = () => {
  return (
    <section id="featured" className="py-24 overflow-hidden bg-rose-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-rose-500 mb-3 block">
          Featured Highlights
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-zinc-900 tracking-tight">
          What Makes Pretty Pocket Special
        </h2>
      </div>

      <div className="space-y-16 md:space-y-24">
        {features.map((feature) => (
          <div 
            key={feature.id} 
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ${
              feature.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
            } items-center gap-8 md:gap-16`}
          >
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, x: feature.align === 'left' ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full md:w-1/2 aspect-[4/3] md:aspect-[5/4] rounded-3xl overflow-hidden relative shadow-xl border border-rose-100 group"
            >
              <img 
                src={feature.image} 
                alt={feature.title} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-rose-700 shadow-md border border-rose-100 flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-500" />
                <span>{feature.badgeText}</span>
              </div>
            </motion.div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
                  {feature.tag}
                </span>

                <h3 className="text-2xl sm:text-4xl font-serif text-zinc-900 leading-tight">
                  {feature.title}
                </h3>

                <p className="text-sm font-medium text-rose-700">
                  {feature.banglaTitle}
                </p>

                <p className="text-zinc-600 leading-relaxed text-sm sm:text-base font-light">
                  {feature.description}
                </p>

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <a 
                    href={`${STORE_INFO.whatsappLink}?text=${encodeURIComponent(feature.inquiryText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold tracking-wider transition-all shadow-md hover:shadow-emerald-600/30"
                  >
                    <MessageCircle size={17} />
                    <span>{feature.ctaText}</span>
                  </a>

                  <button
                    onClick={() => {
                      const el = document.getElementById('collection');
                      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-rose-600 uppercase tracking-wider py-2 transition-colors"
                  >
                    <span>Browse All</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
