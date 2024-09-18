import { InterestPaidIntervals, TermDepositResult } from "../types/calculator";

interface CalculateTermDepositProps {
  principal: number;
  termYears: number;
  termMonths: number;
  interestRatePercentPerAnnum: number;
  interestFrequency: InterestPaidIntervals;
}

export function calculateTermDeposit(
  props: CalculateTermDepositProps,
): TermDepositResult {
  const {
    principal,
    termYears,
    termMonths,
    interestRatePercentPerAnnum,
    interestFrequency,
  } = props;

  const termInMonths = termYears * 12 + termMonths;

  if (termInMonths < 1) {
    throw new Error("Term must be at least 1 month");
  }

  if (principal <= 0) {
    throw new Error("Principal must be greater than 0");
  }

  if (interestRatePercentPerAnnum < 0) {
    throw new Error("Interest rate must be greater than or equal to 0");
  }

  const finalBalance = calculateFinalBalance({
    principal,
    interestRatePercentPerAnnum,
    termInMonths,
    interestFrequency,
  });

  const interestEarned = finalBalance - principal;

  return { finalBalance, interestEarned };
}

interface CalculateFinalBalanceProps {
  principal: number;
  interestRatePercentPerAnnum: number;
  termInMonths: number;
  interestFrequency: InterestPaidIntervals;
}

function calculateFinalBalance(props: CalculateFinalBalanceProps): number {
  const {
    principal,
    interestRatePercentPerAnnum,
    termInMonths,
    interestFrequency,
  } = props;
  const periodsInYear = 12;
  const interestRatePerPeriod = interestRatePercentPerAnnum / 100; // interest rate as a decimal value (e.g. 5[percent] => 0.05)

  let compoundingPeriods: number;
  let ratePerCompoundingPeriod: number;

  // Determine compounding periods and rate based on interest payout frequency
  switch (interestFrequency) {
    case InterestPaidIntervals.Monthly:
      compoundingPeriods = termInMonths;
      ratePerCompoundingPeriod = interestRatePerPeriod / periodsInYear;
      break;
    case InterestPaidIntervals.Quarterly:
      compoundingPeriods = Math.floor(termInMonths / 3);
      ratePerCompoundingPeriod = interestRatePerPeriod / 4;
      break;
    case InterestPaidIntervals.Annually:
      compoundingPeriods = Math.floor(termInMonths / periodsInYear);
      ratePerCompoundingPeriod = interestRatePerPeriod;
      break;
    case InterestPaidIntervals.AtMaturity:
      compoundingPeriods = 1;
      ratePerCompoundingPeriod =
        interestRatePerPeriod * (termInMonths / periodsInYear);
      break;
  }

  // Calculate final balance using the compound interest formula
  // Rounds down to the nearest integer (dollar) to match Bendigo Bank's calculator
  const finalBalance = Math.round(
    principal * Math.pow(1 + ratePerCompoundingPeriod, compoundingPeriods),
  );

  return finalBalance;
}
