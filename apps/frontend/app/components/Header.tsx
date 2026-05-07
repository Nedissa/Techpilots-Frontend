'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">TechPilots</Link>
        <nav className="hidden md:flex gap-8">
          <Link href="/produkter" className="hover:text-blue-600">Produkter</Link>
          <Link href="/kategorier/laptops" className="hover:text-blue-600">Laptops</Link>
          <Link href="/kategorier/komponenter" className="hover:text-blue-600">Komponenter</Link>
          <Link href="/kategorier/natwerk" className="hover:text-blue-600">Nätverk</Link>
        </nav>
        <div className="flex gap-4">
          <Link href="/varukorg" className="text-2xl">🛒</Link>
          <Link href="/konto" className="text-2xl">👤</Link>
        </div>
      </div>
    </header>
  );
}
