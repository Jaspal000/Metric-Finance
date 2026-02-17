import { useState } from 'react';
import { USFlag, UKFlag, CanadaFlag, AustraliaFlag, GlobalFlag } from './Flags';
import type { Region } from '@/types';

interface RegionalTabsProps {
  onRegionChange?: (region: Region | 'all') => void;
  activeRegion?: Region | 'all';
}

interface RegionTab {
  id: Region | 'all';
  name: string;
  shortName: string;
  Flag: React.FC<{ className?: string; width?: number; height?: number }>;
}

const regions: RegionTab[] = [
  { id: 'all', name: 'Global', shortName: 'All', Flag: GlobalFlag },
  { id: 'us', name: 'United States', shortName: 'US', Flag: USFlag },
  { id: 'uk', name: 'United Kingdom', shortName: 'UK', Flag: UKFlag },
  { id: 'ca', name: 'Canada', shortName: 'CA', Flag: CanadaFlag },
  { id: 'au', name: 'Australia', shortName: 'AU', Flag: AustraliaFlag },
];

const RegionalTabs: React.FC<RegionalTabsProps> = ({ 
  onRegionChange,
  activeRegion: controlledRegion 
}) => {
  const [internalRegion, setInternalRegion] = useState<Region | 'all'>('all');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeRegion = controlledRegion ?? internalRegion;

  const handleRegionClick = (region: Region | 'all') => {
    if (region === activeRegion) return;

    // Start fade out
    setIsTransitioning(true);

    // Wait for fade out, then change region and fade in
    setTimeout(() => {
      setInternalRegion(region);
      onRegionChange?.(region);
      
      // Fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  return (
    <div className="w-full">
      {/* Tab Bar - Horizontally scrollable on mobile */}
      <div className="relative">
        <div 
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          role="tablist"
          aria-label="Select region"
        >
          {regions.map((region) => {
            const isActive = activeRegion === region.id;
            const Flag = region.Flag;

            return (
              <button
                key={region.id}
                onClick={() => handleRegionClick(region.id)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`region-panel-${region.id}`}
                className={`
                  region-tab flex-shrink-0 min-w-[72px] sm:min-w-[90px]
                  ${isActive ? 'active' : ''}
                `}
              >
                <div className={`
                  relative overflow-hidden rounded shadow-sm transition-transform duration-200
                  ${isActive ? 'scale-105' : 'hover:scale-105'}
                `}>
                  <Flag 
                    width={48} 
                    height={32} 
                    className="sm:w-14 sm:h-9"
                  />
                </div>
                <span className={`
                  text-xs sm:text-sm font-medium transition-colors duration-200
                  ${isActive ? 'text-blue-700' : 'text-slate-600'}
                `}>
                  {region.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Fade indicators for scroll (mobile only) */}
        <div className="sm:hidden absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="sm:hidden absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      {/* Transition indicator */}
      {isTransitioning && (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default RegionalTabs;
