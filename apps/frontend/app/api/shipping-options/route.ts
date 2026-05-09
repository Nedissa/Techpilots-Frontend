export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get('cart_id');

    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

    if (!publishableKey) {
      return Response.json(
        { error: 'Medusa publishable key not configured' },
        { status: 500 }
      );
    }

    if (!cartId) {
      return Response.json(
        { error: 'cart_id is required' },
        { status: 400 }
      );
    }

    const url = new URL('https://techpilots.medusajs.app/store/shipping-options');
    url.searchParams.set('cart_id', cartId);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-publishable-api-key': publishableKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Medusa API error:', error);
      return Response.json(
        { error: 'Failed to fetch shipping options from Medusa' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Shipping options error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
