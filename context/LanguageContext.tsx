import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

export type Language = 'en' | 'bn';

export const toBengaliNumber = (str: string | number): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(str).replace(/[0-9]/g, w => bnDigits[+w]);
};

export const CATEGORY_TRANSLATIONS: Record<string, { en: string; bn: string }> = {
  'All': { en: 'All', bn: 'সব' },
  'Bangles & Jewelry': { en: 'Bangles & Jewelry', bn: 'চুড়ি ও গহনা' },
  'Cosmetics & Beauty': { en: 'Cosmetics & Beauty', bn: 'কসমেটিকস ও বিউটি' },
  'Hair & Accessories': { en: 'Hair & Accessories', bn: 'হেয়ার ও অ্যাক্সেসরিজ' },
  'Gift Bouquets & Combos': { en: 'Gift Bouquets & Combos', bn: 'গিফট বুকে ও কম্বো' },
  'Lifestyle & Gadgets': { en: 'Lifestyle & Gadgets', bn: 'লাইফস্টাইল ও গ্যাজেট' }
};

export const PRODUCT_TRANSLATIONS: Record<string | number, { name: string; description: string; category?: string }> = {
  1: {
    name: "জেলি চুড়ি সেট",
    category: "চুড়ি ও গহনা",
    description: "ট্রেন্ডিং পার্পল ও গ্রিন শেডের জেলি কাচের চুড়ি। সাইজ এভেইলেবল: ২.৪, ২.৬, ২.৮। সীমিত স্টক, ঢাকা ও সারাদেশে ক্যাশ অন হোম ডেলিভারি।"
  },
  2: {
    name: "শিমার হাইলাইটার সেট (৬ পিস)",
    category: "কসমেটিকস ও বিউটি",
    description: "গ্লোয়িং এবং উজ্জ্বল লুকের জন্য ৬ পিসের কমপ্লিট হাইলাইটার সেট। সব ধরনের স্কিনের জন্য উপযোগী মসৃণ ফর্মুলা।"
  },
  3: {
    name: "লে'স ক্রাঞ্চি স্নাক্স বুকে",
    category: "গিফট বুকে ও কম্বো",
    description: "ফুল শুকিয়ে যায়, কিন্তু লে'স চিপসের ভালোবাসা থাকে সবসময়! কিউট প্যাস্টেল পেপারে মোড়ানো চমৎকার হ্যান্ডক্রাফটেড বুকে। আপনার পছন্দের চিপস দিয়ে কাস্টমাইজ সুবিধা।"
  },
  4: {
    name: "ফটো ফ্রেম ও চকোলেট কিউট কম্বো",
    category: "গিফট বুকে ও কম্বো",
    description: "প্রিয়জনকে উপহার দিন এই চমৎকার মেমোরি কম্বো: প্রিমিয়াম কোয়ালিটি ফটো ফ্রেমের সাথে সুস্বাদু চকলেটের সমন্বয়।"
  },
  5: {
    name: "কিন্ডার জয় সুইট লাভ বুকে",
    category: "গিফট বুকে ও কম্বো",
    description: "কিউট রিবন বো ও প্যাস্টেল ব্লাশ পেপারে সাজানো হ্যান্ডক্রাফটেড কিন্ডার জয় বুকে। প্রিয়জনের জন্য মিষ্টি ও ভালোবাসার উপহার।"
  },
  6: {
    name: "৫-স্পিড টার্বো হাই-ভেলোসিটি মিনি ফ্যান",
    category: "লাইফস্টাইল ও গ্যাজেট",
    description: "৫-স্পিড শক্তিশালী বাতাস, একদম নিঃশব্দ মোটর এবং দীর্ঘস্থায়ী রিচার্জেবল ব্যাটারি। পাওয়া যাচ্ছে স্টাইলিশ ব্ল্যাক ও হোয়াইট কালারে।"
  },
  7: {
    name: "কাশ্মীরি চুড়ি ৬-ডজন মেগা কম্বো",
    category: "চুড়ি ও গহনা",
    description: "স্পেশাল ৬-ডজন কাশ্মীরি চুড়ি কম্বো অফার! সাথে ফ্রি ডেলিভারি এবং একটি এক্সক্লুসিভ সিক্রেট ফ্রি গিফট!"
  },
  8: {
    name: "কাশ্মীরি চুড়ি ৬-পিস মাল্টিকালার সেট",
    category: "চুড়ি ও গহনা",
    description: "এক সেটে ৬টি চমৎকার কালার কম্বিনেশন। সাইজ এভেইলেবল ২.৪ এবং ২.৬। সীমিত স্টক।"
  },
  9: {
    name: "কাশ্মীরি চুড়ি (প্রতি ডজন - স্পেশাল রেট)",
    category: "চুড়ি ও গহনা",
    description: "স্পেশাল ফলোয়ার প্রাইস: প্রতি ডজন মাত্র ১৪০ টাকা। এই অফার পেতে সর্বনিম্ন ৬ ডজন অর্ডার করতে হবে।"
  },
  10: {
    name: "প্রেস্টিজ থার্মাল ভ্যাকুয়াম ইনসুলেটেড ফ্লাস্ক",
    category: "লাইফস্টাইল ও গ্যাজেট",
    description: "ডাবল-ওয়াল ভ্যাকুয়াম ইনসুলেটেড স্টেইনলেস স্টিল ফ্লাস্ক। দীর্ঘ সময় গরম বা ঠান্ডা রাখে। রেগুলার মূল্য ৪০০ টাকা, অফার মূল্য ৩৫০ টাকা।"
  },
  11: {
    name: "রেশমি চুড়ি ও ঘুঙুর সেট",
    category: "চুড়ি ও গহনা",
    description: "ঐতিহ্যবাহী রেশমি চুড়ি এবং মিষ্টি শব্দের ৪ পিসের ঘুঙুর সেট। উৎসব এবং বিশেষ দিনের সাজের জন্য একদম উপযুক্ত।"
  },
  12: {
    name: "স্টোন সেফটি পিন প্যাক (১২ পিস)",
    category: "হেয়ার ও অ্যাক্সেসরিজ",
    description: "১২ পিসের চকচকে ক্রিস্টাল স্টোন সেফটি পিন প্যাক। শাড়ি, ওড়না ও হিজাব সুন্দরভাবে আটকে রাখে কাপড় নষ্ট না করে।"
  },
  13: {
    name: "কালারফুল মিনি হেয়ার ব্যান্ড সেট (১০০/২০০ পিস)",
    category: "হেয়ার ও অ্যাক্সেসরিজ",
    description: "১০০ বা ২০০ পিসের বড় বক্সে কালারফুল মিনি হেয়ার ব্যান্ড। নরম, ইলাস্টিক এবং চুল না ছিঁড়ে সহজে বাঁধার উপযোগী।"
  },
  14: {
    name: "ভাইরাল কিউট চার্ম ব্রেসলেট",
    category: "চুড়ি ও গহনা",
    description: "চকচকে ক্রিস্টাল সহ কোরিয়ান ডিজাইনের মার্জিত চার্ম ব্রেসলেট। স্পেশাল অফার: ২ পিস মাত্র ৫০০ টাকা।"
  },
  15: {
    name: "ক্যাট আই ম্যাগনেটিক প্রেস-অন নেলস (১০ পিস)",
    category: "কসমেটিকস ও বিউটি",
    description: "১০ পিসের ম্যাগনেটিক ক্যাট-আই শিমার প্রেস-অন নেলস। পার্লারে না গিয়ে ঘরে বসেই কয়েক মিনিটে আকর্ষণীয় নেইল লুক।"
  }
};

const UI_STRINGS = {
  nav: {
    collection: { en: 'Collection', bn: 'কালেকশন' },
    featured: { en: 'Featured', bn: 'বিশেষ কালেকশন' },
    about: { en: 'About', bn: 'আমাদের সম্পর্কে' },
    contact: { en: 'Contact', bn: 'যোগাযোগ' }
  },
  hero: {
    tagline: { 
      en: 'Your daily dose of glam, without breaking the bank', 
      bn: 'পকেট ফ্রেন্ডলি দামে আপনার প্রতিদিনের গ্ল্যামার ও সৌন্দর্য' 
    },
    viewCollection: { en: 'View Collection', bn: 'কালেকশন দেখুন' }
  },
  collection: {
    title: { en: 'The Collection', bn: 'আমাদের কালেকশন' },
    subtitle: { 
      en: 'Handpicked jewelry, chic accessories, and delightful gift combos curated for everyday glam.', 
      bn: 'প্রতিদিনের সাজ এবং প্রিয়জনকে উপহারের জন্য বাছাইকৃত জুয়েলারি, ফ্যাশন ও গিফট কম্বো।' 
    },
    filters: { en: 'Filters', bn: 'ফিল্টার' },
    clearAll: { en: 'Clear all', bn: 'সব মুছুন' },
    reset: { en: 'Reset', bn: 'রিসেট' },
    categories: { en: 'Categories', bn: 'ক্যাটাগরি' },
    priceRange: { en: 'Price Range', bn: 'মূল্যের সীমা' },
    sortBy: { en: 'Sort by', bn: 'সাজান' },
    featuredSort: { en: 'Featured', bn: 'জনপ্রিয়' },
    lowToHigh: { en: 'Price: Low to High', bn: 'মূল্য: কম থেকে বেশি' },
    highToLow: { en: 'Price: High to Low', bn: 'মূল্য: বেশি থেকে কম' },
    showing: { en: 'Showing', bn: 'প্রদর্শিত' },
    items: { en: 'items found', bn: 'টি পণ্য পাওয়া গেছে' },
    noProducts: { en: 'No products match your criteria.', bn: 'আপনার পছন্দের ফিল্টারে কোনো পণ্য পাওয়া যায়নি।' },
    resetFilters: { en: 'Reset all filters', bn: 'ফিল্টার রিসেট করুন' },
    viewProduct: { en: 'View Details', bn: 'বিস্তারিত দেখুন' },
    orderNow: { en: 'Order', bn: 'অর্ডার করুন' }
  },
  featured: {
    f1Title: { en: 'Trending Bangles & Jewelry', bn: 'ট্রেন্ডিং চুড়ি ও গহনা' },
    f1Desc: { 
      en: 'Handcrafted Kashmiri churi, vibrant jelly bangles, and shimmering jewelry sets designed for everyday glam and festive celebrations.', 
      bn: 'হস্তনির্মিত কাশ্মীরি চুড়ি, প্রাণবন্ত জেলি চুড়ি এবং চমৎকার জুয়েলারি সেট—দৈনন্দিন সাজ ও উৎসবের জন্য আদর্শ।' 
    },
    f2Title: { en: 'Curated Bouquets & Beauty', bn: 'বাছাইকৃত গিফট বুকে ও বিউটি' },
    f2Desc: { 
      en: 'Customized snack bouquets, sweet keepsake combos, and viral cosmetic essentials crafted to deliver happiness at pocket-friendly prices.', 
      bn: 'কাস্টমাইজড স্নাক্স বুকে, মিষ্টি মেমোরি কম্বো এবং জনপ্রিয় প্রসাধনী সামগ্রী—সাশ্রয়ী মূল্যে আনন্দ ছড়িয়ে দিতে তৈরি।' 
    },
    discover: { en: 'Discover', bn: 'এক্সপ্লোর করুন' }
  },
  about: {
    label: { en: 'About Pretty Pocket', bn: 'Pretty Pocket সম্পর্কে' },
    quote: { 
      en: 'Your daily dose of glam, without breaking the bank! Quality guaranteed, pocket-friendly prices, and trending collections.', 
      bn: 'পকেট ফ্রেন্ডলি দামে আপনার প্রতিদিনের গ্ল্যামার ও সৌন্দর্য! সেরা মানের নিশ্চয়তা, সাশ্রয়ী দাম এবং ট্রেন্ডিং কালেকশন।' 
    }
  },
  contact: {
    title: { en: 'Get in Touch', bn: 'যোগাযোগ করুন' },
    subtitle: { 
      en: 'We are here to assist you with inquiries, orders, and custom combo requests.', 
      bn: 'অর্ডার, তথ্য এবং কাস্টম গিফট কম্বো সংক্রান্ত যেকোনো প্রয়োজনে আমরা আপনার পাশে আছি।' 
    }
  },
  productDetail: {
    home: { en: 'Home', bn: 'হোম' },
    collection: { en: 'Collection', bn: 'কালেকশন' },
    description: { en: 'Description', bn: 'পণ্যের বিবরণ' },
    noDescription: { en: 'No description provided.', bn: 'কোনো বিবরণ দেওয়া হয়নি।' },
    orderWhatsapp: { en: 'Order via WhatsApp', bn: 'হোয়াটসঅ্যাপে অর্ডার করুন' },
    orderMessenger: { en: 'Order via Messenger', bn: 'মেসেঞ্জারে অর্ডার করুন' },
    deliveryTitle: { en: 'Delivery', bn: 'হোম ডেলিভারি' },
    deliveryDesc: { 
      en: 'Cash on home delivery inside Dhaka and all over Bangladesh.', 
      bn: 'ঢাকা সহ সারাদেশে ক্যাশ অন হোম ডেলিভারির সুবিধা।' 
    },
    authTitle: { en: 'Authenticity', bn: 'নিশ্চিত মান' },
    authDesc: { 
      en: 'Quality guaranteed with pocket-friendly pricing.', 
      bn: 'পকেট-ফ্রেন্ডলি মূল্যে সেরা কোয়ালিটির নিশ্চয়তা।' 
    },
    modalTitle: { en: 'Order Text Copied!', bn: 'অর্ডার মেসেজ কপি হয়েছে!' },
    modalDesc: { 
      en: "We've copied your order details. Once Messenger opens, simply Paste into the chat and send.", 
      bn: 'আমরা আপনার অর্ডারের বিবরণ কপি করেছি। মেসেঞ্জার খুললে চ্যাটে পেস্ট (Paste) করে পাঠিয়ে দিন।' 
    },
    modalOpen: { en: 'Open Messenger Now', bn: 'মেসেঞ্জার খুলুন' },
    modalCopyAgain: { en: 'Copy Text Again', bn: 'আবার কপি করুন' },
    modalCopiedAgain: { en: 'Copied Again!', bn: 'পুনরায় কপি হয়েছে!' }
  },
  footer: {
    motto: { 
      en: 'Your daily dose of glam, without breaking the bank!', 
      bn: 'পকেট ফ্রেন্ডলি দামে আপনার প্রতিদিনের গ্ল্যামার ও সৌন্দর্য!' 
    },
    rights: { en: 'All rights reserved.', bn: 'সর্বস্বত্ব সংরক্ষিত।' }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (path: string) => string;
  formatPrice: (price: string | number) => string;
  translateCategory: (category: string) => string;
  translateProduct: (product: Product) => Product;
  getWhatsappOrderUrl: (productName: string, priceStr: string) => string;
  getOrderMessage: (productName: string, priceStr: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('pretty_pocket_lang');
      if (saved === 'en' || saved === 'bn') return saved;
    } catch (e) {}
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('pretty_pocket_lang', lang);
    } catch (e) {}
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const t = (path: string): string => {
    const parts = path.split('.');
    let cur: any = UI_STRINGS;
    for (const part of parts) {
      if (!cur || cur[part] === undefined) return path;
      cur = cur[part];
    }
    if (typeof cur === 'object' && cur[language]) {
      return cur[language];
    }
    return typeof cur === 'string' ? cur : path;
  };

  const formatPrice = (price: string | number): string => {
    const raw = String(price);
    const hasTaka = raw.includes('৳');
    const formatted = hasTaka ? raw : `৳${raw}`;
    if (language === 'bn') {
      return toBengaliNumber(formatted);
    }
    return formatted;
  };

  const translateCategory = (category: string): string => {
    if (!category) return '';
    const match = CATEGORY_TRANSLATIONS[category];
    if (match) {
      return match[language] || category;
    }
    return category;
  };

  const translateProduct = (product: Product): Product => {
    if (!product) return product;
    if (language === 'en') {
      return {
        ...product,
        price: formatPrice(product.price)
      };
    }

    const tObj = PRODUCT_TRANSLATIONS[product.id] || Object.values(PRODUCT_TRANSLATIONS).find(
      p => p.name === product.name
    );

    return {
      ...product,
      name: tObj?.name || product.name,
      description: tObj?.description || product.description,
      category: tObj?.category || translateCategory(product.category || ''),
      price: formatPrice(product.price)
    };
  };

  const getOrderMessage = (productName: string, priceStr: string): string => {
    if (language === 'bn') {
      return `হ্যালো Pretty Pocket! 🌸\nআমি অর্ডার করতে চাই: ${productName} (${priceStr})।\nঅনুগ্রহ করে ডেলিভারির বিস্তারিত জানান।`;
    }
    return `Hi Pretty Pocket! 🌸\nI would like to order: ${productName} (${priceStr}).\nPlease share delivery details.`;
  };

  const getWhatsappOrderUrl = (productName: string, priceStr: string): string => {
    const msg = getOrderMessage(productName, priceStr);
    return `https://wa.me/8801314671743?text=${encodeURIComponent(msg)}`;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        formatPrice,
        translateCategory,
        translateProduct,
        getWhatsappOrderUrl,
        getOrderMessage
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
