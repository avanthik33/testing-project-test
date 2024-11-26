import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import * as useProduct from "../../hooks/useProduct";
import Home from "./Home";

describe("Home component", () => {
  it("should show add product heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { name: "Add Product" });
    expect(heading).toBeInTheDocument();
  });

  it("should show the addproduct form", () => {
    render(<Home />);

    const name = screen.getByLabelText("Product Name");
    const description = screen.getByLabelText("Description");
    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    const addButton = screen.getByRole("button", { name: "Add Product" });
    expect(addButton).toBeInTheDocument();
  });

  it("should check handlInputChange fn", async () => {
    userEvent.setup();
    render(<Home />);

    const nameField = screen.getByLabelText("Product Name");
    const descriptionField = screen.getByLabelText("Description");

    await userEvent.type(nameField, "product1");
    await userEvent.type(descriptionField, "product 1 description");

    expect(nameField).toHaveValue("product1");
    expect(descriptionField).toHaveValue("product 1 description");
  });

  it("should submit the form ", async () => {
    const mockAddFn = vi.fn();
    userEvent.setup();
    vi.spyOn(useProduct, "useProduct").mockReturnValue({
      loading: false,
      error: "",
      addProduct: mockAddFn,
    });
    render(<Home />);
    const button = screen.getByRole("button", { name: "Add Product" });
    const nameFiled = screen.getByLabelText("Product Name");
    const descriptionField = screen.getByLabelText("Description");
    await userEvent.click(button);
    expect(mockAddFn).toHaveBeenCalledTimes(1);

    expect(nameFiled).toHaveValue("");
    expect(descriptionField).toHaveValue("");
  });

  it("should show error when there is an error", async () => {
    const mockAddfn = vi.fn();
    vi.spyOn(useProduct, "useProduct").mockReturnValue({
      loading: true,
      error: "somthing error",
      addProduct: mockAddfn,
    });
    userEvent.setup();
    render(<Home />);
    const button = screen.getByRole("button", { name: "Add Product" });
    await userEvent.click(button);
    const errorMessage = screen.getByText("somthing error");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should disable the add button when loading", async () => {
    const mockFn = vi.fn();
    vi.spyOn(useProduct, "useProduct").mockReturnValue({
      loading: true,
      addProduct: mockFn,
      error: "",
    });
    userEvent.setup();
    render(<Home />);
    const button = screen.getByRole("button", { name: /add product/i });
    await userEvent.click(button);
    expect(button).toBeDisabled();
  });
});
