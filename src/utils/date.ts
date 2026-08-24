const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

const IRAN_TIME_ZONE = "Asia/Tehran";

const iranDatePartsFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: IRAN_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const getNumericDatePart = (
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes,
) => Number(parts.find((part) => part.type === type)?.value);

export const getIranToday = () => {
  const parts = iranDatePartsFormatter.formatToParts(new Date());
  const year = getNumericDatePart(parts, "year");
  const month = getNumericDatePart(parts, "month");
  const day = getNumericDatePart(parts, "day");

  return new Date(year, month - 1, day, 12);
};

export const parseClinicDate = (value: string) => {
  if (!isoDatePattern.test(value)) return null;

  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
};

export const toClinicDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatClinicDate = (value: string) => {
  const date = parseClinicDate(value);
  if (!date) return value;

  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    timeZone: IRAN_TIME_ZONE,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
