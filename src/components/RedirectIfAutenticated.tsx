import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ProtectedRouteProps } from "../interfaces";

const RedirectIfAuthenticated: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("token");
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return !isAuthenticated ? children : null;
};

export default RedirectIfAuthenticated;
