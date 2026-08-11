import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logWater as logWaterRequest, type LogWaterPayload } from "@/api/water.ts";
import { ApiError } from "@/api/client.ts";

export const useLogWater = () => {
  const queryClient = useQueryClient();

  const { mutate: logWater, isPending: isLoading, error } = useMutation({
    mutationFn: logWaterRequest,
    onSuccess: (_data, payload: LogWaterPayload) => {
      queryClient.invalidateQueries({ queryKey: ["waterLog", payload.loggedDate] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    logWater,
    isLoading,
    error: error
      ? error instanceof ApiError
        ? error.message
        : "Something went wrong, please try again"
      : null,
  };
};
