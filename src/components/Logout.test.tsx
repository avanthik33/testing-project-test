import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Logout from "./Logout";
import { BrowserRouter } from "react-router-dom";

describe("Logout component", () => {
  it("should display logout button", () => {
    render(<Logout />, { wrapper: BrowserRouter });
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
