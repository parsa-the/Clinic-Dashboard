export const cancelAppointment = async (id: string) => {
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

  return response.json();
};