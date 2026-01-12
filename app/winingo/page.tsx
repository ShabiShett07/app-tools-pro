'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function WiningoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-red to-brand-teal text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="drop-shadow-2xl">
                <Image
                  src="/winingo.png"
                  alt="Winingo Logo"
                  width={120}
                  height={120}
                  priority
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Winingo - Your Next Business Idea
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              A production-ready iOS app that helps you generate well-reasoned business ideas based on strategic inputs.
              Get structured thinking, opportunity framing, and actionable execution plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-brand-red px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg inline-block"
              >
                Download on App Store
              </a>
              <a
                href="#features"
                className="bg-brand-teal text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-colors shadow-lg inline-block"
              >
                Learn More
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 justify-center items-center text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">iOS 17.0+</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Swift + SwiftUI</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">MVVM Architecture</span>
            </div>
            <p className="mt-6 text-white/80 text-sm">
              Winingo helps you think clearly and act strategically
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Winingo Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, structured, and strategic idea generation
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Input Your Ideas</h3>
              <p className="text-gray-600 text-sm">Share pain points, target audience, purchasing power, and market characteristics (all optional)</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="font-bold text-lg mb-2">AI Processing</h3>
              <p className="text-gray-600 text-sm">Our algorithms analyze your inputs and generate structured business ideas</p>
            </div>

            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Structured Output</h3>
              <p className="text-gray-600 text-sm">Get problem-solution framing, market reasoning, and actionable steps with timelines</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Take Action</h3>
              <p className="text-gray-600 text-sm">Follow the execution plan or regenerate for new ideas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to generate and validate business ideas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start">
                <div className="bg-brand-red text-white rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Custom Idea Generation</h3>
                  <p className="text-gray-600 text-sm">Generate ideas based on optional user inputs like pain points, purchasing power, target audience, and market characteristics</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start">
                <div className="bg-brand-teal text-white rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Random Idea Mode</h3>
                  <p className="text-gray-600 text-sm">Get inspired with completely random, varied business ideas when you need a creative spark</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start">
                <div className="bg-brand-red text-white rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Comprehensive Output</h3>
                  <p className="text-gray-600 text-sm">Each idea includes problem-solution framing, market reasoning, actionable execution steps, and realistic timelines</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start">
                <div className="bg-brand-teal text-white rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Beautiful Design</h3>
                  <p className="text-gray-600 text-sm">Clean, minimal Apple-native design with beautiful red-to-teal gradients and smooth animations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Preview Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See Winingo in Action
            </h2>
            <p className="text-xl text-gray-600">
              Intuitive interface, powerful results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
                <div className="aspect-[9/16] relative rounded-xl overflow-hidden">
                  <Image
                    src="/winingo-home.png"
                    alt="Winingo Home Screen"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Home Screen</h3>
              <p className="text-gray-600 text-sm">Choose between custom idea generation or random inspiration</p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
                <div className="aspect-[9/16] relative rounded-xl overflow-hidden">
                  <Image
                    src="/winingo-input.png"
                    alt="Winingo Input Screen"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Input Screen</h3>
              <p className="text-gray-600 text-sm">Fill in optional details about your target market and customer</p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
                <div className="aspect-[9/16] relative rounded-xl overflow-hidden">
                  <Image
                    src="/winingo-results.png"
                    alt="Winingo Results Screen"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Results Screen</h3>
              <p className="text-gray-600 text-sm">Get structured ideas with actionable steps and timelines</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built with Modern Tech
            </h2>
            <p className="text-xl text-gray-600">
              Production-ready iOS app with clean architecture
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">Framework</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Swift 5.9+</li>
                <li>• SwiftUI for UI</li>
                <li>• iOS 17.0+</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">Architecture</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• MVVM pattern</li>
                <li>• Async/await</li>
                <li>• Clean separation</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">Features</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Gradient UI</li>
                <li>• Smooth animations</li>
                <li>• Haptic feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              A Note About Business Ideas
            </h3>
            <p className="text-gray-700 mb-4">
              Winingo provides structured frameworks and strategic thinking tools, not guarantees of success.
              Every business idea requires validation, adaptation, and execution based on real market feedback.
            </p>
            <p className="text-gray-600 text-sm">
              Winingo helps you think clearly and act strategically, but success depends on your execution,
              market conditions, and many other factors outside the app's control.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-brand-red to-brand-teal text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Next Big Idea?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Download Winingo today and start generating well-reasoned business ideas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-brand-red px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg inline-block"
            >
              Download on App Store
            </a>
            <a
              href="/tools"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-brand-red transition-colors inline-block"
            >
              Explore More Tools
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
