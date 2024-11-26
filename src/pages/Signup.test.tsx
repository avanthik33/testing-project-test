import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Signup from "./Signup";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Signup component", () => {
  it("should display 'signup' heading", () => {
    render(<Signup />, { wrapper: BrowserRouter });
    const heading = screen.getByRole("heading", { name: "Signup" });
    expect(heading).toBeInTheDocument();
  });

  it("should display signup form", () => {
    render(<Signup />, { wrapper: BrowserRouter });
    const emailAddress = screen.getByLabelText("Email address");
    expect(emailAddress).toBeInTheDocument();
    const password = screen.getByLabelText("Password");
    expect(password).toBeInTheDocument();
    const ConfirmPassword = screen.getByLabelText("Confirm password");
    expect(ConfirmPassword).toBeInTheDocument();
    const firstName = screen.getByLabelText("First name");
    expect(firstName).toBeInTheDocument();
    const lastName = screen.getByLabelText("Last name");
    expect(lastName).toBeInTheDocument();
    const phoneNo = screen.getByLabelText("Phone number (123-456-7890)");
    expect(phoneNo).toBeInTheDocument();
    const company = screen.getByLabelText("Company (Ex. Google)");
    expect(company).toBeInTheDocument();
    const button = screen.getByRole("button", { name: "Signup" });
    expect(button).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Signin here" });
    expect(link).toBeInTheDocument();
  });

  it("should check handlInputChange fn", async () => {
    userEvent.setup();
    render(<Signup />, { wrapper: BrowserRouter });

    const emailAddress = screen.getByLabelText("Email address");
    const password = screen.getByLabelText("Password");
    const ConfirmPassword = screen.getByLabelText("Confirm password");
    const firstName = screen.getByLabelText("First name");
    const lastName = screen.getByLabelText("Last name");
    const phoneNo = screen.getByLabelText("Phone number (123-456-7890)");
    const company = screen.getByLabelText("Company (Ex. Google)");

    await userEvent.type(emailAddress, "avanthik@gmail.com");
    await userEvent.type(password, "avanthik");
    await userEvent.type(ConfirmPassword, "avanthik");
    await userEvent.type(firstName, "avanthik");
    await userEvent.type(lastName, "m");
    await userEvent.type(phoneNo, "0099090909");
    await userEvent.type(company, "gppgle");

    expect(emailAddress).toHaveValue("avanthik@gmail.com");
    expect(password).toHaveValue("avanthik");
    expect(ConfirmPassword).toHaveValue("avanthik");
    expect(firstName).toHaveValue("avanthik");
    expect(lastName).toHaveValue("m");
    expect(phoneNo).toHaveValue("0099090909");
    expect(company).toHaveValue("gppgle");
  });
});
