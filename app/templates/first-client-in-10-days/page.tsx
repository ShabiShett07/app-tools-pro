'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../../lib/supabase';

const NOTION_TEMPLATE_URL =
    'https://www.notion.so/Get-your-first-client-in-next-10-days-with-0-using-X-Twitter-318ecf3fb0b18022a730c0afe33d8b9a?pvs=74';

const features = [
    {
        icon: '📅',
        title: 'Day-by-Day Action Plan',
        description: 'A structured 10-day roadmap so you never wonder "what should I do today?"',
    },
    {
        icon: '💸',
        title: 'Zero Budget Required',
        description: 'No ads, no paid tools — just pure organic growth strategies that work.',
    },
    {
        icon: '🐦',
        title: 'X/Twitter Growth Hacks',
        description: 'Proven tactics to build authority, attract leads, and convert followers into clients.',
    },
    {
        icon: '🎯',
        title: 'Client Outreach Scripts',
        description: 'Copy-paste DM templates and engagement strategies that land real clients.',
    },
    {
        icon: '⚡',
        title: 'Quick Wins Framework',
        description: 'Start seeing traction from Day 1 with actionable micro-tasks.',
    },
    {
        icon: '📊',
        title: 'Progress Tracker',
        description: 'Built-in tracker to measure your results and stay accountable.',
    },
];

export default function FirstClientTemplate() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error: supabaseError } = await supabase
                .from('waitlist')
                .upsert(
                    {
                        email,
                        updated_at: new Date().toISOString(),
                    },
                    { onConflict: 'email' }
                );

            if (supabaseError) throw supabaseError;

            setSuccess(true);
        } catch (err: any) {
            console.error('Error saving email:', err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 sm:gap-3">
                        <Image
                            src="/logo.png"
                            alt="App Tools Pro Logo"
                            width={48}
                            height={48}
                            className="rounded-lg"
                        />
                        <div className="text-xl sm:text-2xl font-bold">
                            <span className="text-foreground">App</span>
                            <span className="text-brand-red">Tools</span>
                            <span className="text-brand-teal">Pro</span>
                        </div>
                    </Link>
                    <Link
                        href="/"
                        className="text-sm sm:text-base text-gray-600 hover:text-brand-red transition-colors font-medium"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 -left-20 w-96 h-96 bg-brand-red opacity-[0.07] rounded-full blur-3xl animate-pulse"></div>
                    <div
                        className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-brand-teal opacity-[0.07] rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: '1.5s' }}
                    ></div>
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-brand-red to-brand-teal opacity-[0.04] rounded-full blur-3xl"
                    ></div>
                </div>

                {/* Geometric Accents */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute top-1/4 left-16 w-16 h-16 border-4 border-brand-red/20 rotate-45"
                        style={{ animation: 'float 6s ease-in-out infinite' }}
                    ></div>
                    <div
                        className="absolute bottom-1/3 right-24 w-12 h-12 border-4 border-brand-teal/20 rounded-full"
                        style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '1s' }}
                    ></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
                    {/* Badge */}
                    <div
                        className={`text-center mb-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-red/10 to-brand-teal/10 text-brand-red px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider border border-brand-red/20">
                            <span>🔥</span> Free Notion Template
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        className={`text-center text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 sm:mb-6 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <span className="text-foreground">Get Your First Client</span>
                        <br />
                        <span className="text-foreground">in </span>
                        <span
                            className="inline-block"
                            style={{
                                background: 'linear-gradient(90deg, #E63946 0%, #1D7874 100%)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            10 Days
                        </span>
                        <span className="text-foreground"> with </span>
                        <span
                            className="inline-block"
                            style={{
                                background: 'linear-gradient(90deg, #1D7874 0%, #E63946 100%)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            $0
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        className={`text-center text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        A step-by-step Notion template that shows you exactly how to land your
                        first paying client using <strong className="text-foreground">X (Twitter)</strong> — no budget, no experience, no fluff.
                    </p>

                    {/* Email Form Card */}
                    <div
                        className={`max-w-xl mx-auto transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        {!success ? (
                            <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-6 sm:p-8 md:p-10">
                                <div className="text-center mb-6">
                                    <h2 className="text-xl font-bold text-foreground mb-2">
                                        Enter your email to get the template
                                    </h2>
                                    <p className="text-gray-500 text-sm">
                                        Instant access — no spam, unsubscribe anytime.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            required
                                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 text-lg focus:outline-none focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 transition-all placeholder:text-gray-400"
                                        />
                                    </div>

                                    {error && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-red to-brand-teal text-white font-bold text-lg transition-all transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none active:scale-[0.98]"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            'Get Free Template →'
                                        )}
                                    </button>
                                </form>

                                <p className="text-center text-xs text-gray-400 mt-4">
                                    By signing up, you agree to receive occasional updates from App Tools Pro.
                                </p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-100 p-8 md:p-12 text-center">
                                {/* Success Icon */}
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>

                                <h2 className="text-3xl font-black text-foreground mb-3">You're All Set! 🎉</h2>
                                <p className="text-gray-600 mb-8 text-lg">
                                    Your template is ready. Click below to access it.
                                </p>

                                {/* Notion Template Button */}
                                <a
                                    href={NOTION_TEMPLATE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block w-full py-4 rounded-xl bg-gradient-to-r from-brand-red to-brand-teal text-white font-bold text-lg transition-all transform hover:scale-[1.02] hover:shadow-2xl mb-8"
                                >
                                    Open Notion Template →
                                </a>

                                {/* Divider */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex-1 h-px bg-gray-200"></div>
                                    <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Share your progress</span>
                                    <div className="flex-1 h-px bg-gray-200"></div>
                                </div>

                                <p className="text-gray-500 text-sm mb-5">
                                    Let others know you're starting the challenge! 🚀
                                </p>

                                {/* Social Share Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    {/* Share on X */}
                                    <a
                                        href={`https://x.com/intent/tweet?text=${encodeURIComponent("I just started the '10-Day First Client' challenge by @shabishetty07 🚀\n\nGoal: Land my first client using X with $0 budget.\n\nDay 1 starts now! 💪\n\n#FirstClient #Freelancing #BuildInPublic")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all hover:scale-105"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                        </svg>
                                        Post on X
                                    </a>

                                    {/* Share on LinkedIn */}
                                    <a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://apptoolspro.com/templates/first-client-in-10-days')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#0077B5] text-white font-semibold hover:bg-[#006399] transition-all hover:scale-105"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                            <circle cx="4" cy="4" r="2" />
                                        </svg>
                                        LinkedIn
                                    </a>


                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* What You'll Get Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-14">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-4">
                            What's Inside the Template?
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Everything you need to go from zero to your first paying client — organized, actionable, and proven.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-5 sm:p-7 border-2 border-gray-100 hover:border-brand-red/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                                }}
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof / Urgency Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 relative overflow-hidden">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-teal/20 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
                                Stop Scrolling. Start Earning.
                            </h2>
                            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                                Most people spend months trying to figure out client acquisition. This template gives you a
                                clear path in just <strong className="text-white">10 days</strong> — and it's completely free.
                            </p>

                            {!success ? (
                                <a
                                    href="#top"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="inline-flex items-center gap-2 py-3 sm:py-4 px-6 sm:px-10 rounded-full bg-gradient-to-r from-brand-red to-brand-teal text-white font-bold text-base sm:text-lg transition-all transform hover:scale-105 hover:shadow-2xl"
                                >
                                    Get the Template — It's Free
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                </a>
                            ) : (
                                <a
                                    href={NOTION_TEMPLATE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 py-3 sm:py-4 px-6 sm:px-10 rounded-full bg-gradient-to-r from-brand-red to-brand-teal text-white font-bold text-base sm:text-lg transition-all transform hover:scale-105 hover:shadow-2xl"
                                >
                                    Open Your Template
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Minimal Footer */}
            <footer className="py-8 bg-gray-50 border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo.png" alt="App Tools Pro" width={32} height={32} className="rounded-md" />
                        <span className="font-bold text-sm">
                            <span className="text-foreground">App</span>
                            <span className="text-brand-red">Tools</span>
                            <span className="text-brand-teal">Pro</span>
                        </span>
                    </Link>
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} App Tools Pro. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
