import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelAppointment } from "../../api/cancelAppointment";
import toast from "react-hot-toast";

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      toast.success("نوبت با موفقیت لغو شد");
    },

    onError: (error) => {
      console.error(error);
      toast.error("لغو نوبت انجام نشد");
    },
  });
};