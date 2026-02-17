import { useState, useEffect } from 'react';
import { Car, DollarSign, Percent, Calendar, TrendingDown } from 'lucide-react';
import type { CarLoanInput, CarLoanResult } from '@/types';
import { calculateCarLoan, formatCurrency } from '@/utils/calculations';
import { EmailCapture } from '@/components/EmailCapture';
import { AffiliateCTA } from '@/components/AffiliateCTA';

const CarLoanCalculator: React.FC = () => {
  const [input, setInput] = useState<CarLoanInput>({
    carPrice: 35000,
    downPayment: 5000,
    tradeInValue: 0,
    loanTerm: 60,
    interestRate: 6.5,
    salesTax: 7,
  });

  const [result, setResult] = useState<CarLoanResult | null>(null);

  useEffect(() => {
    const calculated = calculateCarLoan(input);
    setResult(calculated);
  }, [input]);

  const taxAmount = Math.round(input.carPrice * (input.salesTax / 100));

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="metric-card p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-600" />
            Vehicle Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Car Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.carPrice}
                  onChange={(e) => setInput(prev => ({ ...prev, carPrice: Number(e.target.value) }))}
                  className="metric-input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Down Payment
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.downPayment}
                  onChange={(e) => setInput(prev => ({ ...prev, downPayment: Number(e.target.value) }))}
                  className="metric-input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Trade-In Value
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.tradeInValue}
                  onChange={(e) => setInput(prev => ({ ...prev, tradeInValue: Number(e.target.value) }))}
                  className="metric-input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Sales Tax Rate (%)
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.salesTax}
                  onChange={(e) => setInput(prev => ({ ...prev, salesTax: Number(e.target.value) }))}
                  className="metric-input pl-10"
                  step="0.1"
                />
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Tax amount: {formatCurrency(taxAmount)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Interest Rate (APR %)
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.interestRate}
                  onChange={(e) => setInput(prev => ({ ...prev, interestRate: Number(e.target.value) }))}
                  className="metric-input pl-10"
                  step="0.1"
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
                <option value={36}>36 months (3 years)</option>
                <option value={48}>48 months (4 years)</option>
                <option value={60}>60 months (5 years)</option>
                <option value={72}>72 months (6 years)</option>
                <option value={84}>84 months (7 years)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {result && (
            <>
              <div className="bg-slate-900 rounded-xl p-6 text-white">
                <p className="text-slate-400 text-sm mb-2">Estimated Monthly Payment</p>
                <p className="text-4xl md:text-5xl font-bold mb-4">
                  {formatCurrency(result.monthlyPayment)}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="w-4 h-4" />
                  For {input.loanTerm} months
                </div>
              </div>

              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Loan Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Vehicle Price</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(input.carPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-green-600" />
                      Down Payment
                    </span>
                    <span className="font-semibold text-green-600">
                      -{formatCurrency(input.downPayment)}
                    </span>
                  </div>
                  {input.tradeInValue > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-600 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-green-600" />
                        Trade-In Value
                      </span>
                      <span className="font-semibold text-green-600">
                        -{formatCurrency(input.tradeInValue)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Sales Tax</span>
                    <span className="font-semibold text-slate-900">
                      +{formatCurrency(taxAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t-2 border-slate-200 bg-slate-50 px-3 rounded">
                    <span className="font-medium text-slate-900">Loan Amount</span>
                    <span className="font-bold text-slate-900">
                      {formatCurrency(result.loanAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Total Cost Breakdown
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-1">Total Interest</p>
                    <p className="text-xl font-semibold text-slate-900">
                      {formatCurrency(result.totalInterest)}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-1">Total Cost</p>
                    <p className="text-xl font-semibold text-slate-900">
                      {formatCurrency(result.totalCost)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Loan Comparison */}
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <h4 className="font-medium text-amber-900 mb-2">
                  Term Comparison at {input.interestRate}% APR
                </h4>
                <div className="text-sm text-amber-800 space-y-1">
                  <div className="flex justify-between">
                    <span>36 months:</span>
                    <span className="font-medium">
                      {formatCurrency(calculateCarLoan({ ...input, loanTerm: 36 }).monthlyPayment)}/mo
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>60 months:</span>
                    <span className="font-medium">
                      {formatCurrency(calculateCarLoan({ ...input, loanTerm: 60 }).monthlyPayment)}/mo
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>72 months:</span>
                    <span className="font-medium">
                      {formatCurrency(calculateCarLoan({ ...input, loanTerm: 72 }).monthlyPayment)}/mo
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <EmailCapture variant="inline" context="calculator" />
      <AffiliateCTA calculatorType="car" />
    </div>
  );
};

export default CarLoanCalculator;
