import { AsyncState } from "@/components/ui/AsyncState";
import { ClinicCalendar } from "@/components/ui/ClinicCalendar";
import type { TimeSlot } from "@/types";
import { useTimeSlots } from "../hooks/useTimeSlots";

type DateTimeStepProps = {
  consultantId: string;
  selectedDate: string | null;
  selectedTime: string | null;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
};

const getTimeSlotClassName = (slot: TimeSlot, selectedTime: string | null) => {
  if (selectedTime === slot.time) return "bg-blue-600 text-white";
  if (slot.status !== "available") return "cursor-not-allowed bg-slate-100 text-slate-400 line-through";
  return "hover:border-blue-400";
};

export const DateTimeStep = ({ consultantId, selectedDate, selectedTime, onDateChange, onTimeChange }: DateTimeStepProps) => {
  const slotsQuery = useTimeSlots(consultantId, selectedDate ?? "");

  const handleDateChange = (date: string) => {
    onDateChange(date);
    if (selectedTime) onTimeChange("");
  };

  const renderSlots = () => {
    if (!selectedDate) return <p className="mt-5 text-sm text-slate-500">ابتدا تاریخ را انتخاب کنید.</p>;
    if (slotsQuery.isLoading) return <AsyncState type="loading" />;
    if (slotsQuery.isError) return <AsyncState type="error" onRetry={() => void slotsQuery.refetch()} />;
    if (!slotsQuery.data?.length) return <AsyncState type="empty" title="ساعت آزادی برای این روز وجود ندارد" />;

    return (
      <div className="mt-5 grid grid-cols-2 gap-3">
        {slotsQuery.data.map((slot) => (
          <button
            key={slot.time}
            type="button"
            disabled={slot.status !== "available"}
            onClick={() => onTimeChange(slot.time)}
            className={`rounded-xl border p-3 font-semibold ${getTimeSlotClassName(slot, selectedTime)}`}
          >
            {slot.time}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
      <ClinicCalendar value={selectedDate} onChange={handleDateChange} />
      <section className="rounded-2xl border bg-white p-5">
        <h3 className="font-bold">ساعت‌های آزاد</h3>
        {renderSlots()}
      </section>
    </div>
  );
};
