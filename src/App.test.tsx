import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders calculator", () => {
  render(<App />);
  const principalInputLabel = screen.getByText("Principal");
  expect(principalInputLabel).toBeInTheDocument();
});
