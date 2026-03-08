import { useState } from 'react';
import type { Currency } from '../types/currency';
import type { CalculatorResults } from '../types/calculator';
import { formatCurrency, formatPercentage } from '../utils/formatting';

interface ResultsDisplayProps {
  results: CalculatorResults | null;
  currency: Currency;
}

export function ResultsDisplay({ results, currency }: ResultsDisplayProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  if (!results) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg shadow-md flex items-center justify-center min-h-[200px]">
        <p className="text-gray-500 text-center">
          Enter your investment details and click Calculate to see results
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Results</h2>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-success/10 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-600 mb-1">Final Amount</p>
          <p className="text-2xl font-bold text-success">
            {formatCurrency(results.finalAmount, currency)}
          </p>
        </div>

        <div className="bg-primary/10 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-600 mb-1">Total Interest</p>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(results.totalInterest, currency)}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-600 mb-1">Total Contributions</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(results.totalContributions, currency)}
          </p>
        </div>

        <div className="bg-warning/10 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-600 mb-1">Growth Rate</p>
          <p className="text-2xl font-bold text-warning">
            {formatPercentage(results.growthRate)}
          </p>
        </div>
      </div>

      {/* Yearly Breakdown Toggle */}
      <div className="border-t pt-4">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="w-full flex items-center justify-between py-2 px-4 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
        >
          <span className="font-medium text-gray-700">Year-by-Year Breakdown</span>
          <span className="text-gray-500">{showBreakdown ? '▼' : '▶'}</span>
        </button>

        {showBreakdown && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Year</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-700">Starting</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-700">Contributions</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-700">Interest</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.yearlyBreakdown.map((year) => (
                  <tr key={year.year} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{year.year}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(year.principal, currency)}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(year.contributions, currency)}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(year.interestEarned, currency)}</td>
                    <td className="px-4 py-2 text-right font-medium">{formatCurrency(year.totalAmount, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
