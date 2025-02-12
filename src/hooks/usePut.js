import { useMutation } from "@tanstack/react-query";
import { apiService } from "../services/axiosService";

export const usePut = (url, onSuccess, onError) => {
  return useMutation({
    mutationFn: (data) => apiService.put(url, data),
    onSuccess,
    onError,
  });
};
