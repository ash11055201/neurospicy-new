# Stripe Integration Setup Guide

This guide will help you set up Stripe payments in your Neurospicy website.

## Prerequisites

- Stripe account (sign up at https://stripe.com)
- Netlify account with your site deployed
- Access to your site's environment variables

## Step 1: Get Your Stripe API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure you're in **Test Mode** for testing (toggle in the top right)
3. Go to **Developers** > **API keys**
4. Copy your keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`) - Click "Reveal" to see it

## Step 2: Configure Netlify Environment Variables

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** > **Environment variables**
3. Add the following variables:

   | Variable Name | Value | Description |
   |--------------|-------|-------------|
   | `STRIPE_SECRET_KEY` | `sk_test_...` or `sk_live_...` | Your Stripe secret key |
   | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` or `pk_live_...` | Your Stripe publishable key |
   | `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Webhook secret (see Step 3) |

4. Click **Save**

## Step 3: Set Up Stripe Webhooks

Webhooks allow Stripe to notify your site when payments are completed.

1. In your Stripe Dashboard, go to **Developers** > **Webhooks**
2. Click **Add endpoint**
3. Enter your endpoint URL:
   - For production: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
   - For local testing, use [Stripe CLI](https://stripe.com/docs/stripe-cli) or [ngrok](https://ngrok.com)
4. Select events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.succeeded`
5. Click **Add endpoint**
6. After creating the endpoint, click on it to view details
7. Copy the **Signing secret** (starts with `whsec_`)
8. Add this as `STRIPE_WEBHOOK_SECRET` in your Netlify environment variables

## Step 4: Test the Integration

### Test Mode

1. Make sure you're using test keys (keys starting with `pk_test_` and `sk_test_`)
2. Use Stripe's [test cards](https://stripe.com/docs/testing):
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - Any future expiry date and any CVC

### Local Testing

1. **Copy the environment file:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Or manually create a `.env.local` file in your project root with:
   ```env
   STRIPE_SECRET_KEY=sk_test_your_test_key_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

2. **Add your Stripe test keys:**
   - Get your test keys from https://dashboard.stripe.com/test/apikeys
   - Replace the placeholder values in `.env.local` with your actual keys

3. **Set up Stripe CLI for webhook testing:**
   ```bash
   # Install Stripe CLI (if not installed)
   # Windows: Use Scoop or download from https://stripe.com/docs/stripe-cli
   # Mac: brew install stripe/stripe-cli/stripe
   # Linux: See https://stripe.com/docs/stripe-cli
   
   # Login to Stripe CLI
   stripe login
   
   # Forward webhooks to your local server
   stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook
   ```
   
   This will output a webhook signing secret (starts with `whsec_`). 
   Add this to your `.env.local` file as `STRIPE_WEBHOOK_SECRET`.

4. **Install and run Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

5. **Start your local development server:**
   ```bash
   netlify dev
   ```
   
   This will:
   - Start your Next.js app on http://localhost:8888
   - Run Netlify functions locally
   - Load environment variables from `.env.local`

6. **Test payments:**
   - Navigate to http://localhost:8888/checkout
   - Use Stripe test cards (see Test Mode section above)

## Step 5: Go Live

When you're ready to accept real payments:

1. Switch to **Live Mode** in your Stripe Dashboard
2. Get your live API keys from **Developers** > **API keys**
3. Create a new webhook endpoint for your production site
4. Update your Netlify environment variables with live keys
5. Redeploy your site

## Testing Payments

After setup, you can test the checkout flow:

1. Navigate to `/checkout` on your site
2. Select a product format and quantity
3. Click "Pay with Stripe"
4. Fill in the payment form
5. Use a test card to complete the payment

## Troubleshooting

### Payment form not showing

- Check that `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set correctly
- Verify the key starts with `pk_test_` or `pk_live_`
- Check browser console for errors

### Payment intent creation fails

- Verify `STRIPE_SECRET_KEY` is set in Netlify environment variables
- Check Netlify function logs in the dashboard
- Ensure the function is deployed correctly

### Webhooks not working

- Verify `STRIPE_WEBHOOK_SECRET` matches the signing secret from Stripe
- Check webhook endpoint URL is correct
- Review webhook logs in Stripe Dashboard

## Support

- [Stripe Documentation](https://stripe.com/docs)
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Stripe Support](https://support.stripe.com/)

