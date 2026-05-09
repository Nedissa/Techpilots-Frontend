'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MainLayout } from '@/app/components/MainLayout';
import { ProductCard } from '@/app/components/ProductCard';
import { fetchProductsFromMedusa, type Product } from '@/app/lib/medusa-client';

const CATEGORIES = ['Alla', 'Laptops', 'Komponenter', 'Datorer', 'Tillbehör'];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Alla');
  const [sortBy, setSortBy] = useState('relevant');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const fetchedProducts = await fetchProductsFromMedusa();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const categoryFilteredProducts = products.filter((product) =>
    selectedCategory === 'Alla' || product.category === selectedCategory
  );
  const maxPriceInCategory = categoryFilteredProducts.length > 0
    ? Math.max(...categoryFilteredProducts.map(p => p.price))
    : 20000;

  const filtered = categoryFilteredProducts;

  if (loading) {
    return <MainLayout><div className="text-center py-10">Laddar produkter...</div></MainLayout>;
  }

  if (products.length === 0) {
    return <MainLayout><div className="text-center py-10">Ingen produkter tillgänglig</div></MainLayout>;
  }

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'newest':
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });

  // Get products for "Du kanske också gillar" section
  const alsoLikeProducts = products.filter((product) => product.sectionCategory === 'also-like');

  const productsPerPage = 12;
  const totalPages = Math.ceil(sorted.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const paginatedProducts = sorted.slice(startIdx, startIdx + productsPerPage);

  return (
    <MainLayout title="Alla produkter">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="md:col-span-1">
            <div className="space-y-8">
              {/* Category Filter */}
              <div>
                <h3 className="font-bold text-lg mb-4">Kategori</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setCurrentPage(1);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedCategory === cat
                          ? 'bg-black text-white font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-bold text-lg mb-4">Pris</h3>
                <input
                  type="range"
                  min="0"
                  max={maxPriceInCategory}
                  defaultValue={maxPriceInCategory}
                  disabled
                  className="w-full"
                />
                <p className="text-sm text-gray-600 mt-2">0 - {maxPriceInCategory.toLocaleString('sv-SE')} kr</p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {/* Sort Options */}
            <div className="mb-8 flex justify-between items-center">
              <p className="text-gray-600">Visar {paginatedProducts.length} av {sorted.length} produkter</p>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 font-semibold"
              >
                <option value="relevant">Mest relevant</option>
                <option value="price-low">Pris: Lågt till högt</option>
                <option value="price-high">Pris: Högt till lågt</option>
                <option value="rating">Högsta betyg</option>
                <option value="newest">Nyaste</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant="popular" />
              ))}
            </div>

            {/* Du kanske också gillar section */}
            {alsoLikeProducts.length > 0 && (
              <div className="mt-16 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Du kanske också gillar</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {alsoLikeProducts.map((product) => (
                    <ProductCard key={product.id} product={product} variant="also-like" />
                  ))}
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 py-8">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Föregående
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded transition-colors ${
                      currentPage === i + 1
                        ? 'bg-black text-white font-semibold'
                        : 'border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Nästa
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
