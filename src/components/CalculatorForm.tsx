import React from "react";
import { InterestPaidIntervals, TermDepositResult } from "../types/calculator";
import { calculateTermDeposit } from "../services/calculatorService";

export const CalculatorForm = () => {
  const [result, setResult] = React.useState<TermDepositResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const principal = Number(
      (event.currentTarget.elements.namedItem("principal") as HTMLInputElement)
        .value
    );
    const termYears = Number(
      (event.currentTarget.elements.namedItem("termYears") as HTMLInputElement)
        .value
    );
    const termMonths = Number(
      (event.currentTarget.elements.namedItem("termMonths") as HTMLInputElement)
        .value
    );
    const interestRate = Number(
      (
        event.currentTarget.elements.namedItem(
          "interestRate"
        ) as HTMLInputElement
      ).value
    );
    const interestFrequency = (
      event.currentTarget.elements.namedItem(
        "interestFrequency"
      ) as HTMLSelectElement
    ).value as InterestPaidIntervals;

    try {
      const result = calculateTermDeposit({
        principal,
        termYears,
        termMonths,
        interestRatePercentPerAnnum: interestRate,
        interestFrequency,
      });

      console.log(result);
      setResult(result);
    } catch (e) {
      if (e instanceof Error) {
        setResult(null);
        setError(e.message);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    setError(null);
  };

  return (
    <form onChange={handleChange} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="principal">Principal</label>
        <input
          defaultValue={10000}
          required
          type="number"
          id="principal"
          name="principal"
        />
      </div>
      <div>
        <label htmlFor="termYears">Term (years)</label>
        <input
          type="number"
          min={0}
          defaultValue={3}
          id="termYears"
          name="termYears"
        />
      </div>
      <div>
        <label htmlFor="termMonths">Term (months)</label>
        <input
          type="number"
          min={0}
          max={11}
          id="termMonths"
          defaultValue={0}
          name="termMonths"
        />
      </div>
      <div>
        <label htmlFor="interestRate">Interest rate (% p.a)</label>
        <input
          required
          type="number"
          step={0.1}
          min={0}
          defaultValue={1.5}
          id="interestRate"
          name="interestRate"
        />
      </div>
      <div>
        <label htmlFor="interestFrequency">Interest paid</label>
        <select
          defaultValue={"Monthly"}
          id="interestFrequency"
          name="interestFrequency"
        >
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Annually">Annually</option>
          <option value="At Maturity">At Maturity</option>
        </select>
      </div>
      <button type="submit">Calculate</button>
      {result && (
        <div>
          <h2>Results</h2>
          <p>Final balance: ${result.finalBalance}</p>
          <p>Interest earned: ${result.interestEarned}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </form>
  );
};
