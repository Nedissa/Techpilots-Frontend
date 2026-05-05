'use client';

import { useState } from 'react';
import { MainLayout } from '@/app/components/MainLayout';
import { ProductFilter } from '@/app/components/ProductFilter';
import { ProductCardGrid3 } from '@/app/components/ProductCardGrid3';

const MOCK_PRODUCTS = [
  { id: '1', title: 'ASUS ROG Gaming Laptop', handle: 'asus-rog-gaming-laptop', price: 14999, originalPrice: 18099, brand: 'ASUS', discount: 'Upp till 17% rabatt', rating: 5, reviews: 128, image: '/assets/Produkt bilder/LAPTOP/1978563_1.webp', colors: ['#000000', '#808080'], stock: 'I lager (128 st)', features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'] },
  { id: '3', title: 'Premium Gaming Laptop Pro', handle: 'premium-gaming-laptop-pro', price: 11999, originalPrice: 13999, brand: 'ASUS', discount: 'Upp till 14% rabatt', rating: 5, reviews: 156, image: '/assets/Produkt bilder/LAPTOP/1978563_2.webp', colors: ['#000000', '#808080'], stock: 'I lager (156 st)', features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'] },
  { id: '5', title: 'High Performance Laptop', handle: 'high-performance-laptop', price: 12999, originalPrice: 14999, brand: 'ASUS', discount: 'Upp till 13% rabatt', rating: 5, reviews: 112, image: '/assets/Produkt bilder/LAPTOP/1978563_3.webp', colors: ['#000000', '#808080'], stock: 'I lager (112 st)', features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'] },
];

interface FilterOptions {
  priceRange: [number, number];
  brands: string[];
  rating: number | null;
  inStock: boolean;
}

export default function LaptopsPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 20000],
    brands: [],
    rating: null,
    inStock: false,
  });

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand);
    const ratingMatch = filters.rating === null || product.rating >= filters.rating;
    const stockMatch = !filters.inStock || product.stock.includes('I lager');
    return priceMatch && brandMatch && ratingMatch && stockMatch;
  });

  return (
    <MainLayout>
      <div className="flex gap-6">
        <ProductFilter onFilterChange={setFilters} />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Laptops</h1>
          <ProductCardGrid3 products={filteredProducts} />
        </div>
      </div>
    </MainLayout>
  );
}
