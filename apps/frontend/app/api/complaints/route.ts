const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';

export async function GET(request: Request) {
  try {
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    if (!publishableKey) {
      return Response.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const cookies = request.headers.get('cookie') || '';
    const tokenMatch = cookies.match(/medusa_token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      return Response.json(
        { error: 'No authentication token' },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${MEDUSA_URL}/store/customers/me`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-publishable-api-key': publishableKey,
        },
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to fetch customer data' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const complaints = data.customer?.metadata?.complaints || [];

    return Response.json({ complaints });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    if (!publishableKey) {
      return Response.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const cookies = request.headers.get('cookie') || '';
    const tokenMatch = cookies.match(/medusa_token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      return Response.json(
        { error: 'No authentication token' },
        { status: 401 }
      );
    }

    const { orderId, description } = await request.json();

    if (!orderId || !description) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${MEDUSA_URL}/store/customers/me`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'x-publishable-api-key': publishableKey,
        },
        body: JSON.stringify({
          metadata: {
            complaints: [
              {
                id: Date.now().toString(),
                order_id: orderId,
                description: description,
                status: 'pending',
                created_at: new Date().toISOString(),
              },
            ],
          },
        }),
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to submit complaint' },
        { status: response.status }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
