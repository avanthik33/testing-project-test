import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpFormData } from "../interfaces";

export interface useSignupData {
  username: string;
  email: string;
  password: string;
}

export const useSignup = ({ username, email, password }: SignUpFormData) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    const Api = "http://localhost:3001/user/register";

    try {
      setLoading(true);
      const response = await axios.post(Api, { username, email, password });
      console.log("response data: ", response.data);

      if (response.data?.status === "success") {
        setError("");
        navigate("/", { replace: true });
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data.message
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
