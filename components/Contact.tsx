import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MessageCircle, MapPin, Sparkles } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './Icons';
import { STORE_INFO } from '../constants';

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-rose-50/40 border-t border-rose-100">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.96 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-rose-500 mb-3 block">
            We'd Love To Hear From You
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-zinc-900 mb-4 tracking-tight">
            Order & Get In Touch
          </h2>
          <p className="text-zinc-600 mb-12 max-w-xl mx-auto font-light text-sm sm:text-base">
            Have questions about sizes, custom gift bouquets, combo packs, or bulk follower discounts? Drop us a message anytime!
          </p>

          {/* Contact Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {/* WhatsApp */}
            <a 
              href={`${STORE_INFO.whatsappLink}?text=${encodeURIComponent("Hi Pretty Pocket! I want to order some items.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MessageCircle size={22} />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-700 mb-1">WhatsApp Chat</span>
              <span className="text-xs font-medium text-zinc-700">{STORE_INFO.phone}</span>
              <span className="text-[10px] text-zinc-400 mt-1">Instant Order Response</span>
            </a>

            {/* Direct Phone Call */}
            <a 
              href={`tel:${STORE_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className="flex flex-col items-center p-6 bg-white rounded-2xl border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-300 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Phone size={22} />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-rose-700 mb-1">Phone Call</span>
              <span className="text-xs font-medium text-zinc-700">{STORE_INFO.phone}</span>
              <span className="text-[10px] text-zinc-400 mt-1">Direct Call Assistance</span>
            </a>

            {/* Instagram */}
            <a 
              href={STORE_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-md hover:border-pink-300 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <InstagramIcon size={22} />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-pink-700 mb-1">Instagram</span>
              <span className="text-xs font-medium text-zinc-700">{STORE_INFO.instagramHandle}</span>
              <span className="text-[10px] text-zinc-400 mt-1">DM to Order & Follow</span>
            </a>

            {/* Facebook */}
            <a 
              href={STORE_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FacebookIcon size={22} />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-700 mb-1">Facebook Page</span>
              <span className="text-xs font-medium text-zinc-700">Pretty Pocket</span>
              <span className="text-[10px] text-zinc-400 mt-1">Messenger & Updates</span>
            </a>
          </div>

          {/* Email & Delivery Banner */}
          <div className="p-6 rounded-2xl bg-white border border-rose-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600">
                <Mail size={18} />
              </div>
              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-zinc-400">Official Email</div>
                <a href={`mailto:${STORE_INFO.email}`} className="text-sm font-medium text-zinc-800 hover:text-rose-600 transition-colors">
                  {STORE_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-rose-700 font-medium bg-rose-50 px-4 py-2.5 rounded-full border border-rose-200">
              <Sparkles size={14} className="text-amber-500" />
              <span>{STORE_INFO.deliveryNote}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
