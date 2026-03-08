export type Currency = 'EUR' | 'USD' | 'GBP' | 'SEK' | 'NOK' | 'DKK';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
];
