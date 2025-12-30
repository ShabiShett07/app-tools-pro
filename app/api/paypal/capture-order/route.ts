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
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();

    const captureResponse = await fetch(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const captureData = await captureResponse.json();

    if (!captureResponse.ok) {
      console.error('PayPal capture failed:', captureData);
      return NextResponse.json(
        { error: 'Failed to capture payment', details: captureData },
        { status: 500 }
      );
    }

    const referenceId = captureData.purchase_units[0].reference_id;
    const userId = referenceId.split('_')[2];

    const captureDetails = captureData.purchase_units[0].payments.captures[0];
    const amount = parseFloat(captureDetails.amount.value);
    const currency = captureDetails.amount.currency_code;
    const paymentId = captureDetails.id;

    await supabase
      .from('tabecho_subscriptions')
      .update({
        status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_customer_id', orderId);

    await supabase.from('tabecho_payment_history').insert({
      user_id: userId,
      stripe_payment_id: paymentId,
      amount_paid: amount,
      currency: currency,
      payment_status: 'completed',
      payment_method: 'paypal',
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      captureId: paymentId,
      status: captureData.status,
    });
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
