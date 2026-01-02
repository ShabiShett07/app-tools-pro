'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CustomToolSuccessPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-red via-brand-red to-brand-teal flex items-center justify-center px-4 py-8">
      <div
        className={`text-center max-w-2xl transition-all duration-1000 ${
          mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Success Icon */}
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-3 animate-bounce">
            <svg
              className="w-10 h-10 text-brand-teal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
          Wish Submitted!
        </h1>
        <p className="text-lg md:text-xl text-white text-opacity-90 mb-6 leading-relaxed">
          Thank you for sharing your wish tool idea with us. We're excited to learn more about what you envision!
        </p>

        {/* What's Next */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm border-2 border-white rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-black mb-3">What Happens Next?</h2>
          <ul className="text-left text-black text-opacity-90 space-y-2">
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Our team will review your wish tool request</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>We'll reach out to discuss feasibility and next steps</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>You'll receive updates on the development progress</span>
            </li>
          </ul>
        </div>

        {/* Additional Info */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm border-2 border-white rounded-2xl p-6 mb-6">
          <p className="text-white text-opacity-90 text-sm">
            We typically respond to wish tool requests within 3-5 business days. In the meantime, check out our existing tools and services.
          </p>
        </div>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-brand-red transition-all transform hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
