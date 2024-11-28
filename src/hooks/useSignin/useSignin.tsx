import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinFormData } from "../../interfaces";

export const useSignin = ({ email, password }: signinFormData) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signin = async () => {
    const Api = `${import.meta.env.VITE_USER_LOGIN_API}`;
    try {
      setLoading(true);
      const response = await axios.post(Api, { email, password });
      if (response.data.status === "success") {
        setError("");
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/home", { replace: true });
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data.message
            ? error.response.data?.message
            : "server error"
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return { signin, loading, error };
};
