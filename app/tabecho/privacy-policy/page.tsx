'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function TabEchoPrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">
          <span className="text-gray-900">TabEcho Privacy </span>
          <span className="text-brand-red">Policy</span>
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Effective Date:</strong> January 2026
          </p>

          <p className="text-gray-700 leading-relaxed mb-8">
            TabEcho is a Chrome extension developed by App Tools Pro that helps users automatically archive and restore inactive browser tabs in an organized way. Your privacy is important to us, and this policy explains how TabEcho handles data.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Data Collection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>TabEcho does not collect, transmit, sell, or share any personal user data.</strong>
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              All archived tab information (such as tab titles, URLs, timestamps, and optional screenshots) and user preferences are stored locally on the user's device using Chrome's storage APIs.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>No data is sent to external servers by default.</strong>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Data Usage</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Any locally stored data is used only to provide the core functionality of the extension, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Detecting inactive tabs</li>
              <li>Archiving tabs locally</li>
              <li>Displaying archived tabs in a timeline view</li>
              <li>Restoring archived tabs on user request</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>TabEcho does not use data for tracking, profiling, advertising, or analytics.</strong>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              TabEcho does not use third-party analytics, tracking tools, or advertising SDKs.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              If a user chooses to upgrade to a paid plan, payment processing is handled entirely by trusted third-party providers (such as PayPal or Razorpay). TabEcho does not access, store, or process payment information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Permissions</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              TabEcho requests only the permissions required to function correctly, such as access to browser tabs, idle state detection, local storage, and optional notifications. These permissions are used solely to deliver the extension's stated functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>TabEcho does not sell, rent, or share user data with third parties.</strong>
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              No user data is transferred off the device unless explicitly enabled by the user in future optional features (such as enterprise cloud sync).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Because TabEcho stores data locally on the user's device, data security is handled through Chrome's built-in extension security model and browser storage protections.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              TabEcho is not intended for use by children under the age of 13. The extension does not knowingly collect personal information from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This Privacy Policy may be updated from time to time. Any changes will be reflected on this page with an updated effective date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions or concerns about this Privacy Policy or TabEcho's data practices, you can contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>App Tools Pro</strong></p>
              <p className="text-gray-700">Email: support@apptoolspro.com</p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/tabecho"
            className="inline-flex items-center text-brand-red hover:text-brand-teal transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to TabEcho
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
