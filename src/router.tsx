import { createBrowserRouter } from "react-router-dom";
import Signin from "./pages/SIgnin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  {
    index: true,
    element: <Signin />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "home",
    element: <Home />,
  },
]);
