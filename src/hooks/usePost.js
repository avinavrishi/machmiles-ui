import { useMutation } from "@tanstack/react-query";
import { apiService } from "../services/axiosService";

export const usePost = (url, onSuccess, onError) => {
  return useMutation({
    mutationFn: (data) => apiService.post(url, data),
    onSuccess,
    onError,
  });
};
