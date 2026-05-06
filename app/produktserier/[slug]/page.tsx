import { MainLayout } from '@/app/components/MainLayout';
import { ProductSeriesContent } from './ProductSeriesContent';
import { MOCK_PRODUCTS, getCategoryTitle } from '@/app/lib/products';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductSeriesPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryTitle = getCategoryTitle(slug);

  return (
    <MainLayout>
      <ProductSeriesContent categoryTitle={categoryTitle} categorySlug={slug} products={MOCK_PRODUCTS} />
    </MainLayout>
  );
}
