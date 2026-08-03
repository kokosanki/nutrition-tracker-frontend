import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLoggedFood as updateLoggedFoodRequest, type UpdateLogPayload } from "@/api/mealLogs.ts";
import { ApiError } from "@/api/client.ts";

interface UpdateLoggedFoodVariables {
  id: number;
  payload: UpdateLogPayload;
}

export const useUpdateLoggedFood = () => {
  const queryClient = useQueryClient();

  const { mutate: updateLoggedFood, isPending: isLoading, error } = useMutation({
    mutationFn: ({ id, payload }: UpdateLoggedFoodVariables) =>
      updateLoggedFoodRequest(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foodJournal"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    updateLoggedFood,
    isLoading,
    error: error
      ? error instanceof ApiError
        ? error.message
        : "Something went wrong, please try again"
      : null,
  };
};
