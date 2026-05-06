'use client';

import Link from 'next/link';
import { useState, useCallback, useMemo } from 'react';

interface Product {
  id: string;
  title: string;
  handle: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  isNew?: boolean;
  discount?: string;
  discountPercent?: number;
  rating?: number;
  reviews?: number;
  colors?: string[];
  features?: string[];
  stock?: string;
}

type SortOption = 'recommended' | 'latest' | 'rating' | 'popularity' | 'price-asc' | 'price-desc';

interface BreadcrumbTrail {
  mainCategorySlug: string;
  mainCategoryTitle: string;
  subcategorySlug: string;
  subcategoryTitle: string;
}

export function ProductCardGrid({
  products,
  categorySlug,
  breadcrumbTrail,
  sortBy: externalSortBy,
}: {
  products: Product[];
  categorySlug?: string;
  breadcrumbTrail?: BreadcrumbTrail | null;
  sortBy?: SortOption;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SortOption>(externalSortBy || 'recommended');
  const [imageIndex, setImageIndex] = useState<Record<string, number>>({});


  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortBy) {
      case 'latest':
        return sorted.reverse();
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'popularity':
        return sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  }, [products, sortBy]);

  const addToCart = useCallback((product: Product) => {
    const cartEvent = new CustomEvent('addToCart', {
      detail: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      },
    });
    window.dispatchEvent(cartEvent);

    setAddedIds(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Products Grid */}
      <div className="grid grid-cols-3 gap-6 py-6">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col bg-white h-full"
          >
            {/* Image Container with Badges */}
            <div
              className="relative bg-gray-100 overflow-hidden mb-4 aspect-square flex items-center justify-center"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => {
                setHoveredId(null);
              }}
              onMouseMove={(e) => {
                if (!product.images || product.images.length === 0) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const thirdWidth = rect.width / 3;

                let newIndex = 0;
                if (x < thirdWidth) {
                  newIndex = 0;
                } else if (x < thirdWidth * 2) {
                  newIndex = 1;
                } else {
                  newIndex = 2;
                }

                setImageIndex(prev => ({
                  ...prev,
                  [product.id]: newIndex,
                }));
              }}
            >
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                {product.isNew && (
                  <div className="bg-orange-600 text-white px-2.5 py-1 rounded text-xs font-bold w-fit">
                    Ny
                  </div>
                )}
                {product.discountPercent ? (
                  <div className="bg-red-700 text-white px-2.5 py-1 rounded text-xs font-bold">
                    -{product.discountPercent}%
                  </div>
                ) : product.discount ? (
                  <div className="bg-red-700 text-white px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1">
                    <span>♥</span>
                    <span>{product.discount}</span>
                  </div>
                ) : null}
              </div>

              <Link href={categorySlug ? `/produktserier/${categorySlug}/${product.handle}` : `/produkter/${product.handle}`} scroll={false} className="w-full h-full flex items-center justify-center relative">
                <style>{`
                  @keyframes fadeIn {
                    from {
                      opacity: 0;
                    }
                    to {
                      opacity: 1;
                    }
                  }
                  .fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                  }
                `}</style>
                <img
                  key={imageIndex[product.id] || 0}
                  src={product.images?.[imageIndex[product.id] || 0] || product.image}
                  alt={product.title}
                  className={`w-full h-full object-contain p-8 ${(imageIndex[product.id] || 0) > 0 ? 'fade-in' : ''}`}
                />
              </Link>
            </div>

            {/* Image Carousel Dots */}
            {product.images && product.images.length > 0 && (
              <div className="flex gap-2 justify-center mb-4">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(prev => ({ ...prev, [product.id]: idx }))}
                    className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                      (imageIndex[product.id] || 0) === idx ? 'bg-gray-900' : 'bg-gray-300'
                    }`}
                    aria-label={`Image ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Product Info */}
            <div className="flex-1 flex flex-col">
              {/* Brand */}
              <p className="text-xs text-gray-500 font-medium mb-2 uppercase">{product.brand}</p>

              {/* Title */}
              <h3 className="text-sm font-semibold text-gray-900 mb-3 leading-snug">
                {product.title}
              </h3>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <ul className="text-xs text-gray-600 mb-3 space-y-1">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">({product.reviews})</span>
                </div>
              )}

              {/* Price */}
              <div className="mb-3">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price.toLocaleString('sv-SE')} kr
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.originalPrice.toLocaleString('sv-SE')} kr
                    </span>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              {product.stock && (
                <p className="text-xs text-green-600 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  {product.stock}
                </p>
              )}

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      className="w-5 h-5 border-2 border-gray-300 hover:border-gray-900 transition-colors"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              )}

              {/* Button Container */}
              {product.stock && (
                <div className="mt-auto">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={addedIds.has(product.id)}
                    className={`w-full py-2.5 font-semibold text-sm flex items-center justify-center gap-2 bg-black text-white`}
                  >
                    {addedIds.has(product.id) ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                        Tillagd
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                        Lägg i varukorg
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
