import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Calculator, TrendingUp, Shield, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Mathematical SVG Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute right-0 top-0 w-full h-full"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="mathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          
          {/* Grid Lines */}
          <g stroke="#2563EB" strokeWidth="0.5" opacity="0.12">
            {Array.from({ length: 20 }).map((_, i) => (
              <React.Fragment key={`grid-v-${i}`}>
                <line x1={100 + i * 40} y1="0" x2={100 + i * 40} y2="600" />
              </React.Fragment>
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <React.Fragment key={`grid-h-${i}`}>
                <line x1="0" y1={50 + i * 40} x2="800" y2={50 + i * 40} />
              </React.Fragment>
            ))}
          </g>
          
          {/* Formula Fragments */}
          <g fill="#2563EB" opacity="0.15" fontFamily="system-ui" fontSize="14">
            <text x="550" y="120">P = L[c(1 + c)ⁿ]</text>
            <text x="620" y="160">A = P(1 + r/n)ⁿᵗ</text>
            <text x="500" y="200">FV = PV × (1 + r)ⁿ</text>
          </g>
          
          {/* Mathematical Symbols */}
          <g fill="#2563EB" opacity="0.12">
            {/* Percent Symbol */}
            <text x="680" y="280" fontSize="48" fontFamily="system-ui" fontWeight="300">%</text>
            
            {/* Plus */}
            <text x="520" y="320" fontSize="36" fontFamily="system-ui" fontWeight="300">+</text>
            
            {/* Minus */}
            <text x="580" y="360" fontSize="36" fontFamily="system-ui" fontWeight="300">−</text>
            
            {/* Multiply */}
            <text x="640" y="400" fontSize="32" fontFamily="system-ui" fontWeight="300">×</text>
            
            {/* Divide */}
            <text x="720" y="440" fontSize="32" fontFamily="system-ui" fontWeight="300">÷</text>
            
            {/* Equals */}
            <text x="560" y="480" fontSize="32" fontFamily="system-ui" fontWeight="300">=</text>
          </g>
          
          {/* Subtle Graph Lines */}
          <g stroke="#2563EB" strokeWidth="1" fill="none" opacity="0.1">
            <path d="M 500 500 Q 600 450 650 400 T 750 300" />
            <path d="M 480 520 Q 580 480 630 420 T 720 320" strokeDasharray="4 4" />
          </g>
          
          {/* Geometric Shapes */}
          <g stroke="#2563EB" strokeWidth="1" fill="none" opacity="0.08">
            <circle cx="700" cy="150" r="40" />
            <rect x="480" y="380" width="60" height="60" transform="rotate(15 510 410)" />
            <polygon points="600,520 630,480 660,520" />
          </g>
          
          {/* Dotted Pattern */}
          <g fill="#2563EB" opacity="0.06">
            {Array.from({ length: 8 }).map((_, i) => 
              Array.from({ length: 8 }).map((_, j) => (
                <circle 
                  key={`dot-${i}-${j}`}
                  cx={450 + i * 45} 
                  cy={250 + j * 45} 
                  r="2" 
                />
              ))
            )}
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="metric-container relative z-10">
        <div className="py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
                <Calculator className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  Free Financial Tools
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Free Financial Calculators for{' '}
                <span className="text-blue-600">Smarter Decisions</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                Plan mortgages, taxes, retirement, and investments with accurate, 
                instant tools. Professional-grade calculations for everyone.
              </p>
              
              {/* Trust Row */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  100% Free
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  No Signup Required
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  Accurate & Instant
                </div>
              </div>
              
              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/us"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Explore US Calculators
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Read Financial Guides
                </Link>
              </div>
            </div>
            
            {/* Right Column - Feature Cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="bg-white rounded-xl p-5 shadow-lg border border-slate-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">Mortgage Calculator</h3>
                  <p className="text-sm text-slate-600">Calculate PITI payments accurately</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-lg border border-slate-100">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">401(k) Planner</h3>
                  <p className="text-sm text-slate-600">Plan your retirement savings</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 shadow-lg border border-slate-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Calculator className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">Tax Estimator</h3>
                  <p className="text-sm text-slate-600">Estimate federal & state taxes</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-lg border border-slate-100">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">Compound Interest</h3>
                  <p className="text-sm text-slate-600">See your money grow over time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
