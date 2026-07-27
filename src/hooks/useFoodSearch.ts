import { useState } from "react";
import { searchFoods, type Food } from "@/api/foods.ts";
import { ApiError } from "@/api/client.ts";

export const useFoodSearch = () => {
  const [results, setResults] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const foods = await searchFoods(query);
      setResults(foods);
    } catch (err) {
      console.error(err);
      setError(err instanceof ApiError ? err.message : "Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return { search, results, isLoading, error };
};
