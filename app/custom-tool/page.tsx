'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';

export default function CustomToolPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    toolDescription: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate email and tool description
    if (!formData.email || !formData.toolDescription.trim()) {
      setError('Please provide both your email and tool description.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('custom_tool_requests')
        .insert({
          email: formData.email,
          tool_description: formData.toolDescription,
          created_at: new Date().toISOString(),
        });

      if (error) throw error;

      // Redirect to success page
      router.push('/custom-tool/success');
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Failed to submit your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-3xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            AppToolsPro's <span className="bg-gradient-to-r from-brand-red to-brand-teal bg-clip-text text-transparent">Wish Tools</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have an idea for a personalized tool? Tell us about it and we'll work to bring your vision to life.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-brand-teal focus:outline-none transition-colors"
                placeholder="your.email@example.com"
              />
              <p className="mt-2 text-sm text-gray-500">
                We'll use this to follow up with you about your wish tool request.
              </p>
            </div>

            {/* Tool Description */}
            <div>
              <label htmlFor="toolDescription" className="block text-sm font-bold text-gray-700 mb-2">
                Describe Your Wish Tool <span className="text-red-500">*</span>
              </label>
              <textarea
                id="toolDescription"
                name="toolDescription"
                required
                value={formData.toolDescription}
                onChange={handleChange}
                rows={8}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-brand-teal focus:outline-none transition-colors resize-y"
                placeholder="Tell us about your wish tool idea...&#10;&#10;What problem does it solve?&#10;What features would it have?&#10;Who would use it?&#10;Any specific requirements or integrations?"
              />
              <p className="mt-2 text-sm text-gray-500">
                The more details you provide, the better we can understand your needs.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-red-700">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-brand-red to-brand-teal text-white font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500">
          We review all wish tool requests and will reach out to discuss how we can help bring your idea to life.
        </p>
        </div>
      </div>
    </>
  );
}
