import { useState, useEffect } from 'react';
import { PiggyBank, DollarSign, Percent, TrendingUp, Calendar, Info } from 'lucide-react';
import type { FourOhOneKInput, FourOhOneKResult } from '@/types';
import { calculate401k, formatCurrency } from '@/utils/calculations';
import { EmailCapture } from '@/components/EmailCapture';
import { AffiliateCTA } from '@/components/AffiliateCTA';

const FourOhOneKCalculator: React.FC = () => {
  const [input, setInput] = useState<FourOhOneKInput>({
    currentAge: 30,
    retirementAge: 65,
    currentSalary: 80000,
    contributionPercent: 6,
    employerMatchPercent: 50,
    employerMatchLimit: 6,
    currentBalance: 25000,
    annualReturn: 7,
    salaryIncrease: 3,
  });

  const [result, setResult] = useState<FourOhOneKResult | null>(null);

  useEffect(() => {
    const calculated = calculate401k(input);
    setResult(calculated);
  }, [input]);

  const contributionAmount = Math.round(input.currentSalary * (input.contributionPercent / 100));
  const employerMatchAmount = Math.round(
    Math.min(contributionAmount, input.currentSalary * (input.employerMatchLimit / 100)) * 
    (input.employerMatchPercent / 100)
  );

  return (
    <div className="space-y-8">
      {/* Calculator Interface */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="metric-card p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-blue-600" />
            401(k) Details
          </h2>

          <div className="space-y-6">
            {/* Ages */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Age
                </label>
                <input
                  type="number"
                  value={input.currentAge}
                  onChange={(e) => setInput(prev => ({ ...prev, currentAge: Number(e.target.value) }))}
                  className="metric-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Retirement Age
                </label>
                <input
                  type="number"
                  value={input.retirementAge}
                  onChange={(e) => setInput(prev => ({ ...prev, retirementAge: Number(e.target.value) }))}
                  className="metric-input"
                />
              </div>
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Current Annual Salary
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.currentSalary}
                  onChange={(e) => setInput(prev => ({ ...prev, currentSalary: Number(e.target.value) }))}
                  className="metric-input pl-10"
                />
              </div>
            </div>

            {/* Contribution */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Contribution (%)
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.contributionPercent}
                  onChange={(e) => setInput(prev => ({ ...prev, contributionPercent: Number(e.target.value) }))}
                  className="metric-input pl-10"
                  step="0.5"
                />
              </div>
              <p className="text-sm text-slate-500 mt-1">
                = {formatCurrency(contributionAmount)}/year
              </p>
            </div>

            {/* Employer Match */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-4">
              <h4 className="font-medium text-slate-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                Employer Match
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    Match %
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="number"
                      value={input.employerMatchPercent}
                      onChange={(e) => setInput(prev => ({ ...prev, employerMatchPercent: Number(e.target.value) }))}
                      className="w-full px-3 py-2 pl-9 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    Up to %
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="number"
                      value={input.employerMatchLimit}
                      onChange={(e) => setInput(prev => ({ ...prev, employerMatchLimit: Number(e.target.value) }))}
                      className="w-full px-3 py-2 pl-9 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm text-blue-700">
                Employer contributes: {formatCurrency(employerMatchAmount)}/year
              </p>
            </div>

            {/* Current Balance */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Current 401(k) Balance
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.currentBalance}
                  onChange={(e) => setInput(prev => ({ ...prev, currentBalance: Number(e.target.value) }))}
                  className="metric-input pl-10"
                />
              </div>
            </div>

            {/* Return Rate */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Expected Annual Return (%)
              </label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.annualReturn}
                  onChange={(e) => setInput(prev => ({ ...prev, annualReturn: Number(e.target.value) }))}
                  className="metric-input pl-10"
                  step="0.5"
                />
              </div>
            </div>

            {/* Salary Increase */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Annual Salary Increase (%)
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.salaryIncrease}
                  onChange={(e) => setInput(prev => ({ ...prev, salaryIncrease: Number(e.target.value) }))}
                  className="metric-input pl-10"
                  step="0.5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {result && (
            <>
              {/* Main Result Card */}
              <div className="bg-slate-900 rounded-xl p-6 text-white">
                <p className="text-slate-400 text-sm mb-2">Estimated Balance at Retirement</p>
                <p className="text-4xl md:text-5xl font-bold mb-4">
                  {formatCurrency(result.finalBalance)}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="w-4 h-4" />
                  In {result.yearsToRetirement} years (age {input.retirementAge})
                </div>
              </div>

              {/* Contribution Breakdown */}
              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Contribution Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Your Contributions</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(result.totalContributions)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Employer Contributions</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(result.employerContributions)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Investment Growth</span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(result.totalInterest)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Retirement Income */}
              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Projected Retirement Income
                </h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">
                    Estimated Monthly Income (20-year withdrawal)
                  </p>
                  <p className="text-2xl font-bold text-blue-700">
                    {formatCurrency(result.monthlyIncome)}
                  </p>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  *Assumes 20-year withdrawal period with continued 7% growth
                </p>
              </div>

              {/* 2025 Limits Info */}
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <h4 className="font-medium text-amber-900 mb-2">
                  2025 Contribution Limits
                </h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Employee limit: $23,500</li>
                  <li>• Catch-up (50+): +$7,500</li>
                  <li>• Total limit: $70,000</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Email Capture */}
      <EmailCapture variant="inline" context="calculator" />

      {/* Affiliate CTA */}
      <AffiliateCTA calculatorType="401k" />
    </div>
  );
};

export default FourOhOneKCalculator;
