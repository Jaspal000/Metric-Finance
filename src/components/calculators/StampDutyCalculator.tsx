import { useState, useEffect } from 'react';
import { Building, Info, Home, Building2 } from 'lucide-react';
import type { StampDutyInput, StampDutyResult } from '@/types';
import { calculateStampDuty } from '@/utils/calculations';
import { EmailCapture } from '@/components/EmailCapture';
import { AffiliateCTA } from '@/components/AffiliateCTA';

const StampDutyCalculator: React.FC = () => {
  const [input, setInput] = useState<StampDutyInput>({
    propertyPrice: 450000,
    isFirstTimeBuyer: false,
    isAdditionalProperty: false,
    isResidential: true,
  });

  const [result, setResult] = useState<StampDutyResult | null>(null);

  useEffect(() => {
    const calculated = calculateStampDuty(input);
    setResult(calculated);
  }, [input]);

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="metric-card p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-600" />
            Property Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Property Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">£</span>
                <input
                  type="number"
                  value={input.propertyPrice}
                  onChange={(e) => setInput(prev => ({ ...prev, propertyPrice: Number(e.target.value) }))}
                  className="metric-input pl-8"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={input.isFirstTimeBuyer}
                  onChange={(e) => setInput(prev => ({ 
                    ...prev, 
                    isFirstTimeBuyer: e.target.checked,
                    isAdditionalProperty: e.target.checked ? false : prev.isAdditionalProperty
                  }))}
                  className="w-5 h-5 text-blue-600 rounded border-slate-300"
                />
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="font-medium text-slate-900">First-time buyer</p>
                    <p className="text-sm text-slate-500">No previous property ownership</p>
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={input.isAdditionalProperty}
                  onChange={(e) => setInput(prev => ({ 
                    ...prev, 
                    isAdditionalProperty: e.target.checked,
                    isFirstTimeBuyer: e.target.checked ? false : prev.isFirstTimeBuyer
                  }))}
                  className="w-5 h-5 text-blue-600 rounded border-slate-300"
                />
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="font-medium text-slate-900">Additional property</p>
                    <p className="text-sm text-slate-500">Buy-to-let or second home</p>
                  </div>
                </div>
              </label>
            </div>

            {/* Rate Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Current SDLT Rates
              </h4>
              {input.isFirstTimeBuyer && input.propertyPrice <= 625000 ? (
                <div className="text-sm text-blue-800 space-y-1">
                  <div className="flex justify-between"><span>£0 - £425,000</span><span>0%</span></div>
                  <div className="flex justify-between"><span>£425,001 - £625,000</span><span>5%</span></div>
                  <div className="flex justify-between"><span>Over £625,000</span><span>Standard rates</span></div>
                </div>
              ) : input.isAdditionalProperty ? (
                <div className="text-sm text-blue-800 space-y-1">
                  <div className="flex justify-between"><span>£0 - £250,000</span><span>3%</span></div>
                  <div className="flex justify-between"><span>£250,001 - £925,000</span><span>8%</span></div>
                  <div className="flex justify-between"><span>£925,001 - £1.5M</span><span>13%</span></div>
                  <div className="flex justify-between"><span>Over £1.5M</span><span>15%</span></div>
                </div>
              ) : (
                <div className="text-sm text-blue-800 space-y-1">
                  <div className="flex justify-between"><span>£0 - £250,000</span><span>0%</span></div>
                  <div className="flex justify-between"><span>£250,001 - £925,000</span><span>5%</span></div>
                  <div className="flex justify-between"><span>£925,001 - £1.5M</span><span>10%</span></div>
                  <div className="flex justify-between"><span>Over £1.5M</span><span>12%</span></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {result && (
            <>
              <div className="bg-slate-900 rounded-xl p-6 text-white">
                <p className="text-slate-400 text-sm mb-2">Stamp Duty Payable</p>
                <p className="text-4xl md:text-5xl font-bold mb-2">
                  £{result.stampDuty.toLocaleString()}
                </p>
                <p className="text-slate-400 text-sm">
                  Effective rate: {result.effectiveRate}%
                </p>
              </div>

              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Tax Breakdown
                </h3>
                <div className="space-y-3">
                  {result.breakdown.map((band, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100">
                      <div>
                        <span className="text-slate-600">{band.band}</span>
                        <span className="text-slate-400 text-sm ml-2">@ {band.rate}%</span>
                      </div>
                      <span className="font-semibold text-slate-900">
                        £{Math.round(band.tax).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-3 border-t-2 border-slate-200 bg-slate-50 px-3 rounded">
                    <span className="font-medium text-slate-900">Total Stamp Duty</span>
                    <span className="font-bold text-slate-900">
                      £{result.stampDuty.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Total Purchase Cost
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Property Price</span>
                    <span className="font-semibold text-slate-900">
                      £{input.propertyPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Stamp Duty</span>
                    <span className="font-semibold text-slate-900">
                      £{result.stampDuty.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t-2 border-slate-200 bg-slate-50 px-3 rounded">
                    <span className="font-medium text-slate-900">Total Cost</span>
                    <span className="font-bold text-slate-900">
                      £{(input.propertyPrice + result.stampDuty).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {input.isFirstTimeBuyer && input.propertyPrice <= 625000 && (
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <h4 className="font-medium text-green-900 mb-2">
                    First-Time Buyer Relief Applied
                  </h4>
                  <p className="text-sm text-green-800">
                    You're saving on stamp duty with first-time buyer relief! 
                    Properties up to £425,000 pay no stamp duty.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <EmailCapture variant="inline" context="calculator" />
      <AffiliateCTA calculatorType="stamp-duty" />
    </div>
  );
};

export default StampDutyCalculator;
