import { useState } from 'react';
import { CalculatorCard } from '@/components/CalculatorCard';
import RegionalTabs from '@/components/RegionalTabs';
import { getAllCalculators, getCalculatorsByRegion } from '@/data/regions';
import type { Region } from '@/types';

const FeaturedCalculators: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<Region | 'all'>('all');
  const [isFading, setIsFading] = useState(false);

  const handleRegionChange = (region: Region | 'all') => {
    setIsFading(true);
    setTimeout(() => {
      setActiveRegion(region);
      setIsFading(false);
    }, 200);
  };

  const calculators = activeRegion === 'all' 
    ? getAllCalculators()
    : getCalculatorsByRegion(activeRegion);

  const regionTitle = activeRegion === 'all' 
    ? 'All Financial Calculators'
    : activeRegion === 'us' 
    ? 'United States Calculators'
    : activeRegion === 'uk'
    ? 'United Kingdom Calculators'
    : activeRegion === 'ca'
    ? 'Canada Calculators'
    : 'Australia Calculators';

  const regionDescription = activeRegion === 'all'
    ? 'Browse our complete collection of free financial calculators for the US, UK, Canada, and Australia.'
    : `Explore our collection of professional-grade financial tools designed specifically for ${
        activeRegion === 'us' ? 'the United States' 
        : activeRegion === 'uk' ? 'the United Kingdom'
        : activeRegion === 'ca' ? 'Canada'
        : 'Australia'
      }.`;

  return (
    <section className="metric-section bg-slate-50">
      <div className="metric-container">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {regionTitle}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            {regionDescription}
          </p>
        </div>

        {/* Regional Tabs */}
        <div className="mb-10">
          <RegionalTabs 
            onRegionChange={handleRegionChange}
            activeRegion={activeRegion}
          />
        </div>

        {/* Calculator Grid with Fade Transition */}
        <div 
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 fade-transition ${isFading ? 'opacity-0' : 'opacity-100'}`}
          role="tabpanel"
          id={`region-panel-${activeRegion}`}
        >
          {calculators.map((calculator) => (
            <CalculatorCard 
              key={calculator.id} 
              calculator={calculator}
              variant="default"
            />
          ))}
        </div>

        {/* Empty State */}
        {calculators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No calculators available for this region.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCalculators;
