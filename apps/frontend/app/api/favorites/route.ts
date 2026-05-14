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
        { error: 'Failed to fetch customer' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const customer = data.customer;
    const favorites = customer.metadata?.favorites || [];

    return Response.json({ favorites });
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

    const { wishlist } = await request.json();

    if (!Array.isArray(wishlist)) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // First fetch current customer to get existing metadata
    const meResponse = await fetch(
      `${MEDUSA_URL}/store/customers/me`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-publishable-api-key': publishableKey,
        },
      }
    );

    if (!meResponse.ok) {
      return Response.json(
        { error: 'Failed to fetch customer' },
        { status: meResponse.status }
      );
    }

    const meData = await meResponse.json();
    const currentMetadata = meData.customer?.metadata || {};

    // Merge with existing metadata to preserve other data
    const updatedMetadata = {
      ...currentMetadata,
      favorites: wishlist,
    };

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
          metadata: updatedMetadata,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Failed to update metadata:', error);
      return Response.json(
        { error: 'Failed to update favorites' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json({ success: true, wishlist: data.customer?.metadata?.favorites || wishlist });
  } catch (error) {
    console.error('Error updating favorites:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
