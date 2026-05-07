import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const productModuleService = req.scope.resolve("productModuleService");

    const products = await productModuleService.listProducts(
      {},
      { limit: 100 }
    );

    const formattedProducts = products.map((product: any) => ({
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description,
      price: product.variants?.[0]?.prices?.[0]?.amount || 0,
      images: product.images || [],
    }));

    res.json({
      products: formattedProducts,
      count: formattedProducts.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      error: "Failed to fetch products",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
