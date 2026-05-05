'use client';

import { useState } from 'react';
import { ProductFilter } from '@/app/components/ProductFilter';
import { ProductCardGrid3 } from '@/app/components/ProductCardGrid3';

interface Product {
  id: string;
  title: string;
  handle: string;
  price: number;
  originalPrice?: number;
  brand: string;
  discount?: string;
  rating?: number;
  reviews?: number;
  image: string;
  colors?: string[];
  stock?: string;
  features?: string[];
}

interface FilterOptions {
  priceRange: [number, number];
  brands: string[];
  rating: number | null;
  inStock: boolean;
}

export function ProductSeriesContent({
  categoryTitle,
  products
}: {
  categoryTitle: string;
  products: Product[];
}) {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 20000],
    brands: [],
    rating: null,
    inStock: false,
  });

  const filteredProducts = products.filter((product) => {
    const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand);
    const ratingMatch = filters.rating === null || (product.rating || 0) >= filters.rating;
    const stockMatch = !filters.inStock || product.stock?.includes('I lager');
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
