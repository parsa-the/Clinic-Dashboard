import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import type { Appointment } from "@/types";
import {
  getAvailability,
  getConsultantAppointments,
  updateAppointmentStatus,
  updateAvailability,
} from "../api/consultantPanel.api";

export const useConsultantAppointments = (date = "") =>
  useQuery({
    queryKey: queryKeys.consultantAppointments(date),
    queryFn: () => getConsultantAppointments(date),
  });

export const useAvailability = () =>
  useQuery({
    queryKey: queryKeys.availability,
    queryFn: getAvailability,
  });

export const useUpdateAvailability = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAvailability,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.availability }),
        queryClient.invalidateQueries({ queryKey: queryKeys.allSlots }),
      ]);
    },
  });
};

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: Appointment["status"];
    }) => updateAppointmentStatus(id, status),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["consultant-appointments"] }),
  });
};
