import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
} from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";
import { format as formatGregorian, getDay, isBefore, startOfDay } from "date-fns";
import { useMemo, useState } from "react";
import { getIranToday, parseClinicDate } from "@/utils/date";

const WEEKDAY_LABELS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

type ClinicCalendarProps = {
  value?: string | null;
  onChange: (date: string) => void;
  disabledDates?: string[];
  disablePastDates?: boolean;
};

export function ClinicCalendar({
  value,
  onChange,
  disabledDates = [],
  disablePastDates = true,
}: ClinicCalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(
    () => (value ? parseClinicDate(value) : null) ?? getIranToday(),
  );
  const disabledDateSet = useMemo(() => new Set(disabledDates), [disabledDates]);
  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfMonth(visibleMonth),
        end: endOfMonth(visibleMonth),
      }),
    [visibleMonth],
  );
  const leadingEmptyCells = (getDay(days[0]) + 1) % 7;

  const changeMonth = (offset: number) => {
    setVisibleMonth((currentMonth) => addMonths(currentMonth, offset));
  };

  return (
    <section className="rounded-2xl border bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <button type="button" aria-label="ماه قبل" className="rounded-lg border px-3 py-1" onClick={() => changeMonth(-1)}>
          ‹
        </button>
        <strong>{format(visibleMonth, "MMMM yyyy", { locale: faIR })}</strong>
        <button type="button" aria-label="ماه بعد" className="rounded-lg border px-3 py-1" onClick={() => changeMonth(1)}>
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-500">
        {WEEKDAY_LABELS.map((label) => <span key={label}>{label}</span>)}
      </div>

      <div className="mt-3 grid grid-cols-7 gap-2">
        {Array.from({ length: leadingEmptyCells }, (_, index) => (
          <span key={`empty-${index}`} aria-hidden="true" />
        ))}
        {days.map((day) => {
          const date = formatGregorian(day, "yyyy-MM-dd");
          const isDisabled =
            disabledDateSet.has(date) ||
            (disablePastDates && isBefore(day, startOfDay(getIranToday())));
          const isSelected = value === date;

          return (
            <button
              key={date}
              type="button"
              disabled={isDisabled}
              aria-pressed={isSelected}
              onClick={() => onChange(date)}
              className={`rounded-xl p-2 text-sm ${isSelected ? "bg-blue-600 text-white" : isDisabled ? "cursor-not-allowed bg-slate-100 text-slate-400" : "hover:bg-blue-50"}`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </section>
  );
}
