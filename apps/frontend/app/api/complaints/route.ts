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

    if (!backendUrl || !publishableKey) {
      return Response.json(
        { error: "Backend configuration missing" },
        { status: 500 }
      )
    }

    // Get customer info and save complaint to their metadata
    const getResponse = await fetch(
      `${backendUrl}/store/customers/me`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-publishable-api-key": publishableKey,
        },
      }
    )

    if (!getResponse.ok) {
      return Response.json(
        { error: "Failed to authenticate" },
        { status: 401 }
      )
    }

    const customerData = await getResponse.json()
    const customerId = customerData.customer?.id || customerData.id
    const existingComplaints = customerData.customer?.metadata?.complaints || []

    const newComplaint = {
      id: `complaint_${Date.now()}`,
      order_id,
      description,
      created_at: new Date().toISOString(),
      status: "open",
    }

    // Update customer metadata with new complaint
    const updateResponse = await fetch(
      `${backendUrl}/store/customers/me`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          "x-publishable-api-key": publishableKey,
        },
        body: JSON.stringify({
          metadata: {
            complaints: [...existingComplaints, newComplaint],
          },
        }),
      }
    )

    if (!updateResponse.ok) {
      return Response.json(
        { error: "Failed to save complaint" },
        { status: 500 }
      )
    }

    return Response.json({ complaint: newComplaint }, { status: 201 })
  } catch (error) {
    console.error("Complaint API error:", error)
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
