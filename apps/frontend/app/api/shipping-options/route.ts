export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') || 'se';

    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

    if (!publishableKey) {
      return Response.json(
        { error: 'Medusa publishable key not configured' },
        { status: 500 }
      );
    }

    const url = new URL('https://techpilots.medusajs.app/store/shipping-options');
    url.searchParams.set('is_return', 'false');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-publishable-api-key': publishableKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Medusa API error:', error);
      return Response.json(
        { error: 'Failed to fetch shipping options from Medusa' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Filter shipping options by country
    const filteredOptions = data.shipping_options?.filter((option: any) => {
      // Check if the shipping option is available for the selected country
      return option.service_zone?.geo_zones?.some((zone: any) =>
        zone.country_code === country.toLowerCase()
      );
    }) || [];

    return Response.json({
      shipping_options: filteredOptions
    });
  } catch (error) {
    console.error('Shipping options error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
