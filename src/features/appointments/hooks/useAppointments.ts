import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import type { AppointmentFilter } from "@/types";
import { getAppointments } from "../api/appointments.api";

export const useAppointments = (filter: AppointmentFilter) =>
  useQuery({
    queryKey: queryKeys.appointments(filter),
    queryFn: () => getAppointments(filter),
  });
