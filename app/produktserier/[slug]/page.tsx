import { MainLayout } from '@/app/components/MainLayout';
import { ProductSeriesContent } from './ProductSeriesContent';
import { MOCK_PRODUCTS, getCategoryTitle, getBreadcrumbTrail } from '@/app/lib/products';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductSeriesPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryTitle = getCategoryTitle(slug);
  const breadcrumbTrail = getBreadcrumbTrail(slug);

  return (
    <MainLayout>
      <ProductSeriesContent
        categoryTitle={categoryTitle}
        categorySlug={slug}
        breadcrumbTrail={breadcrumbTrail}
        products={MOCK_PRODUCTS}
      />
    </MainLayout>
  );
}
