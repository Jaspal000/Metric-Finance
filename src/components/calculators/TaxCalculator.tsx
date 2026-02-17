import { useState, useEffect } from 'react';
import { FileText, DollarSign, Info } from 'lucide-react';
import type { TaxInput, TaxResult } from '@/types';
import { calculateFederalTax, formatCurrency, formatPercent } from '@/utils/calculations';
import { EmailCapture } from '@/components/EmailCapture';
import { AffiliateCTA } from '@/components/AffiliateCTA';

const TaxCalculator: React.FC = () => {
  const [input, setInput] = useState<TaxInput>({
    filingStatus: 'single',
    income: 75000,
    deductions: 0,
    state: 'CA',
    age: 35,
    dependents: 0,
  });

  const [result, setResult] = useState<TaxResult | null>(null);

  useEffect(() => {
    const calculated = calculateFederalTax(input);
    setResult(calculated);
  }, [input]);

  return (
    <div className="space-y-8">
      {/* Calculator Interface */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="metric-card p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Tax Information
          </h2>

          <div className="space-y-6">
            {/* Filing Status */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Filing Status
              </label>
              <select
                value={input.filingStatus}
                onChange={(e) => setInput(prev => ({ ...prev, filingStatus: e.target.value as any }))}
                className="metric-input"
              >
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
                <option value="head">Head of Household</option>
              </select>
            </div>

            {/* Income */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Annual Income
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.income}
                  onChange={(e) => setInput(prev => ({ ...prev, income: Number(e.target.value) }))}
                  className="metric-input pl-10"
                />
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Age
              </label>
              <input
                type="number"
                value={input.age}
                onChange={(e) => setInput(prev => ({ ...prev, age: Number(e.target.value) }))}
                className="metric-input"
              />
            </div>

            {/* Dependents */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Number of Dependents
              </label>
              <input
                type="number"
                value={input.dependents}
                onChange={(e) => setInput(prev => ({ ...prev, dependents: Number(e.target.value) }))}
                className="metric-input"
              />
            </div>

            {/* Standard Deduction Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-blue-600" />
                2025 Standard Deduction
              </h4>
              <p className="text-sm text-slate-600">
                {input.filingStatus === 'single' && '$14,600'}
                {input.filingStatus === 'married' && '$29,200'}
                {input.filingStatus === 'head' && '$21,900'}
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {result && (
            <>
              {/* Main Result Card */}
              <div className="bg-slate-900 rounded-xl p-6 text-white">
                <p className="text-slate-400 text-sm mb-2">Estimated Take-Home Pay</p>
                <p className="text-4xl md:text-5xl font-bold mb-2">
                  {formatCurrency(result.takeHome)}
                </p>
                <p className="text-slate-400 text-sm">
                  {formatCurrency(result.monthlyTakeHome)} / month
                </p>
              </div>

              {/* Tax Breakdown */}
              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Tax Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Federal Income Tax</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(result.federalTax)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">State Income Tax (est.)</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(result.stateTax)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">FICA (Social Security + Medicare)</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(result.ficaTax)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t-2 border-slate-200 bg-slate-50 px-3 rounded">
                    <span className="font-medium text-slate-900">Total Tax</span>
                    <span className="font-bold text-slate-900">
                      {formatCurrency(result.totalTax)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tax Rates */}
              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Your Tax Rates
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-1">Effective Tax Rate</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatPercent(result.effectiveRate)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Average rate on all income
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-1">Marginal Tax Rate</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatPercent(result.marginalRate)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Rate on your next dollar
                    </p>
                  </div>
                </div>
              </div>

              {/* 2025 Tax Brackets */}
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <h4 className="font-medium text-amber-900 mb-2">
                  2025 Federal Tax Brackets ({input.filingStatus === 'single' ? 'Single' : input.filingStatus === 'married' ? 'Married' : 'Head of Household'})
                </h4>
                <div className="text-sm text-amber-800 space-y-1">
                  {input.filingStatus === 'single' && (
                    <>
                      <div className="flex justify-between"><span>10%</span><span>$0 - $11,925</span></div>
                      <div className="flex justify-between"><span>12%</span><span>$11,926 - $48,475</span></div>
                      <div className="flex justify-between"><span>22%</span><span>$48,476 - $103,350</span></div>
                      <div className="flex justify-between"><span>24%</span><span>$103,351 - $197,300</span></div>
                    </>
                  )}
                  {input.filingStatus === 'married' && (
                    <>
                      <div className="flex justify-between"><span>10%</span><span>$0 - $23,850</span></div>
                      <div className="flex justify-between"><span>12%</span><span>$23,851 - $96,950</span></div>
                      <div className="flex justify-between"><span>22%</span><span>$96,951 - $206,700</span></div>
                      <div className="flex justify-between"><span>24%</span><span>$206,701 - $394,600</span></div>
                    </>
                  )}
                  {input.filingStatus === 'head' && (
                    <>
                      <div className="flex justify-between"><span>10%</span><span>$0 - $17,000</span></div>
                      <div className="flex justify-between"><span>12%</span><span>$17,001 - $64,850</span></div>
                      <div className="flex justify-between"><span>22%</span><span>$64,851 - $103,350</span></div>
                      <div className="flex justify-between"><span>24%</span><span>$103,351 - $197,300</span></div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Email Capture */}
      <EmailCapture variant="inline" context="calculator" />

      {/* Affiliate CTA */}
      <AffiliateCTA calculatorType="tax" />
    </div>
  );
};

export default TaxCalculator;
