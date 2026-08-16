import { api } from "@/lib/api";
import type { Appointment, AppointmentFilter } from "@/types";

export const getAppointments = (filter: AppointmentFilter) =>
  api<Appointment[]>(`/api/appointments?filter=${filter}`);

export const cancelAppointment = (id: string) =>
  api<Appointment>(`/api/appointments/${id}`, {
    method: "PATCH",
    body: { status: "لغو شده" },
  });

export const rescheduleAppointment = ({
  id,
  date,
  time,
}: {
  id: string;
  date: string;
  time: string;
}) =>
  api<Appointment>(`/api/appointments/${id}`, {
    method: "PATCH",
    body: { date, startTime: time, status: "در انتظار" },
  });
