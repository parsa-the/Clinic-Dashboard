import { api } from "@/lib/api";
import type { Appointment, ConsultantAvailability } from "@/types";

export const getConsultantAppointments = (date = "") =>
  api<Appointment[]>(
    `/api/consultant/appointments${date ? `?date=${encodeURIComponent(date)}` : ""}`,
  );

export const getAvailability = () =>
  api<ConsultantAvailability>("/api/consultant/availability");

export const updateAvailability = (availability: ConsultantAvailability) =>
  api<ConsultantAvailability>("/api/consultant/availability", {
    method: "PUT",
    body: availability,
  });

export const updateAppointmentStatus = (
  id: string,
  status: Appointment["status"],
) =>
  api<Appointment>(`/api/appointments/${id}`, {
    method: "PATCH",
    body: { status },
  });
