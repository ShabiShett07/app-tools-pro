'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = searchParams.get('userId');
  const email = searchParams.get('email');
  const userName = searchParams.get('userName');

  useEffect(() => {
    if (!userId || !email) {
      setError('Missing required user information. Please try again from the extension.');
    }
  }, [userId, email]);

  const handleSubscribe = async () => {
    if (!userId || !email) {
      setError('Missing user information');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          email,
          userName: userName || 'User',
          planType: selectedPlan,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        throw new Error('No approval URL received');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process payment');
      setIsLoading(false);
    }
  };

  if (error && (!userId || !email)) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Access</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/tabecho"
            className="inline-block bg-brand-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Go to TabEcho Page
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upgrade to <span className="text-brand-teal">TabEcho Pro</span>
          </h1>
          <p className="text-xl text-gray-600">
            Choose your plan and unlock all premium features
          </p>
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div
            onClick={() => setSelectedPlan('monthly')}
            className={`cursor-pointer rounded-2xl p-6 border-4 transition-all ${
              selectedPlan === 'monthly'
                ? 'border-brand-red shadow-xl scale-105'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly Plan</h3>
              <div className="text-4xl font-bold text-brand-red mb-2">$5</div>
              <p className="text-gray-600">per month</p>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Screenshot thumbnails</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Unlimited storage</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Advanced filters</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Priority support</span>
              </li>
            </ul>
          </div>

          <div
            onClick={() => setSelectedPlan('yearly')}
            className={`cursor-pointer rounded-2xl p-6 border-4 transition-all relative ${
              selectedPlan === 'yearly'
                ? 'border-brand-teal shadow-xl scale-105'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="absolute top-4 right-4">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                Best Value
              </span>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Yearly Plan</h3>
              <div className="text-4xl font-bold text-brand-teal mb-2">$50</div>
              <p className="text-gray-600">per year</p>
              <p className="text-sm text-green-600 font-semibold mt-1">Save $10 per year!</p>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Screenshot thumbnails</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Unlimited storage</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Advanced filters</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Priority support</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className={`bg-gradient-to-r from-brand-red to-brand-teal text-white px-12 py-4 rounded-lg font-bold text-lg transition-all ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:shadow-xl hover:scale-105'
            }`}
          >
            {isLoading ? 'Processing...' : `Continue to Payment - $${selectedPlan === 'monthly' ? '5' : '50'}`}
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Secure payment powered by PayPal • Pay with card or PayPal account
          </p>
          <p className="text-xs text-gray-400 mt-2">
            No PayPal account required - Credit & Debit cards accepted
          </p>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">What you get with Pro:</h3>
          <ul className="grid md:grid-cols-2 gap-3">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-brand-teal mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Screenshot thumbnails for visual recall</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-brand-teal mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Unlimited storage (no 100 tab/7 day limits)</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-brand-teal mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Advanced filters and search</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-brand-teal mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Tags & project organization</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-brand-teal mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Export/Import functionality</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-brand-teal mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Tab analytics and insights</span>
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function PaymentPage() {
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
      <PaymentContent />
    </Suspense>
  );
}
