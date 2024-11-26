import axios from "axios";
import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";

export const useSignup = ({ formData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    const Api = "http://localhost:3001/user/register";

    try {
      setLoading(true);
      const response = await axios.post(Api, formData);

      if (response.data?.status === "success") {
        setError("");
        navigate("/", { replace: true });
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response
            ? error.response?.data.message
            : "somthing went wrong in signup"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, signup };
};

