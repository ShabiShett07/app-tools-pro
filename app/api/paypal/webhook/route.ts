import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

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

async function verifyWebhookSignature(
  request: NextRequest,
  webhookBody: any
): Promise<boolean> {
  try {
    const authAlgo = request.headers.get('paypal-auth-algo');
    const certUrl = request.headers.get('paypal-cert-url');
    const transmissionId = request.headers.get('paypal-transmission-id');
    const transmissionSig = request.headers.get('paypal-transmission-sig');
    const transmissionTime = request.headers.get('paypal-transmission-time');
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;

    if (!authAlgo || !certUrl || !transmissionId || !transmissionSig || !transmissionTime || !webhookId) {
      console.error('Missing webhook verification headers');
      return false;
    }

    const accessToken = await getPayPalAccessToken();

    const verificationPayload = {
      auth_algo: authAlgo,
      cert_url: certUrl,
      transmission_id: transmissionId,
      transmission_sig: transmissionSig,
      transmission_time: transmissionTime,
      webhook_id: webhookId,
      webhook_event: webhookBody,
    };

    const verificationResponse = await fetch(
      `${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(verificationPayload),
      }
    );

    const verificationData = await verificationResponse.json();
    return verificationData.verification_status === 'SUCCESS';
  } catch (error) {
    console.error('Webhook verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const webhookBody = await request.json();

    const isValid = await verifyWebhookSignature(request, webhookBody);
    if (!isValid) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const eventType = webhookBody.event_type;
    const resource = webhookBody.resource;

    console.log('PayPal Webhook Event:', eventType);

    switch (eventType) {
      case 'PAYMENT.CAPTURE.COMPLETED': {
        const orderId = resource.supplementary_data?.related_ids?.order_id;
        const referenceId = resource.custom_id || resource.invoice_id;

        if (!orderId) {
          console.error('No order ID found in webhook');
          break;
        }

        const userId = referenceId?.split('_')[2];
        const amount = parseFloat(resource.amount.value);
        const currency = resource.amount.currency_code;
        const paymentId = resource.id;

        await supabase
          .from('tabecho_subscriptions')
          .update({
            status: 'active',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', orderId);

        if (userId) {
          await supabase.from('tabecho_payment_history').insert({
            user_id: userId,
            stripe_payment_id: paymentId,
            amount_paid: amount,
            currency: currency,
            payment_status: 'completed',
            payment_method: 'paypal',
            created_at: new Date().toISOString(),
          });
        }

        break;
      }

      case 'PAYMENT.CAPTURE.DENIED':
      case 'PAYMENT.CAPTURE.REFUNDED': {
        const orderId = resource.supplementary_data?.related_ids?.order_id;

        if (orderId) {
          await supabase
            .from('tabecho_subscriptions')
            .update({
              status: 'canceled',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_customer_id', orderId);
        }

        break;
      }

      default:
        console.log('Unhandled webhook event type:', eventType);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
