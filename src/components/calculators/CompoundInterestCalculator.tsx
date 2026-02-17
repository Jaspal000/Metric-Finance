import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Percent, Clock, Info } from 'lucide-react';
import type { CompoundInterestInput, CompoundInterestResult } from '@/types';
import { calculateCompoundInterest, formatCurrency } from '@/utils/calculations';
import { EmailCapture } from '@/components/EmailCapture';
import { AffiliateCTA } from '@/components/AffiliateCTA';

const CompoundInterestCalculator: React.FC = () => {
  const [input, setInput] = useState<CompoundInterestInput>({
    principal: 10000,
    monthlyContribution: 500,
    annualRate: 7,
    years: 20,
    compoundFrequency: 'monthly',
  });

  const [result, setResult] = useState<CompoundInterestResult | null>(null);

  useEffect(() => {
    const calculated = calculateCompoundInterest(input);
    setResult(calculated);
  }, [input]);

  // Rule of 72 calculation
  const ruleOf72 = input.annualRate > 0 ? Math.round(72 / input.annualRate) : 0;

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="metric-card p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Investment Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Initial Investment
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.principal}
                  onChange={(e) => setInput(prev => ({ ...prev, principal: Number(e.target.value) }))}
                  className="metric-input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Monthly Contribution
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.monthlyContribution}
                  onChange={(e) => setInput(prev => ({ ...prev, monthlyContribution: Number(e.target.value) }))}
                  className="metric-input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.annualRate}
                  onChange={(e) => setInput(prev => ({ ...prev, annualRate: Number(e.target.value) }))}
                  className="metric-input pl-10"
                  step="0.1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Time Period (years)
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.years}
                  onChange={(e) => setInput(prev => ({ ...prev, years: Number(e.target.value) }))}
                  className="metric-input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Compound Frequency
              </label>
              <select
                value={input.compoundFrequency}
                onChange={(e) => setInput(prev => ({ ...prev, compoundFrequency: e.target.value as any }))}
                className="metric-input"
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {result && (
            <>
              <div className="bg-slate-900 rounded-xl p-6 text-white">
                <p className="text-slate-400 text-sm mb-2">Final Balance</p>
                <p className="text-4xl md:text-5xl font-bold mb-4">
                  {formatCurrency(result.finalAmount)}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-400">
                    Total Contributed: {formatCurrency(result.totalContributions)}
                  </span>
                </div>
              </div>

              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Growth Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Total Contributions</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(result.totalContributions)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Interest Earned</span>
                    <span className="font-semibold text-green-600">
                      +{formatCurrency(result.totalInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t-2 border-slate-200 bg-slate-50 px-3 rounded">
                    <span className="font-medium text-slate-900">Final Balance</span>
                    <span className="font-bold text-slate-900">
                      {formatCurrency(result.finalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Rule of 72</h4>
                    <p className="text-sm text-blue-800">
                      At {input.annualRate}% interest, your money will double approximately every {ruleOf72} years.
                    </p>
                  </div>
                </div>
              </div>

              {result.yearlyBreakdown.length > 0 && (
                <div className="metric-card p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Year-by-Year Growth
                  </h3>
                  <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 sticky top-0">
                        <tr>
                          <th className="text-left py-2 px-3 font-medium text-slate-700">Year</th>
                          <th className="text-right py-2 px-3 font-medium text-slate-700">Balance</th>
                          <th className="text-right py-2 px-3 font-medium text-slate-700">Interest</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.yearlyBreakdown.filter((_, i) => i % 5 === 0 || i === result.yearlyBreakdown.length - 1).map((year) => (
                          <tr key={year.year} className="border-b border-slate-100">
                            <td className="py-2 px-3">{year.year}</td>
                            <td className="text-right py-2 px-3 font-medium">
                              {formatCurrency(year.balance)}
                            </td>
                            <td className="text-right py-2 px-3 text-green-600">
                              +{formatCurrency(year.interest)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <EmailCapture variant="inline" context="calculator" />
      <AffiliateCTA calculatorType="general" />
    </div>
  );
};

export default CompoundInterestCalculator;
