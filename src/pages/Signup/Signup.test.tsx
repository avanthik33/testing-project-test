import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Signup from "./Signup";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import * as signupHook from "../../hooks/useSignup/useSignup";

describe("Signup component", () => {
  const renderSignup = () => {
    render(<Signup />, { wrapper: BrowserRouter });
  };

  const labelNames = [
    "Email address",
    "Password",
    "Confirm password",
    "First name",
    "Phone number",
  ];

  it("should display 'signup' heading", () => {
    renderSignup();

    const heading = screen.getByRole("heading", { name: "Signup" });
    expect(heading).toBeInTheDocument();
  });

  it("should display signup form", () => {
    renderSignup();

    labelNames.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
    const button = screen.getByRole("button", { name: "Signup" });
    expect(button).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Signin here" });
    expect(link).toBeInTheDocument();
  });

  it("should check handlInputChange fn", async () => {
    userEvent.setup();
    renderSignup();

    const inputText = [
      "avanthik@gmail.com",
      "avanthik",
      "avanthik",
      "avanthik",
      "0099090909",
    ];

    for (let i = 0; i < labelNames.length; i++) {
      const item = screen.getByLabelText(labelNames[i]);
      await userEvent.type(item, inputText[i]);
      expect(item).toHaveValue(inputText[i]);
    }
  });

  it("should not submit signup form when not validated", async () => {
    const mockSignup = vi.fn();
    vi.spyOn(signupHook, "useSignup").mockReturnValue({
      error: "",
      loading: false,
      signup: mockSignup,
    });
    userEvent.setup();
    renderSignup();

    const incorrectInputs = ["h", "h", "av", "09099", "avanthik@j"];
    for (let i = 0; i < labelNames.length; i++) {
      const item = screen.getByLabelText(labelNames[i]);
      await userEvent.type(item, incorrectInputs[i]);
    }
    const form = screen.getByRole("form");
    await fireEvent.submit(form);
    expect(mockSignup).not.toHaveBeenCalled();
  });

  it("should submit signup form when validated", async () => {
    const mockSignup = vi.fn();
    vi.spyOn(signupHook, "useSignup").mockReturnValue({
      error: "",
      loading: false,
      signup: mockSignup,
    });
    userEvent.setup();
    renderSignup();

    const inputText = [
      "avanthik@gmail.com",
      "avanthik",
      "avanthik",
      "avanthik",
      "0099090909",
    ];
    for (let i = 0; i < labelNames.length; i++) {
      const item = screen.getByLabelText(labelNames[i]);
      await userEvent.type(item, inputText[i]);
    }
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
    renderSignup();

    for (let i = 0; i < labelNames.length; i++) {
      const item = screen.getByLabelText(labelNames[i]);
      await fireEvent.change(item, { target: { value: "" } });
    }
    const form = screen.getByRole("form");
    const button = screen.getByRole("button");
    const progressBar = screen.getByRole("progressbar");
    expect(button).toBeDisabled();
    expect(progressBar).toBeInTheDocument();
    await fireEvent.submit(form);
    expect(mockSignup).not.toHaveBeenCalled();
  });
});
