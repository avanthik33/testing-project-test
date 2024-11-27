import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Error from "./Error";

describe("Error component", () => {
  it("should display the error messgae", () => {
    const errorMessage = "somthing mistake";
    render(<Error message={errorMessage} />);

    const error = screen.getByText("somthing mistake");
    expect(error).toBeInTheDocument();
  });
});
