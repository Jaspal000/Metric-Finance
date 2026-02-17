import { useState, useEffect } from 'react';
import { Home, Percent, Calendar, Info } from 'lucide-react';
import type { CanadaMortgageInput, CanadaMortgageResult } from '@/types';
import { calculateCanadaMortgage } from '@/utils/calculations';
import { EmailCapture } from '@/components/EmailCapture';
import { AffiliateCTA } from '@/components/AffiliateCTA';

const CanadaMortgageCalculator: React.FC = () => {
  const [input, setInput] = useState<CanadaMortgageInput>({
    homePrice: 750000,
    downPayment: 150000,
    interestRate: 5.5,
    amortization: 25,
    paymentFrequency: 'monthly',
    province: 'ON',
  });

  const [result, setResult] = useState<CanadaMortgageResult | null>(null);

  useEffect(() => {
    const calculated = calculateCanadaMortgage(input);
    setResult(calculated);
  }, [input]);

  const downPaymentPercent = (input.downPayment / input.homePrice) * 100;
  const minDownPayment = input.homePrice <= 500000 
    ? input.homePrice * 0.05
    : input.homePrice <= 1000000
    ? 25000 + (input.homePrice - 500000) * 0.10
    : input.homePrice * 0.20;

  const frequencyLabels: Record<string, string> = {
    monthly: 'Monthly',
    biweekly: 'Bi-weekly',
    weekly: 'Weekly',
  };

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="metric-card p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-600" />
            Mortgage Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Home Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">C$</span>
                <input
                  type="number"
                  value={input.homePrice}
                  onChange={(e) => setInput(prev => ({ ...prev, homePrice: Number(e.target.value) }))}
                  className="metric-input pl-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Down Payment
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">C$</span>
                <input
                  type="number"
                  value={input.downPayment}
                  onChange={(e) => setInput(prev => ({ ...prev, downPayment: Number(e.target.value) }))}
                  className="metric-input pl-12"
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-sm text-slate-500">{downPaymentPercent.toFixed(1)}%</span>
                <span className="text-sm text-slate-500">Min: C${Math.round(minDownPayment).toLocaleString()}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Interest Rate (%)
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.interestRate}
                  onChange={(e) => setInput(prev => ({ ...prev, interestRate: Number(e.target.value) }))}
                  className="metric-input pl-10"
                  step="0.01"
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Canadian mortgages use semi-annual compounding
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Amortization Period
              </label>
              <select
                value={input.amortization}
                onChange={(e) => setInput(prev => ({ ...prev, amortization: Number(e.target.value) }))}
                className="metric-input"
              >
                <option value={15}>15 years</option>
                <option value={20}>20 years</option>
                <option value={25}>25 years</option>
                <option value={30}>30 years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Payment Frequency
              </label>
              <select
                value={input.paymentFrequency}
                onChange={(e) => setInput(prev => ({ ...prev, paymentFrequency: e.target.value as any }))}
                className="metric-input"
              >
                <option value="monthly">Monthly (12/year)</option>
                <option value="biweekly">Bi-weekly (26/year)</option>
                <option value="weekly">Weekly (52/year)</option>
              </select>
            </div>

            {downPaymentPercent < 20 && (
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900 mb-1">CMHC Insurance Required</h4>
                    <p className="text-sm text-amber-800">
                      With less than 20% down, mortgage default insurance is required. 
                      This premium is added to your mortgage balance.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {result && (
            <>
              <div className="bg-slate-900 rounded-xl p-6 text-white">
                <p className="text-slate-400 text-sm mb-2">
                  {frequencyLabels[input.paymentFrequency]} Payment
                </p>
                <p className="text-4xl md:text-5xl font-bold mb-4">
                  C${result.payment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="w-4 h-4" />
                  {input.amortization} year amortization
                </div>
              </div>

              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Mortgage Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Home Price</span>
                    <span className="font-semibold text-slate-900">
                      C${input.homePrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Down Payment</span>
                    <span className="font-semibold text-green-600">
                      -C${input.downPayment.toLocaleString()}
                    </span>
                  </div>
                  {result.cmhcPremium > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-600">CMHC Premium</span>
                      <span className="font-semibold text-amber-600">
                        +C${result.cmhcPremium.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-3 border-t-2 border-slate-200 bg-slate-50 px-3 rounded">
                    <span className="font-medium text-slate-900">Total Mortgage</span>
                    <span className="font-bold text-slate-900">
                      C${result.loanAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Total Cost Over {input.amortization} Years
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-1">Total Interest</p>
                    <p className="text-xl font-semibold text-slate-900">
                      C${result.totalInterest.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-1">Total Cost</p>
                    <p className="text-xl font-semibold text-slate-900">
                      C${result.totalCost.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  Canadian Mortgage Facts
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Interest compounded semi-annually (not monthly)</li>
                  <li>• Terms typically 1-5 years, then renew</li>
                  <li>• Fixed and variable rate options available</li>
                  <li>• Stress test applies for qualification</li>
                </ul>
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

export default CanadaMortgageCalculator;
