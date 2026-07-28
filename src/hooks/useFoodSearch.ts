import { useQuery } from "@tanstack/react-query";
import { searchFoods, type Food } from "@/api/foods.ts";
import { ApiError } from "@/api/client.ts";

export const useFoodSearch = (query: string) => {
  const trimmed = query.trim();

  const { data, isLoading, error } = useQuery({
    queryKey: ["foodSearch", trimmed],
    queryFn: () => searchFoods(trimmed),
    enabled: trimmed.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  return {
    results: data?.results ?? ([] as Food[]),
    isLoading,
    error: error
      ? error instanceof ApiError
        ? error.message
        : "Something went wrong, please try again"
      : null,
  };
};
