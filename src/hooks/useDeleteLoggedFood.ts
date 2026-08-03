import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLoggedFood as deleteLoggedFoodRequest } from "@/api/mealLogs.ts";
import { ApiError } from "@/api/client.ts";

export const useDeleteLoggedFood = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteLoggedFood, isPending: isLoading, error } = useMutation({
    mutationFn: deleteLoggedFoodRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foodJournal"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    deleteLoggedFood,
    isLoading,
    error: error
      ? error instanceof ApiError
        ? error.message
        : "Something went wrong, please try again"
      : null,
  };
};
