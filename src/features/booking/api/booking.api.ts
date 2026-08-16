import { api } from "@/lib/api";
import type { BookingResponse, TimeSlot } from "@/types";

export const getTimeSlots = (consultantId: string, date: string) =>
  api<TimeSlot[]>(
    `/api/consultants/${consultantId}/slots?date=${encodeURIComponent(date)}`,
  );

export const createBooking = (payload: {
  serviceId: string;
  consultantId: string;
  date: string;
  time: string;
}) =>
  api<BookingResponse>("/api/bookings", {
    method: "POST",
    body: payload,
  });
