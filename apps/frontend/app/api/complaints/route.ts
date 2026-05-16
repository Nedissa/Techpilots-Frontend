import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    const { order_id, description } = await req.json()

    if (!order_id || !description) {
      return Response.json(
        { error: "Order ID and description are required" },
        { status: 400 }
      )
    }

    const cookieStore = await cookies()
    const authToken = cookieStore.get("medusa_token")?.value

    if (!authToken) {
      return Response.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    const adminKey = process.env.MEDUSA_ADMIN_KEY

    if (!backendUrl || !publishableKey || !adminKey) {
      return Response.json(
        { error: "Backend configuration missing" },
        { status: 500 }
      )
    }

    // Get customer ID from the token
    const customerResponse = await fetch(
      `${backendUrl}/store/customers/me`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-publishable-api-key": publishableKey,
        },
      }
    )

    if (!customerResponse.ok) {
      return Response.json(
        { error: "Failed to get customer info" },
        { status: 401 }
      )
    }

    const customerData = await customerResponse.json()
    const customerId = customerData.customer?.id || customerData.id

    if (!customerId) {
      return Response.json(
        { error: "Could not extract customer ID" },
        { status: 400 }
      )
    }

    // Save complaint to backend
    const response = await fetch(`${backendUrl}/admin/complaints`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminKey}`,
      },
      body: JSON.stringify({
        customer_id: customerId,
        order_id,
        description,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return Response.json(
        { error: error.message || "Failed to save complaint" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return Response.json({ complaint: data.complaint }, { status: 201 })
  } catch (error) {
    console.error("Complaint API error:", error)
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
