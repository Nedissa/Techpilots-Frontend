'use client';

import { useState, useEffect } from 'react';

const BRANDS = [
  { name: 'ASUS' },
  { name: 'B&O' },
  { name: 'BOSE' },
  { name: 'Logitech' },
  { name: 'Canon' },
  { name: 'Nikon' },
  { name: 'Sony' },
  { name: 'Apple' },
];

export function BrandScroll() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 0.5) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-yellow-300 py-6 overflow-hidden" style={{ transform: 'skewY(-2deg)' }}>
      <div className="flex gap-16 items-center px-6" style={{
        transform: `translateX(calc(-${scrollPosition}%))`,
        transition: 'transform 0.03s linear'
      }}>
        {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
          <div key={idx} className="whitespace-nowrap flex-shrink-0 text-black font-bold text-2xl">
            {brand.name}
          </div>
        ))}
      </div>
    </div>
  );
}
