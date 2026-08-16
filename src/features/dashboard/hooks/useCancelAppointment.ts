import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelAppointment } from "../api/cancelAppointment";
import { dashboardQueryKey } from "./useDashboard";
import toast from "react-hot-toast";

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKey,
      });

      toast.success("نوبت با موفقیت لغو شد");
    },

    onError: () => {
      toast.error("لغو نوبت انجام نشد");
    },
  });
};
