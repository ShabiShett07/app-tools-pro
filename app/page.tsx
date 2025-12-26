'use client';

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Vision from './components/Vision';
import Notify from './components/Notify';
import Footer from './components/Footer';
import { smoothScrollTo } from './utils/smoothScroll';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Handle hash navigation when coming from other pages
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        smoothScrollTo(hash);
      }, 100);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Vision />
      <Notify />
      <Footer />
    </div>
  );
}
