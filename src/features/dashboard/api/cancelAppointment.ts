import type { Appointment } from "@/types";

export const cancelAppointment = async (id: string): Promise<Appointment> => {
  const response = await fetch(`/api/appointments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "لغو شده",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to cancel appointment");
  }

  return response.json() as Promise<Appointment>;
};
