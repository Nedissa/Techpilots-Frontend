const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    if (!publishableKey) {
      return Response.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create customer using Store API (register endpoint)
    const registerResponse = await fetch(
      `${MEDUSA_URL}/store/customers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': publishableKey,
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }),
      }
    );

    if (!registerResponse.ok) {
      const errorData = await registerResponse.json();
      console.error('Register error:', errorData);
      return Response.json(
        { error: errorData.message || 'Failed to create customer' },
        { status: registerResponse.status }
      );
    }

    const customerData = await registerResponse.json();
    const customer = customerData.customer || customerData;

    // Now authenticate the user
    const authResponse = await fetch(
      `${MEDUSA_URL}/auth/customer/emailpass`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    let token = null;
    if (authResponse.ok) {
      const authData = await authResponse.json();
      token = authData.token;
    }

    return Response.json({
      customer: {
        id: customer.id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
      },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
