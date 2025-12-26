'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">
          <span className="text-gray-900">Refund </span>
          <span className="text-brand-teal">Policy</span>
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At App Tools Pro, we strive to provide high-quality tools and services that meet your needs. Please read this Refund Policy carefully before making a purchase.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-900 font-bold mb-2">NO REFUND POLICY:</p>
              <p className="text-red-800 leading-relaxed">
                <strong>All sales are final.</strong> We do not offer refunds under any circumstances. By making a purchase, you acknowledge and agree that no refunds will be provided for any reason whatsoever.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. No Refund Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              App Tools Pro maintains a strict no-refund policy for all products and services:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>All Purchases Are Final:</strong> Once a purchase is completed, it cannot be refunded, reversed, or exchanged</li>
              <li><strong>No Exceptions:</strong> Refunds will not be issued under any circumstances, including but not limited to dissatisfaction with the service, change of mind, or technical difficulties</li>
              <li><strong>Pre-Purchase Evaluation:</strong> We encourage you to carefully review all product information, features, and specifications before making a purchase decision</li>
              <li><strong>Contact Support First:</strong> If you experience any issues with our products or services, please contact our support team who will work to resolve your concerns</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. What This Means for You</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our no-refund policy applies to all products and services, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>All subscription services and renewals</li>
              <li>One-time purchases of tools and features</li>
              <li>Custom development work and services</li>
              <li>Promotional, discounted, or full-price items</li>
              <li>Digital products and downloads</li>
              <li>Any and all other products or services offered by App Tools Pro</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              By proceeding with a purchase, you explicitly acknowledge and accept this no-refund policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Billing Errors and Duplicate Charges</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              While we maintain a strict no-refund policy, we will address legitimate billing errors:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Duplicate Charges:</strong> If you were accidentally charged multiple times for the same purchase due to a technical error, we will refund the duplicate charge(s)</li>
              <li><strong>Unauthorized Charges:</strong> If you identify unauthorized charges on your account, please contact us immediately</li>
              <li><strong>Billing Errors:</strong> If there is a clear billing error (such as being charged an incorrect amount), we will investigate and correct it</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              To report a billing error, contact our support team at <strong>support@apptoolspro.com</strong> with your order number, purchase date, and a detailed description of the issue.
            </p>
          </section>


          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cancellations</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may cancel your subscription at any time:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Cancellations will take effect at the end of the current billing period</li>
              <li>You will retain access to the service until the end of the paid period</li>
              <li><strong>No refund will be provided for the remaining time in the current billing period under any circumstances</strong></li>
              <li>Future billing will cease after the cancellation takes effect</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Chargebacks and Disputes</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We take chargebacks and payment disputes seriously:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Filing a chargeback for a legitimate purchase violates our Terms of Service</li>
              <li>Fraudulent chargebacks will result in immediate account suspension</li>
              <li>We will provide all necessary documentation to payment providers to contest invalid chargebacks</li>
              <li>If you have a legitimate concern, please contact our support team before initiating a chargeback</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this Refund Policy from time to time. Any changes will be posted on this page with an updated effective date. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about our No-Refund Policy or need assistance with billing errors, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>App Tools Pro Support</strong></p>
              <p className="text-gray-700 mb-2">Email: support@apptoolspro.com</p>
              <p className="text-gray-700 mb-2">Response Time: Within 24-48 hours</p>
              <p className="text-gray-700">
                Follow us:
                <a href="https://x.com/shabishetty07" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline ml-2">
                  Twitter
                </a>
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Your Acceptance</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By making a purchase from App Tools Pro, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>You have read and understood this No-Refund Policy in its entirety</li>
              <li>You agree to all terms outlined in this policy</li>
              <li>You accept that all purchases are final and non-refundable</li>
              <li>You will not initiate chargebacks for legitimate purchases</li>
              <li>You have made an informed decision before completing your purchase</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center text-brand-teal hover:text-brand-red transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
