'use client';

import { useState, useEffect } from 'react';

interface FilterOptions {
  priceRange: [number, number];
  brands: string[];
  colors: string[];
  rating: number | null;
  inStock: boolean;
}

interface ProductFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  maxPrice?: number;
}

const BRANDS = ['ASUS', 'Canon', 'Nikon', 'Sony', 'Fujifilm', 'Custom', 'Multi'];
const COLORS = [
  { name: 'Svart', value: '#000000' },
  { name: 'Vit', value: '#FFFFFF' },
  { name: 'Silver', value: '#C0C0C0' },
  { name: 'Grå', value: '#808080' },
];

export function ProductFilter({ onFilterChange, maxPrice = 20000 }: ProductFilterProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>(() => [0, maxPrice]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    price: true,
    brands: true,
    colors: true,
    rating: true,
    stock: true,
  });

  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const snapToInterval = (value: number) => {
    const interval = 200;
    return Math.round(value / interval) * interval;
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    const snappedValue = snapToInterval(value);
    const newRange: [number, number] = type === 'min'
      ? [snappedValue, priceRange[1]]
      : [priceRange[0], snappedValue];
    setPriceRange(newRange);
    updateFilters(newRange, selectedBrands, selectedColors, selectedRating, inStockOnly);
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
    updateFilters(priceRange, newBrands, selectedColors, selectedRating, inStockOnly);
  };

  const handleColorToggle = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    setSelectedColors(newColors);
    updateFilters(priceRange, selectedBrands, newColors, selectedRating, inStockOnly);
  };

  const handleRatingChange = (rating: number) => {
    const newRating = selectedRating === rating ? null : rating;
    setSelectedRating(newRating);
    updateFilters(priceRange, selectedBrands, selectedColors, newRating, inStockOnly);
  };

  const handleStockChange = () => {
    const newStock = !inStockOnly;
    setInStockOnly(newStock);
    updateFilters(priceRange, selectedBrands, selectedColors, selectedRating, newStock);
  };

  const updateFilters = (
    range: [number, number],
    brands: string[],
    colors: string[],
    rating: number | null,
    stock: boolean
  ) => {
    onFilterChange({
      priceRange: range,
      brands,
      colors,
      rating,
      inStock: stock,
    });
  };

  const resetFilters = () => {
    setPriceRange([0, maxPrice]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedRating(null);
    setInStockOnly(false);
    updateFilters([0, maxPrice], [], [], null, false);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-300 flex flex-col h-full">
      <div className="p-6 border-b border-gray-300">
        <h3 className="text-lg font-bold text-black">Filter</h3>
      </div>

      {/* Price Range */}
      <div className="border-b border-gray-300">
        <button
          onClick={() => toggleSection('price')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <h4 className="text-sm font-semibold text-black">Pris</h4>
          <svg className={`w-4 h-4 text-black transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </button>
        {expandedSections.price && (
        <div className="px-6 py-4 space-y-4 w-full overflow-hidden">
          <div className="price-slider-container w-full">
            <div className="price-slider-track bg-gray-300 rounded pointer-events-none">
              <div
                className="absolute h-1 bg-black rounded"
                style={{
                  top: 0,
                  left: `${(priceRange[0] / maxPrice) * 100}%`,
                  right: `${100 - (priceRange[1] / maxPrice) * 100}%`,
                }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange[0]}
              onChange={(e) => {
                const newMin = Number(e.target.value);
                if (newMin <= priceRange[1]) {
                  handlePriceChange('min', newMin);
                }
              }}
              className="price-input"
            />
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => {
                const newMax = Number(e.target.value);
                if (newMax >= priceRange[0]) {
                  handlePriceChange('max', newMax);
                }
              }}
              className="price-input"
            />
          </div>
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={priceRange[0]}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  if (value === '') {
                    handlePriceChange('min', priceRange[0]);
                    return;
                  }
                  let newMin = Number(value);
                  if (isNaN(newMin)) return;
                  if (newMin > maxPrice) newMin = maxPrice;
                  if (newMin <= priceRange[1]) {
                    handlePriceChange('min', newMin);
                  }
                }}
                className="w-14 px-1 py-0.5 text-xs text-gray-700 text-center border-b border-gray-400 focus:outline-none focus:border-gray-700"
              />
              <span className="text-gray-600">kr</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={priceRange[1]}
                onChange={(e) => {
                  let newMax = Number(e.target.value) || maxPrice;
                  if (newMax > maxPrice) newMax = maxPrice;
                  if (newMax >= priceRange[0]) {
                    handlePriceChange('max', newMax);
                  }
                }}
                className="w-14 px-1 py-0.5 text-xs text-gray-700 text-center border-b border-gray-400 focus:outline-none focus:border-gray-700"
              />
              <span className="text-gray-600">kr</span>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Brands */}
      <div className="border-b border-gray-300">
        <button
          onClick={() => toggleSection('brands')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <h4 className="text-sm font-semibold text-black">Märke</h4>
          <svg className={`w-4 h-4 text-black transition-transform ${expandedSections.brands ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </button>
        {expandedSections.brands && (
        <div className="px-6 py-4 space-y-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="w-4 h-4 border-gray-400 accent-black"
              />
              <span className="text-sm text-gray-800">{brand}</span>
            </label>
          ))}
        </div>
        )}
      </div>

      {/* Colors */}
      <div className="border-b border-gray-300">
        <button
          onClick={() => toggleSection('colors')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <h4 className="text-sm font-semibold text-black">Färg</h4>
          <svg className={`w-4 h-4 text-black transition-transform ${expandedSections.colors ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </button>
        {expandedSections.colors && (
        <div className="px-6 py-4 space-y-3">
          {COLORS.map((color) => (
            <label key={color.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedColors.includes(color.value)}
                onChange={() => handleColorToggle(color.value)}
                className="w-4 h-4 border-gray-400 accent-black"
              />
              <div className="flex items-center gap-2 flex-1">
                <div
                  className="w-5 h-5 rounded border-2 border-gray-400"
                  style={{ backgroundColor: color.value }}
                />
                <span className="text-sm text-gray-800">{color.name}</span>
              </div>
            </label>
          ))}
        </div>
        )}
      </div>

      {/* Rating */}
      <div className="border-b border-gray-300">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <h4 className="text-sm font-semibold text-black">Betyg</h4>
          <svg className={`w-4 h-4 text-black transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </button>
        {expandedSections.rating && (
        <div className="px-6 py-4 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedRating === rating}
                onChange={() => handleRatingChange(rating)}
                className="w-4 h-4 border-gray-400 accent-black"
              />
              <div className="flex items-center gap-2 flex-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-800">({rating}+)</span>
              </div>
            </label>
          ))}
        </div>
        )}
      </div>

      {/* Stock Status */}
      <div className="border-b border-gray-300">
        <button
          onClick={() => toggleSection('stock')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <h4 className="text-sm font-semibold text-black">Lagerstatus</h4>
          <svg className={`w-4 h-4 text-black transition-transform ${expandedSections.stock ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </button>
        {expandedSections.stock && (
        <div className="px-6 py-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={handleStockChange}
              className="w-4 h-4 border-gray-400 accent-black"
            />
            <span className="text-sm font-semibold text-gray-800">Endast i lager</span>
          </label>
        </div>
        )}
      </div>

      {/* Reset Filters Button */}
      <div className="mt-auto p-6 border-t border-gray-300">
        <button
          onClick={resetFilters}
          className="w-full px-4 py-2 bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          Rensa filter
        </button>
      </div>
    </div>
  );
}
