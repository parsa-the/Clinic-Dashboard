import type { ConsultantAvailability } from "@/types";

export let consultantAvailability: ConsultantAvailability = {
  consultantId: "2",
  workingDays: [
    {
      day: "شنبه",
      enabled: true,
      ranges: [
        { from: "09:00", to: "13:00" },
        { from: "14:00", to: "18:00" },
      ],
      blockedSlots: ["10:30"],
    },
    {
      day: "یکشنبه",
      enabled: true,
      ranges: [{ from: "09:00", to: "15:00" }],
      blockedSlots: [],
    },
    {
      day: "دوشنبه",
      enabled: true,
      ranges: [{ from: "10:00", to: "18:00" }],
      blockedSlots: ["15:00"],
    },
    {
      day: "سه‌شنبه",
      enabled: false,
      ranges: [],
      blockedSlots: [],
    },
    {
      day: "چهارشنبه",
      enabled: true,
      ranges: [{ from: "09:00", to: "14:00" }],
      blockedSlots: [],
    },
    {
      day: "پنجشنبه",
      enabled: true,
      ranges: [{ from: "09:00", to: "13:00" }],
      blockedSlots: [],
    },
    {
      day: "جمعه",
      enabled: false,
      ranges: [],
      blockedSlots: [],
    },
  ],
};

export const setConsultantAvailability = (value: ConsultantAvailability) => {
  consultantAvailability = value;
};
