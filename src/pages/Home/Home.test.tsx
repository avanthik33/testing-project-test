import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import * as useProduct from "../../hooks/useProduct/useProduct";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";

describe("Home component", () => {
  const renderHome = () => {
    render(<Home />, { wrapper: BrowserRouter });
  };

  it("should show add product heading", () => {
    renderHome();
    const heading = screen.getByRole("heading", { name: "Add Product" });
    expect(heading).toBeInTheDocument();
  });

  it("should show the addproduct form", () => {
    renderHome();
    const name = screen.getByLabelText("Product Name");
    expect(name).toBeInTheDocument();

    const description = screen.getByLabelText("Description");
    expect(description).toBeInTheDocument();

    const addButton = screen.getByRole("button", { name: "Add Product" });
    expect(addButton).toBeInTheDocument();
  });

  it("should check handlInputChange fn", async () => {
    userEvent.setup();
    renderHome();

    const nameField = screen.getByLabelText("Product Name");
    await userEvent.type(nameField, "product1");
    expect(nameField).toHaveValue("product1");

    const descriptionField = screen.getByLabelText("Description");
    await userEvent.type(descriptionField, "product 1 description");
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
    renderHome();

    const nameFiled = screen.getByLabelText("Product Name");
    const descriptionField = screen.getByLabelText("Description");

    await userEvent.type(nameFiled, "product1");
    await userEvent.type(descriptionField, "product 1 description");

    const button = screen.getByRole("button", { name: "Add Product" });
    await userEvent.click(button);

    expect(mockAddFn).toHaveBeenCalledTimes(1);
    expect(nameFiled).toHaveValue("");
    expect(descriptionField).toHaveValue("");
  });

  it("should show error when there is an error", async () => {
    const mockAddfn = vi.fn();
    vi.spyOn(useProduct, "useProduct").mockReturnValue({
      loading: false,
      error: "somthing error",
      addProduct: mockAddfn,
    });
    userEvent.setup();
    renderHome();
    
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
    renderHome();
    const button = screen.getByRole("button", { name: /add product/i });
    await userEvent.click(button);
    expect(button).toBeDisabled();
  });
});
