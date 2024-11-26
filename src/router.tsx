import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuthenticated from "./components/RedirectIfAutenticated";
import Signin from "./pages/Signin/SIgnin";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";

export const router = createBrowserRouter([
  {
    index: true,
    element: (
      <RedirectIfAuthenticated>
        <Signin />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "signup",
    element: (
      <RedirectIfAuthenticated>
        <Signup />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
