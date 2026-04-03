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
  status: 'available' | 'coming-soon' | 'in-progress';
}

const tools: Tool[] = [
  // Add tools here as they become available
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

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
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
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Tools and services to help you build, fix, and ship your products — web and robotics.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all ${selectedCategory === 'all'
                ? 'bg-brand-red text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              All Tools
            </button>
            <button
              onClick={() => setSelectedCategory('productivity')}
              className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all ${selectedCategory === 'productivity'
                ? 'bg-brand-red text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              Productivity
            </button>
            <button
              onClick={() => setSelectedCategory('communication')}
              className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all ${selectedCategory === 'communication'
                ? 'bg-brand-red text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              Communication
            </button>
            <button
              onClick={() => setSelectedCategory('utility')}
              className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all ${selectedCategory === 'utility'
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTools.map((tool, index) => (
              <div
                key={tool.id}
                className="group relative bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 hover:border-brand-red transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
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
                {tool.status === 'in-progress' && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                    In Progress
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
                ) : tool.status === 'in-progress' ? (
                  <span
                    className="inline-block bg-amber-500 text-white px-6 py-3 rounded-full font-semibold cursor-default"
                  >
                    In Progress
                  </span>
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
