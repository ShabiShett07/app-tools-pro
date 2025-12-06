'use client';

import { useEffect, useState } from 'react';
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Coming Soon Tag */}
        <div
          className={`inline-block mb-8 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="bg-brand-teal bg-opacity-10 text-brand-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider border-2 border-brand-teal">
            Coming Soon
          </span>
        </div>

        {/* Main Heading */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight transition-all duration-1000 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-foreground">The Future of </span>
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
            Productivity
          </span>
          <br />
          <span className="text-foreground">Starts Here</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-400 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          We're building a revolutionary suite of apps, extensions, and tools
          that will redefine how you work, create, and innovate.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-600 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <a
            href="#notify"
            onClick={(e) => handleScrollClick(e, '#notify')}
            className="group relative bg-brand-red text-white px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:shadow-2xl overflow-hidden cursor-pointer"
          >
            <span className="relative z-10">Join the Revolution</span>
            <div className="absolute inset-0 bg-brand-teal transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              Join the Revolution
            </span>
          </a>
          <a
            href="#vision"
            onClick={(e) => handleScrollClick(e, '#vision')}
            className="border-2 border-brand-teal text-brand-teal px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:bg-brand-teal hover:text-white cursor-pointer"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
