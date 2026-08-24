export const queryKeys = {
  dashboard: ["dashboard"] as const,

  consultants: (search = "", serviceId = "") =>
    ["consultants", search, serviceId] as const,

  services: ["services"] as const,
  appointments: (filter = "all") => ["appointments", filter] as const,

  allSlots: ["slots"] as const,
  slots: (consultantId: string, date: string) =>
    ["slots", consultantId, date] as const,

  consultantAppointments: (date = "") =>
    ["consultant-appointments", date] as const,
  
  availability: ["consultant-availability"] as const,
};
