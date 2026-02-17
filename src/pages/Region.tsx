import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalculatorCard } from '@/components/CalculatorCard';
import { SEO } from '@/components/SEO';
import { getCalculatorsByRegion, regions } from '@/data/regions';
import type { Region as RegionType } from '@/types';
import { ArrowRight, Globe, FileText, TrendingUp } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/utils/seo';

const Region: React.FC = () => {
  const { region } = useParams<{ region: string }>();
  const regionCode = (region || 'us') as RegionType;
  
  const calculators = getCalculatorsByRegion(regionCode);
  const regionConfig = regions[regionCode];

  if (!regionConfig) {
    return <div>Region not found</div>;
  }

  const seo = {
    title: `Financial Calculators for ${regionConfig.name} | Metric Finance`,
    description: `Free financial calculators for ${regionConfig.name}. Calculate mortgages, taxes, retirement, and more with accurate, instant tools.`,
    canonical: `https://metricfinance.com/${regionCode}`,
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://metricfinance.com/' },
    { name: regionConfig.name, url: `https://metricfinance.com/${regionCode}` },
  ]);

  const regionContent: Record<RegionType, { title: string; description: string }> = {
    us: {
      title: 'United States Financial Calculators',
      description: 'Plan your financial future with our comprehensive suite of US-focused calculators. From mortgage payments with PITI to 401(k) retirement planning, federal tax estimation, and compound interest projections.',
    },
    uk: {
      title: 'UK Financial Calculators',
      description: 'Specialized calculators for UK residents. Calculate Stamp Duty Land Tax (SDLT), plan your mortgage, and understand property purchase costs with our accurate tools.',
    },
    ca: {
      title: 'Canada Financial Calculators',
      description: 'Canadian-focused financial tools with semi-annual compounding, CMHC mortgage insurance calculations, and province-specific considerations.',
    },
    au: {
      title: 'Australia Financial Calculators',
      description: 'Australian home loan calculators with offset account features, comparison rates, and weekly, fortnightly, or monthly repayment options.',
    },
  };

  const content = regionContent[regionCode];

  return (
    <>
      <SEO seo={seo} schema={breadcrumbSchema} />
      
      <main>
        {/* Hero */}
        <section className="bg-slate-900 py-16 md:py-24">
          <div className="metric-container">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-200">
                  {regionConfig.flag} {regionConfig.name}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {content.title}
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                {content.description}
              </p>
            </div>
          </div>
        </section>

        {/* Calculators Grid */}
        <section className="metric-section bg-white">
          <div className="metric-container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Available Calculators
              </h2>
              <span className="text-slate-500">
                {calculators.length} tools
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculators.map((calculator) => (
                <CalculatorCard 
                  key={calculator.id} 
                  calculator={calculator}
                  variant="default"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="metric-section bg-slate-50">
          <div className="metric-container">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Related Resources
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                to="/blog"
                className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Financial Guides</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Expert articles to help you make informed decisions.
                </p>
                <span className="text-sm font-medium text-blue-600 flex items-center gap-1">
                  Read Articles <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              
              <Link
                to="/"
                className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">All Regions</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Explore calculators for other countries.
                </p>
                <span className="text-sm font-medium text-blue-600 flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              
              <Link
                to="/about"
                className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">About Metric Finance</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Learn about our mission and commitment to accuracy.
                </p>
                <span className="text-sm font-medium text-blue-600 flex items-center gap-1">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Region;
