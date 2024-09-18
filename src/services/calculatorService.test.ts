import { InterestPaidIntervals } from "../types/calculator";
import { calculateTermDeposit } from "./calculatorService";

describe("calculatorService", () => {
  describe("calculateTermDeposit", () => {
    it("should calculate the final balance on a principal that generates interest for a set investment term with a pa interest rate and interest paid in quarterly intervals", () => {
      const principal = 10_000;
      const termYears = 3;
      const termMonths = 0;
      const interestRatePercentPerAnnum = 1.1;
      const interestFrequency = InterestPaidIntervals.Quarterly;
      const result = calculateTermDeposit({
        principal,
        termYears,
        termMonths,
        interestRatePercentPerAnnum,
        interestFrequency,
      });

      expect(result).toStrictEqual({
        finalBalance: 10_335,
        interestEarned: 335,
      });
    });

    it("should calculate the final balance on a principal that generates interest for a set investment term with a pa interest rate and interest paid in monthly intervals", () => {
      const principal = 10_000;
      const termYears = 3;
      const termMonths = 0;
      const interestRatePercentPerAnnum = 1.1;
      const interestFrequency = InterestPaidIntervals.Monthly;
      const result = calculateTermDeposit({
        principal,
        termYears,
        termMonths,
        interestRatePercentPerAnnum,
        interestFrequency,
      });

      expect(result).toStrictEqual({
        finalBalance: 10_335,
        interestEarned: 335,
      });
    });

    it("should calculate the final balance on a principal that generates interest for a set investment term with a pa interest rate and interest paid in annual intervals", () => {
      const principal = 10_000;
      const termYears = 3;
      const termMonths = 0;
      const interestRatePercentPerAnnum = 1.1;
      const interestFrequency = InterestPaidIntervals.Annually;
      const result = calculateTermDeposit({
        principal,
        termYears,
        termMonths,
        interestRatePercentPerAnnum,
        interestFrequency,
      });

      expect(result).toStrictEqual({
        finalBalance: 10_334,
        interestEarned: 334,
      });
    });

    it("should calculate the final balance on a principal that generates interest for a set investment term with a pa interest rate and interest paid at maturity", () => {
      const principal = 10_000;
      const termYears = 3;
      const termMonths = 0;
      const interestRatePercentPerAnnum = 1.1;
      const interestFrequency = InterestPaidIntervals.AtMaturity;
      const result = calculateTermDeposit({
        principal,
        termYears,
        termMonths,
        interestRatePercentPerAnnum,
        interestFrequency,
      });

      expect(result).toStrictEqual({
        finalBalance: 10_330,
        interestEarned: 330,
      });
    });

    it("should calculate the correct final balance for a large principal", () => {
      const principal = 1_500_000;
      const termYears = 3;
      const termMonths = 0;
      const interestRatePercentPerAnnum = 2;
      const interestFrequency = InterestPaidIntervals.Monthly;
      const result = calculateTermDeposit({
        principal,
        termYears,
        termMonths,
        interestRatePercentPerAnnum,
        interestFrequency,
      });

      expect(result).toStrictEqual({
        finalBalance: 1_592_675,
        interestEarned: 92_675,
      });
    });

    it("should calculate the correct final balance for a large principal with a high interest rate", () => {
      const principal = 1_500_000;
      const termYears = 3;
      const termMonths = 0;
      const interestRatePercentPerAnnum = 14.8;
      const interestFrequency = InterestPaidIntervals.Monthly;
      const result = calculateTermDeposit({
        principal,
        termYears,
        termMonths,
        interestRatePercentPerAnnum,
        interestFrequency,
      });

      expect(result).toStrictEqual({
        finalBalance: 2_332_054,
        interestEarned: 832_054,
      });
    });

    it("should calculate the correct final balance for a large principal with a high interest rate and a long term", () => {
      const principal = 1_500_000;
      const termYears = 4;
      const termMonths = 8;
      const interestRatePercentPerAnnum = 13.7;
      const interestFrequency = InterestPaidIntervals.Monthly;
      const result = calculateTermDeposit({
        principal,
        termYears,
        termMonths,
        interestRatePercentPerAnnum,
        interestFrequency,
      });

      expect(result).toStrictEqual({
        finalBalance: 2_832_547,
        interestEarned: 1_332_547,
      });
    });

    it("should throw an error if the term is less than 1 month", () => {
      const principal = 10_000;
      const termYears = 0;
      const termMonths = 0;
      const interestRatePercentPerAnnum = 1.1;
      const interestFrequency = InterestPaidIntervals.Quarterly;
      const result = () =>
        calculateTermDeposit({
          principal,
          termYears,
          termMonths,
          interestRatePercentPerAnnum,
          interestFrequency,
        });

      expect(result).toThrowError("Term must be at least 1 month");
    });

    it("should throw an error if the principal is less than 1", async () => {
      const principal = 0;
      const termYears = 3;
      const termMonths = 0;
      const interestRatePercentPerAnnum = 1.1;
      const interestFrequency = InterestPaidIntervals.Quarterly;
      const result = () =>
        calculateTermDeposit({
          principal,
          termYears,
          termMonths,
          interestRatePercentPerAnnum,
          interestFrequency,
        });

      expect(result).toThrowError("Principal must be greater than 0");
    });

    it("should throw an error if the pa interest rate is less than 0", () => {
      const principal = 10_000;
      const termYears = 3;
      const termMonths = 0;
      const interestRatePercentPerAnnum = -1.1;
      const interestFrequency = InterestPaidIntervals.Quarterly;
      const result = () =>
        calculateTermDeposit({
          principal,
          termYears,
          termMonths,
          interestRatePercentPerAnnum,
          interestFrequency,
        });

      expect(result).toThrowError(
        "Interest rate must be greater than or equal to 0",
      );
    });
  });
});
