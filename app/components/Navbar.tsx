'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { smoothScrollTo } from '../utils/smoothScroll';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileOpen(false);

    if (pathname !== '/') {
      router.push(`/${targetId}`);
    } else {
      smoothScrollTo(targetId);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileOpen ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 cursor-pointer">
            <Image
              src="/logo.png"
              alt="App Tools Pro Logo"
              width={48}
              height={48}
              className="rounded-lg w-10 h-10 sm:w-12 sm:h-12"
              priority
            />
            <div className="text-xl sm:text-2xl md:text-3xl font-bold">
              <span className="text-foreground">App</span>
              <span className="text-brand-red">Tools</span>
              <span className="text-brand-teal">Pro</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/tools"
              className="text-foreground hover:text-brand-red transition-colors font-medium cursor-pointer"
            >
              Tools
            </Link>
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
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          <Link
            href="/tools"
            className="block px-4 py-3 rounded-lg text-foreground hover:bg-gray-50 hover:text-brand-red transition-colors font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Tools
          </Link>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="block px-4 py-3 rounded-lg text-foreground hover:bg-gray-50 hover:text-brand-red transition-colors font-medium cursor-pointer"
          >
            About
          </a>
          <a
            href="#vision"
            onClick={(e) => handleNavClick(e, '#vision')}
            className="block px-4 py-3 rounded-lg text-foreground hover:bg-gray-50 hover:text-brand-red transition-colors font-medium cursor-pointer"
          >
            Vision
          </a>

        </div>
      </div>
    </nav>
  );
}
