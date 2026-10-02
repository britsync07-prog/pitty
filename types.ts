export interface Product {
  id: string | number;
  name: string;
  price: string;
  category?: string;
  image: string;
  images?: string[];
  description: string;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  whatsappLink: string;
  email: string;
  instagram: string;
  facebook: string;
  location: string;
}
