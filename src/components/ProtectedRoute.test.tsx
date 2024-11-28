import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter } from "react-router-dom";

describe("Protected route component", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("shuold show loading text when no logges user", () => {
    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>protected content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should not show loading when there is a logged user", () => {
    localStorage.setItem("token", "loginToken");
    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>protected content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
});
