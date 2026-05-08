export async function GET() {
  try {
    const response = await fetch(
      'https://techpilots.medusajs.app/store/products?limit=100',
      {
        headers: {
          'x-publishable-api-key': 'pk_28a7e81fa3c5143763dab1cd7dab06c13e477e3bc9811b0ac4f32fdf39f2ace7',
        },
      }
    );

    console.log('Medusa response status:', response.status);
    const responseText = await response.text();
    console.log('Medusa response:', responseText);

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to fetch from Medusa', details: responseText },
        { status: response.status }
      );
    }

    const data = JSON.parse(responseText);
    return Response.json(data);
  } catch (error) {
    console.error('Error in /api/products:', error);
    return Response.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
