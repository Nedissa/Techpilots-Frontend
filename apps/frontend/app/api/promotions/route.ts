export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customer_id');

    const response = await fetch(
      'https://techpilots.medusajs.app/store/discounts',
      {
        headers: {
          'x-publishable-api-key': 'pk_ab6e93368dc9440a191c0540f0ab9227b81f916924bc422b654c61d371652e29',
        },
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to fetch promotions' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const discounts = data.discounts || [];

    const activePromotions = discounts
      .filter((discount: any) => {
        const now = new Date();
        const startsAt = discount.starts_at ? new Date(discount.starts_at) : null;
        const endsAt = discount.ends_at ? new Date(discount.ends_at) : null;

        const isActive = (!startsAt || startsAt <= now) && (!endsAt || endsAt >= now);
        return isActive && discount.is_dynamic !== true;
      })
      .map((discount: any) => ({
        id: discount.id,
        code: discount.code,
        description: discount.description || '',
        type: discount.type,
        value: discount.value,
        percentage_discount: discount.rule?.percentage,
        fixed_discount: discount.rule?.fixed,
        applies_to: discount.rule?.allocation || 'all',
        valid_from: discount.starts_at,
        valid_to: discount.ends_at,
        applicable_products: discount.rule?.conditions?.products || [],
        applicable_collections: discount.rule?.conditions?.collections || [],
      }));

    return Response.json({ promotions: activePromotions });
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
