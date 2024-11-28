import { describe, expect, it } from "vitest";
import { server } from "../../mocks/server";
import { http, HttpResponse } from "msw";
import { act, renderHook } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useSignin } from "./useSignin";

describe("useSignin hook", () => {
  it("should signin", async () => {
    const { result } = renderHook(
      () =>
        useSignin({
          email: "avanthik@gmail.com",
          password: "avanthik",
        }),
      { wrapper: BrowserRouter }
    );
    await act(async () => {
      await result.current.signin();
    });

    const token = localStorage.getItem("token");
    expect(token).toBe("helloThisIsTokenForLogin1234");
    expect(result.current.error).toBe("");
  });

  it("should show error message when there is a error", async () => {
    server.use(
      http.post(`${import.meta.env.VITE_USER_LOGIN_API}`, () => {
        return HttpResponse.json(
          {
            status: "error",
            message: "validation error",
          },
          { status: 400 }
        );
      })
    );

    const { result } = renderHook(
      () =>
        useSignin({
          email: "avanthik@gmail.com",
          password: "avanthik",
        }),
      { wrapper: BrowserRouter }
    );

    await act(async () => {
      await result.current.signin();
    });

    expect(result.current.error).toBe("validation error");
  });

  it("should show the error message 'Login failed. Please try again.'", async () => {
    server.use(
      http.post(`${import.meta.env.VITE_USER_LOGIN_API}`, () => {
        return HttpResponse.json({
          status: "error",
          message: "somthing error",
        });
      })
    );

    const { result } = renderHook(
      () =>
        useSignin({
          email: "avanthik@gmail.com",
          password: "avanthik",
        }),
      { wrapper: BrowserRouter }
    );

    await act(async () => {
      await result.current.signin();
    });

    expect(result.current.error).toBe("Login failed. Please try again.");
  });

  it("should display the error message when there is no message from server", async () => {
    server.use(
      http.post(`${import.meta.env.VITE_USER_LOGIN_API}`, () => {
        return HttpResponse.json({ status: "error" }, { status: 400 });
      })
    );

    const { result } = renderHook(
      () =>
        useSignin({
          email: "avanthik@gmail.com",
          password: "avanthik",
        }),
      { wrapper: BrowserRouter }
    );

    await act(async () => {
      await result.current.signin();
    });

    expect(result.current.error).toBe("server error");
  });
});
