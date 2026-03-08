import type { Currency } from './currency';

export type CompoundingFrequency = 1 | 2 | 4 | 12 | 365;

export interface CalculatorInputs {
  principal: number;
  annualRate: number;
  compoundingFrequency: CompoundingFrequency;
  years: number;
  monthlyContribution: number;
  currency: Currency;
}

export interface CalculatorResults {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
  growthRate: number;
  yearlyBreakdown: YearlyProjection[];
}

export interface YearlyProjection {
  year: number;
  principal: number;
  contributions: number;
  interestEarned: number;
  totalAmount: number;
}

export interface CompoundingFrequencyOption {
  value: CompoundingFrequency;
  label: string;
}

export const COMPOUNDING_FREQUENCIES: CompoundingFrequencyOption[] = [
  { value: 1, label: 'Annually' },
  { value: 2, label: 'Semi-Annually' },
  { value: 4, label: 'Quarterly' },
  { value: 12, label: 'Monthly' },
  { value: 365, label: 'Daily' },
];
