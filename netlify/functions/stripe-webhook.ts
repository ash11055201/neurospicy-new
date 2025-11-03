import { Handler } from '@netlify/functions'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

// Webhook secret from Stripe dashboard
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  const sig = event.headers['stripe-signature'] || ''

  let stripeEvent: Stripe.Event

  try {
    // Verify webhook signature
    stripeEvent = stripe.webhooks.constructEvent(
      event.body || '',
      sig,
      webhookSecret
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` }),
    }
  }

  // Handle the event
  try {
    switch (stripeEvent.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent
        console.log('PaymentIntent succeeded:', paymentIntent.id)
        
        // TODO: Add your business logic here
        // e.g., send confirmation email, update database, fulfill order, etc.
        // You can access metadata via: paymentIntent.metadata
        
        break

      case 'payment_intent.payment_failed':
        const failedPayment = stripeEvent.data.object as Stripe.PaymentIntent
        console.log('PaymentIntent failed:', failedPayment.id)
        
        // TODO: Add your business logic here
        // e.g., notify customer, log failure, etc.
        
        break

      case 'charge.succeeded':
        const charge = stripeEvent.data.object as Stripe.Charge
        console.log('Charge succeeded:', charge.id)
        break

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    }
  } catch (error: any) {
    console.error('Error processing webhook:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}

