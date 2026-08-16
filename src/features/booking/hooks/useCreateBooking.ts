import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../api/booking.api";
import { queryKeys } from "@/lib/queryKeys";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      void queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};
