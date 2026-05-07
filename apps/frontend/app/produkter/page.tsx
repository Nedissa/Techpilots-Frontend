'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MainLayout } from '@/app/components/MainLayout';
import { fetchProductsFromMedusa, type Product } from '@/app/lib/medusa-client';

const CATEGORIES = ['Alla', 'Laptops', 'Komponenter', 'Datorer', 'Tillbehör'];

const FALLBACK_PRODUCTS = [
  { id: '1', title: 'ASUS ROG Gaming Laptop 16"', handle: 'asus-rog-gaming-laptop', price: 14999, originalPrice: 17999, rating: 4.8, reviews: 128, category: 'Laptops', image: '/assets/Produkt bilder/LAPTOP/1978563_1.webp' },
  { id: '2', title: 'Intel Core i9-13900H', handle: 'intel-core-i9', price: 8999, originalPrice: 9999, rating: 4.7, reviews: 89, category: 'Komponenter', image: 'https://via.placeholder.com/300?text=Intel+i9' },
  { id: '3', title: 'NVIDIA RTX 4080', handle: 'nvidia-rtx-4080', price: 11999, originalPrice: 13999, rating: 4.9, reviews: 156, category: 'Komponenter', image: 'https://via.placeholder.com/300?text=RTX+4080' },
  { id: '4', title: 'Corsair Headset', handle: 'corsair-headset', price: 1499, originalPrice: 1899, rating: 4.6, reviews: 67, category: 'Tillbehör', image: 'https://via.placeholder.com/300?text=Corsair+Headset' },
  { id: '5', title: 'Dell XPS 13', handle: 'dell-xps-13', price: 12999, originalPrice: 14999, rating: 4.8, reviews: 112, category: 'Laptops', image: 'https://via.placeholder.com/300?text=Dell+XPS' },
  { id: '6', title: 'AMD Ryzen 9', handle: 'amd-ryzen-9', price: 7999, originalPrice: 8999, rating: 4.7, reviews: 95, category: 'Komponenter', image: 'https://via.placeholder.com/300?text=AMD+Ryzen' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Alla');
  const [sortBy, setSortBy] = useState('relevant');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log('ProductsPage useEffect running');
    const loadProducts = async () => {
      console.log('loadProducts called');
      setLoading(true);
      const fetchedProducts = await fetchProductsFromMedusa();
      console.log('fetchedProducts result:', fetchedProducts);
      setProducts(fetchedProducts.length > 0 ? fetchedProducts : FALLBACK_PRODUCTS);
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
                <Link key={product.id} href={`/produkter/${product.handle}`}>
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
              ))}
            </div>

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
