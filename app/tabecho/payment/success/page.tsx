'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const capturePayment = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setError('No payment token found');
        setIsProcessing(false);
        return;
      }

      try {
        const response = await fetch('/api/paypal/capture-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: token,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to capture payment');
        }

        setIsProcessing(false);
      } catch (err) {
        console.error('Payment capture error:', err);
        setError(err instanceof Error ? err.message : 'Failed to process payment');
        setIsProcessing(false);
      }
    };

    capturePayment();
  }, [searchParams]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-teal mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing your payment...</h2>
          <p className="text-gray-600">Please wait while we confirm your subscription</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Failed</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/tabecho/payment"
            className="inline-block bg-brand-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600">
            Welcome to TabEcho Pro
          </p>
        </div>

        <div className="bg-gradient-to-r from-brand-red to-brand-teal rounded-2xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">Your subscription is now active</h2>
          <p className="text-white/90 mb-6">
            You now have access to all Pro features including screenshot thumbnails,
            unlimited storage, advanced filters, and priority support.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">Next Steps:</h3>
          <ol className="space-y-3">
            <li className="flex items-start">
              <span className="bg-brand-teal text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 font-bold">
                1
              </span>
              <span className="text-gray-700">
                Return to your TabEcho extension and refresh to see your Pro features
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-brand-teal text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 font-bold">
                2
              </span>
              <span className="text-gray-700">
                Enable screenshot thumbnails in your extension settings
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-brand-teal text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 font-bold">
                3
              </span>
              <span className="text-gray-700">
                Start organizing your tabs with tags and projects
              </span>
            </li>
          </ol>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-blue-900">
            <strong>Need help?</strong> Contact our support team at{' '}
            <a href="mailto:support@apptoolspro.com" className="underline">
              support@apptoolspro.com
            </a>
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/tabecho"
            className="inline-block bg-brand-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Back to TabEcho
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
