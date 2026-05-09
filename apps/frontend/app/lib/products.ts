export interface Product {
  id: string;
  title: string;
  handle: string;
  price: number;
  originalPrice?: number;
  brand?: string;
  discount?: string;
  discountPercent?: number;
  rating?: number;
  reviews?: number;
  image: string;
  images?: string[];
  colors?: string[];
  stock?: string;
  features?: string[];
  isNew?: boolean;
  category?: string;
}

export const MAIN_CATEGORIES: Record<string, string> = {
  'datorer-tillbehor': 'Datorer & Tillbehör',
  'datorkomponenter': 'Datorkomponenter',
  'gaming': 'Gaming',
  'mobiltelefoner': 'Mobiltelefoner',
  'natwerk': 'Nätverk',
  'tv-hifi': 'TV & HiFi',
};

export const SUBCATEGORIES: Record<string, { title: string; mainCategory: string }> = {
  'laptops': { title: 'Bärbara datorer', mainCategory: 'datorer-tillbehor' },
  'desktops': { title: 'Stationära Datorer', mainCategory: 'datorer-tillbehor' },
  'accessories': { title: 'Datortillbehör', mainCategory: 'datorer-tillbehor' },
  'components': { title: 'Komponenter', mainCategory: 'datorkomponenter' },
  'gaming-laptops': { title: 'Gaming Bärbara datorer', mainCategory: 'gaming' },
  'gaming-pc': { title: 'Gaming Stationär dator', mainCategory: 'gaming' },
  'phones': { title: 'Mobiltelefoner', mainCategory: 'mobiltelefoner' },
  'ultrabooks': { title: 'Ultrabooks', mainCategory: 'laptops' },
};

export const PRODUCT_SERIES: Record<string, { title: string; parentCategory: string }> = {
  'ultrabooks': { title: 'Ultrabooks', parentCategory: 'laptops' },
  'gaming-laptops-gaming': { title: 'Gaming bärbara', parentCategory: 'gaming-laptops' },
  'kontor': { title: 'Kontor', parentCategory: 'laptops' },
};

export const CATEGORY_TITLES: Record<string, string> = {
  'laptops': 'Bärbara datorer',
  'desktops': 'Stationära Datorer',
  'accessories': 'Datortillbehör',
  'components': 'Komponenter',
  'gaming-laptops': 'Gaming Bärbara datorer',
  'gaming-pc': 'Gaming Stationär dator',
  'phones': 'Mobiltelefoner',
  'ultrabooks': 'Ultrabooks',
};

let cachedProducts: Product[] | null = null;

async function fetchProductsFromMedusa(): Promise<Product[]> {
  if (cachedProducts) return cachedProducts;

  try {
    const response = await fetch('https://techpilots.medusajs.app/store/products?limit=100', {
      headers: {
        'x-publishable-api-key': 'pk_ab6e93368dc9440a191c0540f0ab9227b81f916924bc422b654c61d371652e29',
      },
    });
    if (!response.ok) {
      console.error('Failed to fetch products:', response.status);
      return [];
    }
    const data = await response.json();
    const products = data.products || [];

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

    cachedProducts = transformedProducts;
    return transformedProducts;
  } catch (error) {
    console.error('Error fetching products from Medusa:', error);
  }
  return [];
}

export function getBreadcrumbTrail(slug: string) {
  const productSeries = PRODUCT_SERIES[slug];
  if (productSeries) {
    const parentSubcategory = SUBCATEGORIES[productSeries.parentCategory];
    if (parentSubcategory) {
      const mainCategory = MAIN_CATEGORIES[parentSubcategory.mainCategory];
      return {
        mainCategorySlug: parentSubcategory.mainCategory,
        mainCategoryTitle: mainCategory,
        subcategorySlug: productSeries.parentCategory,
        subcategoryTitle: parentSubcategory.title,
        seriesSlug: slug,
        seriesTitle: productSeries.title,
      };
    }
  }

  const subcategory = SUBCATEGORIES[slug];
  if (subcategory) {
    const mainCategory = MAIN_CATEGORIES[subcategory.mainCategory];
    return {
      mainCategorySlug: subcategory.mainCategory,
      mainCategoryTitle: mainCategory,
      subcategorySlug: slug,
      subcategoryTitle: subcategory.title,
    };
  }

  return null;
}

export async function getProductByHandle(handle: string): Promise<Product | undefined> {
  const products = await fetchProductsFromMedusa();
  return products.find(product => product.handle === handle);
}

export function getCategoryTitle(slug: string): string {
  return CATEGORY_TITLES[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
}
