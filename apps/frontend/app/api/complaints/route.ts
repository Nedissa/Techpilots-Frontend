export async function POST(request: Request) {
  try {
    const { orderId, productId, description, customerId } = await request.json();
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://194.14.207.94:9000';

    if (!orderId || !productId || !description || !customerId) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${medusaUrl}/admin/complaints`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': publishableKey,
        },
        body: JSON.stringify({
          order_id: orderId,
          product_id: productId,
          description,
          customer_id: customerId,
          status: 'open',
          created_at: new Date().toISOString(),
        }),
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to submit complaint' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json({ complaint: data });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customer_id');
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://194.14.207.94:9000';

    if (!customerId) {
      return Response.json(
        { error: 'customer_id required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${medusaUrl}/admin/complaints?customer_id=${customerId}`,
      {
        headers: {
          'x-publishable-api-key': publishableKey,
        },
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to fetch complaints' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json({ complaints: data.complaints || [] });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
