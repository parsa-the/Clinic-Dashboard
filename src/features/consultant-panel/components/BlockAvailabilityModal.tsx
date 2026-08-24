import { useState } from "react";
import { Ban, Check, X } from "lucide-react";
import { ClinicCalendar } from "@/components/ui/ClinicCalendar";
import {
  APPOINTMENT_TIMES,
  sortAppointmentTimes,
} from "@/types/appointmentTimes";
import type { BlockedAvailabilityDate } from "@/types";
import { formatClinicDate } from "@/utils/date";

type BlockAvailabilityModalProps = {
  pending: boolean;
  onClose: () => void;
  onSubmit: (blockedDate: BlockedAvailabilityDate) => void;
};

export const BlockAvailabilityModal = ({
  pending,
  onClose,
  onSubmit,
}: BlockAvailabilityModalProps) => {
  const [date, setDate] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const toggleTime = (time: string) => {
    setSelectedTimes((currentTimes) =>
      currentTimes.includes(time)
        ? currentTimes.filter((currentTime) => currentTime !== time)
        : sortAppointmentTimes([...currentTimes, time]),
    );
  };

  const toggleAllTimes = () => {
    setSelectedTimes((currentTimes) =>
      currentTimes.length === APPOINTMENT_TIMES.length
        ? []
        : [...APPOINTMENT_TIMES],
    );
  };

  const submit = () => {
    if (!date || selectedTimes.length === 0) return;
    onSubmit({ date, blockedSlots: selectedTimes });
  };

  return (
    <div
      className="fixed inset-0 z-100 grid place-items-center bg-black/35 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Ban className="text-red-500" size={21} />
              <h2 className="text-xl font-black text-slate-900">
                مسدود کردن زمان مشاوره
              </h2>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              یک تاریخ شمسی و ساعت‌هایی را انتخاب کنید که نباید قابل رزرو باشند.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100"
            aria-label="بستن"
          >
            <X size={20} />
          </button>
        </header>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <ClinicCalendar value={date} onChange={setDate} />

          <section className="rounded-2xl border bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-bold">ساعت‌های روز</h3>
                <p className="mt-1 text-xs text-slate-500">
                  {date ? formatClinicDate(date) : "ابتدا تاریخ را انتخاب کنید"}
                </p>
              </div>
              <button
                type="button"
                disabled={!date}
                onClick={toggleAllTimes}
                className="rounded-lg border px-3 py-2 text-xs font-bold text-slate-600 disabled:opacity-40"
              >
                {selectedTimes.length === APPOINTMENT_TIMES.length
                  ? "لغو انتخاب همه"
                  : "انتخاب همه"}
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {APPOINTMENT_TIMES.map((time) => {
                const isSelected = selectedTimes.includes(time);

                return (
                  <button
                    key={time}
                    type="button"
                    disabled={!date}
                    aria-pressed={isSelected}
                    onClick={() => toggleTime(time)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${
                      isSelected
                        ? "border-red-500 bg-red-50 text-red-600"
                        : "hover:border-red-300"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <footer className="mt-6 flex justify-end gap-2 border-t pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-4 py-2.5 font-semibold text-slate-600"
          >
            انصراف
          </button>
          <button
            type="button"
            disabled={!date || selectedTimes.length === 0 || pending}
            onClick={submit}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <Check size={18} />
            {pending ? "در حال ثبت..." : "ثبت زمان‌های مسدود"}
          </button>
        </footer>
      </section>
    </div>
  );
};
