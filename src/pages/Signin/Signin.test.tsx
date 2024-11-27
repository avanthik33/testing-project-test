import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import * as customHook from "../../hooks/useSignin/useSignin";
import userEvent from "@testing-library/user-event";
import Signin from "./SIgnin";

describe("Signin component", () => {
  it("should show heading 'Sign in to our platform'", () => {
    render(<Signin />, { wrapper: BrowserRouter });
    const heading = screen.getByRole("heading", {
      name: "Sign in to our platform",
    });
    expect(heading).toBeInTheDocument();
  });

  it("should display the singin form", () => {
    render(<Signin />, { wrapper: BrowserRouter });
    const emailField = screen.getByLabelText("Your email");
    const passwordField = screen.getByLabelText("Your password");
    const button = screen.getByRole("button", {
      name: "Login to your account",
    });
    const link = screen.getByRole("link", { name: "Create account" });
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });

  it("should submit form ", async () => {
    const mockAddpro = vi.fn();
    vi.spyOn(customHook, "useSignin").mockReturnValue({
      loading: false,
      error: "somthing error",
      signin: mockAddpro,
    });
    render(<Signin />, { wrapper: BrowserRouter });

    const signinForm = screen.getByRole("form");
    await fireEvent.submit(signinForm);

    expect(mockAddpro).toHaveBeenCalledTimes(1);

    expect(screen.getByText("somthing error")).toBeInTheDocument();
  });

  it("should display error messages", async () => {
    const mockSignin = vi.fn();
    vi.spyOn(customHook, "useSignin").mockReturnValue({
      loading: false,
      error: "somthing error",
      signin: mockSignin,
    });
    render(<Signin />, { wrapper: BrowserRouter });

    const signinForm = screen.getByRole("form");
    await fireEvent.submit(signinForm);

    expect(screen.getByText("somthing error")).toBeInTheDocument();
  });

  it("should disable button when loading ", async () => {
    const mockSignin = vi.fn();
    vi.spyOn(customHook, "useSignin").mockReturnValue({
      loading: true,
      error: "somthing error",
      signin: mockSignin,
    });
    render(<Signin />, { wrapper: BrowserRouter });

    const signinForm = screen.getByRole("form");
    const button = screen.getByRole("button");
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(button).toBeDisabled();
    await fireEvent.submit(signinForm);
    expect(mockSignin).toHaveBeenCalled();
  });

  it("should check handlInputChange fn", async () => {
    userEvent.setup();
    render(<Signin />, { wrapper: BrowserRouter });

    const emailField = screen.getByLabelText("Your email");
    const passwordField = screen.getByLabelText("Your password");

    await userEvent.type(emailField, "product1");
    await userEvent.type(passwordField, "product 1 description");

    expect(emailField).toHaveValue("product1");
    expect(passwordField).toHaveValue("product 1 description");
  });

  it("should disable the button when user not typed yet", async () => {
    const mockSignin = vi.fn();
    vi.spyOn(customHook, "useSignin").mockReturnValue({
      loading: false,
      error: "",
      signin: mockSignin,
    });
    render(<Signin />, { wrapper: BrowserRouter });
    screen.debug();

    const emailField = screen.getByLabelText("Your email");
    const passwordField = screen.getByLabelText("Your password");
    const button = screen.getByRole("button");

    await fireEvent.change(emailField, { target: { value: "" } });
    await fireEvent.change(passwordField, { target: { value: "" } });
    expect(button).toBeDisabled();

    await fireEvent.change(emailField, { target: { value: "hello" } });
    await fireEvent.change(passwordField, { target: { value: "hello" } });
    expect(button).not.toBeDisabled();
  });
});
