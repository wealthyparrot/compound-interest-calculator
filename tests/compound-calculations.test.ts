import { describe, it, expect } from 'vitest';
import {
  calculateCompoundInterest,
  calculateAPY,
  calculatePrincipalNeeded,
} from '../src/utils/compound-calculations';

describe('calculateCompoundInterest', () => {
  it('calculates simple interest correctly with no contributions', () => {
    const result = calculateCompoundInterest(
      10000, // $10,000 principal
      0.07, // 7% annual rate
      12, // Monthly compounding
      10, // 10 years
      0 // No monthly contributions
    );

    expect(result.finalAmount).toBeCloseTo(20097, -1);
    expect(result.totalContributions).toBe(0);
    expect(result.totalInterest).toBeCloseTo(10097, -1);
    expect(result.yearlyBreakdown).toHaveLength(11); // Year 0 through Year 10
  });

  it('handles monthly contributions correctly', () => {
    const result = calculateCompoundInterest(
      10000, // $10,000 principal
      0.07, // 7% annual rate
      12, // Monthly compounding
      10, // 10 years
      500 // $500 monthly contribution
    );

    expect(result.finalAmount).toBeGreaterThan(20096); // More than principal-only
    expect(result.totalContributions).toBe(60000); // $500 * 12 months * 10 years
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.finalAmount).toBeCloseTo(107144, -1);
  });

  it('handles zero principal correctly', () => {
    const result = calculateCompoundInterest(
      0, // No initial investment
      0.07,
      12,
      10,
      500 // Only monthly contributions
    );

    expect(result.finalAmount).toBeGreaterThan(60000); // More than just contributions
    expect(result.totalContributions).toBe(60000);
    expect(result.totalInterest).toBeGreaterThan(0);
  });

  it('handles zero interest rate', () => {
    const result = calculateCompoundInterest(
      10000,
      0, // 0% interest
      12,
      10,
      500
    );

    expect(result.finalAmount).toBe(70000); // Just principal + contributions
    expect(result.totalContributions).toBe(60000);
    expect(result.totalInterest).toBe(0);
  });

  it('handles one year investment', () => {
    const result = calculateCompoundInterest(
      10000,
      0.07,
      12,
      1, // Just 1 year
      500
    );

    expect(result.yearlyBreakdown).toHaveLength(2); // Year 0 and Year 1
    expect(result.totalContributions).toBe(6000); // $500 * 12
  });

  it('generates correct yearly breakdown', () => {
    const result = calculateCompoundInterest(
      10000,
      0.07,
      12,
      5,
      0
    );

    expect(result.yearlyBreakdown[0].year).toBe(0);
    expect(result.yearlyBreakdown[0].totalAmount).toBe(10000);
    expect(result.yearlyBreakdown[0].interestEarned).toBe(0);

    // Each year should have positive interest
    for (let i = 1; i < result.yearlyBreakdown.length; i++) {
      expect(result.yearlyBreakdown[i].interestEarned).toBeGreaterThan(0);
      expect(result.yearlyBreakdown[i].totalAmount).toBeGreaterThan(
        result.yearlyBreakdown[i - 1].totalAmount
      );
    }
  });
});

describe('calculateAPY', () => {
  it('calculates APY for different compounding frequencies', () => {
    const annualRate = 0.07;

    const apyAnnual = calculateAPY(annualRate, 1);
    const apyMonthly = calculateAPY(annualRate, 12);
    const apyDaily = calculateAPY(annualRate, 365);

    expect(apyAnnual).toBeCloseTo(0.07, 10); // Same as nominal for annual
    expect(apyMonthly).toBeGreaterThan(apyAnnual); // Higher with more frequent compounding
    expect(apyDaily).toBeGreaterThan(apyMonthly); // Even higher with daily
    expect(apyDaily).toBeCloseTo(0.0725, 3); // ~7.25% APY
  });

  it('handles zero interest rate', () => {
    const apy = calculateAPY(0, 12);
    expect(apy).toBe(0);
  });
});

describe('calculatePrincipalNeeded', () => {
  it('calculates required principal to reach target', () => {
    const principal = calculatePrincipalNeeded(
      100000, // Target: $100,000
      0.07,
      12,
      10,
      500 // With $500 monthly contributions
    );

    // Verify by calculating forward
    const result = calculateCompoundInterest(
      principal,
      0.07,
      12,
      10,
      500
    );

    expect(result.finalAmount).toBeCloseTo(100000, -1);
  });

  it('handles target with no contributions', () => {
    const principal = calculatePrincipalNeeded(
      50000, // Target: $50,000
      0.07,
      12,
      10,
      0 // No contributions
    );

    const result = calculateCompoundInterest(
      principal,
      0.07,
      12,
      10,
      0
    );

    expect(result.finalAmount).toBeCloseTo(50000, -1);
    expect(principal).toBeCloseTo(24880, -1); // ~$24,880 needed
  });
});
