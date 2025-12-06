'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user has a valid session flag
    const hasCompletedForm = sessionStorage.getItem('waitlist_completed');

    if (!hasCompletedForm) {
      // Redirect to home if accessed directly
      router.push('/');
      return;
    }

    // Clear the flag after showing the page
    sessionStorage.removeItem('waitlist_completed');
    setMounted(true);
  }, [router]);

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
          Welcome to the Revolution!
        </h1>
        <p className="text-lg md:text-xl text-white text-opacity-90 mb-6 leading-relaxed">
          You're now on the waitlist for <span className="font-bold">App Tools Pro</span>.
          We'll keep you updated on our progress and notify you as soon as we launch.
        </p>

        {/* What's Next */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm border-2 border-white rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-black mb-3">What's Next?</h2>
          <ul className="text-left text-black text-opacity-90 space-y-2">
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Check your email for a confirmation message</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>We'll send you exclusive updates as we build</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>You'll get early access when we launch</span>
            </li>
          </ul>
        </div>

        {/* Share Section */}
        <div className="mb-5">
          <p className="text-white text-opacity-90 mb-3 text-sm">
            Know someone who'd love this? Share the revolution!
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://twitter.com/intent/tweet?text=Just%20joined%20the%20waitlist%20for%20App%20Tools%20Pro!%20The%20future%20of%20productivity%20is%20coming.%20Join%20me:%20https://apptoolspro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-brand-red px-5 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 text-sm"
            >
              Share on Twitter
            </a>
          </div>
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
