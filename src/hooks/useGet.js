import { useQuery } from "@tanstack/react-query";
import { apiService } from "../services/axiosService";

export const useGet = (key, url, params) => {
  const queryString = new URLSearchParams(params).toString(); // Converts { query: "a" } -> "query=a"
  const finalUrl = queryString ? `${url}?${queryString}` : url; // Appends query if available

  return useQuery({
    queryKey: [key, params],
    queryFn: () => apiService.get(finalUrl), // Passes final URL without "params"
    staleTime: 60000,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
