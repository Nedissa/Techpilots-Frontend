export async function GET() {
  try {
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://194.14.207.94:9000';

    if (!publishableKey) {
      return Response.json(
        { error: 'Medusa publishable key not configured' },
        { status: 500 }
      );
    }

    // Fetch products with publishable API key
    const response = await fetch(
      `${medusaUrl}/store/products?limit=100&region_id=reg_01KR9R4SFABTKM0CVFN7AVZ4RW&fields=*variants.calculated_price`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': publishableKey,
        },
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to fetch from Medusa' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const products = data.products || [];

    const transformedProducts = products.map((product: any, idx: number) => {
      // Fix image URLs - replace localhost with VPS IP
      let imageUrl = product.images?.[0]?.url || product.thumbnail || '';
      if (imageUrl && imageUrl.includes('localhost:9000')) {
        imageUrl = imageUrl.replace('localhost:9000', '194.14.207.94:9000');
      }
      const image = imageUrl;

      // Get price from calculated_price
      let price = 0;
      let originalPrice: number | undefined = undefined;

      // Get price from first variant's calculated_price
      if (product.variants && product.variants.length > 0) {
        const firstVariant = product.variants[0];
        const calcPrice = firstVariant.calculated_price;

        if (calcPrice) {
          // The calculated_price should already include price list overrides
          // Use the lowest price available (could be from price list)
          if (calcPrice.calculated_amount !== undefined) {
            price = calcPrice.calculated_amount;
          } else if (calcPrice.amount) {
            price = calcPrice.amount;
          } else if (calcPrice.amount_default) {
            price = calcPrice.amount_default;
          }

          // Use original_amount as the original price for discount calculation
          // This is the base price before any price list overrides
          if (calcPrice.original_amount && calcPrice.original_amount !== price) {
            originalPrice = calcPrice.original_amount;
          }
        }
      }

      // Get sectionCategory from product.collection.title
      let sectionCategory = '';
      const collectionTitle = product.collection?.title || '';
      if (collectionTitle === 'Populära produkter') sectionCategory = 'popular';
      else if (collectionTitle === 'Rekommenderade produkter') sectionCategory = 'recommended';
      else if (collectionTitle === 'Nya produkter') sectionCategory = 'new';
      else if (collectionTitle === 'Du kanske också gillar') sectionCategory = 'also-like';

      // Calculate discount percentage if we have both prices
      let discountPercent = undefined;
      if (originalPrice && price) {
        discountPercent = Math.floor(((originalPrice - price) / originalPrice) * 100);
      }

      return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        price: price,
        originalPrice: originalPrice,
        image: image,
        images: (product.images?.map((img: any) => {
          let url = img.url;
          if (url && url.includes('localhost:9000')) {
            url = url.replace('localhost:9000', '194.14.207.94:9000');
          }
          return url;
        }) || []).slice(0, 3),
        category: collectionTitle,
        brand: product.brand || '',
        colors: product.colors || [],
        stock: product.stock || 'I lager',
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        features: product.features || [],
        isNew: product.isNew || false,
        discountPercent: discountPercent,
        sectionCategory: sectionCategory,
      };
    });

    return Response.json({ products: transformedProducts });
  } catch (error) {
    console.error('Error in /api/products:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
