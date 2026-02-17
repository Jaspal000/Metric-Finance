import { useState, useEffect } from 'react';
import { Home, DollarSign, Percent, Calendar } from 'lucide-react';
import type { MortgageInput, MortgageResult } from '@/types';
import { calculateMortgage, formatCurrency } from '@/utils/calculations';
import { EmailCapture } from '@/components/EmailCapture';
import { AffiliateCTA } from '@/components/AffiliateCTA';

const USMortgageCalculator: React.FC = () => {
  const [input, setInput] = useState<MortgageInput>({
    homePrice: 400000,
    downPayment: 80000,
    downPaymentPercent: 20,
    loanAmount: 320000,
    interestRate: 7.0,
    loanTerm: 30,
    propertyTax: 3600,
    homeInsurance: 1200,
    hoaFees: 0,
  });

  const [result, setResult] = useState<MortgageResult | null>(null);

  useEffect(() => {
    const calculated = calculateMortgage(input);
    setResult(calculated);
  }, [input]);

  const handleHomePriceChange = (value: number) => {
    const downPaymentPercent = input.downPaymentPercent;
    const downPayment = Math.round(value * (downPaymentPercent / 100));
    setInput(prev => ({
      ...prev,
      homePrice: value,
      downPayment,
      loanAmount: value - downPayment,
    }));
  };

  const handleDownPaymentPercentChange = (percent: number) => {
    const downPayment = Math.round(input.homePrice * (percent / 100));
    setInput(prev => ({
      ...prev,
      downPaymentPercent: percent,
      downPayment,
      loanAmount: prev.homePrice - downPayment,
    }));
  };

  const handleDownPaymentChange = (value: number) => {
    const percent = Math.round((value / input.homePrice) * 100 * 100) / 100;
    setInput(prev => ({
      ...prev,
      downPayment: value,
      downPaymentPercent: percent,
      loanAmount: prev.homePrice - value,
    }));
  };

  return (
    <div className="space-y-8">
      {/* Calculator Interface */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="metric-card p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-600" />
            Mortgage Details
          </h2>

          <div className="space-y-6">
            {/* Home Price */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Home Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.homePrice}
                  onChange={(e) => handleHomePriceChange(Number(e.target.value))}
                  className="metric-input pl-10"
                />
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Down Payment
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="number"
                    value={input.downPayment}
                    onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
                    className="metric-input pl-10"
                  />
                </div>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="number"
                    value={input.downPaymentPercent}
                    onChange={(e) => handleDownPaymentPercentChange(Number(e.target.value))}
                    className="metric-input pl-10"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            {/* Loan Amount Display */}
            <div className="bg-slate-50 rounded-lg p-4">
              <span className="text-sm text-slate-600">Loan Amount</span>
              <p className="text-2xl font-semibold text-slate-900">
                {formatCurrency(input.loanAmount)}
              </p>
            </div>

            {/* Interest Rate */}
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
                  step="0.1"
                />
              </div>
            </div>

            {/* Loan Term */}
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
                <option value={30}>30 years</option>
              </select>
            </div>

            {/* Property Tax */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Annual Property Tax
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.propertyTax}
                  onChange={(e) => setInput(prev => ({ ...prev, propertyTax: Number(e.target.value) }))}
                  className="metric-input pl-10"
                />
              </div>
            </div>

            {/* Home Insurance */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Annual Home Insurance
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.homeInsurance}
                  onChange={(e) => setInput(prev => ({ ...prev, homeInsurance: Number(e.target.value) }))}
                  className="metric-input pl-10"
                />
              </div>
            </div>

            {/* HOA Fees */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Monthly HOA Fees
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.hoaFees}
                  onChange={(e) => setInput(prev => ({ ...prev, hoaFees: Number(e.target.value) }))}
                  className="metric-input pl-10"
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
                <p className="text-slate-400 text-sm mb-2">Estimated Monthly Payment</p>
                <p className="text-4xl md:text-5xl font-bold mb-4">
                  {formatCurrency(result.totalMonthlyPayment)}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="w-4 h-4" />
                  Payoff by {result.payoffDate}
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Payment Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Principal & Interest</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(result.monthlyPrincipalInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Property Tax</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(result.monthlyPropertyTax)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Home Insurance</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(result.monthlyInsurance)}
                    </span>
                  </div>
                  {result.monthlyHOA > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-600">HOA Fees</span>
                      <span className="font-semibold text-slate-900">
                        {formatCurrency(result.monthlyHOA)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Loan Summary */}
              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Loan Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-1">Total Interest</p>
                    <p className="text-xl font-semibold text-slate-900">
                      {formatCurrency(result.totalInterestPaid)}
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
            </>
          )}
        </div>
      </div>

      {/* Email Capture */}
      <EmailCapture variant="inline" context="calculator" />

      {/* Affiliate CTA */}
      <AffiliateCTA calculatorType="mortgage" />
    </div>
  );
};

export default USMortgageCalculator;
