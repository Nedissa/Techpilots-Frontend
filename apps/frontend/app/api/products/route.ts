export async function GET() {
  try {
    const response = await fetch(
      'https://frumpy-cloud-disuse.medusajs.app/store/products?limit=100',
      {
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': 'pk_91214f8d5ac9aa3cbfee7384cd66d2d3607d6a563b7d33508c23e836adff56f9',
        },
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to fetch from Medusa' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error in /api/products:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
