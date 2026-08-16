import { useState } from "react";
import toast from "react-hot-toast";
import type { Appointment, AppointmentFilter } from "@/types";
import { AsyncState } from "@/components/ui/AsyncState";
import { useConsultants } from "@/features/consultants/hooks/useConsultants";
import { AppointmentCard } from "../components/AppointmentCard";
import { RescheduleModal } from "../components/RescheduleModal";
import { useAppointments } from "../hooks/useAppointments";
import { useCancelAppointment } from "../hooks/useCancelAppointment";
import { useRescheduleAppointment } from "../hooks/useRescheduleAppointment";

const tabs: Array<{ value: AppointmentFilter; label: string }> = [
  { value: "all", label: "همه" },
  { value: "upcoming", label: "آینده" },
  { value: "past", label: "گذشته" },
];

const MyAppointmentsPage = () => {
  const [filter, setFilter] = useState<AppointmentFilter>("all");
  const [rescheduling, setRescheduling] = useState<Appointment | null>(null);
  const appointments = useAppointments(filter);
  const consultants = useConsultants();
  const cancelMutation = useCancelAppointment();
  const rescheduleMutation = useRescheduleAppointment();

  const cancel = (id: string) => {
    cancelMutation.mutate(id, {
      onSuccess: () => toast.success("نوبت لغو شد."),
      onError: () => toast.error("لغو نوبت انجام نشد."),
    });
  };

  const reschedule = (date: string, time: string) => {
    if (!rescheduling) return;

    rescheduleMutation.mutate(
      { id: rescheduling.id, date, time },
      {
        onSuccess: () => {
          toast.success("زمان نوبت تغییر کرد و در انتظار تأیید قرار گرفت.");
          setRescheduling(null);
        },
        onError: () => toast.error("تغییر زمان نوبت انجام نشد."),
      },
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-4 pb-28 sm:p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-black">نوبت‌های من</h1>
        <p className="mt-2 text-sm text-slate-500">
          نوبت‌های آینده و گذشته خود را مشاهده و مدیریت کنید.
        </p>

        <div className="mt-6 inline-flex rounded-xl border bg-white p-1">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`rounded-lg px-5 py-2 text-sm font-semibold ${
                filter === tab.value
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4">
          {appointments.isLoading || consultants.isLoading ? (
            <AsyncState type="loading" />
          ) : appointments.isError || consultants.isError ? (
            <AsyncState
              type="error"
              onRetry={() => {
                void appointments.refetch();
                void consultants.refetch();
              }}
            />
          ) : (appointments.data ?? []).length === 0 ? (
            <AsyncState
              type="empty"
              title="نوبتی در این دسته وجود ندارد"
              description="برای رزرو نوبت جدید می‌توانید از بخش رزرو نوبت استفاده کنید."
            />
          ) : (
            (appointments.data ?? []).map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                consultant={(consultants.data ?? []).find(
                  (item) => item.id === appointment.consultantId,
                )}
                onCancel={cancel}
                onReschedule={setRescheduling}
                cancelling={
                  cancelMutation.isPending &&
                  cancelMutation.variables === appointment.id
                }
              />
            ))
          )}
        </div>
      </div>

      {rescheduling && (
        <RescheduleModal
          appointment={rescheduling}
          onClose={() => setRescheduling(null)}
          onSubmit={reschedule}
          pending={rescheduleMutation.isPending}
        />
      )}
    </div>
  );
};

export default MyAppointmentsPage;
