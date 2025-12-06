'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../lib/supabase';

function WaitlistForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get('email') || '';

  const [formData, setFormData] = useState({
    email: emailFromUrl,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    countryCode: '+1',
    company: '',
    role: '',
  });

  const [loading, setLoading] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);
  const [error, setError] = useState('');

  // Save email to database immediately when component mounts
  useEffect(() => {
    if (emailFromUrl && !emailSaved) {
      saveEmailOnly(emailFromUrl);
    }
  }, [emailFromUrl, emailSaved]);

  const saveEmailOnly = async (email: string) => {
    try {
      const { error } = await supabase
        .from('waitlist')
        .upsert(
          { email, updated_at: new Date().toISOString() },
          { onConflict: 'email' }
        );

      if (error) throw error;
      setEmailSaved(true);
    } catch (err) {
      console.error('Error saving email:', err);
      setError('Failed to save email. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('waitlist')
        .upsert({
          email: formData.email,
          first_name: formData.firstName || null,
          last_name: formData.lastName || null,
          phone_number: formData.phoneNumber || null,
          country_code: formData.countryCode || null,
          company: formData.company || null,
          role: formData.role || null,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'email' });

      if (error) throw error;

      // Redirect to success page
      router.push('/waitlist/success');
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    // Redirect to success page without saving additional details
    router.push('/waitlist/success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            You're <span className="bg-gradient-to-r from-brand-red to-brand-teal bg-clip-text text-transparent">Almost In!</span>
          </h1>
          <p className="text-lg text-gray-600">
            {emailSaved && (
              <span className="inline-flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Your email has been saved!
              </span>
            )}
          </p>
          <p className="text-gray-600 mt-2">
            Help us personalize your experience (all fields are optional)
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email (readonly) */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                readOnly
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-700 focus:outline-none"
              />
            </div>

            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-brand-teal focus:outline-none transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-brand-teal focus:outline-none transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Phone Number with Country Code */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="px-3 py-3 rounded-lg border-2 border-gray-200 focus:border-brand-teal focus:outline-none transition-colors bg-white"
                >
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+86">🇨🇳 +86</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+65">🇸🇬 +65</option>
                  <option value="+971">🇦🇪 +971</option>
                </select>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-brand-teal focus:outline-none transition-colors"
                  placeholder="123-456-7890"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                Company <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-brand-teal focus:outline-none transition-colors"
                placeholder="Your company name"
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                Role <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="role"
                name="role"
                type="text"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-brand-teal focus:outline-none transition-colors"
                placeholder="e.g., Developer, Designer, Manager"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-red-700">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={handleSkip}
                disabled={loading}
                className="flex-1 px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 font-bold text-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Skip for Now
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-8 py-4 rounded-full bg-gradient-to-r from-brand-red to-brand-teal text-white font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Saving...' : 'Complete Signup'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500">
          We respect your privacy. Your information will only be used to provide you with updates about App Tools Pro.
        </p>
      </div>
    </div>
  );
}

export default function WaitlistPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
      </div>
    }>
      <WaitlistForm />
    </Suspense>
  );
}
