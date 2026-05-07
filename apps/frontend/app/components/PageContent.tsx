'use client';

import { MainLayout } from './MainLayout';

export function PageContent({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <MainLayout bordered={false}>
      <div className="py-8">
        {title && <h1 className="text-4xl font-bold mb-12">{title}</h1>}
        <div className="prose prose-lg max-w-none text-gray-700">
          {children}
        </div>
      </div>
    </MainLayout>
  );
}
