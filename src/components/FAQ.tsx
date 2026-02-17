import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { FAQ as FAQType } from '@/types';

interface FAQProps {
  faqs: FAQType[];
  title?: string;
  showSchema?: boolean;
}

export const FAQ: React.FC<FAQProps> = ({ 
  faqs, 
  title = 'Frequently Asked Questions',
  showSchema = true 
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="metric-card p-6 md:p-8">
      {showSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <HelpCircle className="w-6 h-6 text-blue-600" />
        {title}
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-slate-50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-medium text-slate-900 pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 bg-slate-50">
                <div className="pt-2 text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
