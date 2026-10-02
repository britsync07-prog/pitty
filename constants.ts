import { Product, StoreInfo } from './types';

export const STORE_INFO: StoreInfo = {
  name: 'Pretty Pocket',
  tagline: 'Elegance & Grace',
  subTagline: 'Your daily dose of glam, without breaking the bank! ✨',
  phone: '+880 1314-671743',
  whatsapp: '+880 1314-671743',
  whatsappLink: 'https://wa.me/8801314671743',
  email: '2005ishika2005@gmail.com',
  instagram: 'https://www.instagram.com/prettypoket',
  instagramHandle: '@prettypoket',
  facebook: 'https://www.facebook.com/profile.php?id=61591337513485',
  location: 'Dhaka, Bangladesh',
  deliveryNote: 'Cash on home delivery inside Dhaka & all across Bangladesh ✨',
};

export const LOGO_IMAGE = '/756530775_122111785431377917_292904860190451540_n.jpg';
export const HERO_BG_IMAGE = '/727243110_122093666301377917_8066216397650906534_n.jpg';

export const CATEGORIES = [
  'All Products',
  'Bangles & Jewelry',
  'Cosmetics & Beauty',
  'Hair & Accessories',
  'Gift Bouquets & Combos',
  'Lifestyle & Gadgets'
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Jelly Bangles Set (Purple & Green)',
    banglaName: 'পার্পল ও গ্রিন জেলি চুড়ি',
    price: '৳220',
    numericPrice: 220,
    category: 'Bangles & Jewelry',
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1611591475871-33e46c76198f?auto=format&fit=crop&q=80&w=900',
    images: [
      'https://images.unsplash.com/photo-1611591475871-33e46c76198f?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=900'
    ],
    description: 'Super viral and trending Jelly bangles in mesmerizing purple and green hues! Smooth crystal-gloss finish that catches light effortlessly. Available sizes: 2.4, 2.6, 2.8. Limited stock available. Cash on home delivery inside Dhaka ❤️',
    stock: 'Limited Stock',
    variants: ['Size: 2.4', 'Size: 2.6', 'Size: 2.8', 'Color: Purple', 'Color: Green'],
    details: ['Premium glass/acrylic finish', 'Snag-free smooth edges', 'Lightweight & comfortable for daily wear']
  },
  {
    id: 2,
    name: 'Glow Highlighter 6-Piece Set',
    banglaName: '৬ পিস হাইলাইটার সেট',
    price: '৳150',
    numericPrice: 150,
    category: 'Cosmetics & Beauty',
    badge: 'Under ৳299',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=900',
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=900'
    ],
    description: 'Complete 6-piece highlighter set for that dreamy, sun-kissed luminous finish! Ultra-fine shimmer formula blends like butter on cheekbones, brow bones, and collarbones. Pocket-friendly glam at its finest!',
    stock: 'In Stock',
    details: ['6 unique shimmering shades', 'Smooth blendable formula', 'Compact travel-friendly packaging']
  },
  {
    id: 3,
    name: 'Customized Lays Crunchy Snack Bouquet',
    banglaName: 'কাস্টমাইজড লেইস ক্রাঞ্চি বোকে',
    price: '৳299',
    numericPrice: 299,
    category: 'Gift Bouquets & Combos',
    badge: 'Most Viral',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=900',
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=900'
    ],
    description: 'Flowers are cute, but Lays are cuter! 🌷🥔💗 A bouquet, but make it crunchy 💐✨ Love wrapped in Lays: because flowers fade, Lays don\'t! Custom made with your favorite chip flavors, romantic ribbons, and floral accents. Perfect birthday, anniversary, or surprise gift.',
    stock: 'Made to Order',
    variants: ['Classic Salted', 'Sour Cream & Onion', 'Spanish Tomato Tango', 'Custom Chips of Choice'],
    details: ['Customized with message card', 'Carefully arranged with satin ribbons', 'Fresh sealed snacks']
  },
  {
    id: 4,
    name: 'Photo Frame & Chocolate Cute Combo',
    banglaName: 'ফটোফ্রেম ও চকোলেট গিফট কম্বো',
    price: '৳290',
    numericPrice: 290,
    category: 'Gift Bouquets & Combos',
    badge: 'Loved One Gift',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=900',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=900'
    ],
    description: 'আপনার প্রিয় মানুষকে এখনও গিফট দিচ্ছেন না কেন? ❤️ Surprise your special someone with this adorable keepsake combo: a high quality photo frame paired with mouthwatering chocolates, wrapped in an aesthetic gift package.',
    stock: 'In Stock',
    details: ['Durable elegant frame', 'Premium chocolates included', 'Gift wrap & ribbon packaging included']
  },
  {
    id: 5,
    name: 'Kinder Joy Sweet Love Bouquet',
    banglaName: 'কিন্ডারজয় সুইট বোকে',
    price: '৳280',
    numericPrice: 280,
    category: 'Gift Bouquets & Combos',
    badge: 'Sweet Surprise',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=900',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=900'
    ],
    description: 'Apu vaiya ra kothay❓ Akhono gift pan nai ❓ Apnr prio manus ke mention din! Beautiful handcrafted Kinder Joy bouquet wrapped in pastel blush paper with cute bows. Guaranteed to bring a wide smile!',
    stock: 'In Stock',
    details: ['Genuine Kinder Joy treats', 'Pastel aesthetic wrapping', 'Delivered safely with home delivery']
  },
  {
    id: 6,
    name: '5-Speed Turbo High-Velocity Mini Fan',
    banglaName: '৫-স্পিড টার্বো পোর্টেবল মিনি ফ্যান',
    price: '৳550',
    numericPrice: 550,
    category: 'Lifestyle & Gadgets',
    badge: 'Viral Gadget',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=900',
    images: [
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=900'
    ],
    description: 'Beat the Dhaka heat in style! High-velocity 5-speed airflow, whisper-quiet motor, and long battery life. Pocket-sized portability for commuting, college, and outdoor trips. Available in chic Black & White.',
    stock: 'In Stock',
    variants: ['Color: Black', 'Color: White'],
    details: ['5 adjustable wind speeds', 'USB Type-C Rechargeable', 'Ultra-compact handheld & desk standing']
  },
  {
    id: 7,
    name: 'Kashmiri Churi 6-Dozen Mega Combo',
    banglaName: 'কাশ্মীরি চুড়ি ৬ ডজন মেগা কম্বো (ফ্রি ডেলিভারি)',
    price: '৳1190',
    numericPrice: 1190,
    category: 'Bangles & Jewelry',
    badge: 'Free Delivery + Secret Gift 🎁',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=900',
    images: [
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=900'
    ],
    description: 'মাত্র ৬ ডজন চুড়ি নিলেই ডেলিভারি চার্জ একদম FREE❗❗ চুড়ি আপনার, ডেলিভারি আমাদের! 😫😫 সাথে পাবেন আমাদের এক্সক্লুসিভ সিক্রেট ফ্রি গিফট (Secret Free Gift)! Traditional hand-painted Kashmiri motifs on velvet & brass.',
    stock: 'Limited Edition',
    details: ['6 full dozens of authentic Kashmiri churi', 'FREE Nationwide delivery', 'Includes Secret Gift package']
  },
  {
    id: 8,
    name: 'Kashmiri Churi 6-Piece Multicolor Set',
    banglaName: 'কাশ্মীরি চুড়ি ৬ কালার সেট',
    price: '৳990',
    numericPrice: 990,
    category: 'Bangles & Jewelry',
    badge: 'Pre-order Combo',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=900',
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=900'
    ],
    description: 'Attention please! 6 different vibrant colors in one royal combination set. Available sizes: 2.4 and 2.6. Only 12 customers will get this limited stock offer. Pre-order now before it sells out!',
    stock: 'Only 12 Left',
    variants: ['Size: 2.4', 'Size: 2.6'],
    details: ['6 unique royal colorways', 'Handmade detailing', 'Velvet lined comfort']
  },
  {
    id: 9,
    name: 'Kashmiri Churi (Per Dozen - Follower Rate)',
    banglaName: 'কাশ্মীরি চুড়ি (প্রতি ডজন)',
    price: '৳140',
    numericPrice: 140,
    category: 'Bangles & Jewelry',
    badge: 'Page Follower Offer',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=900',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=900'
    ],
    description: 'Special follower price: only ৳140 per dozen! Note: Minimum 6 dozen order required to claim this rate. Traditional intricate Kashmiri patterns that match any festive lehenga, saree, or kurti.',
    stock: 'In Stock',
    details: ['৳140 per dozen (Min 6 dozen order)', 'Authentic traditional look', 'Vibrant long-lasting colors']
  },
  {
    id: 10,
    name: 'Prestige Thermal Vacuum Insulated Flask',
    banglaName: 'প্রেস্টিজ থার্মাল ভ্যাকুয়াম ফ্লাস্ক',
    price: '৳350',
    numericPrice: 350,
    category: 'Lifestyle & Gadgets',
    badge: 'Discount ৳350',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=900',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=900'
    ],
    description: 'Prestige double-wall vacuum insulated flask! Keeps your water ice cold in summer and tea/coffee steaming hot in winter. Sleek powder-coated matte finish. Regular price 400tk, discount price only 350tk!',
    stock: 'Limited Stock',
    variants: ['350ml (৳350)', '500ml (৳550)'],
    details: ['Double-wall 304 food-grade stainless steel', '12h hot / 24h cold insulation', 'Leakproof silicone seal']
  },
  {
    id: 11,
    name: 'Resmi Churi & Shimmering Ghungoor Set',
    banglaName: 'রেশমি চুড়ি ও ঘুঙুর সেট',
    price: '৳80',
    numericPrice: 80,
    category: 'Bangles & Jewelry',
    badge: 'Under ৳100',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=900',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=900'
    ],
    description: 'Resmi Churi (রেশমি চুড়ি) at ৳55/dozen and melodious Ghungoor (ঘুঙুর ৪ পিস) at only ৳80! Perfect for Pohela Boishakh, weddings, or everyday traditional flair.',
    stock: 'In Stock',
    variants: ['Ghungoor 4-piece (৳80)', 'Resmi Churi (৳55/dozen)'],
    details: ['Sweet jingling sound', 'Pure silk thread wrapped', 'Dozens of rich traditional shades']
  },
  {
    id: 12,
    name: 'Sparkling Stone Safety Pins (12 Pcs Pack)',
    banglaName: 'স্টোন সেফটিপিন ১২ পিস সেট',
    price: '৳99',
    numericPrice: 99,
    category: 'Hair & Accessories',
    badge: 'Under ৳100',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=900',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=900'
    ],
    description: 'Stone safety pin pack containing 12 sparkling rhinestone pins! Premium rust-resistant alloy with faceted stones. Secure hold for dupattas, sarees, scarves, and hijabs without fabric tear.',
    stock: 'In Stock',
    details: ['12 pcs sparkling pins', 'Smooth pin tip protects fine fabric', 'Only 99tk pocket-friendly price']
  },
  {
    id: 13,
    name: 'Colorful Mini Hair Bands Set (100/200 Pcs)',
    banglaName: 'কালারফুল মিনি হেয়ার ব্যান্ড সেট',
    price: '৳99',
    numericPrice: 99,
    category: 'Hair & Accessories',
    badge: 'Under ৳100',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=900',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=900'
    ],
    description: '😍😍✨ মাত্র ৳99-এ Colorful Mini Hair Bands Set! 🎀 100/200 Pcs এর বড় সেট। অনেক সুন্দর কালার ও ডিজাইন। Soft & comfortable, বাচ্চাদের ও তরুণীদের জন্য Safe & Perfect।',
    stock: 'Limited Stock',
    variants: ['100 Pcs Box', '200 Pcs Box'],
    details: ['Tear-free soft elastic', 'Pastel and rainbow shades', 'Safe for toddlers, kids & adults']
  },
  {
    id: 14,
    name: 'Viral Cute Charm Bracelet',
    banglaName: 'ভাইরাল কিউট ব্রেসলেট',
    price: '৳250',
    numericPrice: 250,
    category: 'Bangles & Jewelry',
    badge: '2 for ৳500 Deal',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=900',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=900'
    ],
    description: 'Viral cute Korean style bracelet! Delicate rose-gold/silver chain with dainty charms and crystal highlights. Price only ৳250, or grab 2 pieces for ৳500 combo! Stock is limited.',
    stock: 'Limited Stock',
    variants: ['1 Piece (৳250)', '2 Pieces Combo (৳500)'],
    details: ['Adjustable wrist chain', 'Anti-tarnish coating', 'Perfect friendship or party accessory']
  },
  {
    id: 15,
    name: 'Cat Eye Magnetic Press-On Nails (10 Pcs)',
    banglaName: 'ক্যাট আই প্রেস-অন নেইল সেট',
    price: '৳50',
    numericPrice: 50,
    category: 'Cosmetics & Beauty',
    badge: 'Special ৳50 Offer',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=900',
    images: [
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=900'
    ],
    description: 'Mega Offer! 10 pcs Cat Eye shimmer false nails for only ৳50! Gorgeous salon-grade velvet cat-eye light reflection. Reusable, easy to apply, looks effortlessly chic.',
    stock: 'In Stock',
    details: ['10 pcs nails with multiple sizes', 'Cat eye magnetic galaxy shimmer', 'Quick 3-minute application']
  }
];

export const BRAND_NAME = 'Pretty Pocket';
export const BRAND_SLOGAN = 'Elegance & Grace';