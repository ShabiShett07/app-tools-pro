'use client';

import { useEffect, useState, useRef } from 'react';

export default function Vision() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const visionItems = [
    'Premium Chrome Extensions',
    'Powerful Web Applications',
    'Productivity Tools That Scale',
  ];

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              Our Vision
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                App Tools Pro is more than just a collection of apps. It's a
                movement towards smarter, more powerful productivity tools that
                adapt to your needs.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We're crafting experiences that blend power with creativity,
                functionality with beauty, innovation with simplicity.
              </p>
            </div>

            {/* Vision List */}
            <div className="space-y-4">
              {visionItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 transition-all duration-700 ${
                    isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-teal rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Graphic */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative w-full h-96 flex items-center justify-center">
              {/* Pulsing Circle Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-brand-red to-brand-teal opacity-20 animate-pulse"></div>
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ animationDelay: '0.5s' }}
              >
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-brand-teal to-brand-red opacity-30 animate-pulse"></div>
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ animationDelay: '1s' }}
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-red to-brand-teal opacity-40 animate-pulse"></div>
              </div>

              {/* Center Icon */}
              <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-brand-red to-brand-teal rounded-2xl flex items-center justify-center transform rotate-12 shadow-2xl">
                <svg
                  className="w-12 h-12 text-white transform -rotate-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>

              {/* Floating Elements */}
              <div
                className="absolute top-10 right-10 w-16 h-16 bg-brand-red opacity-20 rounded-lg transform rotate-45"
                style={{ animation: 'float 4s ease-in-out infinite' }}
              ></div>
              <div
                className="absolute bottom-10 left-10 w-12 h-12 bg-brand-teal opacity-20 rounded-full"
                style={{
                  animation: 'float 5s ease-in-out infinite',
                  animationDelay: '1s',
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
