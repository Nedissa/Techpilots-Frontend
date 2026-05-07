import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-04-22.dahlia',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cartItems, total, formData, shippingCost } = body;

    const amount = Math.round((total + shippingCost) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'sek',
      metadata: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        postalCode: formData.postalCode,
        city: formData.city,
        country: formData.country,
        phone: formData.phone,
      },
    });

    return Response.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    return Response.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
