'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function WiningoSupport() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">
          <span className="text-gray-900">Winingo </span>
          <span className="text-brand-red">Support</span>
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8 text-lg">
            Welcome to Winingo Support! We're here to help you get the most out of your business idea generation experience.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
            <div className="bg-gradient-to-r from-red-50 to-teal-50 border-l-4 border-brand-red p-6 mb-4 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Quick Start Guide</h3>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li><strong>Launch Winingo</strong> - Open the app on your iOS device</li>
                <li><strong>Choose Your Mode</strong> - Select "Generate Custom Idea" or "Generate Random Idea"</li>
                <li><strong>Provide Inputs (Optional)</strong> - For custom ideas, fill in pain points, target audience, purchasing power, or market characteristics</li>
                <li><strong>Generate Ideas</strong> - Tap the generate button and wait for your structured business idea</li>
                <li><strong>Review & Iterate</strong> - Read through the problem-solution framing, market reasoning, and execution steps</li>
              </ol>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What iOS versions are supported?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Winingo requires iOS 17.0 or later. The app is built with the latest Swift and SwiftUI technologies to provide the best user experience.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Are all input fields required?</h3>
                <p className="text-gray-700 leading-relaxed">
                  No! All input fields are optional. You can provide as much or as little information as you want. The more context you provide (pain points, target audience, purchasing power, market characteristics), the more tailored your business idea will be.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What's the difference between Custom and Random modes?</h3>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Custom Idea Mode:</strong> Generates business ideas based on your specific inputs (pain points, audience, etc.). Use this when you have a particular market or problem in mind.
                  <br /><br />
                  <strong>Random Idea Mode:</strong> Generates completely random, varied business ideas without requiring any input. Perfect for inspiration and exploring unexpected opportunities.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How does Winingo generate ideas?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Winingo uses advanced AI algorithms to analyze your inputs and generate structured business ideas. Each idea includes problem-solution framing, market reasoning, actionable execution steps with timelines, and strategic considerations.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Can I save or export my ideas?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Currently, Winingo displays ideas on-screen. You can take screenshots or manually copy the text to save your favorite ideas. We're considering adding export and save features in future updates.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Will these ideas guarantee business success?</h3>
                <p className="text-gray-700 leading-relaxed">
                  No. Winingo provides structured frameworks and strategic thinking tools, not guarantees of success. Every business idea requires validation, adaptation, market research, and strong execution. Winingo helps you think clearly and act strategically, but success depends on many factors including execution, market conditions, timing, and resources.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How often can I generate ideas?</h3>
                <p className="text-gray-700 leading-relaxed">
                  You can generate as many ideas as you want! There's no limit to the number of times you can use Winingo to explore different business opportunities.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Is my data private and secure?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes. We take your privacy seriously. Your inputs and generated ideas are processed securely. Please review our{' '}
                  <Link href="/privacy-policy" className="text-brand-red hover:underline">
                    Privacy Policy
                  </Link>{' '}
                  for detailed information about data handling.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Troubleshooting</h2>

            <div className="space-y-4">
              <div className="border-l-4 border-brand-teal pl-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">App won't load or crashes on startup</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Ensure you're running iOS 17.0 or later</li>
                  <li>Try force-closing the app and reopening it</li>
                  <li>Restart your device</li>
                  <li>Check for app updates in the App Store</li>
                  <li>If the issue persists, contact support below</li>
                </ul>
              </div>

              <div className="border-l-4 border-brand-teal pl-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Idea generation is taking too long</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Check your internet connection (idea generation requires network access)</li>
                  <li>Wait at least 30-60 seconds for complex idea generation</li>
                  <li>Try switching between WiFi and cellular data</li>
                  <li>If the app times out, try regenerating the idea</li>
                </ul>
              </div>

              <div className="border-l-4 border-brand-teal pl-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Text is cut off or not displaying properly</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Try scrolling within the results view</li>
                  <li>Rotate your device to landscape mode for more screen space</li>
                  <li>Adjust your device's text size settings if needed</li>
                  <li>Force-close and reopen the app</li>
                </ul>
              </div>

              <div className="border-l-4 border-brand-teal pl-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Buttons are unresponsive</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Ensure you're not tapping too quickly (haptic feedback indicates button press)</li>
                  <li>Check if the app is still processing a request</li>
                  <li>Force-close the app and try again</li>
                  <li>Restart your device if the issue continues</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Better Results</h2>
            <div className="bg-teal-50 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand-teal mr-2 font-bold">•</span>
                  <span><strong>Be Specific:</strong> When entering pain points or target audience, provide concrete details rather than vague descriptions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-teal mr-2 font-bold">•</span>
                  <span><strong>Experiment with Inputs:</strong> Try different combinations of inputs to explore various business angles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-teal mr-2 font-bold">•</span>
                  <span><strong>Use Random Mode:</strong> When you're stuck or need inspiration, random mode can spark unexpected ideas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-teal mr-2 font-bold">•</span>
                  <span><strong>Iterate Multiple Times:</strong> Generate several ideas to compare different approaches to the same problem</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-teal mr-2 font-bold">•</span>
                  <span><strong>Validate Ideas:</strong> Use generated ideas as starting points, then research and validate them with real market feedback</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Feature Requests & Feedback</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We're constantly working to improve Winingo! If you have ideas for new features or feedback about the app, we'd love to hear from you.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-3">
                <strong>Planned Features:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li>Save and organize your favorite ideas</li>
                <li>Export ideas to PDF or share via email</li>
                <li>Idea refinement and iteration tools</li>
                <li>Collaboration features for teams</li>
                <li>Industry-specific idea generation modes</li>
              </ul>
              <p className="text-gray-700">
                Have a feature request? Contact us using the information below!
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Support</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <div className="bg-gradient-to-r from-red-50 to-teal-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Winingo Support Team</strong></p>
              <p className="text-gray-700 mb-2">Email: <a href="mailto:support@apptoolspro.com" className="text-brand-red hover:underline">support@apptoolspro.com</a></p>
              <p className="text-gray-700 mb-2">Response Time: Within 24-48 hours</p>
              <p className="text-gray-700 mb-4">
                Follow us for updates:
                <a href="https://x.com/shabishetty07" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline ml-2">
                  Twitter
                </a>
              </p>
              <p className="text-gray-600 text-sm">
                When contacting support, please include your iOS version, device model, and a detailed description of your issue for faster assistance.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/winingo" className="bg-white border-2 border-gray-200 hover:border-brand-red p-6 rounded-lg transition-colors">
                <h3 className="font-bold text-lg mb-2 text-gray-900">Winingo Home</h3>
                <p className="text-gray-600 text-sm">Learn more about Winingo's features and capabilities</p>
              </Link>
              <Link href="/privacy-policy" className="bg-white border-2 border-gray-200 hover:border-brand-teal p-6 rounded-lg transition-colors">
                <h3 className="font-bold text-lg mb-2 text-gray-900">Privacy Policy</h3>
                <p className="text-gray-600 text-sm">Understand how we protect your data and privacy</p>
              </Link>
              <Link href="/refund-policy" className="bg-white border-2 border-gray-200 hover:border-brand-red p-6 rounded-lg transition-colors">
                <h3 className="font-bold text-lg mb-2 text-gray-900">Refund Policy</h3>
                <p className="text-gray-600 text-sm">Review our terms regarding purchases and refunds</p>
              </Link>
              <Link href="/tools" className="bg-white border-2 border-gray-200 hover:border-brand-teal p-6 rounded-lg transition-colors">
                <h3 className="font-bold text-lg mb-2 text-gray-900">More Tools</h3>
                <p className="text-gray-600 text-sm">Explore other tools from App Tools Pro</p>
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/winingo"
            className="inline-flex items-center text-brand-red hover:text-brand-teal transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Winingo
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
