import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import * as customHook from "../../hooks/useSignin/useSignin";
import userEvent from "@testing-library/user-event";
import Signin from "./SIgnin";

describe("Signin component", () => {
  const renderSignin = () => {
    render(<Signin />, { wrapper: BrowserRouter });
  };

  it("should show heading 'Sign in to our platform'", () => {
    renderSignin();
    const heading = screen.getByRole("heading", {
      name: "Sign in to our platform",
    });
    expect(heading).toBeInTheDocument();
  });

  it("should display the singin form", () => {
    renderSignin();

    const emailField = screen.getByLabelText("Your email");
    expect(emailField).toBeInTheDocument();

    const passwordField = screen.getByLabelText("Your password");
    expect(passwordField).toBeInTheDocument();

    const button = screen.getByRole("button", {
      name: "Login to your account",
    });
    expect(button).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Create account" });
    expect(link).toBeInTheDocument();
  });

  it("should submit form ", async () => {
    const mockAddpro = vi.fn();
    vi.spyOn(customHook, "useSignin").mockReturnValue({
      loading: false,
      error: "somthing error",
      signin: mockAddpro,
    });
    renderSignin();

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
    renderSignin();

    const signinForm = screen.getByRole("form");
    await fireEvent.submit(signinForm);

    expect(screen.getByText("somthing error")).toBeInTheDocument();

    const emailField = screen.getByLabelText("Your email");
    expect(emailField).toHaveValue("");
    const passwordField = screen.getByLabelText("Your password");
    expect(passwordField).toHaveValue("");
  });

  it("should disable button when loading ", async () => {
    const mockSignin = vi.fn();
    vi.spyOn(customHook, "useSignin").mockReturnValue({
      loading: true,
      error: "somthing error",
      signin: mockSignin,
    });
    renderSignin();

    const signinForm = screen.getByRole("form");
    const button = screen.getByRole("button");
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(button).toBeDisabled();
    await fireEvent.submit(signinForm);
    expect(mockSignin).toHaveBeenCalled();
  });

  it("should check handlInputChange fn", async () => {
    userEvent.setup();
    renderSignin();

    const emailField = screen.getByLabelText("Your email");
    await userEvent.type(emailField, "product1");
    expect(emailField).toHaveValue("product1");

    const passwordField = screen.getByLabelText("Your password");
    await userEvent.type(passwordField, "product 1 description");
    expect(passwordField).toHaveValue("product 1 description");
  });

  it("should disable the button when user not typed yet", async () => {
    const mockSignin = vi.fn();
    vi.spyOn(customHook, "useSignin").mockReturnValue({
      loading: false,
      error: "",
      signin: mockSignin,
    });
    renderSignin();
    screen.debug();

    const emailField = screen.getByLabelText("Your email");
    await fireEvent.change(emailField, { target: { value: "" } });

    const passwordField = screen.getByLabelText("Your password");
    await fireEvent.change(passwordField, { target: { value: "" } });

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    await fireEvent.change(emailField, { target: { value: "hello" } });
    await fireEvent.change(passwordField, { target: { value: "hello" } });
    expect(button).not.toBeDisabled();
  });
});
