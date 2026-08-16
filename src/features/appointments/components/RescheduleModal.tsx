import { addDays, format } from "date-fns";
import { X } from "lucide-react";
import { useState } from "react";
import type { Appointment, TimeSlot } from "@/types";
import { AsyncState } from "@/components/ui/AsyncState";
import { useTimeSlots } from "@/features/booking/hooks/useTimeSlots";

const days = Array.from({ length: 7 }, (_, index) => addDays(new Date(), index + 1));

type Props = {
  appointment: Appointment;
  onClose: () => void;
  onSubmit: (date: string, time: string) => void;
  pending: boolean;
};

export const RescheduleModal = ({ appointment, onClose, onSubmit, pending }: Props) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const slots = useTimeSlots(appointment.consultantId, date);

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/35 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900">تغییر زمان نوبت</h2>
            <p className="mt-1 text-sm text-slate-500">{appointment.service}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {days.map((item) => {
            const value = format(item, "yyyy-MM-dd");
            const disabled = item.getDay() === 5;
            return (
              <button
                type="button"
                key={value}
                disabled={disabled}
                onClick={() => {
                  setDate(value);
                  setTime("");
                }}
                className={`rounded-xl border p-3 text-sm ${
                  disabled
                    ? "cursor-not-allowed bg-slate-100 text-slate-400"
                    : date === value
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "hover:border-blue-300"
                }`}
              >
                {new Intl.DateTimeFormat("fa-IR", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                }).format(item)}
              </button>
            );
          })}
        </div>

        <div className="mt-5">
          {!date ? (
            <p className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
              ابتدا روز جدید را انتخاب کنید.
            </p>
          ) : slots.isLoading ? (
            <AsyncState type="loading" />
          ) : slots.isError ? (
            <AsyncState type="error" onRetry={() => void slots.refetch()} />
          ) : (slots.data ?? []).filter((item) => item.status === "available").length === 0 ? (
            <AsyncState type="empty" title="زمان آزادی وجود ندارد" />
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {(slots.data ?? []).map((slot: TimeSlot) => {
                const disabled = slot.status !== "available";
                return (
                  <button
                    type="button"
                    key={slot.time}
                    disabled={disabled}
                    onClick={() => setTime(slot.time)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-semibold ${
                      disabled
                        ? "cursor-not-allowed bg-slate-100 text-slate-400 line-through"
                        : time === slot.time
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "hover:border-blue-400"
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t pt-4">
          <button type="button" onClick={onClose} className="rounded-xl border px-4 py-2.5 font-semibold text-slate-600">
            انصراف
          </button>
          <button
            type="button"
            disabled={!date || !time || pending}
            onClick={() => onSubmit(date, time)}
            className="rounded-xl bg-blue-600 px-5 py-2.5 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {pending ? "در حال ثبت..." : "ثبت زمان جدید"}
          </button>
        </div>
      </section>
    </div>
  );
};
