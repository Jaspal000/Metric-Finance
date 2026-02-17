import { SEO } from '@/components/SEO';
import { Target, Eye, Shield, Zap } from 'lucide-react';
import { defaultSEO, generateOrganizationSchema } from '@/utils/seo';

const About: React.FC = () => {
  const seo = {
    ...defaultSEO,
    title: 'About Metric Finance | Our Mission & Values',
    description: 'Learn about Metric Finance\'s mission to provide precision-driven financial decision tools. Discover our story, values, and commitment to accuracy.',
  };

  const schema = generateOrganizationSchema();

  return (
    <>
      <SEO seo={seo} schema={schema} />
      
      <main>
        {/* Hero */}
        <section className="bg-slate-900 py-16 md:py-24">
          <div className="metric-container">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About Metric Finance
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Precision-driven financial decision tools for everyone. 
                We're on a mission to make financial planning accessible, 
                accurate, and free.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="metric-section bg-white">
          <div className="metric-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
              <div className="prose prose-lg text-slate-600">
                <p className="mb-4">
                  Metric Finance was founded with a simple belief: everyone deserves access to 
                  professional-grade financial tools. In a world where financial decisions can 
                  have lifelong impacts, we saw a need for calculators that are both accurate 
                  and easy to use.
                </p>
                <p className="mb-4">
                  Our team of financial experts, engineers, and designers came together to build 
                  a platform that combines institutional-level precision with consumer-friendly 
                  design. The result is a suite of calculators that help millions of people make 
                  smarter financial decisions every year.
                </p>
                <p>
                  Today, Metric Finance serves users across the United States, United Kingdom, 
                  Canada, and Australia with region-specific tools that account for local tax laws, 
                  mortgage practices, and financial regulations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="metric-section bg-slate-50">
          <div className="metric-container">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Precision</h3>
                <p className="text-sm text-slate-600">
                  Every calculation is verified for accuracy. We don't compromise on precision.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Transparency</h3>
                <p className="text-sm text-slate-600">
                  Clear methodology, no hidden assumptions. You deserve to understand the math.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Trust</h3>
                <p className="text-sm text-slate-600">
                  No signup required, no data collection. Your privacy is paramount.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Accessibility</h3>
                <p className="text-sm text-slate-600">
                  Free tools for everyone. Financial planning shouldn't have a price tag.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="metric-section bg-white">
          <div className="metric-container">
            <div className="bg-slate-900 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2">10+</p>
                  <p className="text-slate-400">Free Calculators</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2">4</p>
                  <p className="text-slate-400">Countries Served</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2">1M+</p>
                  <p className="text-slate-400">Calculations Monthly</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2">100%</p>
                  <p className="text-slate-400">Free Forever</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="metric-section bg-slate-50">
          <div className="metric-container text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Have Questions?
            </h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8">
              We'd love to hear from you. Reach out to our team for support, 
              feedback, or partnership inquiries.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
