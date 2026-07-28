import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logFood as logFoodRequest, type LogFoodPayload } from "@/api/mealLogs.ts";
import { ApiError } from "@/api/client.ts";

export const useLogFood = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const logFood = async (payload: LogFoodPayload): Promise<void> => {
    setError(null);
    setIsLoading(true);

    try {
      await logFoodRequest(payload);
      navigate(`/mealLog/${payload.mealType}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof ApiError ? err.message : "Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return { logFood, isLoading, error };
};
