'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { smoothScrollTo } from '../utils/smoothScroll';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-3 items-center">
          {/* Left - Logo */}
          <Link href="/" className="flex items-center cursor-pointer">
            <Image
              src="/logo.png"
              alt="App Tools Pro Logo"
              width={72}
              height={72}
              className="rounded-lg"
              priority
            />
          </Link>

          {/* Center - Brand Name */}
          <Link href="/" className="flex justify-center cursor-pointer">
            <div className="text-4xl font-bold">
              <span className="text-foreground">App</span>
              <span className="text-brand-red">Tools</span>
              <span className="text-brand-teal">Pro</span>
            </div>
          </Link>

          {/* Right - Navigation */}
          <div className="flex justify-end">
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, '#about')}
                className="text-foreground hover:text-brand-red transition-colors font-medium cursor-pointer"
              >
                About
              </a>
              <a
                href="#vision"
                onClick={(e) => handleNavClick(e, '#vision')}
                className="text-foreground hover:text-brand-red transition-colors font-medium cursor-pointer"
              >
                Vision
              </a>
              <a
                href="#notify"
                onClick={(e) => handleNavClick(e, '#notify')}
                className="bg-brand-red hover:bg-opacity-90 text-white px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 cursor-pointer"
              >
                Get Notified
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-foreground">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
