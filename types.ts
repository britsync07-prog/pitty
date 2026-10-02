export interface Product {
  id: string | number;
  name: string;
  banglaName?: string;
  price: string;
  numericPrice: number;
  category: 'Bangles & Jewelry' | 'Cosmetics & Beauty' | 'Hair & Accessories' | 'Gift Bouquets & Combos' | 'Lifestyle & Gadgets';
  image: string;
  images?: string[];
  badge?: string;
  description: string;
  stock?: string;
  details?: string[];
  variants?: string[];
}

export interface StoreInfo {
  name: string;
  tagline: string;
  subTagline: string;
  phone: string;
  whatsapp: string;
  whatsappLink: string;
  email: string;
  instagram: string;
  instagramHandle: string;
  facebook: string;
  location: string;
  deliveryNote: string;
}
