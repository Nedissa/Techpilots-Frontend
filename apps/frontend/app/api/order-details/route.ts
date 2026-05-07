import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-04-22.dahlia',
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return Response.json(
        { error: 'Missing session_id' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    return Response.json({
      sessionId: session.id,
      customerEmail: session.customer_email,
      totalAmount: session.amount_total,
      items: session.line_items?.data || [],
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    return Response.json(
      { error: 'Failed to fetch order details' },
      { status: 500 }
    );
  }
}
