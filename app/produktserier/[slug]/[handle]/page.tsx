import { MainLayout } from '@/app/components/MainLayout';
import { getProductByHandle, getCategoryTitle } from '@/app/lib/products';
import ProductDetailClient from './ProductDetailClient';

interface PageProps {
  params: Promise<{
    slug: string;
    handle: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug, handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) {
    return <div>Produkten hittades inte</div>;
  }

  const categoryTitle = getCategoryTitle(slug);

  return (
    <MainLayout>
      <ProductDetailClient
        product={product}
        categorySlug={slug}
        categoryTitle={categoryTitle}
      />
    </MainLayout>
  );
}
