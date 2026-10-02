import React from 'react';
import { motion } from 'motion/react';

const socials = [
  { 
    name: 'Facebook', 
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ), 
    url: 'https://www.facebook.com/profile.php?id=61591337513485' 
  },
  { 
    name: 'Instagram', 
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ), 
    url: 'https://www.instagram.com/prettypoket' 
  },
  { 
    name: 'WhatsApp', 
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ), 
    url: 'https://wa.me/8801314671743' 
  },
];

const Footer = () => {
  return (
    <footer className="bg-white py-16 px-4 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-xl font-serif tracking-widest uppercase mb-10 text-zinc-900">
          Pretty Pocket
        </div>

        <div className="flex gap-6 mb-12 flex-wrap justify-center">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-zinc-400 hover:text-black transition-colors duration-300 p-2"
                aria-label={social.name}
              >
                <Icon size={20} className="w-5 h-5" />
              </motion.a>
            );
          })}
        </div>

        <div className="text-xs text-zinc-400 font-light tracking-wider">
          &copy; {new Date().getFullYear()} Pretty Pocket. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
