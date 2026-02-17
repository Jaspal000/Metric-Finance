import { Link } from 'react-router-dom';
import { ArrowRight, Home, PiggyBank, FileText, DollarSign, Activity, TrendingUp, Car, Building, Calculator as CalculatorIcon } from 'lucide-react';
import type { Calculator } from '@/types';

interface CalculatorCardProps {
  calculator: Calculator;
  variant?: 'default' | 'compact' | 'horizontal';
}

const iconMap: Record<string, React.ElementType> = {
  Home,
  PiggyBank,
  FileText,
  DollarSign,
  Activity,
  TrendingUp,
  Car,
  Building,
};

// Category color mapping
const categoryColors: Record<string, { bg: string; text: string }> = {
  'Home Buying': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Property': { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  'Retirement': { bg: 'bg-green-100', text: 'text-green-700' },
  'Taxes': { bg: 'bg-amber-100', text: 'text-amber-700' },
  'Income': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  'Health': { bg: 'bg-rose-100', text: 'text-rose-700' },
  'Investing': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'Auto': { bg: 'bg-cyan-100', text: 'text-cyan-700' },
};

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ 
  calculator,
  variant = 'default'
}) => {
  const Icon = iconMap[calculator.icon] || CalculatorIcon;
  const href = `/${calculator.region}/${calculator.slug}`;
  const categoryStyle = categoryColors[calculator.category] || { bg: 'bg-slate-100', text: 'text-slate-700' };

  if (variant === 'compact') {
    return (
      <Link
        to={href}
        className="group flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
      >
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-slate-900 truncate">{calculator.shortName}</h4>
          <p className="text-xs text-slate-500 truncate">{calculator.category}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link
        to={href}
        className="group flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-[#2563eb] transition-all duration-300"
        style={{ boxShadow: 'none' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 1px #2563eb, 0 4px 20px -4px rgba(37, 99, 235, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-slate-900">{calculator.name}</h3>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <p className="text-sm text-slate-600 line-clamp-2">{calculator.description}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={href}
      className="group calculator-card block"
    >
      {/* Category Badge - Top Right */}
      <span className={`category-badge ${categoryStyle.bg} ${categoryStyle.text}`}>
        {calculator.category}
      </span>

      <div className="flex items-start justify-between mb-4 pr-24">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      
      <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
        {calculator.name}
      </h3>
      
      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
        {calculator.description}
      </p>
      
      <div className="flex items-center text-sm font-medium text-blue-600">
        Calculate Now
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default CalculatorCard;
