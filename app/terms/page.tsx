'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">
          <span className="text-gray-900">Terms of </span>
          <span className="text-brand-red">Service</span>
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using App Tools Pro's website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to update or modify these terms at any time without prior notice. Your continued use of our services following any changes constitutes acceptance of those changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              App Tools Pro provides mobile applications and digital tools designed to enhance productivity and user experience. Our services include but are not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Mobile applications available on iOS and Android platforms</li>
              <li>Web-based tools and services</li>
              <li>Premium features and subscriptions</li>
              <li>Customer support and updates</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Account Registration</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              To access certain features of our services, you may need to create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Account Eligibility</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You must be at least 13 years old to use our services. If you are under 18, you must have parental or guardian consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to use our services to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful, offensive, or inappropriate content</li>
              <li>Engage in fraudulent activities or misrepresentation</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Distribute malware, viruses, or other harmful code</li>
              <li>Interfere with or disrupt our services or servers</li>
              <li>Collect user data without permission</li>
              <li>Use automated systems to access our services without authorization</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Our Rights</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content, features, and functionality of our services, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, are the exclusive property of App Tools Pro and are protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Limited License</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our services for personal, non-commercial purposes, subject to these Terms of Service.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 User Content</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You retain all rights to any content you submit, post, or display on or through our services. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content in connection with operating and providing our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payments and Subscriptions</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Pricing</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Certain features of our services may require payment. All prices are subject to change with notice. We reserve the right to modify our pricing structure at any time.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Billing</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              For subscription services, you will be billed automatically at the beginning of each billing period. You authorize us to charge your payment method on file. If payment fails, we may suspend or terminate your access to paid services.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">6.3 Refunds</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Refund eligibility is subject to our Refund Policy. Please review our{' '}
              <Link href="/refund-policy" className="text-brand-red hover:underline">
                Refund Policy
              </Link>{' '}
              for detailed information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your privacy is important to us. Please review our{' '}
              <Link href="/privacy-policy" className="text-brand-red hover:underline">
                Privacy Policy
              </Link>{' '}
              to understand how we collect, use, and protect your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our services are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Warranties of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy, reliability, or availability of services</li>
              <li>Error-free or uninterrupted operation</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not warrant that our services will meet your requirements or that any defects will be corrected.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the maximum extent permitted by law, App Tools Pro and its affiliates, officers, employees, agents, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Loss of profits, data, or goodwill</li>
              <li>Service interruption</li>
              <li>Computer damage or system failure</li>
              <li>Cost of substitute products or services</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our total liability for any claim arising out of or relating to these terms or our services shall not exceed the amount you paid to us in the twelve (12) months preceding the claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to indemnify, defend, and hold harmless App Tools Pro and its affiliates, officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Your access to or use of our services</li>
              <li>Your violation of these Terms of Service</li>
              <li>Your violation of any third-party rights</li>
              <li>Any content you submit or transmit through our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to suspend or terminate your access to our services at any time, with or without notice, for any reason, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Violation of these Terms of Service</li>
              <li>Fraudulent or illegal activity</li>
              <li>Extended periods of inactivity</li>
              <li>Requests by law enforcement or government agencies</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Upon termination, your right to use our services will immediately cease. All provisions of these terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which App Tools Pro operates, without regard to its conflict of law provisions.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Any disputes arising from these terms or our services shall be resolved through binding arbitration in accordance with applicable arbitration rules, except where prohibited by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to modify or discontinue, temporarily or permanently, our services (or any part thereof) with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our services may contain links to third-party websites or services that are not owned or controlled by App Tools Pro. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You acknowledge and agree that App Tools Pro shall not be responsible or liable for any damage or loss caused by your use of any third-party content, goods, or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Severability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If any provision of these Terms of Service is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these terms shall otherwise remain in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Entire Agreement</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms of Service, together with our Privacy Policy and Refund Policy, constitute the entire agreement between you and App Tools Pro regarding the use of our services and supersede all prior agreements and understandings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>App Tools Pro</strong></p>
              <p className="text-gray-700 mb-2">Email: support@apptoolspro.com</p>
              <p className="text-gray-700">
                Social Media:
                <a href="https://x.com/shabishetty07" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline ml-2">
                  Twitter
                </a>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center text-brand-red hover:text-brand-teal transition-colors font-medium"
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
