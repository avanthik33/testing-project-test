import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useProduct } from "./useProduct";
import { BrowserRouter } from "react-router-dom";
import { server } from "../../mocks/server";
import { http, HttpResponse } from "msw";

describe("useProduct hook", () => {
  it("should add product", async () => {
    const mockAlertFn = vi.fn();
    global.alert = mockAlertFn;
    const { result } = renderHook(
      () =>
        useProduct({
          name: "product 1",
          description: "product1 description",
        }),
      { wrapper: BrowserRouter }
    );

    await act(async () => {
      await result.current.addProduct();
    });

    expect(mockAlertFn).toHaveBeenCalledWith("successfully added");
    expect(result.current.error).toBe("");
  });

  it("should show error message when there is an error", async () => {
    server.use(
      http.post("http://localhost:3001/products/addProduct", () => {
        return HttpResponse.json({
          status: "error",
          message: "validation error",
        });
      })
    );

    const { result } = renderHook(
      () =>
        useProduct({
          name: "product 1",
          description: "product 1 desciption",
        }),
      { wrapper: BrowserRouter }
    );

    await act(async () => {
      await result.current.addProduct();
    });

    expect(result.current.error).toBe(
      "Adding product failed. Please try again later"
    );
  });

  it("should show the error from server", async () => {
    server.use(
      http.post("http://localhost:3001/products/addProduct", () => {
        return HttpResponse.json(
          {
            status: "error",
          },
          { status: 400 }
        );
      })
    );

    const { result } = renderHook(() =>
      useProduct({
        name: "product 1",
        description: "product 1 description",
      })
    );

    await act(async () => {
      await result.current.addProduct();
    });

    expect(result.current.error).toBe("server error");
  });
});
