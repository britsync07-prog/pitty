import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Heart, Sparkles } from 'lucide-react';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './Icons';
import { STORE_INFO, LOGO_IMAGE } from '../constants';

const socials = [
  { 
    name: 'Instagram', 
    icon: InstagramIcon, 
    url: STORE_INFO.instagram 
  },
  { 
    name: 'Facebook', 
    icon: FacebookIcon, 
    url: STORE_INFO.facebook 
  },
  { 
    name: 'WhatsApp', 
    icon: WhatsAppIcon, 
    url: `${STORE_INFO.whatsappLink}?text=${encodeURIComponent("Hi Pretty Pocket! I saw your website.")}` 
  },
  { 
    name: 'Email', 
    icon: Mail, 
    url: `mailto:${STORE_INFO.email}` 
  },
  { 
    name: 'Phone', 
    icon: Phone, 
    url: `tel:${STORE_INFO.phone.replace(/[^0-9+]/g, '')}` 
  },
];

const Footer = () => {
  return (
    <footer className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-rose-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Brand Emblem & Name */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-rose-300 shadow-sm">
            <img 
              src={LOGO_IMAGE} 
              alt={STORE_INFO.name} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="text-2xl font-serif tracking-wider font-semibold text-zinc-900">
            {STORE_INFO.name}
          </span>
        </div>

        <p className="text-xs uppercase tracking-[0.25em] text-rose-500 font-medium mb-3">
          {STORE_INFO.tagline}
        </p>

        <p className="text-sm text-zinc-500 font-light max-w-md mb-8">
          {STORE_INFO.subTagline}
        </p>

        {/* Social Icons */}
        <div className="flex gap-4 mb-10 flex-wrap justify-center">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.05 }}
                className="w-10 h-10 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-500 hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm"
                aria-label={social.name}
              >
                <Icon size={18} />
              </motion.a>
            );
          })}
        </div>

        {/* Bottom Bar: Copyright & Admin Link */}
        <div className="pt-8 border-t border-zinc-100 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-light">
          <div className="flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} {STORE_INFO.name}. Dhaka, Bangladesh. Made with</span>
            <Heart size={12} className="text-rose-500 fill-rose-500" />
          </div>

          <div className="flex items-center gap-6">
            <span>Cash on Home Delivery Nationwide</span>
            <a 
              href="/admin" 
              className="hover:text-zinc-700 transition-colors underline-offset-4 hover:underline"
            >
              Merchant Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
