import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logFood as logFoodRequest, type LogFoodPayload } from "@/api/mealLogs.ts";
import { ApiError } from "@/api/client.ts";

export const useLogFood = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logFood, isPending: isLoading, error } = useMutation({
    mutationFn: logFoodRequest,
    onSuccess: (_data, payload: LogFoodPayload) => {
      queryClient.invalidateQueries({ queryKey: ["foodJournal", payload.loggedDate] });
      navigate(`/mealLog/${payload.mealType}`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    logFood,
    isLoading,
    error: error
      ? error instanceof ApiError
        ? error.message
        : "Something went wrong, please try again"
      : null,
  };
};
