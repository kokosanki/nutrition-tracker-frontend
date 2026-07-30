import { useQuery } from "@tanstack/react-query";
import { getFoodJournal, type LoggedFood } from "@/api/mealLogs.ts";
import { ApiError } from "@/api/client.ts";

export const useFoodJournal = (date: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["foodJournal", date],
    queryFn: () => getFoodJournal(date),
    staleTime: 5 * 60 * 1000,
  });

  return {
    loggedFoods: data?.loggedFoods ?? ([] as LoggedFood[]),
    isLoading,
    error: error
      ? error instanceof ApiError
        ? error.message
        : "Something went wrong, please try again"
      : null,
  };
};
