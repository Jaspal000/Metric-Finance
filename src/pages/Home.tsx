import { Link } from 'react-router-dom';
import Hero from '@/sections/Hero';
import FeaturedCalculators from '@/sections/FeaturedCalculators';
import BlogPreview from '@/sections/BlogPreview';
import { SEO } from '@/components/SEO';
import { generateOrganizationSchema, defaultSEO } from '@/utils/seo';
import { Globe, Shield, Zap, Clock } from 'lucide-react';

const Home: React.FC = () => {
  const seo = {
    ...defaultSEO,
    title: 'Metric Finance | Free Financial Calculators for Smarter Decisions',
    description: 'Plan mortgages, taxes, retirement, and investments with accurate, instant financial calculators. 100% free, no signup required. Available for US, UK, Canada, and Australia.',
  };

  const schema = generateOrganizationSchema();

  return (
    <>
      <SEO seo={seo} schema={schema} />
      
      <main>
        <Hero />
        
        {/* Features Section */}
        <section className="metric-section bg-white border-t border-slate-200">
          <div className="metric-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Choose Metric Finance?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Professional-grade financial tools designed for accuracy, speed, and ease of use.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Instant Results</h3>
                <p className="text-sm text-slate-600">
                  Get accurate calculations in real-time as you adjust your inputs.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">100% Free</h3>
                <p className="text-sm text-slate-600">
                  No hidden fees, no credit card required, no signup needed.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Multi-Region</h3>
                <p className="text-sm text-slate-600">
                  Specialized calculators for US, UK, Canada, and Australia.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Always Available</h3>
                <p className="text-sm text-slate-600">
                  Access our calculators anytime, anywhere, on any device.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedCalculators />
        
        {/* CTA Section */}
        <section className="metric-section bg-slate-900">
          <div className="metric-container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Make Smarter Financial Decisions?
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Start exploring our free calculators and take control of your financial future today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/us"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore US Calculators
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
              >
                Read Financial Guides
              </Link>
            </div>
          </div>
        </section>
        
        <BlogPreview />
      </main>
    </>
  );
};

export default Home;
