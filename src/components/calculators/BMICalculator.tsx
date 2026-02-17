import { useState, useEffect } from 'react';
import { Activity, Weight, Info } from 'lucide-react';
import type { BMIInput, BMIResult } from '@/types';
import { calculateBMI } from '@/utils/calculations';
import { EmailCapture } from '@/components/EmailCapture';
import { AffiliateCTA } from '@/components/AffiliateCTA';

const BMICalculator: React.FC = () => {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [input, setInput] = useState<BMIInput>({
    heightFt: 5,
    heightIn: 10,
    weight: 180,
    unit: 'imperial',
  });

  const [result, setResult] = useState<BMIResult | null>(null);

  useEffect(() => {
    const calculated = calculateBMI(input);
    setResult(calculated);
  }, [input]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight': return 'text-blue-600';
      case 'Normal weight': return 'text-green-600';
      case 'Overweight': return 'text-orange-600';
      case 'Obese': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'Underweight': return 'bg-blue-50';
      case 'Normal weight': return 'bg-green-50';
      case 'Overweight': return 'bg-orange-50';
      case 'Obese': return 'bg-red-50';
      default: return 'bg-slate-50';
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="metric-card p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Body Measurements
          </h2>

          <div className="space-y-6">
            {/* Unit Toggle */}
            <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => {
                  setUnit('imperial');
                  setInput(prev => ({ ...prev, unit: 'imperial' }));
                }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  unit === 'imperial'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Imperial (ft/lbs)
              </button>
              <button
                onClick={() => {
                  setUnit('metric');
                  setInput(prev => ({ ...prev, unit: 'metric' }));
                }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  unit === 'metric'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Metric (cm/kg)
              </button>
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Height
              </label>
              {unit === 'imperial' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">ft</span>
                    <input
                      type="number"
                      value={input.heightFt}
                      onChange={(e) => setInput(prev => ({ ...prev, heightFt: Number(e.target.value) }))}
                      className="metric-input pl-10"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">in</span>
                    <input
                      type="number"
                      value={input.heightIn}
                      onChange={(e) => setInput(prev => ({ ...prev, heightIn: Number(e.target.value) }))}
                      className="metric-input pl-10"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">cm</span>
                  <input
                    type="number"
                    value={input.heightFt * 100 + input.heightIn}
                    onChange={(e) => {
                      const cm = Number(e.target.value);
                      setInput(prev => ({ ...prev, heightFt: Math.floor(cm / 100), heightIn: cm % 100 }));
                    }}
                    className="metric-input pl-12"
                  />
                </div>
              )}
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Weight
              </label>
              <div className="relative">
                <Weight className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  value={input.weight}
                  onChange={(e) => setInput(prev => ({ ...prev, weight: Number(e.target.value) }))}
                  className="metric-input pl-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  {unit === 'imperial' ? 'lbs' : 'kg'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {result && (
            <>
              <div className={`rounded-xl p-6 ${getCategoryBg(result.category)}`}>
                <p className="text-slate-600 text-sm mb-2">Your BMI</p>
                <p className={`text-5xl md:text-6xl font-bold mb-2 ${getCategoryColor(result.category)}`}>
                  {result.bmi}
                </p>
                <p className={`text-xl font-medium ${getCategoryColor(result.category)}`}>
                  {result.category}
                </p>
              </div>

              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Healthy Weight Range
                </h3>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-2">
                    For your height, a healthy weight is:
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {result.healthyWeightLow} - {result.healthyWeightHigh} {unit === 'imperial' ? 'lbs' : 'kg'}
                  </p>
                </div>
              </div>

              <div className="metric-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  BMI Categories
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Underweight</span>
                    <span className="font-medium text-blue-600">Below 18.5</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 bg-green-50 px-2 rounded">
                    <span className="text-slate-600">Normal weight</span>
                    <span className="font-medium text-green-600">18.5 - 24.9</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">Overweight</span>
                    <span className="font-medium text-orange-600">25 - 29.9</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600">Obese</span>
                    <span className="font-medium text-red-600">30 and above</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900 mb-1">Important Note</h4>
                    <p className="text-sm text-amber-800">
                      BMI is a screening tool, not a diagnostic of body fatness or health. 
                      Consult a healthcare provider for personalized assessment.
                    </p>
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

export default BMICalculator;
