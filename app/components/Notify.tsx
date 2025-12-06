'use client';

import { useState, useRef, useEffect } from 'react';

export default function Notify() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="notify"
      className="py-24 bg-gradient-to-r from-brand-red via-brand-red to-brand-teal relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Be Part of the Revolution
          </h2>
          <p className="text-xl text-white text-opacity-90 mb-10 max-w-2xl mx-auto">
            Get early access and exclusive updates when we launch. Join the
            waitlist and be among the first to experience the future.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 rounded-full text-lg text-foreground focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 shadow-lg"
              />
              <button
                type="submit"
                className="bg-white text-brand-red px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                Notify Me
              </button>
            </form>
          ) : (
            <div className="bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white rounded-2xl p-8 max-w-xl mx-auto">
              <svg
                className="w-16 h-16 text-white mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-white mb-2">
                You're on the list!
              </h3>
              <p className="text-white text-opacity-90">
                Thank you for joining. We'll notify you when we launch.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
