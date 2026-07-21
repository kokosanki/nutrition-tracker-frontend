import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout as logoutUser } from "../api/auth.ts";
import { ApiError } from "../api/client.ts";
import { useAuth } from "./useAuth.ts";

export const useLogout = () => {
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setError(null);
    try {
      await logoutUser();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong, please try again",
      );
    }
  };

  return { logout, error };
};
