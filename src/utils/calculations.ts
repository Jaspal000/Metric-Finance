import type {
  MortgageInput, MortgageResult,
  FourOhOneKInput, FourOhOneKResult,
  TaxInput, TaxResult,
  SalaryInput, SalaryResult,
  BMIInput, BMIResult,
  CompoundInterestInput, CompoundInterestResult,
  CarLoanInput, CarLoanResult,
  StampDutyInput, StampDutyResult,
  CanadaMortgageInput, CanadaMortgageResult,
  AustraliaHomeLoanInput, AustraliaHomeLoanResult,
} from '@/types';

// US Mortgage Calculator (PITI)
export const calculateMortgage = (input: MortgageInput): MortgageResult => {
  const loanAmount = input.homePrice - input.downPayment;
  const monthlyRate = input.interestRate / 100 / 12;
  const numPayments = input.loanTerm * 12;
  
  let monthlyPrincipalInterest = 0;
  if (input.interestRate === 0) {
    monthlyPrincipalInterest = loanAmount / numPayments;
  } else {
    monthlyPrincipalInterest = 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }
  
  const monthlyPropertyTax = input.propertyTax / 12;
  const monthlyInsurance = input.homeInsurance / 12;
  const monthlyHOA = input.hoaFees;
  
  const totalMonthlyPayment = monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance + monthlyHOA;
  const totalCost = totalMonthlyPayment * numPayments;
  const totalInterestPaid = totalCost - loanAmount - (monthlyPropertyTax + monthlyInsurance + monthlyHOA) * numPayments;
  
  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + numPayments);
  
  return {
    monthlyPrincipalInterest: Math.round(monthlyPrincipalInterest * 100) / 100,
    monthlyPropertyTax: Math.round(monthlyPropertyTax * 100) / 100,
    monthlyInsurance: Math.round(monthlyInsurance * 100) / 100,
    monthlyHOA: Math.round(monthlyHOA * 100) / 100,
    totalMonthlyPayment: Math.round(totalMonthlyPayment * 100) / 100,
    totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    loanAmount: Math.round(loanAmount * 100) / 100,
    payoffDate: payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  };
};

// 401(k) Calculator
export const calculate401k = (input: FourOhOneKInput): FourOhOneKResult => {
  const yearsToRetirement = input.retirementAge - input.currentAge;
  let balance = input.currentBalance;
  let totalContributions = 0;
  let employerContributions = 0;
  let salary = input.currentSalary;
  
  for (let year = 1; year <= yearsToRetirement; year++) {
    const employeeContribution = salary * (input.contributionPercent / 100);
    const maxMatchable = salary * (input.employerMatchLimit / 100);
    const employerMatch = Math.min(
      employeeContribution * (input.employerMatchPercent / 100),
      maxMatchable * (input.employerMatchPercent / 100)
    );
    
    totalContributions += employeeContribution;
    employerContributions += employerMatch;
    
    const yearContributions = employeeContribution + employerMatch;
    balance = (balance + yearContributions) * (1 + input.annualReturn / 100);
    
    salary = salary * (1 + input.salaryIncrease / 100);
  }
  
  const totalInterest = balance - input.currentBalance - totalContributions - employerContributions;
  const monthlyIncome = balance / 240; // 20 years of retirement
  
  return {
    finalBalance: Math.round(balance),
    totalContributions: Math.round(totalContributions),
    employerContributions: Math.round(employerContributions),
    totalInterest: Math.round(totalInterest),
    monthlyIncome: Math.round(monthlyIncome),
    yearsToRetirement,
  };
};

// Federal Tax Calculator (2025 brackets)
export const calculateFederalTax = (input: TaxInput): TaxResult => {
  // 2025 Federal Tax Brackets (Single)
  const singleBrackets = [
    { limit: 11925, rate: 0.10 },
    { limit: 48475, rate: 0.12 },
    { limit: 103350, rate: 0.22 },
    { limit: 197300, rate: 0.24 },
    { limit: 250525, rate: 0.32 },
    { limit: 626350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ];
  
  // 2025 Federal Tax Brackets (Married)
  const marriedBrackets = [
    { limit: 23850, rate: 0.10 },
    { limit: 96950, rate: 0.12 },
    { limit: 206700, rate: 0.22 },
    { limit: 394600, rate: 0.24 },
    { limit: 501050, rate: 0.32 },
    { limit: 751600, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ];
  
  // 2025 Standard Deduction
  const standardDeduction = input.filingStatus === 'married' ? 29200 : 
                            input.filingStatus === 'head' ? 21900 : 14600;
  
  const brackets = input.filingStatus === 'married' ? marriedBrackets : singleBrackets;
  const taxableIncome = Math.max(0, input.income - standardDeduction);
  
  let federalTax = 0;
  let previousLimit = 0;
  let marginalRate = 0;
  
  for (const bracket of brackets) {
    if (taxableIncome > previousLimit) {
      const taxableAtThisBracket = Math.min(taxableIncome, bracket.limit) - previousLimit;
      federalTax += taxableAtThisBracket * bracket.rate;
      marginalRate = bracket.rate;
    }
    previousLimit = bracket.limit;
  }
  
  // FICA Tax
  const ssWageBase = 176100;
  const ssTax = Math.min(input.income, ssWageBase) * 0.062;
  const medicareTax = input.income * 0.0145;
  const additionalMedicare = input.income > 200000 ? (input.income - 200000) * 0.009 : 0;
  const ficaTax = ssTax + medicareTax + additionalMedicare;
  
  // Simplified state tax (average ~5%)
  const stateTax = taxableIncome * 0.05;
  
  const totalTax = federalTax + stateTax + ficaTax;
  const effectiveRate = input.income > 0 ? (federalTax / input.income) * 100 : 0;
  const takeHome = input.income - totalTax;
  
  return {
    federalTax: Math.round(federalTax),
    stateTax: Math.round(stateTax),
    ficaTax: Math.round(ficaTax),
    totalTax: Math.round(totalTax),
    effectiveRate: Math.round(effectiveRate * 100) / 100,
    marginalRate: Math.round(marginalRate * 100),
    takeHome: Math.round(takeHome),
    monthlyTakeHome: Math.round(takeHome / 12),
  };
};

// Salary Calculator
export const calculateSalary = (input: SalaryInput): SalaryResult => {
  const payPeriods = {
    weekly: 52,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
  };
  
  const periods = payPeriods[input.payFrequency];
  const grossPay = input.annualSalary / periods;
  
  // Estimate federal tax at ~12% effective rate
  const federalTaxRate = 0.12;
  const federalTax = (grossPay * federalTaxRate);
  
  // State tax (varies by state, average 5%)
  const stateTaxRate = 0.05;
  const stateTax = grossPay * stateTaxRate;
  
  // FICA (7.65%)
  const ficaTax = grossPay * 0.0765;
  
  const totalDeductions = federalTax + stateTax + ficaTax;
  const netPay = grossPay - totalDeductions;
  const annualNet = netPay * periods;
  
  return {
    grossPay: Math.round(grossPay * 100) / 100,
    federalTax: Math.round(federalTax * 100) / 100,
    stateTax: Math.round(stateTax * 100) / 100,
    ficaTax: Math.round(ficaTax * 100) / 100,
    netPay: Math.round(netPay * 100) / 100,
    annualNet: Math.round(annualNet),
  };
};

// BMI Calculator
export const calculateBMI = (input: BMIInput): BMIResult => {
  let heightInMeters: number;
  let weightInKg: number;
  
  if (input.unit === 'imperial') {
    const totalInches = (input.heightFt * 12) + input.heightIn;
    heightInMeters = totalInches * 0.0254;
    weightInKg = input.weight * 0.453592;
  } else {
    heightInMeters = (input.heightFt * 100 + input.heightIn) / 100;
    weightInKg = input.weight;
  }
  
  const bmi = weightInKg / (heightInMeters * heightInMeters);
  
  let category: string;
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';
  
  const healthyWeightLow = 18.5 * heightInMeters * heightInMeters;
  const healthyWeightHigh = 24.9 * heightInMeters * heightInMeters;
  
  const weightMultiplier = input.unit === 'imperial' ? 2.20462 : 1;
  
  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    healthyWeightLow: Math.round(healthyWeightLow * weightMultiplier * 10) / 10,
    healthyWeightHigh: Math.round(healthyWeightHigh * weightMultiplier * 10) / 10,
  };
};

// Compound Interest Calculator
export const calculateCompoundInterest = (input: CompoundInterestInput): CompoundInterestResult => {
  const frequencyMap = { daily: 365, monthly: 12, quarterly: 4, annually: 1 };
  const n = frequencyMap[input.compoundFrequency];
  const r = input.annualRate / 100;
  const t = input.years;
  const P = input.principal;
  const PMT = input.monthlyContribution;
  
  // Compound interest formula with contributions
  const ratePerPeriod = r / n;
  const totalPeriods = n * t;
  
  // Future value of principal
  const fvPrincipal = P * Math.pow(1 + ratePerPeriod, totalPeriods);
  
  // Future value of contributions (converted to per-period)
  const contributionPerPeriod = PMT * (12 / n);
  const fvContributions = contributionPerPeriod * 
    (Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod;
  
  const finalAmount = fvPrincipal + fvContributions;
  const totalContributions = P + (PMT * 12 * t);
  const totalInterest = finalAmount - totalContributions;
  
  // Yearly breakdown
  const yearlyBreakdown = [];
  for (let year = 1; year <= t; year++) {
    const periods = n * year;
    const yearPrincipal = P * Math.pow(1 + ratePerPeriod, periods);
    const yearContributions = contributionPerPeriod * 
      (Math.pow(1 + ratePerPeriod, periods) - 1) / ratePerPeriod;
    const yearBalance = yearPrincipal + yearContributions;
    const yearTotalContributions = P + (PMT * 12 * year);
    
    yearlyBreakdown.push({
      year,
      balance: Math.round(yearBalance),
      contributions: Math.round(yearTotalContributions),
      interest: Math.round(yearBalance - yearTotalContributions),
    });
  }
  
  return {
    finalAmount: Math.round(finalAmount),
    totalContributions: Math.round(totalContributions),
    totalInterest: Math.round(totalInterest),
    yearlyBreakdown,
  };
};

// Car Loan Calculator
export const calculateCarLoan = (input: CarLoanInput): CarLoanResult => {
  const loanAmount = input.carPrice - input.downPayment - input.tradeInValue;
  const monthlyRate = input.interestRate / 100 / 12;
  const numPayments = input.loanTerm;
  
  let monthlyPayment = 0;
  if (input.interestRate === 0) {
    monthlyPayment = loanAmount / numPayments;
  } else {
    monthlyPayment = 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }
  
  const totalCost = monthlyPayment * numPayments;
  const totalInterest = totalCost - loanAmount;
  
  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    loanAmount: Math.round(loanAmount * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
  };
};

// UK Stamp Duty Calculator (SDLT)
export const calculateStampDuty = (input: StampDutyInput): StampDutyResult => {
  let bands: Array<{ threshold: number; rate: number }> = [];
  
  if (input.isFirstTimeBuyer && input.propertyPrice <= 625000) {
    // First-time buyer relief
    bands = [
      { threshold: 425000, rate: 0 },
      { threshold: 625000, rate: 0.05 },
      { threshold: Infinity, rate: 0.10 },
    ];
  } else if (input.isAdditionalProperty) {
    // Additional property (3% surcharge)
    bands = [
      { threshold: 250000, rate: 0.03 },
      { threshold: 925000, rate: 0.08 },
      { threshold: 1500000, rate: 0.13 },
      { threshold: Infinity, rate: 0.15 },
    ];
  } else {
    // Standard residential
    bands = [
      { threshold: 250000, rate: 0 },
      { threshold: 925000, rate: 0.05 },
      { threshold: 1500000, rate: 0.10 },
      { threshold: Infinity, rate: 0.12 },
    ];
  }
  
  let stampDuty = 0;
  let previousThreshold = 0;
  const breakdown = [];
  
  for (const band of bands) {
    if (input.propertyPrice > previousThreshold) {
      const amountInBand = Math.min(input.propertyPrice, band.threshold) - previousThreshold;
      const taxForBand = amountInBand * band.rate;
      stampDuty += taxForBand;
      
      breakdown.push({
        band: `£${previousThreshold.toLocaleString()} - £${band.threshold === Infinity ? '∞' : band.threshold.toLocaleString()}`,
        rate: band.rate * 100,
        amount: amountInBand,
        tax: taxForBand,
      });
    }
    previousThreshold = band.threshold;
  }
  
  const effectiveRate = input.propertyPrice > 0 ? (stampDuty / input.propertyPrice) * 100 : 0;
  
  return {
    stampDuty: Math.round(stampDuty),
    effectiveRate: Math.round(effectiveRate * 100) / 100,
    breakdown,
  };
};

// Canada Mortgage Calculator
export const calculateCanadaMortgage = (input: CanadaMortgageInput): CanadaMortgageResult => {
  // CMHC Insurance calculation
  let cmhcRate = 0;
  const downPaymentPercent = (input.downPayment / input.homePrice) * 100;
  const loanAmount = input.homePrice - input.downPayment;
  
  if (downPaymentPercent < 10) {
    cmhcRate = 0.04;
  } else if (downPaymentPercent < 15) {
    cmhcRate = 0.031;
  } else if (downPaymentPercent < 20) {
    cmhcRate = 0.028;
  }
  
  const cmhcPremium = loanAmount * cmhcRate;
  const totalLoan = loanAmount + cmhcPremium;
  
  // Canadian semi-annual compounding
  const annualRate = input.interestRate / 100;
  const effectiveAnnualRate = Math.pow(1 + annualRate / 2, 2) - 1;
  
  // Convert to payment frequency
  const paymentsPerYear = input.paymentFrequency === 'weekly' ? 52 : 
                          input.paymentFrequency === 'biweekly' ? 26 : 12;
  const totalPayments = input.amortization * paymentsPerYear;
  
  const ratePerPayment = Math.pow(1 + effectiveAnnualRate, 1 / paymentsPerYear) - 1;
  
  let payment = 0;
  if (ratePerPayment === 0) {
    payment = totalLoan / totalPayments;
  } else {
    payment = (totalLoan * ratePerPayment * Math.pow(1 + ratePerPayment, totalPayments)) /
              (Math.pow(1 + ratePerPayment, totalPayments) - 1);
  }
  
  const totalCost = payment * totalPayments;
  const totalInterest = totalCost - totalLoan;
  
  return {
    payment: Math.round(payment * 100) / 100,
    loanAmount: Math.round(loanAmount),
    cmhcPremium: Math.round(cmhcPremium),
    totalInterest: Math.round(totalInterest),
    totalCost: Math.round(totalCost),
  };
};

// Australia Home Loan Calculator
export const calculateAustraliaHomeLoan = (input: AustraliaHomeLoanInput): AustraliaHomeLoanResult => {
  const paymentsPerYear = input.repaymentFrequency === 'weekly' ? 52 : 
                          input.repaymentFrequency === 'fortnightly' ? 26 : 12;
  
  const monthlyRate = input.interestRate / 100 / 12;
  const ratePerPayment = monthlyRate * (12 / paymentsPerYear);
  const totalPayments = input.loanTerm * paymentsPerYear;
  
  // Effective loan amount with offset
  const effectiveLoan = Math.max(0, input.loanAmount - input.offsetBalance);
  
  let repayment = 0;
  if (input.interestRate === 0) {
    repayment = effectiveLoan / totalPayments;
  } else {
    repayment = (effectiveLoan * ratePerPayment * Math.pow(1 + ratePerPayment, totalPayments)) /
                (Math.pow(1 + ratePerPayment, totalPayments) - 1);
  }
  
  const totalCost = repayment * totalPayments;
  const totalInterest = totalCost - input.loanAmount;
  
  // Calculate time saved with offset
  let timeSaved = 0;
  let interestSaved = 0;
  
  if (input.hasOffset && input.offsetBalance > 0) {
    // Without offset
    const repaymentWithoutOffset = (input.loanAmount * ratePerPayment * Math.pow(1 + ratePerPayment, totalPayments)) /
                                   (Math.pow(1 + ratePerPayment, totalPayments) - 1);
    const totalCostWithoutOffset = repaymentWithoutOffset * totalPayments;
    const totalInterestWithoutOffset = totalCostWithoutOffset - input.loanAmount;
    
    interestSaved = totalInterestWithoutOffset - totalInterest;
    
    // Estimate time saved (simplified)
    timeSaved = Math.round((interestSaved / totalInterestWithoutOffset) * input.loanTerm * 12);
  }
  
  return {
    repayment: Math.round(repayment * 100) / 100,
    totalInterest: Math.round(totalInterest),
    totalCost: Math.round(totalCost),
    timeSaved,
    interestSaved: Math.round(interestSaved),
  };
};

// Format currency
export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  const symbols: Record<string, string> = {
    USD: '$',
    GBP: '£',
    CAD: 'C$',
    AUD: 'A$',
  };
  
  const symbol = symbols[currency] || '$';
  return `${symbol}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Format percentage
export const formatPercent = (value: number): string => {
  return `${value.toFixed(2)}%`;
};
