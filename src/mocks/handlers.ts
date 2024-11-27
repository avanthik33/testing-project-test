import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(`${import.meta.env.VITE_API}user/register`, () => {
    return HttpResponse.json(
      {
        status: "success",
        message: "user signup success",
      },
      { status: 200 }
    );
  }),
  http.post(`${import.meta.env.VITE_API}user/login`, () => {
    return HttpResponse.json(
      {
        status: "success",
        message: "signin successfull",
        token: "helloThisIsTokenForLogin1234",
      },
      { status: 200 }
    );
  }),
  http.post(`${import.meta.env.VITE_API}products/addProduct`, () => {
    return HttpResponse.json(
      {
        status: "success",
        message: "successfully added new product",
      },
      { status: 200 }
    );
  }),
];
