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
  sectionCategory?: string;
}

export async function fetchProductsFromMedusa(): Promise<Product[]> {
  try {
    const response = await fetch('/api/products');

    if (!response.ok) {
      console.error('Failed to fetch products from API:', response.status);
      return [];
    }

    const data = await response.json();

    if (!data.products || !Array.isArray(data.products)) {
      console.error('Invalid response format from API:', data);
      return [];
    }

    return data.products.map((product: any) => ({
      id: product.id,
      title: product.title,
      handle: product.handle || product.title.toLowerCase().replace(/\s+/g, '-'),
      price: product.price || 0,
      originalPrice: product.originalPrice,
      image: product.image || product.images?.[0] || '/assets/placeholder.webp',
      images: (Array.isArray(product.images) && product.images.length > 0) ? product.images : [],
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
    const response = await fetch(`/api/products?handle=${handle}`);

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
      originalPrice: product.originalPrice,
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
