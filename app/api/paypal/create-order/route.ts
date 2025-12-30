import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const PAYPAL_API_BASE =
  process.env.NEXT_PUBLIC_PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const { userId, email, userName, planType } = await request.json();

    if (!userId || !email || !planType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const planPrices = {
      monthly: 5.0,
      yearly: 50.0,
    };

    const amount = planPrices[planType as keyof typeof planPrices];
    if (!amount) {
      return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 });
    }

    const accessToken = await getPayPalAccessToken();

    const orderPayload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: `tabecho_${planType}_${userId}_${Date.now()}`,
          description: `TabEcho ${planType === 'monthly' ? 'Monthly' : 'Yearly'} Pro Subscription`,
          amount: {
            currency_code: 'USD',
            value: amount.toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: 'App Tools Pro',
        landing_page: 'BILLING',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/tabecho/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/tabecho/payment`,
      },
    };

    const orderResponse = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderPayload),
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      console.error('PayPal order creation failed:', orderData);
      return NextResponse.json(
        { error: 'Failed to create PayPal order', details: orderData },
        { status: 500 }
      );
    }

    const subscriptionEndDate = new Date();
    if (planType === 'monthly') {
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
    } else {
      subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1);
    }

    await supabase.from('tabecho_subscriptions').insert({
      user_id: userId,
      email: email,
      stripe_customer_id: orderData.id,
      stripe_subscription_id: orderData.id,
      plan_type: planType,
      status: 'pending',
      current_period_start: new Date().toISOString(),
      current_period_end: subscriptionEndDate.toISOString(),
      cancel_at_period_end: false,
    });

    return NextResponse.json({
      orderId: orderData.id,
      approvalUrl: orderData.links.find((link: any) => link.rel === 'approve')?.href,
    });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
