const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://194.14.207.94:9000';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customer_id');

    if (!customerId) {
      return Response.json(
        { error: 'customer_id required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${MEDUSA_URL}/admin/customers/${customerId}`,
      {
        headers: {
          'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
        },
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to fetch customer' },
        { status: response.status }
      );
    }

    const customer = await response.json();
    const wishlist = customer.metadata?.wishlist || [];

    return Response.json({ wishlist });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { customerId, wishlist } = await request.json();

    if (!customerId || !Array.isArray(wishlist)) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${MEDUSA_URL}/admin/customers/${customerId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          metadata: {
            wishlist,
          },
        }),
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to update wishlist' },
        { status: response.status }
      );
    }

    return Response.json({ success: true, wishlist });
  } catch (error) {
    console.error('Error updating favorites:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
