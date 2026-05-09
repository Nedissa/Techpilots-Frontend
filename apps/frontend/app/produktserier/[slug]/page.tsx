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
    const response = await fetch('https://techpilots.medusajs.app/store/products?limit=100', {
      headers: {
        'x-publishable-api-key': 'pk_ab6e93368dc9440a191c0540f0ab9227b81f916924bc422b654c61d371652e29',
      },
    });
    if (!response.ok) return [];
    const data = await response.json();
    const products = data.products || [];

    return products.map((product: any, idx: number) => {
      const image = product.images?.[0]?.url || product.thumbnail || '';
      const hashPrice = parseInt(product.id.substring(0, 5), 36) % 20000 + 5000;
      const colors = ['#000000', '#FFFFFF', '#C0C0C0', '#808080'];
      const features = [
        'Intel Core i7 Processor',
        '16GB RAM Memory',
        '512GB SSD Storage',
        'NVIDIA Graphics'
      ];

      return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        price: hashPrice,
        originalPrice: hashPrice + Math.random() * 2000,
        image: image,
        images: (product.images?.map((img: any) => img.url) || []).slice(0, 3),
        category: product.collection?.title || '',
        brand: ['ASUS', 'Dell', 'HP', 'Lenovo'][idx % 4],
        colors: colors,
        stock: 'I lager',
        rating: 3 + Math.random() * 2,
        reviews: Math.floor(Math.random() * 50) + 5,
        features: features,
        isNew: idx % 3 === 0,
        discountPercent: idx % 2 === 0 ? Math.floor(Math.random() * 30) + 5 : undefined,
      };
    });
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
