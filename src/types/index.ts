// Region Types
export type Region = 'us' | 'uk' | 'ca' | 'au';

export interface RegionConfig {
  code: Region;
  name: string;
  currency: string;
  currencySymbol: string;
  flag: string;
}

// Calculator Types
export interface Calculator {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  region: Region;
  category: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
}

// Mortgage Calculator
export interface MortgageInput {
  homePrice: number;
  downPayment: number;
  downPaymentPercent: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  propertyTax: number;
  homeInsurance: number;
  hoaFees: number;
}

export interface MortgageResult {
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyHOA: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalCost: number;
  loanAmount: number;
  payoffDate: string;
}

// 401k Calculator
export interface FourOhOneKInput {
  currentAge: number;
  retirementAge: number;
  currentSalary: number;
  contributionPercent: number;
  employerMatchPercent: number;
  employerMatchLimit: number;
  currentBalance: number;
  annualReturn: number;
  salaryIncrease: number;
}

export interface FourOhOneKResult {
  finalBalance: number;
  totalContributions: number;
  employerContributions: number;
  totalInterest: number;
  monthlyIncome: number;
  yearsToRetirement: number;
}

// Tax Calculator
export interface TaxInput {
  filingStatus: 'single' | 'married' | 'head';
  income: number;
  deductions: number;
  state: string;
  age: number;
  dependents: number;
}

export interface TaxResult {
  federalTax: number;
  stateTax: number;
  ficaTax: number;
  totalTax: number;
  effectiveRate: number;
  marginalRate: number;
  takeHome: number;
  monthlyTakeHome: number;
}

// Salary Calculator
export interface SalaryInput {
  annualSalary: number;
  payFrequency: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly';
  state: string;
  filingStatus: 'single' | 'married';
  allowances: number;
}

export interface SalaryResult {
  grossPay: number;
  federalTax: number;
  stateTax: number;
  ficaTax: number;
  netPay: number;
  annualNet: number;
}

// BMI Calculator
export interface BMIInput {
  heightFt: number;
  heightIn: number;
  weight: number;
  unit: 'imperial' | 'metric';
}

export interface BMIResult {
  bmi: number;
  category: string;
  healthyWeightLow: number;
  healthyWeightHigh: number;
}

// Compound Interest Calculator
export interface CompoundInterestInput {
  principal: number;
  monthlyContribution: number;
  annualRate: number;
  years: number;
  compoundFrequency: 'daily' | 'monthly' | 'quarterly' | 'annually';
}

export interface CompoundInterestResult {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: Array<{
    year: number;
    balance: number;
    contributions: number;
    interest: number;
  }>;
}

// Car Loan Calculator
export interface CarLoanInput {
  carPrice: number;
  downPayment: number;
  tradeInValue: number;
  loanTerm: number;
  interestRate: number;
  salesTax: number;
}

export interface CarLoanResult {
  monthlyPayment: number;
  loanAmount: number;
  totalInterest: number;
  totalCost: number;
}

// UK Stamp Duty Calculator
export interface StampDutyInput {
  propertyPrice: number;
  isFirstTimeBuyer: boolean;
  isAdditionalProperty: boolean;
  isResidential: boolean;
}

export interface StampDutyResult {
  stampDuty: number;
  effectiveRate: number;
  breakdown: Array<{
    band: string;
    rate: number;
    amount: number;
    tax: number;
  }>;
}

// Canada Mortgage Calculator
export interface CanadaMortgageInput {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  amortization: number;
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly';
  province: string;
}

export interface CanadaMortgageResult {
  payment: number;
  loanAmount: number;
  cmhcPremium: number;
  totalInterest: number;
  totalCost: number;
}

// Australia Home Loan Calculator
export interface AustraliaHomeLoanInput {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  repaymentFrequency: 'weekly' | 'fortnightly' | 'monthly';
  hasOffset: boolean;
  offsetBalance: number;
}

export interface AustraliaHomeLoanResult {
  repayment: number;
  totalInterest: number;
  totalCost: number;
  timeSaved: number;
  interestSaved: number;
}

// Blog Types
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  author: string;
  tags: string[];
}

// SEO Types
export interface SEOData {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  schema?: object;
}

// FAQ Types
export interface FAQ {
  question: string;
  answer: string;
}
