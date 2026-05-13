export async function POST(request: Request) {
  try {
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://194.14.207.94:9000';

    if (!publishableKey) {
      return Response.json(
        { error: 'Medusa publishable key not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();

    const response = await fetch(`${medusaUrl}/store/carts`, {
      method: 'POST',
      headers: {
        'x-publishable-api-key': publishableKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Medusa cart creation error:', error);
      return Response.json(
        { error: 'Failed to create cart in Medusa' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Cart creation error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
