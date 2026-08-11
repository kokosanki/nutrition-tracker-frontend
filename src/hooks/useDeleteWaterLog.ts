import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWaterLog as deleteWaterLogRequest } from "@/api/water.ts";
import { ApiError } from "@/api/client.ts";

export const useDeleteWaterLog = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteWaterLog, isPending: isLoading, error } = useMutation({
    mutationFn: deleteWaterLogRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waterLog"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    deleteWaterLog,
    isLoading,
    error: error
      ? error instanceof ApiError
        ? error.message
        : "Something went wrong, please try again"
      : null,
  };
};
