import { useState, useEffect } from 'react';
import type { Currency } from './types/currency';
import type { CalculatorInputs, CalculatorResults } from './types/calculator';
import { calculateCompoundInterest } from './utils/compound-calculations';
import { useEmbedMode } from './hooks/useEmbedMode';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Chart } from './components/Chart';

function App() {
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [currency, setCurrency] = useState<Currency>('EUR');
  const { isEmbedded } = useEmbedMode();

  useEffect(() => {
    if (isEmbedded) {
      document.documentElement.setAttribute('data-embedded', 'true');
    }
  }, [isEmbedded]);

  const handleCalculate = (inputs: CalculatorInputs) => {
    const calculated = calculateCompoundInterest(
      inputs.principal,
      inputs.annualRate,
      inputs.compoundingFrequency,
      inputs.years,
      inputs.monthlyContribution
    );
    setResults(calculated);
  };

  return (
    <div className={isEmbedded ? '' : 'min-h-screen bg-gray-50'}>
      {!isEmbedded && (
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4 mb-2">
              <img
                src="/compound-interest-calculator/logo-light.png"
                alt="Wealthy Parrot Logo"
                className="h-10 w-10"
              />
              <h1 className="text-3xl font-bold text-gray-900">Compound Interest Calculator</h1>
            </div>
            <p className="text-gray-600 ml-14">
              See how your investments grow with compound interest
            </p>
          </div>
        </header>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <CalculatorForm
              onCalculate={handleCalculate}
              currency={currency}
              onCurrencyChange={setCurrency}
            />
          </div>

          <div>
            <ResultsDisplay results={results} currency={currency} />
            {results && <Chart data={results.yearlyBreakdown} currency={currency} />}
          </div>
        </div>
      </div>

      {!isEmbedded && (
        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
            <p>
              Open source project by{' '}
              <a
                href="https://www.wealthyparrot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Wealthy Parrot
              </a>
              {' | '}
              <a
                href="https://github.com/wealthyparrot/compound-interest-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View on GitHub
              </a>
              {' | '}
              <a
                href="https://ko-fi.com/wealthyparrot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Support on Ko-fi
              </a>
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
