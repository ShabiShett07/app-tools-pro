'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function WiningoMarketing() {
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
                  alt="Winingo App Icon"
                  width={140}
                  height={140}
                  priority
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Winingo
            </h1>
            <p className="text-2xl text-white/95 mb-4 font-semibold">
              Your Next Business Idea Starts Here
            </p>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Generate well-reasoned, structured business ideas powered by AI. Get strategic insights,
              opportunity framing, and actionable execution plans—all in a beautifully designed iOS app.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-brand-red px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg inline-block"
              >
                Download on the App Store
              </a>
            </div>
            <div className="flex flex-wrap gap-3 justify-center items-center text-sm mb-4">
              <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">iOS 17.0+</span>
              <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">iPhone & iPad</span>
              <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">Free Download</span>
            </div>
            <p className="text-white/85 text-base">
              Built with Swift & SwiftUI | MVVM Architecture | Production-Ready
            </p>
          </div>
        </div>
      </div>

      {/* What is Winingo */}
      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What is Winingo?
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Winingo is an innovative iOS app that helps entrepreneurs, innovators, and creative thinkers
              generate structured business ideas using AI-powered strategic analysis. Whether you have a
              specific problem in mind or need random inspiration, Winingo provides comprehensive business
              frameworks with actionable execution plans.
            </p>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Idea Generation
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to discover and validate your next business opportunity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-brand-red to-pink-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Idea Generation</h3>
              <p className="text-gray-600 leading-relaxed">
                Input your target audience, pain points, purchasing power, and market characteristics
                to generate tailored business ideas that match your vision.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-brand-teal to-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Random Inspiration Mode</h3>
              <p className="text-gray-600 leading-relaxed">
                Need a creative spark? Generate completely random, diverse business ideas across
                various industries and markets for unexpected opportunities.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-brand-red to-orange-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Structured Output</h3>
              <p className="text-gray-600 leading-relaxed">
                Every idea includes problem-solution framing, market reasoning, competitive analysis,
                and detailed execution steps with realistic timelines.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-brand-teal to-green-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced algorithms analyze market dynamics, identify opportunities, and generate
                strategic recommendations based on proven business frameworks.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-brand-red to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Beautiful Native Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Clean, minimal Apple-native interface with stunning red-to-teal gradients, smooth
                animations, and intuitive haptic feedback throughout.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-brand-teal to-cyan-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Unlimited Ideas</h3>
              <p className="text-gray-600 leading-relaxed">
                Generate as many business ideas as you want. No limits, no restrictions. Iterate
                and explore until you find the perfect opportunity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              From idea to execution in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-gradient-to-br from-brand-red to-pink-500 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg text-3xl font-bold">
                1
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Choose Your Mode</h3>
              <p className="text-gray-600">Select custom idea generation with specific inputs or random mode for creative inspiration</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-brand-teal to-blue-500 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg text-3xl font-bold">
                2
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Provide Context</h3>
              <p className="text-gray-600">Optionally share pain points, target audience, purchasing power, and market characteristics</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-brand-red to-orange-500 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg text-3xl font-bold">
                3
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Get Structured Ideas</h3>
              <p className="text-gray-600">Receive comprehensive business ideas with problem-solution framing and market analysis</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-brand-teal to-green-500 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg text-3xl font-bold">
                4
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Take Action</h3>
              <p className="text-gray-600">Follow the execution plan with actionable steps and timelines, or regenerate for new ideas</p>
            </div>
          </div>
        </div>
      </div>

      {/* App Screenshots */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Beautiful Design, Powerful Results
            </h2>
            <p className="text-xl text-gray-600">
              Experience the intuitive interface designed for entrepreneurs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 transform hover:scale-105 transition-transform duration-300">
                <div className="aspect-[9/16] relative rounded-2xl overflow-hidden">
                  <Image
                    src="/winingo-home.png"
                    alt="Winingo Home Screen - Choose between custom or random idea generation"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">Elegant Home Screen</h3>
              <p className="text-gray-600">Beautiful gradient design with clear navigation to custom or random idea modes</p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 transform hover:scale-105 transition-transform duration-300">
                <div className="aspect-[9/16] relative rounded-2xl overflow-hidden">
                  <Image
                    src="/winingo-input.png"
                    alt="Winingo Input Screen - Enter your business parameters"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">Smart Input Form</h3>
              <p className="text-gray-600">Optional fields let you provide as much or as little detail as you want</p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 transform hover:scale-105 transition-transform duration-300">
                <div className="aspect-[9/16] relative rounded-2xl overflow-hidden">
                  <Image
                    src="/winingo-results.png"
                    alt="Winingo Results Screen - Comprehensive business idea with execution plan"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">Detailed Results</h3>
              <p className="text-gray-600">Structured ideas with problem framing, market reasoning, and actionable steps</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Excellence */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-xl text-gray-600">
              Production-ready iOS app with clean architecture and best practices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Framework & Language</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brand-red mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Swift 5.9+
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brand-red mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  SwiftUI for UI
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brand-red mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  iOS 17.0+
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brand-red mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Async/Await
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Architecture & Patterns</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brand-teal mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  MVVM Pattern
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brand-teal mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Clean Separation
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brand-teal mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Modular Design
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brand-teal mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Scalable Code
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">User Experience</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brand-red mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Gradient Animations
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brand-red mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Haptic Feedback
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brand-red mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Smooth Transitions
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brand-red mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Intuitive Interface
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Who Is Winingo For */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Who Is Winingo For?
            </h2>
            <p className="text-xl text-gray-600">
              Perfect for anyone looking to discover their next business opportunity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="text-5xl mb-4">👨‍💼</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Entrepreneurs</h3>
              <p className="text-gray-600 text-sm">Looking for validated business ideas with strategic frameworks</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Innovators</h3>
              <p className="text-gray-600 text-sm">Seeking creative inspiration and new market opportunities</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Students</h3>
              <p className="text-gray-600 text-sm">Learning about business strategy and entrepreneurship</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Startup Founders</h3>
              <p className="text-gray-600 text-sm">Exploring adjacent markets or pivoting to new opportunities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-red-50 to-teal-50 rounded-3xl shadow-lg p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Important Notice
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed text-center">
              Winingo provides structured frameworks and strategic thinking tools to help you explore business
              opportunities. The ideas generated are starting points for your entrepreneurial journey, not
              guarantees of success.
            </p>
            <p className="text-gray-600 leading-relaxed text-center">
              Every business idea requires thorough validation, market research, adaptation, and dedicated
              execution. Success depends on multiple factors including your execution, market conditions,
              timing, resources, competition, and many other variables outside the app's control. Use Winingo
              as a strategic thinking partner, but always conduct your own research and due diligence.
            </p>
          </div>
        </div>
      </div>

      {/* Download CTA */}
      <div className="bg-gradient-to-r from-brand-red to-brand-teal text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your Entrepreneurial Journey Today
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Download Winingo now and discover well-reasoned business ideas with actionable execution plans.
            Your next big opportunity is just a tap away.
          </p>
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-brand-red px-12 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-colors shadow-2xl inline-block mb-6"
          >
            Download on the App Store
          </a>
          <p className="text-white/80 text-sm">Free to download • iOS 17.0 or later required</p>
        </div>
      </div>

      {/* Support & Links */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Support & Information
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Link href="/winingo/support" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
              <div className="bg-brand-red text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Support Center</h3>
              <p className="text-gray-600 text-sm">Get help and find answers to common questions</p>
            </Link>

            <Link href="/privacy-policy" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
              <div className="bg-brand-teal text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Privacy Policy</h3>
              <p className="text-gray-600 text-sm">Learn how we protect your data and privacy</p>
            </Link>

            <a href="mailto:support@apptoolspro.com" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
              <div className="bg-brand-red text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Contact Us</h3>
              <p className="text-gray-600 text-sm">Reach out to our support team for assistance</p>
            </a>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-2">
              Follow us for updates and news:
            </p>
            <a href="https://x.com/shabishetty07" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:text-brand-teal transition-colors font-semibold">
              @shabishetty07 on Twitter
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
