'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ProductsSection } from './components/ProductsSection';
import { ProductBanner } from './components/ProductBanner';
import { MainLayout } from './components/MainLayout';

const FEATURED_COLLECTIONS = [
  { title: 'Gaming Laptops', handle: 'gaming-laptops', image: 'https://via.placeholder.com/1280x484?text=Gaming+Laptops' },
  { title: 'Datorkomponenter', handle: 'datorkomponenter', image: 'https://via.placeholder.com/1280x484?text=Komponenter' },
  { title: 'Gaming Setup', handle: 'gaming-setup', image: 'https://via.placeholder.com/1280x484?text=Gaming+Setup' },
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

const POPULAR_PRODUCTS = [
  { id: '1', title: 'ASUS ROG Gaming Laptop', handle: 'asus-rog-gaming-laptop', price: '14999', originalPrice: '18099', brand: 'ASUS', discount: 17, rating: 5, reviews: 128, image: '/assets/Produkt bilder/LAPTOP/1978563_1.webp' },
  { id: '2', title: 'Gaming Stationär Dator', handle: 'gaming-stationär-dator', price: '8999', brand: 'Custom Build', discount: 10, rating: 5, reviews: 89, image: '/assets/Produkt bilder/STATIONÄR/1.webp' },
  { id: '3', title: 'Premium Gaming Laptop Pro', handle: 'premium-gaming-laptop-pro', price: '11999', brand: 'ASUS', discount: 14, rating: 5, reviews: 156, image: '/assets/Produkt bilder/LAPTOP/1978563_2.webp' },
  { id: '4', title: 'Workstation Dator', handle: 'workstation-dator', price: '1499', brand: 'Custom', discount: 21, rating: 5, reviews: 67, image: '/assets/Produkt bilder/STATIONÄR/6907594_t7dv07.webp' },
];

const RECOMMENDED_PRODUCTS = [
  { id: '5', title: 'High Performance Laptop', handle: 'high-performance-laptop', price: '12999', brand: 'ASUS', discount: 13, rating: 5, reviews: 112, image: '/assets/Produkt bilder/LAPTOP/1978563_3.webp' },
  { id: '6', title: 'Professional Workstation', handle: 'professional-workstation', price: '7999', brand: 'Custom', discount: 11, rating: 5, reviews: 95, image: '/assets/Produkt bilder/STATIONÄR/6907594_jzbn2q.webp' },
  { id: '7', title: 'Gaming Setup Komplett', handle: 'gaming-setup-komplett', price: '5499', brand: 'Multi', discount: 21, rating: 5, reviews: 78, image: '/assets/Produkt bilder/STATIONÄR/6907594_ebnf7f.webp' },
  { id: '8', title: 'Ultrabook Slim Laptop', handle: 'ultrabook-slim-laptop', price: '1299', brand: 'ASUS', discount: 24, rating: 5, reviews: 234, image: '/assets/Produkt bilder/LAPTOP/6907594_v5urxz.webp' },
];

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagePosition, setImagePosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const slideTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_COLLECTIONS.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [isPlaying]);

  useEffect(() => {
    const panTimer = setInterval(() => {
      setImagePosition((prev) => (prev + 0.5) % 100);
    }, 50);
    return () => clearInterval(panTimer);
  }, []);

  const currentCollection = FEATURED_COLLECTIONS[currentIndex];

  return (
    <div className="relative z-0">
      <div className="relative w-full h-[484px] overflow-hidden bg-gray-900 flex items-center justify-center">
        <Link href={`/kategorier/${currentCollection.handle}`} className="block relative w-full h-full">
          <img
            src={currentCollection.image}
            alt={currentCollection.title}
            className="w-full h-full object-cover transition-all duration-1000"
            style={{
              transform: `scaleX(1.2) translateX(${imagePosition - 50}%)`,
            }}
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">{currentCollection.title}</h1>
              <button className="bg-white text-black px-8 py-3 font-semibold hover:bg-gray-100 transition-colors">
                Utforska →
              </button>
            </div>
          </div>
        </Link>
      </div>


      {/* Carousel controls - positioned at bottom right */}
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
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
      <div className="px-6">
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
    <MainLayout bordered={true} noPadding={true}>
      <div className="flex flex-col gap-8">
        <div className="-mx-6">
          <HeroCarousel />
        </div>
        <div className="px-6">
          <CampaignBannersSection />
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
  );
}
