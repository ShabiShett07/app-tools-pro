'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

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
    { number: 1, label: 'App Launched & Live on App Store', suffix: '', link: '/winingo' },
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
          {stats.map((stat, index) => {
            const content = (
              <>
                <div className="text-5xl md:text-6xl font-black text-white mb-3">
                  {stat.number}
                  {stat.suffix}
                </div>
                <div className="text-lg md:text-xl text-white text-opacity-90 font-medium">
                  {stat.label}
                </div>
              </>
            );

            const baseClasses = `text-center transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`;

            if ('link' in stat && stat.link) {
              return (
                <Link
                  key={index}
                  href={stat.link}
                  className={`${baseClasses} cursor-pointer hover:scale-105 transform`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={index}
                className={baseClasses}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
