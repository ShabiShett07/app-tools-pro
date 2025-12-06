'use client';

import { useEffect, useState, useRef } from 'react';

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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

  const stats = [
    { number: 0, label: 'Apps in Development', suffix: '' },
    { number: 1, label: 'Extensions Launching Soon', suffix: '' },
    { number: 1, label: 'Revolutionary Vision', suffix: '' },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-r from-brand-red to-brand-teal"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="text-5xl md:text-6xl font-black text-white mb-3">
                {stat.number}
                {stat.suffix}
              </div>
              <div className="text-lg md:text-xl text-white text-opacity-90 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
