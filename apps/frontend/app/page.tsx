import Link from 'next/link';
import { ProductsSection } from './components/ProductsSection';
import { ProductBanner } from './components/ProductBanner';
import { MainLayout } from './components/MainLayout';
import { NewsletterPopup } from './components/NewsletterPopup';
import { HeroCarouselClient } from './components/HeroCarouselClient';

const FEATURED_COLLECTIONS = [
  { title: 'Gaming Laptops', handle: 'gaming-laptops' },
  { title: 'Datorkomponenter', handle: 'datorkomponenter' },
  { title: 'Gaming Setup', handle: 'gaming-setup' },
]

function getDummyProducts() {
  const baseProducts = [
    {
      id: 'dummy-1',
      title: 'Microsoft Surface',
      handle: 'microsoft-surface',
      price: 7269,
      originalPrice: 8500,
      image: 'https://s3.eu-central-1.amazonaws.com/medusajs.cloud-data-prod-euc1-20241127132538579500000002/e13a1a3638b7417a865%2F1978563_1-01KR4PF6SM262NBWYZPA6D07NJ.webp',
      images: ['https://s3.eu-central-1.amazonaws.com/medusajs.cloud-data-prod-euc1-20241127132538579500000002/e13a1a3638b7417a865%2F1978563_1-01KR4PF6SM262NBWYZPA6D07NJ.webp'],
      category: 'Laptops',
      brand: 'ASUS',
      colors: ['#000000', '#FFFFFF', '#C0C0C0', '#808080'],
      stock: 'I lager',
      rating: 4.5,
      reviews: 12,
      features: ['Intel Core i7 Processor', '16GB RAM Memory', '512GB SSD Storage', 'NVIDIA Graphics'],
      isNew: true,
      discountPercent: 15,
    },
    {
      id: 'dummy-2',
      title: 'Stationär dator',
      handle: 'stationara-dator',
      price: 7269,
      originalPrice: 9000,
      image: 'https://s3.eu-central-1.amazonaws.com/medusajs.cloud-data-prod-euc1-20241127132538579500000002/e13a1a3638b7417a865%2F1-01KR4T7TTXZXCC1CF3NHAW0X84.webp',
      images: ['https://s3.eu-central-1.amazonaws.com/medusajs.cloud-data-prod-euc1-20241127132538579500000002/e13a1a3638b7417a865%2F1-01KR4T7TTXZXCC1CF3NHAW0X84.webp'],
      category: 'Desktop',
      brand: 'Dell',
      colors: ['#000000', '#FFFFFF', '#C0C0C0', '#808080'],
      stock: 'I lager',
      rating: 4,
      reviews: 8,
      features: ['Intel Core i5 Processor', '8GB RAM Memory', '256GB SSD Storage', 'Intel Graphics'],
      isNew: false,
      discountPercent: 10,
    },
    {
      id: 'dummy-3',
      title: 'Microsoft Surface 2',
      handle: 'microsoft-surface-2',
      price: 7269,
      originalPrice: 8200,
      image: 'https://s3.eu-central-1.amazonaws.com/medusajs.cloud-data-prod-euc1-20241127132538579500000002/e13a1a3638b7417a865%2F1978563_1-01KR4T9JQZ9635XKCY12EE6X5B.webp',
      images: ['https://s3.eu-central-1.amazonaws.com/medusajs.cloud-data-prod-euc1-20241127132538579500000002/e13a1a3638b7417a865%2F1978563_1-01KR4T9JQZ9635XKCY12EE6X5B.webp'],
      category: 'Laptops',
      brand: 'HP',
      colors: ['#000000', '#FFFFFF', '#C0C0C0', '#808080'],
      stock: 'I lager',
      rating: 4.2,
      reviews: 15,
      features: ['Intel Core i7 Processor', '16GB RAM Memory', '512GB SSD Storage', 'NVIDIA Graphics'],
      isNew: true,
      discountPercent: 20,
    },
    {
      id: 'dummy-4',
      title: 'Stationär dator 2',
      handle: 'stationara-dator-2',
      price: 7269,
      originalPrice: 8800,
      image: 'https://s3.eu-central-1.amazonaws.com/medusajs.cloud-data-prod-euc1-20241127132538579500000002/e13a1a3638b7417a865%2F6907594_v5urxz-01KR4T9JR0GFRAZ2N6BP2XTHB6.webp',
      images: ['https://s3.eu-central-1.amazonaws.com/medusajs.cloud-data-prod-euc1-20241127132538579500000002/e13a1a3638b7417a865%2F6907594_v5urxz-01KR4T9JR0GFRAZ2N6BP2XTHB6.webp'],
      category: 'Desktop',
      brand: 'Lenovo',
      colors: ['#000000', '#FFFFFF', '#C0C0C0', '#808080'],
      stock: 'I lager',
      rating: 3.8,
      reviews: 10,
      features: ['Intel Core i9 Processor', '32GB RAM Memory', '1TB SSD Storage', 'RTX 4090 Graphics'],
      isNew: false,
      discountPercent: 5,
    },
  ];

  // Repeat products to get 12+ items for all 3 sections
  return [...baseProducts, ...baseProducts, ...baseProducts];
}

function CampaignBannersSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <CampaignBanner title="Se alla veckans deals" bgColor="bg-blue-900" />
      <CampaignBanner title="Samsung Micro RGB" bgColor="bg-black" />
      <CampaignBanner title="Vi tömmer lagret!" bgColor="bg-blue-900" />
      <CampaignBanner title="50% rabatt på kök!" bgColor="bg-green-100" />
    </div>
  );
}

async function fetchProductsFromAPI() {
  try {
    console.log('Fetching products from Medusa...');
    const response = await fetch('https://techpilots.medusajs.app/store/products?limit=100', {
      headers: {
        'x-publishable-api-key': 'pk_ab6e93368dc9440a191c0540f0ab9227b81f916924bc422b654c61d371652e29',
      },
    });
    console.log('Fetch response status:', response.status);
    if (!response.ok) {
      console.error('Failed to fetch products');
      return getDummyProducts();
    }
    const data = await response.json();
    console.log('Received products count:', data.products?.length);
    const products = data.products || [];

    if (products.length === 0) {
      console.log('No products returned, using dummy data');
      return getDummyProducts();
    }

    const transformedProducts = products.map((product: any, idx: number) => {
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

    // Repeat products to ensure we have enough for all sections (need 12+)
    while (transformedProducts.length < 12) {
      transformedProducts.push(...transformedProducts.slice(0, Math.min(4, 12 - transformedProducts.length)));
    }

    return transformedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return getDummyProducts();
  }
}


function CampaignBanner({
  title,
  bgColor,
}: {
  title: string;
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} p-6 h-32 flex items-end justify-start overflow-hidden relative`} style={{}}>
      <h3 className={`text-xl font-bold ${bgColor === 'bg-green-100' ? 'text-green-700' : 'text-white'}`}>
        {title}
      </h3>
    </div>
  );
}

function CallToAction() {
  return (
    <div className="flex justify-center">
      <div className="max-w-[1280px] w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6">
        <h2 className="text-4xl font-bold mb-4">Är du redo att uppgradera?</h2>
        <p className="text-xl mb-8 max-w-2xl">
          Hitta de bästa datorerna, komponenterna och tillbehöret. Snabb leverans och utmärkt kundsupport.
        </p>
        <Link href="/produkter" className="inline-block bg-white text-gray-900 px-8 py-3 rounded font-bold hover:bg-gray-100">
          Börja shoppa nu →
        </Link>
      </div>
    </div>
  );
}

export default async function Home() {
  const products = await fetchProductsFromAPI();
  console.log('Home page products count:', products.length);

  return (
    <div className="relative">
      <MainLayout bordered={true} noPadding={true}>
        <div className="flex flex-col gap-4">
          <div className="-mx-6">
            <HeroCarouselClient collections={FEATURED_COLLECTIONS} />
          </div>
          <div className="px-6">
            <ProductsSection
              variant="popular"
              products={products.slice(0, 4)}
            />
          </div>
          <div className="px-6">
            <ProductBanner />
          </div>
          <div className="px-6">
            <ProductsSection
              variant="recommended"
              products={products.slice(4, 8)}
            />
          </div>
          <div className="px-6">
            <ProductsSection
              variant="new"
              products={products.slice(8, 12)}
            />
          </div>
          <div className="-mx-6">
            <CallToAction />
          </div>
        </div>
      </MainLayout>
      <div className="fixed bottom-4 right-4 z-50">
        <NewsletterPopup />
      </div>
    </div>
  );
}
