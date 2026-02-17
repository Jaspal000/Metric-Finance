import React from 'react';
import { SEO } from '@/components/SEO';
import { defaultSEO } from '@/utils/seo';
import { AlertTriangle, Info, Calculator, FileText } from 'lucide-react';

const Disclaimer: React.FC = () => {
  const seo = {
    ...defaultSEO,
    title: 'Financial Disclaimer | Metric Finance',
    description: 'Important disclaimers regarding the use of Metric Finance calculators and information.',
  };

  return (
    <>
      <SEO seo={seo} />
      
      <main>
        <section className="bg-amber-600 py-16 md:py-24">
          <div className="metric-container">
            <div className="flex items-center gap-4 mb-6">
              <AlertTriangle className="w-10 h-10 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Financial Disclaimer
              </h1>
            </div>
            <p className="text-xl text-amber-100">
              Important information about the use of our calculators and services.
            </p>
          </div>
        </section>

        <section className="metric-section bg-white">
          <div className="metric-container">
            <div className="max-w-3xl mx-auto">
              {/* Important Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Info className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-amber-900 mb-2">Important Notice</h2>
                    <p className="text-amber-800">
                      All calculations provided by Metric Finance are estimates for informational 
                      purposes only and do not constitute financial, legal, or tax advice. 
                      Always consult with qualified professionals before making financial decisions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    Calculator Accuracy
                  </h2>
                  <div className="prose text-slate-600">
                    <p className="mb-4">
                      While we strive for accuracy, our calculators have limitations:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Results are based on the information you provide</li>
                      <li>Tax laws and rates change frequently and vary by jurisdiction</li>
                      <li>Interest rates fluctuate based on market conditions and individual qualifications</li>
                      <li>Individual circumstances may affect actual results</li>
                      <li>Calculators may not account for all fees, charges, or special circumstances</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-blue-600" />
                    Not Professional Advice
                  </h2>
                  <div className="prose text-slate-600">
                    <p className="mb-4">
                      Metric Finance is not a financial advisor, tax professional, or legal service. 
                      Nothing on this website should be construed as:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Investment advice or recommendations</li>
                      <li>Tax planning or preparation services</li>
                      <li>Legal advice or representation</li>
                      <li>Mortgage or loan approval</li>
                      <li>Insurance advice or quotes</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Consult Professionals
                  </h2>
                  <p className="text-slate-600 mb-4">
                    Before making any financial decisions based on information from our calculators, 
                    we strongly recommend consulting with:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li>A certified financial planner or advisor</li>
                    <li>A qualified tax professional or CPA</li>
                    <li>A licensed mortgage broker or lender</li>
                    <li>An attorney for legal matters</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    No Liability
                  </h2>
                  <p className="text-slate-600 mb-4">
                    Metric Finance and its affiliates shall not be liable for any damages arising 
                    from the use of our calculators or website, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li>Financial losses or missed opportunities</li>
                    <li>Tax penalties or audits</li>
                    <li>Loan application rejections</li>
                    <li>Investment losses</li>
                    <li>Any other direct, indirect, or consequential damages</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Affiliate Relationships
                  </h2>
                  <p className="text-slate-600 mb-4">
                    Metric Finance participates in affiliate marketing programs. We may receive 
                    compensation when you click on links to partner sites or make purchases. 
                    This does not influence our calculator accuracy or editorial content.
                  </p>
                  <p className="text-slate-600">
                    Any rates, terms, or offers displayed are subject to change and may not be 
                    available to all applicants. Final terms are determined by the respective 
                    financial institutions.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Data Privacy
                  </h2>
                  <p className="text-slate-600">
                    All calculator calculations are performed locally in your browser. We do not 
                    collect, store, or transmit any of the financial data you enter into our 
                    calculators. For more information, please review our{' '}
                    <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-3">
                    Agreement to Terms
                  </h2>
                  <p className="text-slate-600">
                    By using Metric Finance calculators and website, you acknowledge that you have 
                    read, understood, and agree to this disclaimer. If you do not agree, please 
                    discontinue use of our services.
                  </p>
                </div>

                <div className="text-sm text-slate-500 pt-8 border-t border-slate-200">
                  <p>Last updated: January 2026</p>
                  <p className="mt-2">
                    If you have questions about this disclaimer, please contact us at{' '}
                    <a href="mailto:legal@metricfinance.com" className="text-blue-600 hover:underline">
                      legal@metricfinance.com
                    </a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Disclaimer;
