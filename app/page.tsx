'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ProductsSection } from './components/ProductsSection';
import { ProductBanner } from './components/ProductBanner';
import { ProductCardGrid } from './components/ProductCardGrid';
import { MainLayout } from './components/MainLayout';
import { NewsletterPopup } from './components/NewsletterPopup';

const FEATURED_COLLECTIONS = [
  { title: 'Gaming Laptops', handle: 'gaming-laptops' },
  { title: 'Datorkomponenter', handle: 'datorkomponenter' },
  { title: 'Gaming Setup', handle: 'gaming-setup' },
]

function CampaignBannersSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <CampaignBanner title="Se alla veckans deals" bgColor="bg-blue-900" />
      <CampaignBanner title="Samsung Micro RGB" bgColor="bg-black" />
      <CampaignBanner title="Vi tömmer lagret!" bgColor="bg-blue-900" />
      <CampaignBanner title="50% rabatt på kök!" bgColor="bg-green-100" />
    </div>
  );
}

const PRODUCT_BASE_DATA = {
  shared: {
    features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'],
  },
  byId: {
    '1': { title: 'ASUS ROG Gaming Laptop', handle: 'asus-rog-gaming-laptop', price: 14999, originalPrice: 18099, brand: 'ASUS', discount: 'Upp till 17% rabatt', rating: 5, reviews: 128, image: '/assets/Produkt bilder/LAPTOP/1978563_1.webp', images: ['/assets/Produkt bilder/LAPTOP/1978563_1.webp', '/assets/Produkt bilder/LAPTOP/1978563_2.webp', '/assets/Produkt bilder/LAPTOP/1978563_3.webp'], colors: ['#000000', '#808080'], stock: 'I lager (128 st)' },
    '2': { title: 'Gaming Stationär Dator', handle: 'gaming-stationär-dator', price: 8999, originalPrice: 9999, brand: 'Custom Build', discount: 'Upp till 10% rabatt', rating: 5, reviews: 89, image: '/assets/Produkt bilder/STATIONÄR/1.webp', images: ['/assets/Produkt bilder/STATIONÄR/1.webp', '/assets/Produkt bilder/STATIONÄR/6907594_t7dv07.webp', '/assets/Produkt bilder/STATIONÄR/6907594_jzbn2q.webp'], colors: ['#000000'], stock: 'I lager (89 st)' },
    '3': { title: 'Premium Gaming Laptop Pro', handle: 'premium-gaming-laptop-pro', price: 11999, originalPrice: 13999, brand: 'ASUS', discount: 'Upp till 14% rabatt', rating: 5, reviews: 156, image: '/assets/Produkt bilder/LAPTOP/1978563_2.webp', images: ['/assets/Produkt bilder/LAPTOP/1978563_2.webp', '/assets/Produkt bilder/LAPTOP/1978563_3.webp', '/assets/Produkt bilder/LAPTOP/1978563_1.webp'], colors: ['#000000', '#808080'], stock: 'I lager (156 st)' },
    '4': { title: 'Workstation Dator', handle: 'workstation-dator', price: 1499, originalPrice: 1899, brand: 'Custom', discount: 'Upp till 21% rabatt', rating: 5, reviews: 67, image: '/assets/Produkt bilder/STATIONÄR/6907594_t7dv07.webp', images: ['/assets/Produkt bilder/STATIONÄR/6907594_t7dv07.webp', '/assets/Produkt bilder/STATIONÄR/6907594_jzbn2q.webp', '/assets/Produkt bilder/STATIONÄR/1.webp'], colors: ['#000000'], stock: 'I lager (67 st)' },
    '5': { title: 'High Performance Laptop', handle: 'high-performance-laptop', price: 12999, originalPrice: 14999, brand: 'ASUS', discount: 'Upp till 13% rabatt', rating: 5, reviews: 112, image: '/assets/Produkt bilder/LAPTOP/1978563_3.webp', images: ['/assets/Produkt bilder/LAPTOP/1978563_3.webp', '/assets/Produkt bilder/LAPTOP/1978563_1.webp', '/assets/Produkt bilder/LAPTOP/1978563_2.webp'], colors: ['#000000', '#808080'], stock: 'I lager (112 st)' },
    '6': { title: 'Professional Workstation', handle: 'professional-workstation', price: 7999, originalPrice: 8999, brand: 'Custom', discount: 'Upp till 11% rabatt', rating: 5, reviews: 95, image: '/assets/Produkt bilder/STATIONÄR/6907594_jzbn2q.webp', images: ['/assets/Produkt bilder/STATIONÄR/6907594_jzbn2q.webp', '/assets/Produkt bilder/STATIONÄR/1.webp', '/assets/Produkt bilder/STATIONÄR/6907594_t7dv07.webp'], colors: ['#000000'], stock: 'I lager (95 st)' },
    '7': { title: 'Gaming Setup Komplett', handle: 'gaming-setup-komplett', price: 5499, originalPrice: 6999, brand: 'Multi', discount: 'Upp till 21% rabatt', rating: 5, reviews: 78, image: '/assets/Produkt bilder/STATIONÄR/6907594_ebnf7f.webp', images: ['/assets/Produkt bilder/STATIONÄR/6907594_ebnf7f.webp', '/assets/Produkt bilder/STATIONÄR/1.webp', '/assets/Produkt bilder/STATIONÄR/6907594_jzbn2q.webp'], colors: ['#000000'], stock: 'I lager (78 st)' },
    '8': { title: 'Ultrabook Slim Laptop', handle: 'ultrabook-slim-laptop', price: 1299, originalPrice: 1699, brand: 'ASUS', discount: 'Upp till 24% rabatt', rating: 5, reviews: 234, image: '/assets/Produkt bilder/LAPTOP/6907594_v5urxz.webp', images: ['/assets/Produkt bilder/LAPTOP/6907594_v5urxz.webp', '/assets/Produkt bilder/LAPTOP/1978563_2.webp', '/assets/Produkt bilder/LAPTOP/1978563_1.webp'], colors: ['#000000', '#808080'], stock: 'I lager (234 st)' },
  },
};

const buildProduct = (id: string) => {
  const data = PRODUCT_BASE_DATA.byId[id as keyof typeof PRODUCT_BASE_DATA.byId];
  return { id, ...data, features: PRODUCT_BASE_DATA.shared.features };
};

const POPULAR_PRODUCTS = ['1', '2', '3', '4'].map(buildProduct);
const RECOMMENDED_PRODUCTS = ['5', '6', '7', '8'].map(buildProduct);

const FEATURED_PRODUCTS = [
  {
    id: '101',
    title: 'Nikon 1 S2 Point & Shoot Kamera',
    handle: 'nikon-1-s2-camera',
    brand: 'Nikon',
    price: 2269,
    originalPrice: 3404,
    image: '/assets/Produkt bilder/LAPTOP/1978563_1.webp',
    isNew: true,
    discount: 'Upp till 33% rabatt',
    rating: 4,
    reviews: 2,
    colors: ['#FFD700', '#000000', '#DC143C', '#F5F5F5'],
    stock: 'I lager (384 st)',
    features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'],
  },
  {
    id: '102',
    title: 'Canon EOS R6 Digitalkamera',
    handle: 'canon-eos-r6',
    brand: 'Canon',
    price: 3899,
    originalPrice: 4599,
    image: '/assets/Produkt bilder/LAPTOP/1978563_2.webp',
    isNew: false,
    discount: 'Upp till 15% rabatt',
    rating: 5,
    reviews: 18,
    colors: ['#000000', '#FFFFFF'],
    stock: 'I lager (156 st)',
    features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'],
  },
  {
    id: '103',
    title: 'Sony A7 IV Spegellös Kamera',
    handle: 'sony-a7-iv',
    brand: 'Sony',
    price: 3299,
    originalPrice: 3999,
    image: '/assets/Produkt bilder/LAPTOP/1978563_3.webp',
    isNew: true,
    discount: 'Upp till 18% rabatt',
    rating: 5,
    reviews: 45,
    colors: ['#000000'],
    stock: 'I lager (89 st)',
    features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'],
  },
  {
    id: '104',
    title: 'Fujifilm X-T5 Kamera',
    handle: 'fujifilm-x-t5',
    brand: 'Fujifilm',
    price: 1899,
    originalPrice: 2299,
    image: '/assets/Produkt bilder/STATIONÄR/1.webp',
    isNew: false,
    discount: 'Upp till 18% rabatt',
    rating: 4,
    reviews: 12,
    colors: ['#000000', '#808080', '#DAA520'],
    stock: 'I lager (234 st)',
    features: ['Högsta prestanda', 'Världsklass design', 'Garanterad kvalitet'],
  },
];

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const slideTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_COLLECTIONS.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [isPlaying]);

  const currentCollection = FEATURED_COLLECTIONS[currentIndex];

  return (
    <div className="relative z-0 flex justify-center">
      <div className="relative max-w-[1280px] w-full h-[484px] overflow-hidden bg-gray-900 flex items-center justify-center">
        <Link href={`/kategorier/${currentCollection.handle}`} className="block relative w-full h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{currentCollection.title}</h1>
            <button className="bg-white text-black px-8 py-3 font-semibold hover:bg-gray-100 transition-colors">
              Utforska →
            </button>
          </div>
        </Link>

        {/* Carousel controls - positioned at bottom right inside container */}
        <div className="absolute bottom-6 right-6 flex items-center gap-4">
        <div className="bg-white rounded-full px-4 py-2 flex items-center gap-3">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + FEATURED_COLLECTIONS.length) % FEATURED_COLLECTIONS.length)}
            className="text-gray-600 hover:text-black transition-colors"
            aria-label="Föregående"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-gray-900 min-w-[3rem] text-center">
            {currentIndex + 1}/{FEATURED_COLLECTIONS.length}
          </span>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % FEATURED_COLLECTIONS.length)}
            className="text-gray-600 hover:text-black transition-colors"
            aria-label="Nästa"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label={isPlaying ? "Pausa" : "Spela"}
        >
          {isPlaying ? (
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        </div>
      </div>
    </div>
  );
}

function CampaignBanner({
  title,
  bgColor,
}: {
  title: string;
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} p-6 h-32 flex items-end justify-start overflow-hidden relative`} style={{}}>
      <h3 className={`text-xl font-bold ${bgColor === 'bg-green-100' ? 'text-green-700' : 'text-white'}`}>
        {title}
      </h3>
    </div>
  );
}

function CallToAction() {
  return (
    <div className="flex justify-center">
      <div className="max-w-[1280px] w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6">
        <h2 className="text-4xl font-bold mb-4">Är du redo att uppgradera?</h2>
        <p className="text-xl mb-8 max-w-2xl">
          Hitta de bästa datorerna, komponenterna och tillbehöret. Snabb leverans och utmärkt kundsupport.
        </p>
        <Link href="/produkter" className="inline-block bg-white text-gray-900 px-8 py-3 rounded font-bold hover:bg-gray-100">
          Börja shoppa nu →
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative">
      <MainLayout bordered={true} noPadding={true}>
        <div className="flex flex-col gap-4">
          <div className="-mx-6">
            <HeroCarousel />
          </div>
          <div className="px-6">
            <ProductsSection
              variant="popular"
              products={POPULAR_PRODUCTS}
            />
          </div>
          <div className="px-6">
            <ProductBanner />
          </div>
          <div className="px-6">
            <ProductsSection
              variant="recommended"
              products={RECOMMENDED_PRODUCTS}
            />
          </div>
          <div className="-mx-6">
            <CallToAction />
          </div>
        </div>
      </MainLayout>
      <div className="fixed bottom-4 right-4 z-50">
        <NewsletterPopup />
      </div>
    </div>
  );
}
