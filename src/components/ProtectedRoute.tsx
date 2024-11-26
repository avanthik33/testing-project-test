import React, { useEffect } from "react";
import { ProtectedRouteProps } from "../interfaces";
import { useNavigate } from "react-router-dom";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const loggedUser = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser) {
      navigate("/", { replace: true });
    }
  }, [loggedUser, navigate]);

  if (!loggedUser) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
