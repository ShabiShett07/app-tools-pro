'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  category: 'productivity' | 'communication' | 'utility';
  status: 'available' | 'coming-soon';
}

const tools: Tool[] = [
  {
    id: 'winingo',
    name: 'Winingo',
    description: 'Generate well-reasoned business ideas based on strategic inputs. Get structured thinking, opportunity framing, and actionable execution plans.',
    icon: '/winingo.png',
    url: '/winingo',
    category: 'productivity',
    status: 'available'
  },
  // Add more tools here as they become available
];

export default function ToolsPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredTools = selectedCategory === 'all'
    ? tools
    : tools.filter(tool => tool.category === selectedCategory);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-red opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-teal opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="text-foreground">Explore Our </span>
            <span
              className="inline-block"
              style={{
                background: 'linear-gradient(90deg, #E63946 0%, #1D7874 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Apps & Tools
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover powerful productivity tools designed to enhance your workflow and boost your efficiency.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-brand-red text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Tools
            </button>
            <button
              onClick={() => setSelectedCategory('productivity')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === 'productivity'
                  ? 'bg-brand-red text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Productivity
            </button>
            <button
              onClick={() => setSelectedCategory('communication')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === 'communication'
                  ? 'bg-brand-red text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Communication
            </button>
            <button
              onClick={() => setSelectedCategory('utility')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === 'utility'
                  ? 'bg-brand-red text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Utility
            </button>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool, index) => (
              <div
                key={tool.id}
                className="group relative bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-brand-red transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Status Badge */}
                {tool.status === 'coming-soon' && (
                  <div className="absolute top-4 right-4 bg-brand-teal text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                    Coming Soon
                  </div>
                )}

                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 relative">
                    <Image
                      src={tool.icon}
                      alt={`${tool.name} icon`}
                      width={96}
                      height={96}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-brand-red transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {tool.description}
                </p>

                {/* CTA */}
                {tool.status === 'available' ? (
                  <Link
                    href={tool.url}
                    className="inline-block bg-brand-red text-white px-6 py-3 rounded-full font-semibold transition-all transform group-hover:scale-105 hover:bg-opacity-90"
                  >
                    Try it Now →
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-block bg-gray-300 text-gray-500 px-6 py-3 rounded-full font-semibold cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTools.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">
                No tools found in this category. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-red to-brand-teal">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            More Tools Coming Soon
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            We're constantly building new tools to help you work smarter. Join our waitlist to be the first to know.
          </p>
          <Link
            href="/#notify"
            className="inline-block bg-white text-brand-red px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:shadow-2xl"
          >
            Get Notified
          </Link>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
