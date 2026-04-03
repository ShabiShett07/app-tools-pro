'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { smoothScrollTo } from '../utils/smoothScroll';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-red opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-teal opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-20 w-20 h-20 border-4 border-brand-red transform rotate-45 opacity-20"
          style={{ animation: 'float 6s ease-in-out infinite' }}
        ></div>
        <div
          className="absolute bottom-1/4 right-32 w-16 h-16 border-4 border-brand-teal rounded-full opacity-20"
          style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-24 h-24 border-4 border-brand-red opacity-10"
          style={{ animation: 'float 7s ease-in-out infinite', animationDelay: '2s' }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">

        {/* Main Heading */}
        <h1
          className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <span className="text-foreground">Turn your Idea </span>
          <br />
          <span className="text-foreground">Into a </span>
          <br />
          <span
            className="inline-block cursor-pointer"
            style={{
              background: 'linear-gradient(90deg, #E63946 0%, #E63946 33%, #1D7874 66%, #1D7874 100%)',
              backgroundSize: '200% 100%',
              backgroundPosition: '0% 50%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'background-position 2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundPosition = '100% 50%';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundPosition = '0% 50%';
            }}
          >
            Working Product
          </span>
          <br />
          <span className="text-foreground">Fast</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          AppToolsPro helps early-stage founders build and fix their products
          (web + robotics), so you can launch and get your first users.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <Link
            href="/tools"
            className="border-2 border-brand-teal text-brand-teal px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all transform hover:scale-105 hover:bg-brand-teal hover:text-white cursor-pointer min-w-[200px] sm:min-w-[240px] text-center"
          >
            Explore Tools
          </Link>


        </div>
      </div>
    </section>
  );
}
