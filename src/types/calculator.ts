export enum InterestPaidIntervals {
  Monthly = "Monthly",
  Quarterly = "Quarterly",
  Annually = "Annually",
  AtMaturity = "At Maturity",
}

export type TermDepositResult = {
  finalBalance: number;
  interestEarned: number;
};
