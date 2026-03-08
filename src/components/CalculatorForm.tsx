import { useState } from 'react';
import type { Currency } from '../types/currency';
import type { CalculatorInputs, CompoundingFrequency } from '../types/calculator';
import { COMPOUNDING_FREQUENCIES } from '../types/calculator';
import { CurrencySelector } from './CurrencySelector';

interface CalculatorFormProps {
  onCalculate: (inputs: CalculatorInputs) => void;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export function CalculatorForm({ onCalculate, currency, onCurrencyChange }: CalculatorFormProps) {
  const [principal, setPrincipal] = useState<string>('10000');
  const [annualRate, setAnnualRate] = useState<string>('7');
  const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>(12);
  const [years, setYears] = useState<string>('10');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    const principalNum = parseFloat(principal);
    if (isNaN(principalNum) || principalNum < 0) {
      newErrors.principal = 'Initial investment must be 0 or greater';
    }

    const rateNum = parseFloat(annualRate);
    if (isNaN(rateNum) || rateNum < 0 || rateNum > 50) {
      newErrors.annualRate = 'Annual rate must be between 0% and 50%';
    }

    const yearsNum = parseFloat(years);
    if (isNaN(yearsNum) || yearsNum < 1 || yearsNum > 50) {
      newErrors.years = 'Investment period must be between 1 and 50 years';
    }

    const contributionNum = parseFloat(monthlyContribution);
    if (isNaN(contributionNum) || contributionNum < 0) {
      newErrors.monthlyContribution = 'Monthly contribution must be 0 or greater';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onCalculate({
      principal: parseFloat(principal),
      annualRate: parseFloat(annualRate) / 100, // Convert percentage to decimal
      compoundingFrequency,
      years: parseFloat(years),
      monthlyContribution: parseFloat(monthlyContribution),
      currency,
    });
  };

  const handleReset = () => {
    setPrincipal('10000');
    setAnnualRate('7');
    setCompoundingFrequency(12);
    setYears('10');
    setMonthlyContribution('500');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Compound Interest Calculator</h2>

      <CurrencySelector value={currency} onChange={onCurrencyChange} />

      <div className="mb-4">
        <label htmlFor="principal" className="block text-sm font-medium text-gray-700 mb-1">
          Initial Investment
        </label>
        <input
          type="number"
          id="principal"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            errors.principal ? 'border-error' : 'border-gray-300'
          }`}
          placeholder="10000"
          step="1"
        />
        {errors.principal && <p className="text-error text-sm mt-1">{errors.principal}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="annualRate" className="block text-sm font-medium text-gray-700 mb-1">
          Annual Interest Rate (%)
        </label>
        <input
          type="number"
          id="annualRate"
          value={annualRate}
          onChange={(e) => setAnnualRate(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            errors.annualRate ? 'border-error' : 'border-gray-300'
          }`}
          placeholder="7"
          step="0.1"
        />
        {errors.annualRate && <p className="text-error text-sm mt-1">{errors.annualRate}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="compoundingFrequency" className="block text-sm font-medium text-gray-700 mb-1">
          Compounding Frequency
        </label>
        <select
          id="compoundingFrequency"
          value={compoundingFrequency}
          onChange={(e) => setCompoundingFrequency(parseInt(e.target.value) as CompoundingFrequency)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {COMPOUNDING_FREQUENCIES.map((freq) => (
            <option key={freq.value} value={freq.value}>
              {freq.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="years" className="block text-sm font-medium text-gray-700 mb-1">
          Investment Period (years)
        </label>
        <input
          type="number"
          id="years"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            errors.years ? 'border-error' : 'border-gray-300'
          }`}
          placeholder="10"
          step="1"
        />
        {errors.years && <p className="text-error text-sm mt-1">{errors.years}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="monthlyContribution" className="block text-sm font-medium text-gray-700 mb-1">
          Monthly Contribution
        </label>
        <input
          type="number"
          id="monthlyContribution"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            errors.monthlyContribution ? 'border-error' : 'border-gray-300'
          }`}
          placeholder="500"
          step="1"
        />
        {errors.monthlyContribution && <p className="text-error text-sm mt-1">{errors.monthlyContribution}</p>}
        <p className="text-sm text-gray-500 mt-1">Optional: Set to 0 for no monthly contributions</p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Calculate
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
