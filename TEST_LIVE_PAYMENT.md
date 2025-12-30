# Live PayPal Payment Testing Checklist

## Before Testing

- [x] Switched to live mode (`NEXT_PUBLIC_PAYPAL_MODE=live`)
- [x] Updated PayPal credentials to live keys
- [x] Updated webhook URL to production domain
- [x] Updated NEXT_PUBLIC_APP_URL to production domain

## Test Payment Flow

### 1. Create Test Payment

Visit this URL (replace with your details):
```
https://apptoolspro.com/tabecho/payment?userId=test_live_123&email=your-email@example.com&userName=Test User
```

**Recommended**: Start with Monthly plan ($5) to minimize cost

### 2. Complete Payment

- [ ] Click "Subscribe with PayPal"
- [ ] Redirected to PayPal checkout
- [ ] Login with your personal PayPal account
- [ ] Complete the payment
- [ ] Redirected back to success page

### 3. Verify in Application

- [ ] Payment success page loads correctly
- [ ] No JavaScript errors in browser console

### 4. Verify in Supabase

Run these queries in Supabase SQL Editor:

```sql
-- Check subscription was created
SELECT * FROM tabecho_subscriptions
WHERE user_id = 'test_live_123'
ORDER BY created_at DESC;

-- Check payment was recorded
SELECT * FROM tabecho_payment_history
WHERE user_id = 'test_live_123'
ORDER BY created_at DESC;
```

**Expected Results:**
- Subscription status: `active`
- Payment status: `completed`
- Payment method: `paypal`
- Amount: `5.00` USD (for monthly)

### 5. Verify in PayPal Dashboard

1. Go to [PayPal Business Dashboard](https://www.paypal.com/businessmanage/account/activity)
2. Check recent transactions
3. Verify payment shows as completed
4. Check amount received (minus PayPal fees)

### 6. Test Webhook (Important!)

Check your server logs or Supabase to verify webhook was received:

```sql
-- If webhook worked, subscription should be 'active'
SELECT status FROM tabecho_subscriptions
WHERE user_id = 'test_live_123';
```

If status is still `pending`, webhook might not be working:
1. Check PayPal webhook logs in Developer Dashboard
2. Verify webhook URL is accessible: `https://apptoolspro.com/api/paypal/webhook`
3. Check PAYPAL_WEBHOOK_ID matches your live webhook

### 7. Test Subscription Status API

Test from browser console or terminal:

```bash
curl "https://apptoolspro.com/api/tabecho/subscription-status?userId=test_live_123"
```

**Expected Response:**
```json
{
  "hasActiveSubscription": true,
  "subscription": {
    "planType": "monthly",
    "status": "active",
    "currentPeriodEnd": "2025-01-30T...",
    "cancelAtPeriodEnd": false
  }
}
```

### 8. Refund Test Payment (Optional)

If you want to refund your test payment:

1. Go to [PayPal Activity](https://www.paypal.com/myaccount/transactions/)
2. Find the test payment
3. Click "Issue Refund"
4. Refund the full amount

**Note**: After refund, you should update the subscription status in Supabase:

```sql
UPDATE tabecho_subscriptions
SET status = 'canceled'
WHERE user_id = 'test_live_123';
```

## What to Check For

### Payment Flow
- [ ] Order creation works
- [ ] Redirect to PayPal works
- [ ] Payment completes successfully
- [ ] Return to success page works
- [ ] No errors in browser console

### Database
- [ ] Subscription record created
- [ ] Status is 'active' (after webhook)
- [ ] Payment history recorded
- [ ] Correct amount stored
- [ ] Current period dates are correct

### PayPal
- [ ] Payment shows in PayPal dashboard
- [ ] Correct amount received (minus fees)
- [ ] Webhook events delivered

### API
- [ ] Subscription status API returns correct data
- [ ] Can check status from extension

## Common Issues

### Issue: Status stays 'pending'
**Solution**: Webhook not working
- Check webhook URL is accessible
- Verify PAYPAL_WEBHOOK_ID is correct
- Check webhook events in PayPal dashboard

### Issue: Payment completes but no database record
**Solution**: API error
- Check server logs
- Verify Supabase credentials
- Test API endpoint manually

### Issue: Can't refund payment
**Solution**:
- Wait a few minutes after payment
- Check PayPal dashboard for refund option
- Contact PayPal support if needed

## Cost of Testing

### Monthly Plan
- Charge: $5.00
- PayPal fee: ~$0.45 (2.9% + $0.30)
- Your cost: ~$5.45
- **Refundable**: Yes (refund within 180 days)

### Yearly Plan
- Charge: $50.00
- PayPal fee: ~$1.75
- Your cost: ~$51.75
- **Refundable**: Yes (refund within 180 days)

## After Successful Test

- [ ] Test payment completed successfully
- [ ] All database records correct
- [ ] Webhook working properly
- [ ] API returning correct data
- [ ] (Optional) Test payment refunded
- [ ] Ready for real customers

## Notes

- Test during low-traffic times
- Monitor server logs during test
- Keep test user_id separate from real users
- Document any issues found
- Consider testing both monthly and yearly plans
