import React from 'react';
import { SEO } from '@/components/SEO';
import { defaultSEO } from '@/utils/seo';

const Terms: React.FC = () => {
  const seo = {
    ...defaultSEO,
    title: 'Terms of Use | Metric Finance',
    description: 'Read the Terms of Use for Metric Finance. By using our website, you agree to these terms.',
  };

  return (
    <>
      <SEO seo={seo} />
      
      <main>
        <section className="bg-slate-900 py-16 md:py-24">
          <div className="metric-container">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Terms of Use
            </h1>
            <p className="text-xl text-slate-300">
              Last updated: January 2026
            </p>
          </div>
        </section>

        <section className="metric-section bg-white">
          <div className="metric-container">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Acceptance of Terms</h2>
              <p className="text-slate-600 mb-6">
                By accessing and using Metric Finance (&quot;the Website&quot;), you accept and agree to 
                be bound by these Terms of Use. If you do not agree to these terms, please do not 
                use our services.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Use of Calculators</h2>
              <p className="text-slate-600 mb-4">
                Our financial calculators are provided for informational and educational purposes 
                only. All calculations are estimates and should not be considered as professional 
                financial advice.
              </p>
              <p className="text-slate-600 mb-6">
                You acknowledge that:
              </p>
              <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
                <li>Results may vary based on individual circumstances</li>
                <li>Tax laws and rates change frequently</li>
                <li>Interest rates fluctuate based on market conditions</li>
                <li>Always consult a qualified financial advisor for personalized advice</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
              <p className="text-slate-600 mb-6">
                All content on this website, including text, graphics, logos, calculators, and 
                software, is the property of Metric Finance and is protected by copyright and 
                other intellectual property laws. You may not reproduce, distribute, or create 
                derivative works without our express written permission.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">User Conduct</h2>
              <p className="text-slate-600 mb-4">When using our website, you agree not to:</p>
              <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
                <li>Use the site for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the website</li>
                <li>Scrape or automate access to our calculators</li>
                <li>Reproduce or redistribute our content without permission</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Disclaimer of Warranties</h2>
              <p className="text-slate-600 mb-6">
                THE WEBSITE AND ALL CONTENT ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND, 
                EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, 
                ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
              <p className="text-slate-600 mb-6">
                IN NO EVENT SHALL METRIC FINANCE BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
                SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE 
                OF THE WEBSITE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Affiliate Disclosure</h2>
              <p className="text-slate-600 mb-6">
                Metric Finance participates in affiliate marketing programs. This means we may 
                earn commissions when you click on certain links or make purchases through our 
                partner sites. This does not affect the price you pay or our editorial integrity.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Third-Party Links</h2>
              <p className="text-slate-600 mb-6">
                Our website may contain links to third-party websites. We are not responsible 
                for the content, privacy policies, or practices of any third-party sites.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Modifications</h2>
              <p className="text-slate-600 mb-6">
                We reserve the right to modify these Terms of Use at any time. Changes will be 
                effective immediately upon posting. Your continued use of the website constitutes 
                acceptance of the modified terms.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Governing Law</h2>
              <p className="text-slate-600 mb-6">
                These Terms of Use shall be governed by and construed in accordance with the laws 
                of the United States, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
              <p className="text-slate-600 mb-6">
                If you have any questions about these Terms of Use, please contact us at{' '}
                <a href="mailto:legal@metricfinance.com" className="text-blue-600 hover:underline">
                  legal@metricfinance.com
                </a>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Terms;
