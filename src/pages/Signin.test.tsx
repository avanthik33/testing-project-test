import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Signin from "./SIgnin";
import { BrowserRouter } from "react-router-dom";

describe("Signin component", () => {
  it("should show heading 'Sign in to our platform'", () => {
    render(<Signin />, { wrapper: BrowserRouter });

    const heading = screen.getByRole("heading", {
      name: "Sign in to our platform",
    });
    expect(heading).toBeInTheDocument();
  });
});
