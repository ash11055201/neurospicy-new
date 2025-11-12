import { Handler } from '@netlify/functions'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
})

interface RequestBody {
  amount: number
  currency?: string
  metadata?: {
    format?: string
    quantity?: string
    discountCode?: string
    customerEmail?: string
  }
}

type ResponseHeaders = Record<string, string>

export const handler: Handler = async (event) => {
  const corsHeaders: ResponseHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain',
      },
      body: '',
    }
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const body: RequestBody = JSON.parse(event.body || '{}')
    const { amount, currency = 'usd', metadata } = body

    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Invalid amount' }),
      }
    }

    // Convert amount to cents (Stripe uses smallest currency unit)
    const amountInCents = Math.round(amount * 100)

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      metadata: metadata || {},
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }),
    }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to create payment intent'
    return {
      statusCode: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: errorMessage,
      }),
    }
  }
}

