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
      `${medusaUrl}/admin/customers/${customerId}`,
      {
        headers: {
          'x-publishable-api-key': publishableKey,
        },
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to fetch customer loyalty data' },
        { status: response.status }
      );
    }

    const customer = await response.json();

    const loyaltyPoints = customer.metadata?.loyalty_points || 0;
    const tier = calculateTier(loyaltyPoints);
    const nextTierPoints = getNextTierThreshold(tier);
    const pointsToNextTier = Math.max(0, nextTierPoints - loyaltyPoints);

    return Response.json({
      loyalty: {
        customer_id: customerId,
        total_points: loyaltyPoints,
        current_tier: tier,
        points_to_next_tier: pointsToNextTier,
        lifetime_orders: customer.orders?.length || 0,
        lifetime_spend: customer.orders?.reduce((sum: number, order: any) => sum + (order.total || 0), 0) || 0,
        member_since: customer.created_at,
        benefits: getTierBenefits(tier),
      },
    });
  } catch (error) {
    console.error('Error fetching loyalty data:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { customerId, points, reason } = await request.json();
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://194.14.207.94:9000';

    if (!customerId || !points || !reason) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const customerResponse = await fetch(
      `${medusaUrl}/admin/customers/${customerId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': publishableKey,
        },
        body: JSON.stringify({
          metadata: {
            loyalty_points: (points),
            last_points_update: new Date().toISOString(),
            points_update_reason: reason,
          },
        }),
      }
    );

    if (!customerResponse.ok) {
      return Response.json(
        { error: 'Failed to update loyalty points' },
        { status: customerResponse.status }
      );
    }

    return Response.json({ success: true, message: 'Loyalty points updated' });
  } catch (error) {
    console.error('Error updating loyalty points:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateTier(points: number): string {
  if (points >= 5000) return 'Gold';
  if (points >= 2000) return 'Silver';
  if (points >= 500) return 'Bronze';
  return 'Standard';
}

function getNextTierThreshold(currentTier: string): number {
  const tiers: { [key: string]: number } = {
    Standard: 500,
    Bronze: 2000,
    Silver: 5000,
    Gold: 10000,
  };
  return tiers[currentTier] || 10000;
}

function getTierBenefits(tier: string): string[] {
  const benefits: { [key: string]: string[] } = {
    Standard: ['Grundläggande medlemskap', 'Earn 1 point per SEK'],
    Bronze: ['5% rabatt på alla köp', 'Earn 1.5 points per SEK', 'Prioriterad support'],
    Silver: ['10% rabatt på alla köp', 'Earn 2 points per SEK', 'Exklusiva erbjudanden', 'Fri frakt'],
    Gold: ['15% rabatt på alla köp', 'Earn 3 points per SEK', 'VIP support', 'Fri frakt', 'Tidig tillgång till nya produkter'],
  };
  return benefits[tier] || benefits.Standard;
}
