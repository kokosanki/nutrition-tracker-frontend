import { useQuery } from "@tanstack/react-query";
import { getWaterLog } from "@/api/water.ts";
import { ApiError } from "@/api/client.ts";

export const useWaterLog = (date: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["waterLog", date],
    queryFn: () => getWaterLog(date),
    staleTime: 5 * 60 * 1000,
  });

  const entries = data?.waterLogs ?? [];
  const totalMl = entries.reduce((total, entry) => total + entry.amountMl, 0);

  return {
    entries,
    totalMl,
    isLoading,
    error: error
      ? error instanceof ApiError
        ? error.message
        : "Something went wrong, please try again"
      : null,
  };
};
