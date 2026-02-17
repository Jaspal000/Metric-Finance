import React from 'react';
import { ArrowRight, ExternalLink, TrendingUp, FileText, Car, Building, PiggyBank } from 'lucide-react';

interface AffiliateCTAProps {
  calculatorType: 'mortgage' | '401k' | 'tax' | 'car' | 'stamp-duty' | 'general';
  className?: string;
}

interface CTAConfig {
  title: string;
  description: string;
  icon: React.ReactNode;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

const ctaConfigs: Record<string, CTAConfig> = {
  mortgage: {
    title: 'Ready to Take the Next Step?',
    description: 'Compare rates from multiple lenders and find the best mortgage for your situation.',
    icon: <Building className="w-6 h-6" />,
    primaryAction: {
      label: 'Compare Mortgage Rates',
      href: '#compare-rates',
    },
    secondaryAction: {
      label: 'Get Pre-Approved',
      href: '#pre-approve',
    },
  },
  '401k': {
    title: 'Maximize Your Retirement Savings',
    description: 'Explore retirement account options and compare providers to optimize your 401(k).',
    icon: <PiggyBank className="w-6 h-6" />,
    primaryAction: {
      label: 'Compare Retirement Accounts',
      href: '#compare-retirement',
    },
  },
  tax: {
    title: 'File Your Taxes with Confidence',
    description: 'Get expert help filing your taxes and maximize your refund.',
    icon: <FileText className="w-6 h-6" />,
    primaryAction: {
      label: 'File Taxes Online',
      href: '#file-taxes',
    },
    secondaryAction: {
      label: 'Talk to a Tax Pro',
      href: '#tax-pro',
    },
  },
  car: {
    title: 'Find the Best Auto Loan Rates',
    description: 'Compare loan offers from multiple lenders before you buy your next vehicle.',
    icon: <Car className="w-6 h-6" />,
    primaryAction: {
      label: 'Compare Auto Loan Rates',
      href: '#compare-auto',
    },
    secondaryAction: {
      label: 'Check Your Credit Score',
      href: '#credit-score',
    },
  },
  'stamp-duty': {
    title: 'Buying Property in the UK?',
    description: 'Connect with mortgage brokers who specialize in UK property purchases.',
    icon: <Building className="w-6 h-6" />,
    primaryAction: {
      label: 'Find a Mortgage Broker',
      href: '#mortgage-broker',
    },
  },
  general: {
    title: 'Make Smarter Financial Decisions',
    description: 'Explore more tools and resources to help you achieve your financial goals.',
    icon: <TrendingUp className="w-6 h-6" />,
    primaryAction: {
      label: 'Explore All Calculators',
      href: '/',
    },
  },
};

export const AffiliateCTA: React.FC<AffiliateCTAProps> = ({ 
  calculatorType = 'general',
  className = '' 
}) => {
  const config = ctaConfigs[calculatorType] || ctaConfigs.general;

  return (
    <div className={`bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-blue-100 p-6 md:p-8 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
          {config.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {config.title}
          </h3>
          <p className="text-slate-600 mb-4">
            {config.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={config.primaryAction.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {config.primaryAction.label}
              <ExternalLink size={16} />
            </a>
            {config.secondaryAction && (
              <a
                href={config.secondaryAction.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                {config.secondaryAction.label}
                <ArrowRight size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-4 pt-4 border-t border-blue-100">
        * Affiliate links. We may receive compensation when you click on these links 
        at no additional cost to you. This helps us keep our calculators free.
      </p>
    </div>
  );
};

export default AffiliateCTA;
