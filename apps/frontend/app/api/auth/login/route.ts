const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://194.14.207.94:9000';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    // Authenticate with Medusa
    const authResponse = await fetch(
      `${MEDUSA_URL}/auth/customer/emailpass`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!authResponse.ok) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const authData = await authResponse.json();
    const token = authData.token;

    if (!token) {
      return Response.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }

    // Get customer profile using the token
    const customerResponse = await fetch(
      `${MEDUSA_URL}/store/customers/me`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
        },
      }
    );

    if (!customerResponse.ok) {
      return Response.json(
        { error: 'Failed to fetch customer profile' },
        { status: 500 }
      );
    }

    const customer = await customerResponse.json();

    const response = Response.json({
      customer: {
        id: customer.customer?.id || customer.id,
        first_name: customer.customer?.first_name || customer.first_name,
        last_name: customer.customer?.last_name || customer.last_name,
        email: customer.customer?.email || customer.email,
        metadata: customer.customer?.metadata || customer.metadata,
      },
    });

    // Set httpOnly cookie with token
    response.headers.set(
      'Set-Cookie',
      `medusa_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`
    );

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
