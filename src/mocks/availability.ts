import type { ConsultantAvailability } from "@/types";

const STORAGE_KEY = "consultant-availability";

export let consultantAvailability: ConsultantAvailability =
  JSON.parse(
    localStorage.getItem(STORAGE_KEY) ||
      JSON.stringify({
        consultantId: "2",
        blockedDates: [],
      }),
  );

export const setConsultantAvailability = (value: ConsultantAvailability) => {
  consultantAvailability = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
};