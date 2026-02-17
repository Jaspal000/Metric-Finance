import { useState, useEffect } from 'react';
import { Home, Percent, Calendar, Info, Wallet } from 'lucide-react';
import type { AustraliaHomeLoanInput, AustraliaHomeLoanResult } from '@/types';
import { calculateAustraliaHomeLoan } from '@/utils/calculations';
import { EmailCapture } from '@/components/EmailCapture';
import { AffiliateCTA } from '@/components/AffiliateCTA';

const AustraliaHomeLoanCalculator: React.FC = () => {
  const [input, setInput] = useState<AustraliaHomeLoanInput>({
    loanAmount: 600000,
    interestRate: 6.5,
    loanTerm: 30,
    repaymentFrequency: 'monthly',
    hasOffset: false,
    offsetBalance: 0,
  });

  const [result, setResult] = useState<AustraliaHomeLoanResult | null>(null);

  useEffect(() => {
    const calculated = calculateAustraliaHomeLoan(input);
    setResult(calculated);
  }, [input]);

  const frequencyLabels: Record<string, string> = {
    weekly: 'Weekly',
    fortnightly: 'Fortnightly',
    monthly: 'Monthly',
  };

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="metric-card p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-600" />
            Home Loan Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">A$</span>
                <input
                  type="number"
                  value={input.loanAmount}
                  onChange={(e) => setInput(prev => ({ ...prev, loanAmount: Number(e.target.value) }))}
                  className="metric-input pl-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Interest Rate (% p.a.)
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
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Loan Term
              </label>
              <select
                value={input.loanTerm}
                onChange={(e) => setInput(prev => ({ ...prev, loanTerm: Number(e.target.value) }))}
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
                Repayment Frequency
              </label>
              <select
                value={input.repaymentFrequency}
                onChange={(e) => setInput(prev => ({ ...prev, repaymentFrequency: e.target.value as any }))}
                className="metric-input"
              >
                <option value="monthly">Monthly</option>
                <option value="fortnightly">Fortnightly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>

            {/* Offset Account */}
            <div className="border border-slate-200 rounded-lg p-4">
              <label className="flex items-center gap-3 mb-3">
                <input
                  type="checkbox"
                  checked={input.hasOffset}
                  onChange={(e) => setInput(prev => ({ ...prev, hasOffset: e.target.checked }))}
                  className="w-5 h-5 text-blue-600 rounded border-slate-300"
                />
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-slate-400" />
                  <span className="font-medium text-slate-900">I have an offset account</span>
                </div>
              </label>
              
              {input.hasOffset && (
                <div className="mt-3 pl-8">
                  <label className="block text-sm text-slate-600 mb-1">
                    Offset Account Balance
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">A$</span>
                    <input
                      type="number"
                      value={input.offsetBalance}
                      onChange={(e) => setInput(prev => ({ ...prev, offsetBalance: Number(e.target.value) }))}
                      className="w-full px-3 py-2 pl-12 rounded-lg border border-slate-200"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Money in your offset reduces interest charged
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {result && (
            <>
              <div className="bg-slate-900 rounded-xl p-6 text-white">
                <p className="text-slate-400 text-sm mb-2">
                  {frequencyLabels[input.repaymentFrequency]} Repayment
                </p>
                <p className="text-4xl md:text-5xl font-bold mb-4">
                  A${result.repayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="w-4 h-4" />
                  {input.loanTerm} year term
                </div>
              </div>

              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Loan Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Loan Amount</span>
                    <span className="font-semibold text-slate-900">
                      A${input.loanAmount.toLocaleString()}
                    </span>
                  </div>
                  {input.hasOffset && input.offsetBalance > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-600">Offset Balance</span>
                      <span className="font-semibold text-green-600">
                        -A${input.offsetBalance.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Total Interest</span>
                    <span className="font-semibold text-slate-900">
                      A${result.totalInterest.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t-2 border-slate-200 bg-slate-50 px-3 rounded">
                    <span className="font-medium text-slate-900">Total Cost</span>
                    <span className="font-bold text-slate-900">
                      A${result.totalCost.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {input.hasOffset && input.offsetBalance > 0 && result.interestSaved > 0 && (
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <h4 className="font-medium text-green-900 mb-2">
                    Offset Account Savings
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-green-700">Interest Saved</p>
                      <p className="text-xl font-bold text-green-800">
                        A${result.interestSaved.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700">Time Saved</p>
                      <p className="text-xl font-bold text-green-800">
                        {result.timeSaved} months
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Australian Home Loan Features
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>Comparison rate:</strong> Includes fees and charges</li>
                  <li>• <strong>Offset accounts:</strong> Reduce interest payable</li>
                  <li>• <strong>Redraw facility:</strong> Access extra repayments</li>
                  <li>• <strong>Fortnightly payments:</strong> Pay off faster (26 vs 24 half-payments)</li>
                </ul>
              </div>

              {/* Payment Comparison */}
              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Payment Frequency Comparison
                </h3>
                <div className="space-y-2">
                  {(['monthly', 'fortnightly', 'weekly'] as const).map((freq) => {
                    const freqResult = calculateAustraliaHomeLoan({ ...input, repaymentFrequency: freq });
                    return (
                      <div key={freq} className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-slate-600 capitalize">{freq}</span>
                        <span className={`font-medium ${input.repaymentFrequency === freq ? 'text-blue-600' : 'text-slate-900'}`}>
                          A${freqResult.repayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          {input.repaymentFrequency === freq && ' (selected)'}
                        </span>
                      </div>
                    );
                  })}
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

export default AustraliaHomeLoanCalculator;
