import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type AxiosData = any; // Define a type for the data (or use a generic type if possible)

interface UseAxiosProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
}

const useAxios = ({
  url,
  method,
  body = null,
  headers = {},
}: UseAxiosProps) => {
  const [data, setData] = useState<AxiosData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setLoading(true);
        const config: AxiosRequestConfig = {
          headers,
          cancelToken: cancelTokenSource.token,
        };

        let response: AxiosResponse<AxiosData>;

        // Dynamically call the appropriate axios method based on the provided `method`
        response = await axios[method](url, body, config);

        setData(response.data);
        setError(null);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          setError(err.message || "An error occurred");
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function: Cancel the request when the component unmounts
    return () => {
      cancelTokenSource.cancel(
        "Request canceled due to component unmounting or re-rendering."
      );
    };
  }, [url, method, body, headers]);

  return { data, error, loading };
};

export default useAxios;
