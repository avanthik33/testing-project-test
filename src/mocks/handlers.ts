import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:3001/user/register", () => {
    return HttpResponse.json(
      {
        status: "success",
        message: "user signup success",
      },
      { status: 200 }
    );
  }),
  http.post("http://localhost:3001/user/login", () => {
    return HttpResponse.json(
      {
        status: "success",
        message: "signin successfull",
        token: "helloThisIsTokenForLogin1234",
      },
      { status: 200 }
    );
  }),
];
