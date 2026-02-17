import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { FAQ } from '@/components/FAQ';
import { getCalculatorBySlug, getCalculatorsByRegion } from '@/data/regions';
import type { Region, FAQ as FAQType } from '@/types';
import { generateBreadcrumbSchema, generateCalculatorSchema } from '@/utils/seo';
import { ChevronRight, ArrowRight, Calculator } from 'lucide-react';

// Import calculators
import USMortgageCalculator from '@/components/calculators/USMortgageCalculator';
import FourOhOneKCalculator from '@/components/calculators/FourOhOneKCalculator';
import TaxCalculator from '@/components/calculators/TaxCalculator';
import SalaryCalculator from '@/components/calculators/SalaryCalculator';
import BMICalculator from '@/components/calculators/BMICalculator';
import CompoundInterestCalculator from '@/components/calculators/CompoundInterestCalculator';
import CarLoanCalculator from '@/components/calculators/CarLoanCalculator';
import StampDutyCalculator from '@/components/calculators/StampDutyCalculator';
import CanadaMortgageCalculator from '@/components/calculators/CanadaMortgageCalculator';
import AustraliaHomeLoanCalculator from '@/components/calculators/AustraliaHomeLoanCalculator';

const calculatorComponents: Record<string, React.FC> = {
  'us-mortgage': USMortgageCalculator,
  'us-401k': FourOhOneKCalculator,
  'us-tax': TaxCalculator,
  'us-salary': SalaryCalculator,
  'us-bmi': BMICalculator,
  'us-compound': CompoundInterestCalculator,
  'us-car': CarLoanCalculator,
  'uk-stamp-duty': StampDutyCalculator,
  'ca-mortgage': CanadaMortgageCalculator,
  'au-home-loan': AustraliaHomeLoanCalculator,
};

const faqData: Record<string, FAQType[]> = {
  'us-mortgage': [
    { question: 'What is PITI?', answer: 'PITI stands for Principal, Interest, Taxes, and Insurance. It represents the complete monthly cost of owning a home with a mortgage, including your loan payment, property taxes, and homeowners insurance.' },
    { question: 'How much should my down payment be?', answer: 'A typical down payment is 20% of the home price, which allows you to avoid Private Mortgage Insurance (PMI). However, many lenders accept down payments as low as 3-5% for qualified buyers.' },
    { question: 'What is PMI?', answer: 'Private Mortgage Insurance (PMI) is insurance that protects the lender if you default on your loan. It is typically required when your down payment is less than 20% of the home price.' },
    { question: 'Should I choose a 15-year or 30-year mortgage?', answer: 'A 15-year mortgage has higher monthly payments but lower total interest costs. A 30-year mortgage has lower monthly payments but higher total interest. Choose based on your budget and financial goals.' },
    { question: 'How can I lower my monthly mortgage payment?', answer: 'You can lower your payment by making a larger down payment, improving your credit score for a better interest rate, choosing a longer loan term, or buying a less expensive home.' },
  ],
  'us-401k': [
    { question: 'What is the 401(k) contribution limit for 2025?', answer: 'The employee contribution limit for 2025 is $23,500. If you are age 50 or older, you can contribute an additional $7,500 as a catch-up contribution.' },
    { question: 'How does employer matching work?', answer: 'Employer matching means your employer contributes to your 401(k) based on your contributions. A common formula is 50% match up to 6% of your salary. Always contribute enough to get the full match.' },
    { question: 'What is the difference between Traditional and Roth 401(k)?', answer: 'Traditional 401(k) contributions are pre-tax, reducing your taxable income now, but withdrawals are taxed in retirement. Roth 401(k) contributions are after-tax, but qualified withdrawals are tax-free.' },
    { question: 'When can I withdraw from my 401(k)?', answer: 'You can withdraw from your 401(k) penalty-free starting at age 59½. Withdrawals before this age typically incur a 10% early withdrawal penalty plus income taxes, with some exceptions.' },
    { question: 'What happens to my 401(k) if I change jobs?', answer: 'You have several options: leave it with your former employer, roll it over to your new employer\'s plan, roll it over to an IRA, or cash it out (not recommended due to taxes and penalties).' },
  ],
  'us-tax': [
    { question: 'What is the difference between marginal and effective tax rate?', answer: 'Your marginal tax rate is the rate you pay on your next dollar of income. Your effective tax rate is your total tax divided by your total income, representing your actual overall tax burden.' },
    { question: 'What is FICA tax?', answer: 'FICA (Federal Insurance Contributions Act) tax funds Social Security and Medicare. Employees pay 6.2% for Social Security (up to the wage base) and 1.45% for Medicare, matched by employers.' },
    { question: 'Should I take the standard deduction or itemize?', answer: 'Take the standard deduction if it is larger than your total itemized deductions. For 2025, the standard deduction is $14,600 for single filers and $29,200 for married couples filing jointly.' },
    { question: 'What tax bracket am I in?', answer: 'Your tax bracket depends on your filing status and taxable income. The US has seven tax brackets ranging from 10% to 37%. Use our calculator to find your specific bracket and effective rate.' },
    { question: 'How can I reduce my tax liability?', answer: 'You can reduce taxes by contributing to retirement accounts (401k, IRA), using Health Savings Accounts (HSAs), claiming eligible deductions and credits, and tax-loss harvesting in investment accounts.' },
  ],
  'us-salary': [
    { question: 'What is taken out of my paycheck?', answer: 'Typical deductions include federal income tax, state income tax, FICA (Social Security and Medicare), health insurance premiums, and retirement contributions.' },
    { question: 'How do I calculate my take-home pay?', answer: 'Start with your gross pay, then subtract all deductions including federal and state taxes, FICA, and any pre-tax benefits. Our calculator does this automatically for you.' },
    { question: 'What are pre-tax deductions?', answer: 'Pre-tax deductions are taken from your gross pay before taxes are calculated, reducing your taxable income. Common examples include 401(k) contributions, health insurance, and Flexible Spending Accounts.' },
    { question: 'How do allowances affect my paycheck?', answer: 'More allowances on your W-4 mean less tax withheld from each paycheck, resulting in higher take-home pay but potentially a smaller refund or owing taxes at year-end.' },
  ],
  'us-bmi': [
    { question: 'What is a healthy BMI?', answer: 'A healthy BMI ranges from 18.5 to 24.9. Below 18.5 is considered underweight, 25 to 29.9 is overweight, and 30 or above is obese.' },
    { question: 'Is BMI accurate for everyone?', answer: 'BMI is a screening tool and has limitations. It may not accurately reflect body composition for athletes, elderly individuals, or certain ethnic groups. Consult a healthcare provider for personalized assessment.' },
    { question: 'How do I calculate my BMI?', answer: 'BMI is calculated by dividing your weight in kilograms by your height in meters squared, or by using our calculator which handles the conversion for you.' },
  ],
  'us-compound': [
    { question: 'What is compound interest?', answer: 'Compound interest is interest earned on both your initial principal and the accumulated interest from previous periods. It allows your money to grow faster than simple interest.' },
    { question: 'What is the Rule of 72?', answer: 'The Rule of 72 is a quick way to estimate how long it will take for an investment to double. Divide 72 by your annual interest rate to get the approximate number of years.' },
    { question: 'How often should interest compound?', answer: 'More frequent compounding (daily vs. monthly vs. annually) results in slightly higher returns. However, the difference is usually small unless the principal is very large or the time period is very long.' },
    { question: 'What is a good rate of return?', answer: 'Historical average annual returns for the S&P 500 are around 10% before inflation. A conservative estimate for long-term planning is 6-7% after inflation.' },
  ],
  'us-car': [
    { question: 'What is a good APR for a car loan?', answer: 'A good APR depends on your credit score. Excellent credit (750+) may qualify for rates under 5%, while fair credit (650-699) might see rates of 8-12%.' },
    { question: 'Should I get a longer loan term for lower payments?', answer: 'Longer terms lower monthly payments but increase total interest paid. Aim for the shortest term you can comfortably afford to minimize total cost.' },
    { question: 'How much should I put down on a car?', answer: 'Aim for at least 20% down on a new car or 10% on a used car. This helps avoid being "upside down" (owing more than the car is worth).' },
  ],
  'uk-stamp-duty': [
    { question: 'What is Stamp Duty Land Tax (SDLT)?', answer: 'SDLT is a tax paid when purchasing property in England and Northern Ireland. The amount depends on the property price and your circumstances (first-time buyer, additional property, etc.).' },
    { question: 'Do first-time buyers pay stamp duty?', answer: 'First-time buyers pay no SDLT on properties up to £425,000. Between £425,001 and £625,000, they pay 5% on the portion above £425,000.' },
    { question: 'What is the additional property rate?', answer: 'If you already own a property and are buying another, a 3% surcharge applies to the entire purchase price on top of standard rates.' },
    { question: 'When do I pay stamp duty?', answer: 'SDLT must be paid within 14 days of completing your property purchase. Your solicitor usually handles this as part of the conveyancing process.' },
  ],
  'ca-mortgage': [
    { question: 'What is CMHC insurance?', answer: 'CMHC (Canada Mortgage and Housing Corporation) insurance protects lenders if you default. It is required for down payments less than 20% and is added to your mortgage balance.' },
    { question: 'How is Canadian mortgage interest calculated?', answer: 'Canadian mortgages use semi-annual compounding, different from monthly compounding in the US. This affects the effective interest rate and payment calculations.' },
    { question: 'What is the minimum down payment in Canada?', answer: 'For homes under $500,000, the minimum is 5%. For homes $500,000 to $999,999, it is 5% on the first $500,000 and 10% on the remainder. Homes $1M+ require 20% down.' },
    { question: 'What is mortgage amortization?', answer: 'Amortization is the total length of time to pay off your mortgage completely. Common terms are 25 or 30 years, though your actual mortgage term (before renewal) is typically 1-5 years.' },
  ],
  'au-home-loan': [
    { question: 'What is an offset account?', answer: 'An offset account is a transaction account linked to your mortgage. Money in this account reduces the interest charged on your loan while remaining accessible.' },
    { question: 'Should I pay weekly or monthly?', answer: 'Paying weekly or fortnightly can help you pay off your loan faster because you make the equivalent of 13 monthly payments per year instead of 12.' },
    { question: 'What is a comparison rate?', answer: 'A comparison rate includes the interest rate plus most fees and charges, giving you a better picture of the true cost of a loan. It helps compare different loan offers.' },
    { question: 'What is the typical home loan term in Australia?', answer: 'The standard home loan term in Australia is 25-30 years, though you can choose shorter terms for faster repayment.' },
  ],
};

const CalculatorPage: React.FC = () => {
  const { region, slug } = useParams<{ region: string; slug: string }>();
  const regionCode = (region || 'us') as Region;
  
  const calculator = getCalculatorBySlug(regionCode, slug || '');
  
  if (!calculator) {
    return <div>Calculator not found</div>;
  }

  const CalculatorComponent = calculatorComponents[calculator.id];
  const faqs = faqData[calculator.id] || [];
  
  const relatedCalculators = getCalculatorsByRegion(regionCode)
    .filter(c => c.id !== calculator.id)
    .slice(0, 3);

  const seo = {
    title: calculator.metaTitle,
    description: calculator.metaDescription,
    canonical: `https://metricfinance.com/${region}/${slug}`,
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://metricfinance.com/' },
    { name: calculator.region.toUpperCase(), url: `https://metricfinance.com/${calculator.region}` },
    { name: calculator.name, url: `https://metricfinance.com/${calculator.region}/${calculator.slug}` },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    calculator.name,
    calculator.description,
    `https://metricfinance.com/${calculator.region}/${calculator.slug}`
  );

  return (
    <>
      <SEO seo={seo} schema={[breadcrumbSchema, calculatorSchema]} />
      
      <main>
        {/* Breadcrumb */}
        <div className="bg-slate-50 border-b border-slate-200">
          <div className="metric-container py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-slate-500 hover:text-slate-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <Link to={`/${region}`} className="text-slate-500 hover:text-slate-700">
                {region?.toUpperCase()}
              </Link>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <span className="text-slate-900 font-medium">{calculator.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-white py-12 md:py-16">
          <div className="metric-container">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
                <Calculator className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  {calculator.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {calculator.name}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                {calculator.description}
              </p>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="metric-section bg-slate-50">
          <div className="metric-container">
            {CalculatorComponent && <CalculatorComponent />}
          </div>
        </section>

        {/* How It Works */}
        <section className="metric-section bg-white">
          <div className="metric-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
                How It Works
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Enter Your Details</h3>
                  <p className="text-sm text-slate-600">
                    Input your financial information into the calculator fields.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Get Instant Results</h3>
                  <p className="text-sm text-slate-600">
                    See accurate calculations update in real-time as you type.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-blue-600">3</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Plan Your Future</h3>
                  <p className="text-sm text-slate-600">
                    Use the results to make informed financial decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="metric-section bg-slate-50">
            <div className="metric-container">
              <div className="max-w-3xl mx-auto">
                <FAQ faqs={faqs} />
              </div>
            </div>
          </section>
        )}

        {/* Related Calculators */}
        {relatedCalculators.length > 0 && (
          <section className="metric-section bg-white">
            <div className="metric-container">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Related Calculators
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedCalculators.map((calc) => (
                  <Link
                    key={calc.id}
                    to={`/${calc.region}/${calc.slug}`}
                    className="group p-6 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {calc.description}
                    </p>
                    <span className="text-sm font-medium text-blue-600 flex items-center gap-1">
                      Calculate <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default CalculatorPage;
