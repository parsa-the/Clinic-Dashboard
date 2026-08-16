import { addDays, format } from "date-fns";
import { faIR } from "date-fns/locale";
import { AsyncState } from "@/components/ui/AsyncState";
import { useTimeSlots } from "../hooks/useTimeSlots";
import type { TimeSlot } from "@/types";

type Props = {
  consultantId: string;
  selectedDate: string | null;
  selectedTime: string | null;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
};

const dayOptions = Array.from({ length: 8 }, (_, index) =>
  addDays(new Date(), index + 1),
);

export const DateTimeStep = ({
  consultantId,
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: Props) => {
  const { data: slots = [], isLoading, isError, refetch } = useTimeSlots(
    consultantId,
    selectedDate ?? "",
  );

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
      <section className="rounded-2xl border bg-white p-5">
        <h3 className="font-bold">انتخاب تاریخ</h3>
        <p className="mt-1 text-sm text-slate-500">
          یکی از روزهای قابل رزرو را انتخاب کنید.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
          {dayOptions.map((date) => {
            const value = format(date, "yyyy-MM-dd");
            const active = selectedDate === value;
            const unavailable = date.getDay() === 5;
            return (
              <button
                key={value}
                disabled={unavailable}
                onClick={() => onDateChange(value)}
                className={`rounded-xl border p-3 text-center ${
                  unavailable
                    ? "cursor-not-allowed bg-slate-100 text-slate-400 opacity-70"
                    : active
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "hover:border-blue-300"
                }`}
              >
                <span className="block text-xs text-slate-500">
                  {format(date, "EEEE", { locale: faIR })}
                </span>
                <span className="mt-1 block font-bold">
                  {new Intl.DateTimeFormat("fa-IR", {
                    day: "numeric",
                    month: "long",
                  }).format(date)}
                </span>
                {unavailable && (
                  <span className="mt-1 block text-[10px] font-semibold text-red-400">
                    تعطیل
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5">
        <h3 className="font-bold">ساعت‌های آزاد</h3>
        <p className="mt-1 text-sm text-slate-500">
          ساعت‌های رزرو شده یا مسدود شده قابل انتخاب نیستند.
        </p>

        {!selectedDate ? (
          <div className="mt-5 rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">
            ابتدا تاریخ را انتخاب کنید.
          </div>
        ) : isLoading ? (
          <div className="mt-5">
            <AsyncState type="loading" />
          </div>
        ) : isError ? (
          <div className="mt-5">
            <AsyncState type="error" onRetry={() => void refetch()} />
          </div>
        ) : slots.filter((slot) => slot.status === "available").length === 0 ? (
          <div className="mt-5">
            <AsyncState
              type="empty"
              title="زمان آزادی وجود ندارد"
              description="برای این روز زمان قابل رزروی ثبت نشده است. روز دیگری را انتخاب کنید."
            />
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {slots.map((slot: TimeSlot) => {
              const disabled = slot.status !== "available";
              const active = selectedTime === slot.time;
              return (
                <button
                  key={slot.time}
                  disabled={disabled}
                  onClick={() => onTimeChange(slot.time)}
                  className={`rounded-xl border px-3 py-3 text-sm font-semibold ${
                    active
                      ? "border-blue-600 bg-blue-600 text-white"
                      : disabled
                        ? "cursor-not-allowed bg-slate-100 text-slate-400 line-through"
                        : "bg-white hover:border-blue-400 hover:text-blue-700"
                  }`}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
