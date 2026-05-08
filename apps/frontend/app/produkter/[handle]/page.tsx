import { redirect, notFound } from 'next/navigation';
import { getProductByHandle } from '@/app/lib/products';

interface PageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const categorySlug = product.category || 'laptops';
  redirect(`/produktserier/${categorySlug}/${handle}`);
}
