import React, { useState } from 'react';
import { Mail, Send, Check, Download, Shield } from 'lucide-react';

interface EmailCaptureProps {
  variant?: 'inline' | 'card' | 'minimal';
  context?: 'calculator' | 'general' | 'lead-magnet';
  className?: string;
}

export const EmailCapture: React.FC<EmailCaptureProps> = ({ 
  variant = 'inline',
  context = 'general',
  className = '' 
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const content = {
    calculator: {
      title: 'Save Your Results',
      description: 'Email this calculation to yourself for future reference.',
      buttonText: 'Send Results',
      successText: 'Results sent!',
    },
    'lead-magnet': {
      title: 'Free Financial Planning Checklist',
      description: 'Get our comprehensive PDF checklist to organize your finances.',
      buttonText: 'Get Free Checklist',
      successText: 'Checklist sent!',
    },
    general: {
      title: 'Stay Updated',
      description: 'Get notified when we add new calculators and features.',
      buttonText: 'Subscribe',
      successText: 'Subscribed!',
    },
  };

  const currentContent = content[context];

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${
            submitted
              ? 'bg-green-600 text-white'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {submitted ? <Check size={14} /> : <Send size={14} />}
          {submitted ? 'Sent' : 'Send'}
        </button>
      </form>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`bg-white rounded-xl border border-slate-200 p-6 shadow-sm ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            {context === 'lead-magnet' ? (
              <Download className="w-5 h-5 text-blue-600" />
            ) : (
              <Mail className="w-5 h-5 text-blue-600" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">{currentContent.title}</h4>
            <p className="text-sm text-slate-600">{currentContent.description}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              submitted
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {submitted ? (
              <>
                <Check size={18} />
                {currentContent.successText}
              </>
            ) : (
              <>
                <Send size={18} />
                {currentContent.buttonText}
              </>
            )}
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
          <Shield size={12} />
          We never share your email. Unsubscribe anytime.
        </p>
      </div>
    );
  }

  // Inline variant
  return (
    <div className={`bg-slate-50 rounded-lg p-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-slate-900">{currentContent.title}</h4>
            <p className="text-sm text-slate-600">{currentContent.description}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 sm:ml-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 sm:w-48 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              submitted
                ? 'bg-green-600 text-white'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {submitted ? <Check size={16} /> : <Send size={16} />}
            {submitted ? 'Sent!' : currentContent.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailCapture;
