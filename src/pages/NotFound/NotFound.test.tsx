import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";
import { BrowserRouter } from "react-router-dom";

describe("Not found component", () => {
  it("should show 404 error message", () => {
    render(<NotFound />, { wrapper: BrowserRouter });
    const error404 = screen.getByRole("heading", { name: "404" });
    expect(error404).toBeInTheDocument();
  });
  it("should show paragraph message", () => {
    render(<NotFound />, { wrapper: BrowserRouter });
    const errorPara = screen.getByText(/Something's missing./i);
    expect(errorPara).toBeInTheDocument();
  });
  it("should show 'Sorry, we can't find that page'", () => {
    render(<NotFound />, { wrapper: BrowserRouter });
    const errorPara = screen.getByText(/Sorry, we can't find that page/i);
    expect(errorPara).toBeInTheDocument();
  });
  it("should show the navigation link", () => {
    render(<NotFound />, { wrapper: BrowserRouter });
    const link = screen.getByRole("link", { name: "Back to Homepage" });
    expect(link).toBeInTheDocument();
  });
});
