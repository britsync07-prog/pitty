import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ShieldCheck, MapPin, Truck } from 'lucide-react';
import { STORE_INFO, LOGO_IMAGE } from '../constants';

const About = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-rose-50/30 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.9 }}
           className="space-y-6"
        >
          {/* Small Logo Mark */}
          <div className="w-16 h-16 rounded-full mx-auto p-1 bg-gradient-to-tr from-amber-300 to-rose-300 shadow-md">
            <img 
              src={LOGO_IMAGE} 
              alt={STORE_INFO.name} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/70 text-rose-700 text-xs font-semibold tracking-widest uppercase">
            <Heart size={12} className="fill-rose-500 text-rose-500" />
            <span>Our Story & Mission</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-zinc-900 leading-tight">
            Glamour That Fits in Every Pocket
          </h2>

          <p className="text-lg sm:text-xl text-rose-700 font-serif italic max-w-2xl mx-auto">
            "Your daily dose of glam, without breaking the bank! ✨"
          </p>

          <p className="text-zinc-600 leading-relaxed text-sm sm:text-base font-light max-w-3xl mx-auto">
            Welcome to <strong>Pretty Pocket</strong> — born in Dhaka, Bangladesh with a simple passion: to make trending cosmetics, sparkling traditional churi, delicate accessories, and heartwarming custom gift bouquets delightfully affordable for everyone. We believe self-love and thoughtful gifting should never feel out of reach.
          </p>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 text-left">
            <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 mb-4">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-serif text-base font-bold text-zinc-900 mb-1">Quality Guaranteed</h3>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Hand-picked trending items, durable craftsmanship, and tested beauty accessories you can trust.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
                <Sparkles size={20} />
              </div>
              <h3 className="font-serif text-base font-bold text-zinc-900 mb-1">Pocket-Friendly Price</h3>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Most items priced under ৳299, with steals starting from just ৳50. Luxury feel at everyday prices.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                <Truck size={20} />
              </div>
              <h3 className="font-serif text-base font-bold text-zinc-900 mb-1">Cash on Home Delivery</h3>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Delivered right to your doorstep inside Dhaka and nationwide across Bangladesh. Pay when you receive.
              </p>
            </div>
          </div>

          <div className="pt-8 flex items-center justify-center gap-2 text-xs text-zinc-500 font-light">
            <MapPin size={14} className="text-rose-500" />
            <span>Based in Dhaka, Bangladesh • Serving Customers Nationwide</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
