import { useState, useEffect } from 'react';
import { DollarSign, TrendingDown } from 'lucide-react';
import type { SalaryInput, SalaryResult } from '@/types';
import { calculateSalary, formatCurrency } from '@/utils/calculations';
import { EmailCapture } from '@/components/EmailCapture';
import { AffiliateCTA } from '@/components/AffiliateCTA';

const SalaryCalculator: React.FC = () => {
  const [input, setInput] = useState<SalaryInput>({
    annualSalary: 75000,
    payFrequency: 'biweekly',
    state: 'CA',
    filingStatus: 'single',
    allowances: 2,
  });

  const [result, setResult] = useState<SalaryResult | null>(null);

  useEffect(() => {
    const calculated = calculateSalary(input);
    setResult(calculated);
  }, [input]);

  const frequencyLabels: Record<string, string> = {
    weekly: 'Weekly',
    biweekly: 'Bi-weekly',
    semimonthly: 'Semi-monthly',
    monthly: 'Monthly',
  };

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="metric-card p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            Salary Information
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Annual Salary
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.annualSalary}
                  onChange={(e) => setInput(prev => ({ ...prev, annualSalary: Number(e.target.value) }))}
                  className="metric-input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Pay Frequency
              </label>
              <select
                value={input.payFrequency}
                onChange={(e) => setInput(prev => ({ ...prev, payFrequency: e.target.value as any }))}
                className="metric-input"
              >
                <option value="weekly">Weekly (52 paychecks)</option>
                <option value="biweekly">Bi-weekly (26 paychecks)</option>
                <option value="semimonthly">Semi-monthly (24 paychecks)</option>
                <option value="monthly">Monthly (12 paychecks)</option>
              </select>
            </div>

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
                <option value="married">Married</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {result && (
            <>
              <div className="bg-slate-900 rounded-xl p-6 text-white">
                <p className="text-slate-400 text-sm mb-2">Estimated Net Pay ({frequencyLabels[input.payFrequency]})</p>
                <p className="text-4xl md:text-5xl font-bold mb-2">
                  {formatCurrency(result.netPay)}
                </p>
                <p className="text-slate-400 text-sm">
                  Annual: {formatCurrency(result.annualNet)}
                </p>
              </div>

              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Paycheck Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Gross Pay</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(result.grossPay)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      Federal Tax
                    </span>
                    <span className="font-semibold text-red-600">
                      -{formatCurrency(result.federalTax)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      State Tax
                    </span>
                    <span className="font-semibold text-red-600">
                      -{formatCurrency(result.stateTax)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      FICA Tax
                    </span>
                    <span className="font-semibold text-red-600">
                      -{formatCurrency(result.ficaTax)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t-2 border-slate-200 bg-green-50 px-3 rounded">
                    <span className="font-medium text-slate-900">Net Pay</span>
                    <span className="font-bold text-green-700">
                      {formatCurrency(result.netPay)}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <EmailCapture variant="inline" context="calculator" />
      <AffiliateCTA calculatorType="general" />
    </div>
  );
};

export default SalaryCalculator;
