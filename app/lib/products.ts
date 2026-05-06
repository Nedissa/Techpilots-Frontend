export interface Product {
  id: string;
  title: string;
  handle: string;
  price: number;
  originalPrice?: number;
  brand?: string;
  discount?: string;
  discountPercent?: number;
  rating?: number;
  reviews?: number;
  image: string;
  colors?: string[];
  stock?: string;
  features?: string[];
  isNew?: boolean;
  category?: string;
}

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', title: 'ASUS ROG Gaming Laptop', handle: 'asus-rog-gaming-laptop', price: 14999, originalPrice: 18099, brand: 'ASUS', discount: 'Upp till 17% rabatt', rating: 5, reviews: 128, image: '/assets/Produkt bilder/LAPTOP/1978563_1.webp', colors: ['#000000', '#808080'], stock: 'I lager (128 st)', features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'], category: 'laptops' },
  { id: '2', title: 'Gaming Stationär dator', handle: 'gaming-stationär-dator', price: 8999, originalPrice: 9999, brand: 'Custom Build', discount: 'Upp till 10% rabatt', rating: 5, reviews: 89, image: '/assets/Produkt bilder/STATIONÄR/1.webp', colors: ['#000000'], stock: 'I lager (89 st)', features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'], category: 'desktops' },
  { id: '3', title: 'Premium Gaming Laptop Pro', handle: 'premium-gaming-laptop-pro', price: 11999, originalPrice: 13999, brand: 'ASUS', discount: 'Upp till 14% rabatt', rating: 5, reviews: 156, image: '/assets/Produkt bilder/LAPTOP/1978563_2.webp', colors: ['#000000', '#808080'], stock: 'I lager (156 st)', features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'], category: 'laptops' },
  { id: '4', title: 'Workstation dator', handle: 'workstation-dator', price: 1499, originalPrice: 1899, brand: 'Custom', discount: 'Upp till 21% rabatt', rating: 5, reviews: 67, image: '/assets/Produkt bilder/STATIONÄR/6907594_t7dv07.webp', colors: ['#000000'], stock: 'I lager (67 st)', features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'], category: 'desktops' },
  { id: '5', title: 'High Performance Laptop', handle: 'high-performance-laptop', price: 12999, originalPrice: 14999, brand: 'ASUS', discount: 'Upp till 13% rabatt', rating: 5, reviews: 112, image: '/assets/Produkt bilder/LAPTOP/1978563_3.webp', colors: ['#000000', '#808080'], stock: 'I lager (112 st)', features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'], category: 'laptops' },
  { id: '6', title: 'Professional workstation', handle: 'professional-workstation', price: 7999, originalPrice: 8999, brand: 'Custom', discount: 'Upp till 11% rabatt', rating: 5, reviews: 95, image: '/assets/Produkt bilder/STATIONÄR/6907594_jzbn2q.webp', colors: ['#000000'], stock: 'I lager (95 st)', features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'], category: 'desktops' },
];

export const CATEGORY_TITLES: Record<string, string> = {
  'laptops': 'Bärbara datorer',
  'desktops': 'Stationära Datorer',
  'accessories': 'Datortillbehör',
  'components': 'Komponenter',
  'gaming-laptops': 'Gaming Bärbara datorer',
  'gaming-pc': 'Gaming Stationär dator',
  'phones': 'Mobiltelefoner',
  'ultrabooks': 'Ultrabooks',
};

export function getProductByHandle(handle: string): Product | undefined {
  return MOCK_PRODUCTS.find(product => product.handle === handle);
}

export function getCategoryTitle(slug: string): string {
  return CATEGORY_TITLES[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
}
