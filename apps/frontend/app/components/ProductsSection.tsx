'use client';

import { useState } from 'react';
import { ProductCardGrid } from './ProductCardGrid';
import { ProductData } from './ProductCard';

type SectionVariant = 'popular' | 'recommended' | 'new' | 'related';

const SECTION_CONFIG: Record<SectionVariant, { title: string; buttonLabel: string }> = {
  popular: {
    title: 'Populära produkter',
    buttonLabel: 'Lägg i varukorg',
  },
  recommended: {
    title: 'Rekommenderade produkter',
    buttonLabel: 'Lägg i varukorg',
  },
  new: {
    title: 'Nya produkter',
    buttonLabel: 'Lägg i varukorg',
  },
  related: {
    title: 'Relaterade produkter',
    buttonLabel: 'Lägg i varukorg',
  },
};

type Product = ProductData;

export function ProductsSection({
  variant = 'recommended',
  products,
}: {
  variant?: SectionVariant;
  products: Product[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const config = SECTION_CONFIG[variant];
  const itemsPerPage = 4;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const visibleProducts = products.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section className="py-8">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{config.title}</h2>
        </div>
        <ProductCardGrid products={visibleProducts} variant={variant as 'popular' | 'recommended' | 'new' | 'related'} />
      </div>
    </section>
  );
}
