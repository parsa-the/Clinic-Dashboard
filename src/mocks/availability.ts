import type { ConsultantAvailability } from "@/types";

export let consultantAvailability: ConsultantAvailability = {
  consultantId: "2",
  blockedDates: [],
};

export const setConsultantAvailability = (value: ConsultantAvailability) => {
  consultantAvailability = value;
};
