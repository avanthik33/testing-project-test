import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Signup from "./Signup";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import * as signupHook from "../../hooks/useSignup";

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
    const phoneNo = screen.getByLabelText("Phone number");
    expect(phoneNo).toBeInTheDocument();
    const company = screen.getByLabelText("Company");
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
    const phoneNo = screen.getByLabelText("Phone number");
    const company = screen.getByLabelText("Company");

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

  it("should display error message when confirm passworn != password", async () => {
    const alertFn = vi.fn();
    global.alert = alertFn;
    userEvent.setup();
    render(<Signup />, { wrapper: BrowserRouter });
    const password = screen.getByLabelText("Password");
    const ConfirmPassword = screen.getByLabelText("Confirm password");
    const form = screen.getByRole("form");

    await userEvent.type(password, "avanthik");
    await userEvent.type(ConfirmPassword, "wrong");
    await fireEvent.submit(form);
    expect(alertFn).toHaveBeenCalledWith(
      "password and confirm password in not match!"
    );
  });

  it("should not submit signup form when not validated", async () => {
    const mockSignup = vi.fn();
    vi.spyOn(signupHook, "useSignup").mockReturnValue({
      error: "",
      loading: false,
      signup: mockSignup,
    });
    userEvent.setup();
    render(<Signup />, { wrapper: BrowserRouter });

    const password = screen.getByLabelText("Password");
    const firstName = screen.getByLabelText("First name");
    const phoneNo = screen.getByLabelText("Phone number");
    const ConfirmPassword = screen.getByLabelText("Confirm password");
    const emailAddress = screen.getByLabelText("Email address");

    await userEvent.type(password, "h");
    await userEvent.type(ConfirmPassword, "h");
    await userEvent.type(firstName, "av");
    await userEvent.type(phoneNo, "09099");
    await userEvent.type(emailAddress, "avanthik@j");

    const form = screen.getByRole("form");
    await fireEvent.submit(form);
    expect(mockSignup).not.toHaveBeenCalledTimes(1);
  });

  it("should submit signup form when validated", async () => {
    const mockSignup = vi.fn();
    vi.spyOn(signupHook, "useSignup").mockReturnValue({
      error: "",
      loading: false,
      signup: mockSignup,
    });
    userEvent.setup();
    render(<Signup />, { wrapper: BrowserRouter });

    const password = screen.getByLabelText("Password");
    const firstName = screen.getByLabelText("First name");
    const phoneNo = screen.getByLabelText("Phone number");
    const emailAddress = screen.getByLabelText("Email address");
    const ConfirmPassword = screen.getByLabelText("Confirm password");

    await userEvent.type(password, "avanthik");
    await userEvent.type(ConfirmPassword, "avanthik");
    await userEvent.type(firstName, "avanthik");
    await userEvent.type(phoneNo, "0000999909");
    await userEvent.type(emailAddress, "avnthik@gmail.com");

    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();

    const form = screen.getByRole("form");
    await fireEvent.submit(form);
    expect(mockSignup).toHaveBeenCalledTimes(1);
  });

  it("should the signup button disabled when no input or loading", async () => {
    const mockSignup = vi.fn();
    vi.spyOn(signupHook, "useSignup").mockReturnValue({
      error: "",
      loading: true,
      signup: mockSignup,
    });
    userEvent.setup();
    render(<Signup />, { wrapper: BrowserRouter });

    const password = screen.getByLabelText("Password");
    const firstName = screen.getByLabelText("First name");
    const phoneNo = screen.getByLabelText("Phone number");
    const emailAddress = screen.getByLabelText("Email address");
    const ConfirmPassword = screen.getByLabelText("Confirm password");

    fireEvent.change(password, { target: { value: "" } });
    fireEvent.change(firstName, { target: { value: "" } });
    fireEvent.change(phoneNo, { target: { value: "" } });
    fireEvent.change(emailAddress, { target: { value: "" } });
    fireEvent.change(ConfirmPassword, { target: { value: "" } });

    const form = screen.getByRole("form");
    const button = screen.getByRole("button");
    const progressBar = screen.getByRole("progressbar");
    expect(button).toBeDisabled();
    expect(progressBar).toBeInTheDocument();

    await fireEvent.submit(form);
    expect(mockSignup).not.toHaveBeenCalled();
  });
});
