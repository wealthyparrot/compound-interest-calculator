import type { Currency } from '../types/currency';
import { CURRENCIES } from '../types/currency';

interface CurrencySelectorProps {
  value: Currency;
  onChange: (currency: Currency) => void;
}

export function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  return (
    <div className="mb-4">
      <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
        Currency
      </label>
      <select
        id="currency"
        value={value}
        onChange={(e) => onChange(e.target.value as Currency)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        {CURRENCIES.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.symbol} {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
}
