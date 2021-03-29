import { useState, useCallback } from "react";
import { useSelector } from "react-redux";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.currentUser.token);
  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(`http://localhost:4000${url}`, {
          method,
          body,
          headers: { ...headers, Authorization: `Bearer: ${token}` },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(
            data.message || "Something went wrong (from httpHook)"
          );
        }

        setLoading(false);

        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
