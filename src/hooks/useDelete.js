import { useMutation } from "@tanstack/react-query";
import { apiService } from "../services/axiosService";

export const useDelete = (url, onSuccess, onError) => {
  return useMutation({
    mutationFn: (data) => apiService.delete(url, data),
    onSuccess,
    onError,
  });
};
