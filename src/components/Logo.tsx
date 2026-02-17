import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'minimal';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'full', 
  className = '',
  size = 'md'
}) => {
  const sizeMap = {
    sm: { icon: 24, text: 'text-lg' },
    md: { icon: 32, text: 'text-xl' },
    lg: { icon: 40, text: 'text-2xl' },
  };

  const { icon: iconSize, text: textSize } = sizeMap[size];

  // Grid-Based Precision Symbol
  const GridSymbol = ({ size }: { size: number }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Grid Foundation */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.3">
        {/* Vertical grid lines */}
        <line x1="10" y1="4" x2="10" y2="36" />
        <line x1="20" y1="4" x2="20" y2="36" />
        <line x1="30" y1="4" x2="30" y2="36" />
        {/* Horizontal grid lines */}
        <line x1="4" y1="10" x2="36" y2="10" />
        <line x1="4" y1="20" x2="36" y2="20" />
        <line x1="4" y1="30" x2="36" y2="30" />
      </g>
      
      {/* Geometric M - Main Structure */}
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Left vertical */}
        <line x1="8" y1="32" x2="8" y2="12" />
        {/* Right vertical */}
        <line x1="32" y1="32" x2="32" y2="12" />
        {/* Left diagonal to center */}
        <line x1="8" y1="12" x2="20" y2="22" />
        {/* Right diagonal to center */}
        <line x1="32" y1="12" x2="20" y2="22" />
        {/* Center vertical extension */}
        <line x1="20" y1="22" x2="20" y2="32" />
      </g>
      
      {/* Precision dots at intersections */}
      <g fill="currentColor">
        <circle cx="8" cy="12" r="1.5" />
        <circle cx="32" cy="12" r="1.5" />
        <circle cx="20" cy="22" r="1.5" />
        <circle cx="8" cy="32" r="1.5" />
        <circle cx="32" cy="32" r="1.5" />
        <circle cx="20" cy="32" r="1.5" />
      </g>
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div className={`text-slate-900 ${className}`}>
        <GridSymbol size={iconSize} />
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 text-slate-400 ${className}`}>
        <GridSymbol size={iconSize * 0.8} />
        <span className={`font-medium tracking-tight ${textSize}`}>Metric</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 text-slate-900 ${className}`}>
      <GridSymbol size={iconSize} />
      <div className="flex flex-col">
        <span className={`font-semibold tracking-tight leading-none ${textSize}`}>
          Metric
        </span>
        <span className={`font-medium text-slate-500 tracking-wide leading-none mt-0.5 text-xs uppercase`}>
          Finance
        </span>
      </div>
    </div>
  );
};

export default Logo;
