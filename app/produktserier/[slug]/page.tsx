import { useState } from 'react';
import { MainLayout } from '@/app/components/MainLayout';
import { ProductFilter } from '@/app/components/ProductFilter';
import { ProductCardGrid3 } from '@/app/components/ProductCardGrid3';

// Mock products
const MOCK_PRODUCTS = [
  { id: '1', title: 'ASUS ROG Gaming Laptop', handle: 'asus-rog-gaming-laptop', price: 14999, originalPrice: 18099, brand: 'ASUS', discount: 'Upp till 17% rabatt', rating: 5, reviews: 128, image: '/assets/Produkt bilder/LAPTOP/1978563_1.webp', colors: ['#000000', '#808080'], stock: 'I lager (128 st)', features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'] },
  { id: '2', title: 'Gaming Stationär dator', handle: 'gaming-stationär-dator', price: 8999, originalPrice: 9999, brand: 'Custom Build', discount: 'Upp till 10% rabatt', rating: 5, reviews: 89, image: '/assets/Produkt bilder/STATIONÄR/1.webp', colors: ['#000000'], stock: 'I lager (89 st)', features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'] },
  { id: '3', title: 'Premium Gaming Laptop Pro', handle: 'premium-gaming-laptop-pro', price: 11999, originalPrice: 13999, brand: 'ASUS', discount: 'Upp till 14% rabatt', rating: 5, reviews: 156, image: '/assets/Produkt bilder/LAPTOP/1978563_2.webp', colors: ['#000000', '#808080'], stock: 'I lager (156 st)', features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'] },
  { id: '4', title: 'Workstation dator', handle: 'workstation-dator', price: 1499, originalPrice: 1899, brand: 'Custom', discount: 'Upp till 21% rabatt', rating: 5, reviews: 67, image: '/assets/Produkt bilder/STATIONÄR/6907594_t7dv07.webp', colors: ['#000000'], stock: 'I lager (67 st)', features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'] },
  { id: '5', title: 'High Performance Laptop', handle: 'high-performance-laptop', price: 12999, originalPrice: 14999, brand: 'ASUS', discount: 'Upp till 13% rabatt', rating: 5, reviews: 112, image: '/assets/Produkt bilder/LAPTOP/1978563_3.webp', colors: ['#000000', '#808080'], stock: 'I lager (112 st)', features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'] },
  { id: '6', title: 'Professional workstation', handle: 'professional-workstation', price: 7999, originalPrice: 8999, brand: 'Custom', discount: 'Upp till 11% rabatt', rating: 5, reviews: 95, image: '/assets/Produkt bilder/STATIONÄR/6907594_jzbn2q.webp', colors: ['#000000'], stock: 'I lager (95 st)', features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'] },
];

const CATEGORY_TITLES: Record<string, string> = {
  'laptops': 'Bärbara datorer',
  'desktops': 'Stationära Datorer',
  'accessories': 'Datortillbehör',
  'components': 'Komponenter',
  'gaming-laptops': 'Gaming Bärbara datorer',
  'gaming-pc': 'Gaming Stationär dator',
  'phones': 'Mobiltelefoner',
};

interface FilterOptions {
  priceRange: [number, number];
  brands: string[];
  rating: number | null;
  inStock: boolean;
}

interface PageProps {
  params: {
    slug: string;
  };
}

function ProductSeriesPageContent({ slug }: { slug: string }) {
  const categoryTitle = CATEGORY_TITLES[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 20000],
    brands: [],
    rating: null,
    inStock: false,
  });

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand);
    const ratingMatch = filters.rating === null || (product.rating || 0) >= filters.rating;
    const stockMatch = !filters.inStock || product.stock.includes('I lager');
    return priceMatch && brandMatch && ratingMatch && stockMatch;
  });

  return (
    <div className="flex">
      <ProductFilter onFilterChange={setFilters} />
      <div className="flex-1 px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{categoryTitle}</h1>
        <ProductCardGrid3 products={filteredProducts} />
      </div>
    </div>
  );
}

export default function ProductSeriesPage({ params }: PageProps) {
  return (
    <MainLayout>
      <ProductSeriesPageContent slug={params.slug} />
    </MainLayout>
  );
}
