# PayPal Integration Setup Guide for TabEcho

This guide will help you set up PayPal payment integration for TabEcho subscriptions.

## Overview

The TabEcho subscription system uses PayPal to handle payments for two subscription tiers:
- **Monthly Plan**: $5/month
- **Yearly Plan**: $50/year

## Prerequisites

1. A PayPal Business account
2. Supabase account with database set up
3. Next.js application deployed or running locally

## Step 1: PayPal Account Setup

### 1.1 Create a PayPal Developer Account

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Sign in with your PayPal account
3. Navigate to **Apps & Credentials**

### 1.2 Create a PayPal App

1. Click **Create App**
2. Enter an app name (e.g., "TabEcho Subscriptions")
3. Choose **Merchant** as the app type
4. Click **Create App**

### 1.3 Get Your API Credentials

After creating the app:

1. You'll see your **Client ID** and **Secret** in the app details
2. Copy both the **Sandbox** credentials (for testing) and **Live** credentials (for production)
3. Save these credentials securely

## Step 2: Environment Variables

Update your `.env.local` file with PayPal credentials:

```env
# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here

# PayPal Mode (sandbox or live)
NEXT_PUBLIC_PAYPAL_MODE=sandbox

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

For **production**, change:
- `PAYPAL_CLIENT_ID` to your Live Client ID
- `PAYPAL_CLIENT_SECRET` to your Live Secret
- `NEXT_PUBLIC_PAYPAL_MODE=live`
- `NEXT_PUBLIC_APP_URL` to your production domain

## Step 3: Supabase Database Setup

### 3.1 Create Required Tables

Execute these SQL commands in your Supabase SQL Editor:

```sql
-- Drop existing tables if they exist (CAREFUL: This deletes all data!)
DROP TABLE IF EXISTS tabecho_payment_history CASCADE;
DROP TABLE IF EXISTS tabecho_subscriptions CASCADE;

-- Create subscriptions table
CREATE TABLE tabecho_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  email TEXT NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('monthly', 'yearly')),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'incomplete', 'trialing', 'pending')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payment history table
CREATE TABLE tabecho_payment_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  stripe_payment_id TEXT,
  amount_paid DECIMAL(10, 2),
  currency TEXT DEFAULT 'USD',
  payment_status TEXT,
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_subscriptions_user_id ON tabecho_subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON tabecho_subscriptions(status);
CREATE INDEX idx_payment_history_user_id ON tabecho_payment_history(user_id);
```

### 3.2 Set Up Row Level Security (Optional but Recommended)

**Note**: RLS is optional since you're using the service role key for all operations. If you want to enable it:

```sql
-- Enable RLS on tables
ALTER TABLE tabecho_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tabecho_payment_history ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read their own data
CREATE POLICY "Users can view own subscriptions"
  ON tabecho_subscriptions FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view own payment history"
  ON tabecho_payment_history FOR SELECT
  USING (auth.uid()::text = user_id);

-- Allow service role to bypass RLS (happens automatically)
-- Service role key bypasses RLS by default in Supabase
```

**Alternative: Disable RLS (Simpler for Server-Side Operations)**

If you're only using the service role key (which is the case for this PayPal integration), you can simply disable RLS:

```sql
ALTER TABLE tabecho_subscriptions DISABLE ROW LEVEL SECURITY;
ALTER TABLE tabecho_payment_history DISABLE ROW LEVEL SECURITY;
```

## Step 4: Webhook Configuration

### 4.1 Create a Webhook in PayPal

1. Go to your PayPal App in the Developer Dashboard
2. Scroll to **Webhooks** section
3. Click **Add Webhook**
4. Enter your webhook URL: `https://yourdomain.com/api/paypal/webhook`
5. Select the following event types:
   - `PAYMENT.CAPTURE.COMPLETED`
   - `PAYMENT.CAPTURE.DENIED`
   - `PAYMENT.CAPTURE.REFUNDED`
6. Click **Save**

### 4.2 Add Webhook ID to Environment Variables

After creating the webhook:

1. Copy the **Webhook ID** from PayPal
2. Add it to your `.env.local`:

```env
PAYPAL_WEBHOOK_ID=your_webhook_id_here
```

## Step 5: Testing

### 5.1 Test Cards for Sandbox

Use these PayPal sandbox accounts for testing:

**Buyer Account (for making payments):**
- Email: Any email ending with @sandbox.paypal.com
- Create test accounts at: https://developer.paypal.com/dashboard/accounts

**Test Credit Cards:**
- Visa: 4032039482707144
- Mastercard: 5267318236176739
- Discover: 6011714567357506

### 5.2 Test the Payment Flow

1. Start your Next.js app: `npm run dev`
2. Navigate to: `http://localhost:3000/tabecho/payment?userId=test123&email=test@example.com&userName=Test User`
3. Select a plan (Monthly or Yearly)
4. Click "Subscribe with PayPal"
5. You'll be redirected to PayPal sandbox
6. Log in with your test buyer account
7. Complete the payment
8. You'll be redirected back to the success page

### 5.3 Verify Subscription

Check your Supabase database:

```sql
SELECT * FROM tabecho_subscriptions WHERE user_id = 'test123';
SELECT * FROM tabecho_payment_history WHERE user_id = 'test123';
```

## Step 6: Chrome Extension Integration

### 6.1 Update Your Extension

In your TabEcho Chrome extension, add code to check subscription status:

```javascript
async function checkSubscription(userId) {
  const response = await fetch(
    `https://yourdomain.com/api/tabecho/subscription-status?userId=${userId}`
  );
  const data = await response.json();
  return data.hasActiveSubscription;
}
```

### 6.2 Payment Link Generation

When users click "Upgrade to Pro" in your extension:

```javascript
function openPaymentPage(userId, email, userName) {
  const paymentUrl = `https://yourdomain.com/tabecho/payment?userId=${encodeURIComponent(userId)}&email=${encodeURIComponent(email)}&userName=${encodeURIComponent(userName)}`;
  chrome.tabs.create({ url: paymentUrl });
}
```

## Step 7: Going Live

### 7.1 Pre-Launch Checklist

- [ ] Switch PayPal credentials from Sandbox to Live
- [ ] Update `NEXT_PUBLIC_PAYPAL_MODE=live`
- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Update webhook URL in PayPal to production endpoint
- [ ] Test payment flow with real PayPal account (use small amounts)
- [ ] Verify webhooks are being received in production
- [ ] Set up monitoring for failed payments
- [ ] Configure proper error tracking (Sentry, LogRocket, etc.)

### 7.2 Update Environment Variables for Production

```env
PAYPAL_CLIENT_ID=your_live_client_id
PAYPAL_CLIENT_SECRET=your_live_secret
NEXT_PUBLIC_PAYPAL_MODE=live
NEXT_PUBLIC_APP_URL=https://yourdomain.com
PAYPAL_WEBHOOK_ID=your_live_webhook_id
```

## API Endpoints

### Create Order
- **Endpoint**: `/api/paypal/create-order`
- **Method**: POST
- **Body**: `{ userId, email, userName, planType }`
- **Response**: `{ orderId, approvalUrl }`

### Capture Order
- **Endpoint**: `/api/paypal/capture-order`
- **Method**: POST
- **Body**: `{ orderId }`
- **Response**: `{ success, captureId, status }`

### Webhook Handler
- **Endpoint**: `/api/paypal/webhook`
- **Method**: POST
- **Handles**: Payment status updates from PayPal

### Check Subscription Status
- **Endpoint**: `/api/tabecho/subscription-status?userId={userId}`
- **Method**: GET
- **Response**: `{ hasActiveSubscription, subscription }`

## Pricing & Fees

PayPal typically charges:
- **Standard Rate**: 2.9% + $0.30 per transaction (US)
- **International**: 4.4% + fixed fee

For a $5 monthly subscription:
- Fee: ~$0.45
- Net: ~$4.55

For a $50 yearly subscription:
- Fee: ~$1.75
- Net: ~$48.25

## Troubleshooting

### Payment Not Completing
- Check that webhook URL is accessible from the internet
- Verify webhook signature validation is working
- Check Supabase Service Role Key has proper permissions

### Webhook Not Receiving Events
- Ensure webhook URL is HTTPS in production
- Check PayPal webhook logs in Developer Dashboard
- Verify event types are selected correctly

### Subscription Status Not Updating
- Check Supabase database for the subscription record
- Verify webhook is processing events correctly
- Check server logs for errors

## Security Notes

1. **Never expose** your `PAYPAL_CLIENT_SECRET` in client-side code
2. **Always verify** webhook signatures to prevent fraud
3. **Use HTTPS** for all production endpoints
4. **Validate** all user inputs before processing
5. **Store** payment data securely in Supabase
6. **Log** all payment events for audit trails

## Support

For PayPal-specific issues:
- [PayPal Developer Support](https://developer.paypal.com/support/)
- [PayPal Developer Forums](https://www.paypal-community.com/t5/Developer-Community/ct-p/developer)

For application issues:
- Email: support@apptoolspro.com

## Additional Resources

- [PayPal REST API Documentation](https://developer.paypal.com/docs/api/overview/)
- [PayPal Webhooks Guide](https://developer.paypal.com/docs/api-basics/notifications/webhooks/)
- [PayPal Sandbox Testing](https://developer.paypal.com/docs/api-basics/sandbox/)
