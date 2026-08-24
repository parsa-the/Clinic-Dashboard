import { X } from "lucide-react";
import { useState } from "react";
import type { Appointment, TimeSlot } from "@/types";
import { AsyncState } from "@/components/ui/AsyncState";
import { ClinicCalendar } from "@/components/ui/ClinicCalendar";
import { useTimeSlots } from "@/features/booking/hooks/useTimeSlots";

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

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <ClinicCalendar
            value={date}
            onChange={(value) => {
              setDate(value);
              setTime("");
            }}
          />

          <section className="rounded-2xl border bg-white p-5">
            <h3 className="font-bold">ساعت‌های آزاد</h3>
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
            <div className="mt-4 grid grid-cols-3 gap-2">
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
          </section>
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
