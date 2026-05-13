import { MainLayout } from '@/app/components/MainLayout';
import { ProductSeriesContent } from './ProductSeriesContent';
import { getCategoryTitle, getBreadcrumbTrail } from '@/app/lib/products';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function fetchProducts() {
  try {
    const response = await fetch('/api/products?limit=100', {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch products from API');
      return [];
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductSeriesPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryTitle = getCategoryTitle(slug);
  const breadcrumbTrail = getBreadcrumbTrail(slug);
  const products = await fetchProducts();

  return (
    <MainLayout>
      <ProductSeriesContent
        categoryTitle={categoryTitle}
        categorySlug={slug}
        breadcrumbTrail={breadcrumbTrail}
        products={products}
      />
    </MainLayout>
  );
}
