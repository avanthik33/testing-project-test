import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSignup } from "./useSignup";
import { BrowserRouter } from "react-router-dom";
import { server } from "../../mocks/server";
import { http, HttpResponse } from "msw";

describe("UseSignup", () => {
  const userData = {
    username: "avanthik",
    email: "avanthik@gmail.com",
    password: "avanthik",
    phone: "908809000",
    confirmPassword: "avanthik",
  };

  it("should successfully signup with msw", async () => {
    const { result } = renderHook(() => useSignup(userData), {
      wrapper: BrowserRouter,
    });

    await act(async () => {
      await result.current.signup();
    });

    console.log(result.current);
    expect(result.current.error).toBe("");
    expect(result.current.loading).toBe(false);
  });

  it("Should handle signup failure with msw", async () => {
    server.use(
      http.post(`${import.meta.env.VITE_USER_REGISTER_API}`, () => {
        return HttpResponse.json(
          {
            status: "error",
            message: "internal server error",
          },
          { status: 500 }
        );
      })
    );

    const { result } = renderHook(() => useSignup(userData), {
      wrapper: BrowserRouter,
    });

    await act(async () => {
      await result.current.signup();
    });

    expect(result.current.error).toBe("internal server error");
  });

  it("should show error message 'Signup failed. Please try again.", async () => {
    server.use(
      http.post(`${import.meta.env.VITE_USER_REGISTER_API}`, () => {
        return HttpResponse.json({
          status: "error",
          message: "somthing error",
        });
      })
    );

    const { result } = renderHook(() => useSignup(userData), {
      wrapper: BrowserRouter,
    });

    await act(async () => {
      await result.current.signup();
    });

    expect(result.current.error).toBe("Signup failed. Please try again.");
  });

  it("should show error message when there is no message from the server", async () => {
    server.use(
      http.post(`${import.meta.env.VITE_USER_REGISTER_API}`, () => {
        return HttpResponse.json(
          { status: "error" },
          {
            status: 400,
          }
        );
      })
    );

    const { result } = renderHook(() => useSignup(userData), {
      wrapper: BrowserRouter,
    });

    await act(async () => {
      await result.current.signup();
    });

    expect(result.current.error).toBe("server error");
  });
});
