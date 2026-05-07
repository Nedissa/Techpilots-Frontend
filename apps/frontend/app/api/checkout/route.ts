import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-04-22.dahlia',
});

interface LineItem {
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
    };
  };
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cartItems, total, formData, shippingCost } = body;

    const lineItems: LineItem[] = cartItems.map((item: any) => ({
      price_data: {
        currency: 'sek',
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
        },
      },
      quantity: item.quantity,
    }));

    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'sek',
          unit_amount: shippingCost * 100,
          product_data: {
            name: 'Expressfrakt',
          },
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/order-bekraftelse?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/kassan`,
      customer_email: formData.email,
      metadata: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        postalCode: formData.postalCode,
        city: formData.city,
        country: formData.country,
        phone: formData.phone,
      },
    });

    return Response.json({
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Checkout error:', errorMessage);
    console.error('Full error:', error);
    return Response.json(
      { error: 'Failed to create checkout session', details: errorMessage },
      { status: 500 }
    );
  }
}
