'use client';

import { useState } from 'react';
import { ProductFilter } from '@/app/components/ProductFilter';
import { ProductCardGrid } from '@/app/components/ProductCardGrid';
import { Breadcrumb } from '@/app/components/Breadcrumb';

interface Product {
  id: string;
  title: string;
  handle: string;
  price: number;
  originalPrice?: number;
  brand?: string;
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

interface BreadcrumbTrail {
  mainCategorySlug: string;
  mainCategoryTitle: string;
  subcategorySlug: string;
  subcategoryTitle: string;
}

export function ProductSeriesContent({
  categoryTitle,
  categorySlug,
  breadcrumbTrail,
  products
}: {
  categoryTitle: string;
  categorySlug: string;
  breadcrumbTrail: BreadcrumbTrail | null;
  products: Product[];
}) {
  const maxPrice = Math.max(...products.map(p => p.price));

  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, maxPrice],
    brands: [],
    rating: null,
    inStock: false,
  });

  const filteredProducts = products.filter((product) => {
    const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const brandMatch = filters.brands.length === 0 || !product.brand || filters.brands.includes(product.brand);
    const ratingMatch = filters.rating === null || (product.rating || 0) >= filters.rating;
    const stockMatch = !filters.inStock || product.stock?.includes('I lager');
    return priceMatch && brandMatch && ratingMatch && stockMatch;
  });

  const breadcrumbItems = breadcrumbTrail
    ? [
        { label: breadcrumbTrail.mainCategoryTitle, href: '#' },
        { label: breadcrumbTrail.subcategoryTitle, href: `/produktserier/${breadcrumbTrail.subcategorySlug}` },
      ]
    : [];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex">
        <ProductFilter onFilterChange={setFilters} maxPrice={maxPrice} />
        <div className="flex-1 px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{categoryTitle}</h1>
          <ProductCardGrid products={filteredProducts} categorySlug={categorySlug} breadcrumbTrail={breadcrumbTrail} showSort={true} />
        </div>
      </div>
    </div>
  );
}
