export async function POST(request: Request) {
  try {
    const { orderId, productId, description, customerId } = await request.json();

    if (!orderId || !productId || !description || !customerId) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const response = await fetch(
      'https://techpilots.medusajs.app/admin/complaints',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': 'pk_ab6e93368dc9440a191c0540f0ab9227b81f916924bc422b654c61d371652e29',
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

    if (!customerId) {
      return Response.json(
        { error: 'customer_id required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://techpilots.medusajs.app/admin/complaints?customer_id=${customerId}`,
      {
        headers: {
          'x-publishable-api-key': 'pk_ab6e93368dc9440a191c0540f0ab9227b81f916924bc422b654c61d371652e29',
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
