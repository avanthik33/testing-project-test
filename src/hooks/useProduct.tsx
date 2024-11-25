import axios from "axios";
import { useEffect, useState } from "react";

export const useProduct = ({ formData }) => {
  console.log("This is proops:", formData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      const Api = "http://localhost:3001/products/viewAll";
      try {
        setLoading(true);
        const response = await axios.get(Api, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.status === "success") {
          setError("");
          setData(response.data?.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response
              ? error.response.data.message
              : "somthing went wrong in fetching products"
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async () => {
    const Api = "http://localhost:3001/products/addProduct";
    try {
      setLoading(true);

      const response = await axios.post(Api, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === "success") {
        setError("");
        alert("successfully added");
      } else {
        setError("Adding product failed. Please try again later");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response
            ? error.response.data.message
            : "somthing went wrong in fetching products"
        );
      } else {
        setError("unexpected error occured. Please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  return { addProduct, loading, error, data };
};
