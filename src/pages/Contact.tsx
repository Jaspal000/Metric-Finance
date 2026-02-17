import React, { useState } from 'react';
import { SEO } from '@/components/SEO';
import { Mail, MessageSquare, Send, Check } from 'lucide-react';
import { defaultSEO } from '@/utils/seo';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const seo = {
    ...defaultSEO,
    title: 'Contact Us | Metric Finance',
    description: 'Get in touch with the Metric Finance team. We\'re here to help with questions, feedback, and partnership inquiries.',
  };

  return (
    <>
      <SEO seo={seo} />
      
      <main>
        {/* Hero */}
        <section className="bg-slate-900 py-16 md:py-24">
          <div className="metric-container">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Have a question, feedback, or partnership inquiry? 
                We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="metric-section bg-white">
          <div className="metric-container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="metric-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="metric-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      className="metric-input"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="media">Media Inquiry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="metric-input min-h-[150px]"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className={`w-full py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      submitted
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {submitted ? (
                      <>
                        <Check className="w-5 h-5" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="lg:pl-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Other Ways to Reach Us
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                      <p className="text-slate-600 mb-2">
                        For general inquiries and support
                      </p>
                      <a 
                        href="mailto:support@metricfinance.com"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        support@metricfinance.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Response Time</h3>
                      <p className="text-slate-600">
                        We typically respond to all inquiries within 24-48 hours 
                        during business days.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-slate-50 rounded-xl">
                  <h3 className="font-semibold text-slate-900 mb-3">
                    Before You Contact Us
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Check our <a href="/blog" className="text-blue-600 hover:underline">blog</a> for common questions</li>
                    <li>• Review calculator FAQs for specific tool help</li>
                    <li>• For calculator errors, include the values you entered</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
