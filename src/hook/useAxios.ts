import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface UseAxiosProps {
  url: string;
  method: "get" | "post" | "put" | "delete";
  body?: any;
  headers?: Record<string, string>;
}

const useAxios = ({ url, method, body = null, headers }: UseAxiosProps) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const config: AxiosRequestConfig = {
        headers: headers || {},
      };

      if (method === "get") {
        console.log("Making GET request");
        const response = await axios[method](url, config);

        if (response.data?.status === "success") {
          setData(response.data.data);
          setError("");
        }
      } else {
        //post put delete
        const response = await axios[method](url, body);
        if (response.data?.status === "success") {
          setData(response.data);
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.error?.errors?.[0]?.msg ||
          err.response?.data?.message;
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (method === "get") {
      fetchData();
    }
  }, [method, url, body, headers]);

  const submitData = () => {
    if (["post", "put", "delete"].includes(method)) {
      fetchData();
    }
  };

  return { data, error, loading, submitData };
};

export default useAxios;
