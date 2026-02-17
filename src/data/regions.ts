import type { RegionConfig, Calculator, Region } from '@/types';

export const regions: Record<Region, RegionConfig> = {
  us: {
    code: 'us',
    name: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🇺🇸',
  },
  uk: {
    code: 'uk',
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    flag: '🇬🇧',
  },
  ca: {
    code: 'ca',
    name: 'Canada',
    currency: 'CAD',
    currencySymbol: 'C$',
    flag: '🇨🇦',
  },
  au: {
    code: 'au',
    name: 'Australia',
    currency: 'AUD',
    currencySymbol: 'A$',
    flag: '🇦🇺',
  },
};

export const calculators: Calculator[] = [
  // US Calculators
  {
    id: 'us-mortgage',
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator (PITI)',
    shortName: 'Mortgage',
    description: 'Calculate your total monthly mortgage payment including principal, interest, taxes, and insurance (PITI).',
    region: 'us',
    category: 'Home Buying',
    icon: 'Home',
    metaTitle: 'Mortgage Calculator | Calculate PITI Payments | Metric Finance',
    metaDescription: 'Free mortgage calculator with PITI. Calculate monthly payments including principal, interest, taxes, and insurance. Compare loan scenarios and plan your home purchase.',
  },
  {
    id: 'us-401k',
    slug: '401k-calculator',
    name: '401(k) Savings Calculator',
    shortName: '401(k)',
    description: 'Project your 401(k) retirement savings with employer matching and compound growth.',
    region: 'us',
    category: 'Retirement',
    icon: 'PiggyBank',
    metaTitle: '401(k) Calculator | Retirement Savings Planner | Metric Finance',
    metaDescription: 'Calculate your 401(k) retirement savings growth with employer match. Plan for retirement with our free calculator including 2025/2026 contribution limits.',
  },
  {
    id: 'us-tax',
    slug: 'federal-tax-calculator',
    name: 'Federal Tax Calculator',
    shortName: 'Federal Tax',
    description: 'Estimate your federal income tax liability and effective tax rate.',
    region: 'us',
    category: 'Taxes',
    icon: 'FileText',
    metaTitle: 'Federal Tax Calculator | Income Tax Estimator | Metric Finance',
    metaDescription: 'Free federal tax calculator. Estimate your income tax liability, effective rate, and take-home pay based on current IRS tax brackets and deductions.',
  },
  {
    id: 'us-salary',
    slug: 'salary-calculator',
    name: 'Salary & Paycheck Calculator',
    shortName: 'Salary',
    description: 'Calculate your take-home pay after federal, state, and FICA taxes.',
    region: 'us',
    category: 'Income',
    icon: 'DollarSign',
    metaTitle: 'Salary Calculator | Paycheck Estimator | Metric Finance',
    metaDescription: 'Calculate your net salary and take-home pay after taxes. Free paycheck calculator for all 50 states with federal, state, and FICA deductions.',
  },
  {
    id: 'us-bmi',
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    shortName: 'BMI',
    description: 'Calculate your Body Mass Index and check your healthy weight range.',
    region: 'us',
    category: 'Health',
    icon: 'Activity',
    metaTitle: 'BMI Calculator | Body Mass Index | Metric Finance',
    metaDescription: 'Free BMI calculator. Calculate your Body Mass Index and find your healthy weight range. Understand what your BMI means for your health.',
  },
  {
    id: 'us-compound',
    slug: 'compound-interest-calculator',
    name: 'Investment & Compound Interest Calculator',
    shortName: 'Compound Interest',
    description: 'See how compound interest grows your investments over time.',
    region: 'us',
    category: 'Investing',
    icon: 'TrendingUp',
    metaTitle: 'Compound Interest Calculator | Investment Growth | Metric Finance',
    metaDescription: 'Free compound interest calculator. See how your investments grow with the power of compounding. Calculate returns with regular contributions.',
  },
  {
    id: 'us-car',
    slug: 'car-loan-calculator',
    name: 'Car Loan Calculator',
    shortName: 'Car Loan',
    description: 'Calculate your monthly car payment and total loan cost.',
    region: 'us',
    category: 'Auto',
    icon: 'Car',
    metaTitle: 'Car Loan Calculator | Auto Payment Estimator | Metric Finance',
    metaDescription: 'Free car loan calculator. Calculate monthly auto payments, total interest, and loan costs. Compare financing options for your next vehicle purchase.',
  },
  // UK Calculators
  {
    id: 'uk-stamp-duty',
    slug: 'stamp-duty-calculator',
    name: 'Stamp Duty Calculator (SDLT)',
    shortName: 'Stamp Duty',
    description: 'Calculate Stamp Duty Land Tax for property purchases in England and Northern Ireland.',
    region: 'uk',
    category: 'Property',
    icon: 'Building',
    metaTitle: 'Stamp Duty Calculator UK | SDLT Calculator | Metric Finance',
    metaDescription: 'Free Stamp Duty calculator for UK property purchases. Calculate SDLT including first-time buyer relief and additional property rates.',
  },
  // Canada Calculators
  {
    id: 'ca-mortgage',
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    shortName: 'Mortgage',
    description: 'Calculate Canadian mortgage payments with semi-annual compounding and CMHC insurance.',
    region: 'ca',
    category: 'Home Buying',
    icon: 'Home',
    metaTitle: 'Mortgage Calculator Canada | CMHC Calculator | Metric Finance',
    metaDescription: 'Free Canadian mortgage calculator with semi-annual compounding. Calculate payments including CMHC insurance and provincial land transfer taxes.',
  },
  // Australia Calculators
  {
    id: 'au-home-loan',
    slug: 'home-loan-calculator',
    name: 'Home Loan Repayment Calculator',
    shortName: 'Home Loan',
    description: 'Calculate Australian home loan repayments with offset account benefits.',
    region: 'au',
    category: 'Home Buying',
    icon: 'Home',
    metaTitle: 'Home Loan Calculator Australia | Mortgage Repayments | Metric Finance',
    metaDescription: 'Free Australian home loan calculator. Calculate mortgage repayments with weekly, fortnightly, or monthly options. Includes offset account savings.',
  },
];

export const getCalculatorsByRegion = (region: Region): Calculator[] => {
  return calculators.filter(calc => calc.region === region);
};

export const getCalculatorBySlug = (region: Region, slug: string): Calculator | undefined => {
  return calculators.find(calc => calc.region === region && calc.slug === slug);
};

export const getAllCalculators = (): Calculator[] => calculators;
