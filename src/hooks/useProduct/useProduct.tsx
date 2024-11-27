import axios from "axios";
import { useState } from "react";
import { Products } from "../../interfaces";

export const useProduct = ({ name, description }: Products) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const addProduct = async () => {
    const Api = `${import.meta.env.VITE_API}products/addProduct`;
    try {
      setLoading(true);
      const response = await axios.post(
        Api,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setError("");
        alert("successfully added");
      } else {
        setError("Adding product failed. Please try again later");
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

  return { addProduct, loading, error };
};
