'use client';

import { MainLayout } from '@/app/components/MainLayout';
import Link from 'next/link';

const CATEGORIES = [
  { id: 'datorer-och-tillbehor', title: 'Datorer & Tillbehör', slug: 'datorer-och-tillbehor' },
  { id: 'datorkomponenter', title: 'Datorkomponenter', slug: 'datorkomponenter' },
  { id: 'gaming', title: 'Gaming', slug: 'gaming' },
  { id: 'mobiltelefoner', title: 'Mobiltelefoner', slug: 'mobiltelefoner' },
  { id: 'tv-hifi', title: 'TV & HiFi', slug: 'tv-hifi' },
];

export default function CategoriesPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-gray-900">Kategorier</h1>
        <div className="grid grid-cols-5 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/kategorier/${category.slug}`}
              className="p-8 bg-gray-100 rounded text-center hover:bg-gray-200 transition-colors"
            >
              <h2 className="text-lg font-bold text-gray-900">{category.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
