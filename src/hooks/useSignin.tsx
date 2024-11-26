import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignin = ({ formData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signin = async () => {
    const Api = "http://localhost:3001/user/login";
    try {
      setLoading(true);
      const response = await axios.post(Api, formData);

      if (response.data.status === "success") {
        setError("");
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        navigate("/home", { replace: true });
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response ? error.response.data?.message : "somthing went wrong"
        );
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  return { signin, loading, error };
};
