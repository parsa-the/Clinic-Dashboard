export const APPOINTMENT_TIMES = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
] as const;

export const sortAppointmentTimes = (times: string[]) =>
  [...times].sort((firstTime, secondTime) =>
    firstTime.localeCompare(secondTime),
  );
