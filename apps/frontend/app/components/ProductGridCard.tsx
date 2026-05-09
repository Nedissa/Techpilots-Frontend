'use client';

import Link from 'next/link';
import { ProductData } from './ProductCard';

interface ProductGridCardProps {
  product: ProductData;
}

export function ProductGridCard({ product }: ProductGridCardProps) {
  return (
    <Link href={`/produkter/${product.handle}`}>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full">
        <div className="bg-gray-200 h-48 flex items-center justify-center overflow-hidden">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-10">{product.title}</h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating || 0) ? 'text-yellow-400 text-sm' : 'text-gray-300 text-sm'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-600">({product.reviews || 0})</span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-black">{product.price} SEK</span>
              {(product.originalPrice || 0) > product.price && (
                <span className="text-sm text-gray-500 line-through">{product.originalPrice} SEK</span>
              )}
            </div>
            {(product.originalPrice || 0) > product.price && (
              <p className="text-xs text-green-600 font-semibold mt-1">
                Spara {Math.round((((product.originalPrice || 0) - product.price) / (product.originalPrice || 1)) * 100)}%
              </p>
            )}
          </div>

          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 text-sm font-semibold transition-colors">
            Lägg i varukorg
          </button>
        </div>
      </div>
    </Link>
  );
}
