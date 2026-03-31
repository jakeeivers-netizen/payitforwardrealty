'use client';

import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';

interface MortgageCalculatorProps {
  defaultPrice?: number;
}

const amortizationOptions = [10, 15, 20, 25, 30];
const frequencyOptions = [
  { value: 12, label: 'Monthly' },
  { value: 26, label: 'Bi-weekly' },
  { value: 52, label: 'Weekly' },
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
}

export default function MortgageCalculator({
  defaultPrice = 400000,
}: MortgageCalculatorProps) {
  const [homePrice, setHomePrice] = useState(defaultPrice);
  const [downPayment, setDownPayment] = useState(Math.round(defaultPrice * 0.2));
  const [interestRate, setInterestRate] = useState(5.5);
  const [amortization, setAmortization] = useState(25);
  const [frequency, setFrequency] = useState(12);

  const downPaymentPct = homePrice > 0 ? ((downPayment / homePrice) * 100).toFixed(1) : '0.0';

  const results = useMemo(() => {
    const principal = homePrice - downPayment;
    if (principal <= 0 || interestRate <= 0) {
      return { payment: 0, totalInterest: 0, totalCost: 0 };
    }

    const annualRate = interestRate / 100;
    // Canadian mortgage: semi-annual compounding
    const effectiveAnnualRate = Math.pow(1 + annualRate / 2, 2) - 1;
    const periodicRate = Math.pow(1 + effectiveAnnualRate, 1 / frequency) - 1;
    const numPayments = amortization * frequency;

    const payment =
      (principal * periodicRate * Math.pow(1 + periodicRate, numPayments)) /
      (Math.pow(1 + periodicRate, numPayments) - 1);

    const totalCost = payment * numPayments;
    const totalInterest = totalCost - principal;

    return { payment, totalInterest, totalCost };
  }, [homePrice, downPayment, interestRate, amortization, frequency]);

  const frequencyLabel = frequencyOptions.find((f) => f.value === frequency)?.label ?? 'Monthly';

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent';

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: '#146FB7' }}>
        <Calculator className="w-6 h-6 text-white" />
        <h2 className="text-lg font-bold text-white">Mortgage Calculator</h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Home Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  value={homePrice}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10) || 0;
                    setHomePrice(val);
                    setDownPayment(Math.round(val * 0.2));
                  }}
                  min={0}
                  step={5000}
                  className={`${inputClass} pl-7`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Down Payment{' '}
                <span className="text-gray-400 normal-case">({downPaymentPct}%)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(parseInt(e.target.value, 10) || 0)}
                  min={0}
                  max={homePrice}
                  step={5000}
                  className={`${inputClass} pl-7`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Interest Rate (%)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                min={0.01}
                max={25}
                step={0.05}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Amortization Period
              </label>
              <select
                value={amortization}
                onChange={(e) => setAmortization(parseInt(e.target.value, 10))}
                className={inputClass}
              >
                {amortizationOptions.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr} years
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Payment Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(parseInt(e.target.value, 10))}
                className={inputClass}
              >
                {frequencyOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col justify-center space-y-4">
            <div
              className="rounded-xl p-5 text-white text-center"
              style={{ backgroundColor: '#146FB7' }}
            >
              <p className="text-sm font-medium opacity-80 mb-1">{frequencyLabel} Payment</p>
              <p className="text-3xl font-bold">{formatCurrency(results.payment)}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 text-center" style={{ backgroundColor: '#f0f7ff' }}>
                <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                  Mortgage Amount
                </p>
                <p className="text-base font-bold" style={{ color: '#146FB7' }}>
                  {formatCurrency(homePrice - downPayment)}
                </p>
              </div>
              <div className="rounded-xl p-4 text-center" style={{ backgroundColor: '#f0f7ff' }}>
                <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                  Total Interest
                </p>
                <p className="text-base font-bold" style={{ color: '#146FB7' }}>
                  {formatCurrency(results.totalInterest)}
                </p>
              </div>
              <div className="col-span-2 rounded-xl p-4 text-center" style={{ backgroundColor: '#f0f7ff' }}>
                <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                  Total Cost of Mortgage
                </p>
                <p className="text-lg font-bold" style={{ color: '#1a1a1a' }}>
                  {formatCurrency(results.totalCost)}
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center">
              * Estimate only. Canadian semi-annual compounding. Does not include taxes, insurance or CMHC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
