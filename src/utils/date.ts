const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export const formatClinicDate = (value: string) => {
  if (!isoDatePattern.test(value)) return value;

  return new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00`));
};
