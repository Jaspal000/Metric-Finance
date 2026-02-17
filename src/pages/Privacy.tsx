import React from 'react';
import { SEO } from '@/components/SEO';
import { defaultSEO } from '@/utils/seo';

const Privacy: React.FC = () => {
  const seo = {
    ...defaultSEO,
    title: 'Privacy Policy | Metric Finance',
    description: 'Metric Finance is committed to protecting your privacy. Learn how we handle your data.',
  };

  return (
    <>
      <SEO seo={seo} />
      
      <main>
        <section className="bg-slate-900 py-16 md:py-24">
          <div className="metric-container">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-slate-300">
              Last updated: January 2026
            </p>
          </div>
        </section>

        <section className="metric-section bg-white">
          <div className="metric-container">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
              <p className="text-slate-600 mb-6">
                Metric Finance (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and safeguard your information 
                when you use our website and services.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Information We Collect</h2>
              <p className="text-slate-600 mb-4">
                <strong>Calculator Usage:</strong> Our calculators run entirely in your browser. 
                We do not collect or store any of the financial data you enter into our calculators.
              </p>
              <p className="text-slate-600 mb-4">
                <strong>Email Subscriptions:</strong> If you choose to subscribe to our newsletter, 
                we collect your email address solely for the purpose of sending you updates and 
                financial insights.
              </p>
              <p className="text-slate-600 mb-6">
                <strong>Analytics:</strong> We use anonymous analytics to understand how visitors 
                use our site. This data cannot be used to identify you personally.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
                <li>To send newsletter updates (if subscribed)</li>
                <li>To improve our website and calculators</li>
                <li>To respond to your inquiries</li>
                <li>To analyze website usage patterns</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Security</h2>
              <p className="text-slate-600 mb-6">
                We implement appropriate security measures to protect your information. 
                However, no method of transmission over the internet is 100% secure, and 
                we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Third-Party Services</h2>
              <p className="text-slate-600 mb-6">
                We may use third-party services for analytics and email delivery. These 
                services have their own privacy policies and may collect information 
                according to their own terms.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Rights</h2>
              <p className="text-slate-600 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Unsubscribe from our communications at any time</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Cookies</h2>
              <p className="text-slate-600 mb-6">
                We use cookies to enhance your browsing experience. You can set your browser 
                to refuse cookies, but some features of our site may not function properly.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to This Policy</h2>
              <p className="text-slate-600 mb-6">
                We may update this Privacy Policy from time to time. We will notify you of 
                any changes by posting the new policy on this page.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
              <p className="text-slate-600 mb-6">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@metricfinance.com" className="text-blue-600 hover:underline">
                  privacy@metricfinance.com
                </a>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Privacy;
