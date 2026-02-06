'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function WiningoPrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Link
            href="/winingo"
            className="inline-flex items-center text-brand-red hover:text-brand-teal transition-colors font-medium mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Winingo
          </Link>

          <h1 className="text-4xl font-bold mb-4">
            <span className="text-gray-900">Winingo </span>
            <span className="text-brand-red">Privacy Policy</span>
          </h1>
          <p className="text-gray-600">
            Your privacy is important to us. This policy explains how Winingo handles your information.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Winingo, your AI-powered business idea generation assistant. This Privacy Policy describes how Winingo ("we", "our", or "us") collects, uses, and protects your information when you use our iOS application available on the Apple App Store.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Winingo is designed to help users generate structured business ideas based on optional inputs. We are committed to protecting your privacy and being transparent about our data practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Information You Provide</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you use Winingo to generate business ideas, you may optionally provide:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Pain Points:</strong> Problems or challenges you want to address</li>
              <li><strong>Target Audience:</strong> Description of your intended customers</li>
              <li><strong>Purchasing Power:</strong> Information about your target market's budget</li>
              <li><strong>Market Characteristics:</strong> Details about the market you're targeting</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Important:</strong> All input fields in Winingo are optional. You can generate ideas without providing any personal information.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you use the Winingo app, we may automatically collect:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Device information (iOS version, device model)</li>
              <li>App usage statistics (features used, generation frequency)</li>
              <li>Crash reports and error logs for app improvement</li>
              <li>Anonymous analytics data through Apple's privacy-preserving frameworks</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Information We Do NOT Collect</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Winingo does not collect:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Your name, email address, or phone number</li>
              <li>Location data</li>
              <li>Contact list or photos</li>
              <li>Any information that directly identifies you personally</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information collected to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Generate Business Ideas:</strong> Process your optional inputs through AI to create personalized business ideas with structured frameworks</li>
              <li><strong>Improve the App:</strong> Analyze usage patterns to enhance features and user experience</li>
              <li><strong>Fix Technical Issues:</strong> Debug crashes and resolve technical problems</li>
              <li><strong>Provide Random Ideas:</strong> Generate varied, random business ideas when you use the random idea feature</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. AI Processing and Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Winingo uses artificial intelligence to generate business ideas. Here's what you should know:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>AI Processing:</strong> Your inputs (when provided) are sent to our AI service provider to generate business ideas. These inputs are processed in real-time and are not permanently stored on external servers.</li>
              <li><strong>No Training Data:</strong> Your inputs are not used to train AI models or shared with third parties for marketing purposes.</li>
              <li><strong>Anonymized Processing:</strong> All AI processing is done without personally identifiable information.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Storage and Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Local Storage:</strong> Generated business ideas are stored locally on your iOS device. This data remains on your device and is not synced to our servers or iCloud unless you choose to enable iCloud syncing through iOS settings.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Deletion:</strong> You can delete your generated ideas at any time through the app. Deleting the app will remove all locally stored data.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Retention Period:</strong> We do not retain your input data or generated ideas on our servers. Temporary processing data is deleted immediately after idea generation is complete.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, rent, or trade your information. We may share information only in these limited circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>AI Service Providers:</strong> To process your inputs and generate business ideas (processed anonymously)</li>
              <li><strong>Apple Services:</strong> Through Apple's App Store and standard iOS frameworks</li>
              <li><strong>Legal Requirements:</strong> If required by law or to protect our legal rights</li>
              <li><strong>Business Transfers:</strong> In the event of a merger or acquisition (users will be notified)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              All third-party service providers are bound by privacy agreements and are prohibited from using your data for any purpose other than providing services to Winingo.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Encrypted data transmission (HTTPS/TLS)</li>
              <li>Secure API endpoints for AI processing</li>
              <li>Local data storage on your device protected by iOS security features</li>
              <li>No permanent server-side storage of your inputs or generated ideas</li>
              <li>Regular security audits and updates</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              While we strive to protect your information, no method of electronic storage or transmission is 100% secure. We cannot guarantee absolute security but are committed to protecting your data using best practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the following rights regarding your information:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Access:</strong> Since data is stored locally, you have full access to your generated ideas through the app</li>
              <li><strong>Deletion:</strong> Delete individual ideas or all data through the app settings</li>
              <li><strong>Opt-Out:</strong> Choose not to provide optional inputs and use the random idea feature instead</li>
              <li><strong>Analytics:</strong> Limit ad tracking through iOS Settings to minimize analytics data collection</li>
              <li><strong>App Deletion:</strong> Uninstalling the app removes all locally stored data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Winingo is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided information to us, please contact us immediately, and we will take steps to remove such information.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The app is rated for users aged 17+ on the App Store due to the nature of business content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Users</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Winingo is available globally through the Apple App Store. If you are using the app from outside the United States, please note that your information may be processed in countries where data protection laws may differ from your country of residence.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              By using Winingo, you consent to the transfer of your information to countries where our service providers operate, subject to the protections described in this Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. California Privacy Rights (CCPA)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Right to know what personal information is collected</li>
              <li>Right to know whether personal information is sold or disclosed</li>
              <li>Right to opt-out of the sale of personal information (Note: We do not sell personal information)</li>
              <li>Right to deletion of personal information</li>
              <li>Right to non-discrimination for exercising CCPA rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. European Union Users (GDPR)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you are in the European Economic Area (EEA), you have rights under the General Data Protection Regulation (GDPR):
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Right of access to your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our legal basis for processing your information is your consent (provided when you use the app) and our legitimate interest in providing and improving the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>We will update the "Effective Date" at the top of this policy</li>
              <li>We may notify you through the app or via the App Store</li>
              <li>Significant changes will be prominently announced</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              We encourage you to review this Privacy Policy periodically. Your continued use of Winingo after changes are posted constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. App Store and Apple Policies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Winingo is distributed through the Apple App Store and is subject to Apple's privacy policies and terms of service. Apple may collect information about your app downloads and usage according to their privacy policy. We recommend reviewing:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Apple's Privacy Policy: <a href="https://www.apple.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">apple.com/privacy</a></li>
              <li>App Store Terms of Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or how Winingo handles your information, please contact us:
            </p>
            <div className="bg-gradient-to-r from-red-50 to-teal-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700 mb-3"><strong className="text-brand-red">Winingo Support</strong></p>
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> <a href="mailto:privacy@apptoolspro.com" className="text-brand-red hover:underline">privacy@apptoolspro.com</a>
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Support:</strong> <Link href="/winingo/support" className="text-brand-red hover:underline">Visit Winingo Support</Link>
              </p>
              <p className="text-gray-700">
                <strong>Social Media:</strong>
                <a href="https://x.com/shabishetty07" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline ml-2">
                  Twitter/X
                </a>
              </p>
              <p className="text-gray-600 text-sm mt-4">
                We will respond to your inquiries within 30 days.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Disclaimer About Business Ideas</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              While not strictly a privacy matter, we want to be transparent: Winingo provides structured frameworks and strategic thinking tools, not guarantees of success. The business ideas generated are for informational and educational purposes only. Always conduct your own research and due diligence before pursuing any business opportunity.
            </p>
          </section>

          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-brand-red mt-8">
            <p className="text-gray-700">
              <strong>Summary:</strong> Winingo collects minimal information, stores data locally on your device, and processes optional inputs through AI to generate business ideas. We don't sell your data, don't require personal information, and respect your privacy.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-between">
          <Link
            href="/winingo"
            className="inline-flex items-center text-brand-red hover:text-brand-teal transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Winingo
          </Link>

          <div className="flex gap-4">
            <Link
              href="/winingo/support"
              className="text-gray-600 hover:text-brand-red transition-colors font-medium"
            >
              Support
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-brand-red transition-colors font-medium"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
