import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import Stripe from "stripe"
import nodemailer from "nodemailer"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
})

// Setup email transporter for Strato SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.strato.com",
  port: 587,
  secure: false,
  auth: {
    user: "order@techpilots.se",
    pass: process.env.STRATO_EMAIL_PASSWORD || "",
  },
})

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const body = req.body
  const sig = req.headers["stripe-signature"]

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(400).json({ error: "Missing signature or webhook secret" })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message)
    return res.status(400).json({ error: "Invalid signature" })
  }

  console.log("Received Stripe event:", event.type)

  // Handle different event types
  switch (event.type) {
    case "charge.succeeded": {
      const charge = event.data.object as Stripe.Charge
      console.log("Charge succeeded:", charge.id)

      try {
        // Send confirmation email
        await transporter.sendMail({
          from: "order@techpilots.se",
          to: charge.billing_details?.email || "customer@example.com",
          subject: "Beställningsbekräftelse - TechPilots",
          html: `
            <h1>Tack för din beställning!</h1>
            <p>Din betalning har mottagits och behandlas.</p>
            <p><strong>Betalnings-ID:</strong> ${charge.id}</p>
            <p><strong>Belopp:</strong> ${charge.amount / 100} SEK</p>
            <p>Du kommer att få en leveransbekräftelse via e-post snart.</p>
            <p>Med vänlig hälsning,<br>TechPilots Team</p>
          `,
        })
        console.log("Confirmation email sent to:", charge.billing_details?.email)
      } catch (emailError: any) {
        console.error("Failed to send email:", emailError.message)
      }
      break
    }

    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log("Payment succeeded for:", paymentIntent.id)
      break
    }

    case "charge.failed": {
      const charge = event.data.object as Stripe.Charge
      console.log("Charge failed:", charge.id)

      try {
        // Send failure email
        await transporter.sendMail({
          from: "order@techpilots.se",
          to: charge.billing_details?.email || "customer@example.com",
          subject: "Betalningen misslyckades - TechPilots",
          html: `
            <h1>Betalningen misslyckades</h1>
            <p>Tyvärr kunde vi inte behandla din betalning.</p>
            <p><strong>Felkod:</strong> ${charge.failure_code}</p>
            <p>Vänligen försök igen eller kontakta din bank.</p>
            <p>Med vänlig hälsning,<br>TechPilots Team</p>
          `,
        })
        console.log("Failure email sent to:", charge.billing_details?.email)
      } catch (emailError: any) {
        console.error("Failed to send failure email:", emailError.message)
      }
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  res.json({ received: true })
}
