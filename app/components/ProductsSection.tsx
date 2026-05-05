'use client';

import { useState } from 'react';
import { ProductItem } from './ProductItem';

type SectionVariant = 'popular' | 'recommended' | 'related';

const SECTION_CONFIG: Record<SectionVariant, { title: string; buttonLabel: string }> = {
  popular: {
    title: 'Populära produkter',
    buttonLabel: 'Lägg i varukorg',
  },
  recommended: {
    title: 'Rekommenderade produkter',
    buttonLabel: 'Lägg i varukorg',
  },
  related: {
    title: 'Du kanske också gillar',
    buttonLabel: 'Lägg i varukorg',
  },
};

interface Product {
  id: string;
  title: string;
  handle: string;
  price: string | number;
  originalPrice?: string | number;
  brand?: string;
  discount?: number;
  rating?: number;
  reviews?: number;
  specs?: string[];
}

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
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleProducts.length > 0
              ? visibleProducts.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    addToCartLabel={config.buttonLabel}
                  />
                ))
              : null}
          </div>

          {products.length > itemsPerPage && (
            <>
              <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform"
                aria-label="Föregående"
              >
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % totalPages)}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform"
                aria-label="Nästa"
              >
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
