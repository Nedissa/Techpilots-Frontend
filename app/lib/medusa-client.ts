const MEDUSA_API_URL = 'https://frumpy-cloud-disuse.medusajs.app';
const PUBLISHABLE_API_KEY = 'pk_91214f8d5ac9aa3cbfee7384cd66d2d3607d6a563b7d33508c23e836adff56f9';

export interface MedusaProduct {
  id: string;
  title: string;
  handle: string;
  price?: number;
  description?: string;
  images?: Array<{ url: string }>;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating?: number;
  reviews?: number;
  category?: string;
  brand?: string;
}

export async function fetchProductsFromMedusa(): Promise<Product[]> {
  try {
    const response = await fetch(
      `${MEDUSA_API_URL}/store/products?limit=100`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': PUBLISHABLE_API_KEY,
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch products from Medusa:', response.status);
      return [];
    }

    const data = await response.json();

    if (!data.products || !Array.isArray(data.products)) {
      console.error('Invalid response format from Medusa API');
      return [];
    }

    return data.products.map((product: MedusaProduct) => ({
      id: product.id,
      title: product.title,
      handle: product.handle || product.title.toLowerCase().replace(/\s+/g, '-'),
      price: product.price || 0,
      image: product.images?.[0]?.url || '/assets/placeholder.webp',
      images: product.images?.map(img => img.url) || [],
      rating: 4.5,
      reviews: 0,
      category: 'General',
      brand: 'Brand',
    }));
  } catch (error) {
    console.error('Error fetching products from Medusa:', error);
    return [];
  }
}

export async function fetchProductByHandle(handle: string): Promise<Product | null> {
  try {
    const response = await fetch(
      `${MEDUSA_API_URL}/store/products?handle=${handle}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': PUBLISHABLE_API_KEY,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data.products || data.products.length === 0) {
      return null;
    }

    const product = data.products[0];
    return {
      id: product.id,
      title: product.title,
      handle: product.handle || product.title.toLowerCase().replace(/\s+/g, '-'),
      price: product.price || 0,
      image: product.images?.[0]?.url || '/assets/placeholder.webp',
      images: product.images?.map((img: { url: string }) => img.url) || [],
      rating: 4.5,
      reviews: 0,
      category: 'General',
      brand: 'Brand',
    };
  } catch (error) {
    console.error('Error fetching product from Medusa:', error);
    return null;
  }
}
