import { CalendarClock, CalendarDays, Clock3, X } from "lucide-react";
import type { Appointment, Consultant } from "@/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatClinicDate } from "@/utils/date";

type Props = {
  appointment: Appointment;
  consultant?: Consultant;
  onCancel?: (id: string) => void;
  onReschedule?: (appointment: Appointment) => void;
  cancelling?: boolean;
};

export const AppointmentCard = ({
  appointment,
  consultant,
  onCancel,
  onReschedule,
  cancelling,
}: Props) => {
  const canEdit =
    appointment.status === "تایید شده" || appointment.status === "در انتظار";

  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <img
          src={consultant?.profilePicture ?? "/images.jpg"}
          alt={consultant?.name ?? "مشاور"}
          className="size-16 rounded-full border object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900">
                {consultant?.name ?? "مشاور"}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{appointment.service}</p>
            </div>
            <StatusBadge status={appointment.status} />
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={16} />
              {formatClinicDate(appointment.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 size={16} />
              {appointment.startTime}
            </span>
          </div>
        </div>
      </div>

      {canEdit && (onCancel || onReschedule) && (
        <div className="mt-5 flex flex-wrap justify-end gap-2 border-t pt-4">
          {onReschedule && (
            <button
              type="button"
              onClick={() => onReschedule(appointment)}
              className="flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              <CalendarClock size={16} />
              تغییر زمان
            </button>
          )}
          {onCancel && (
            <button
              type="button"
              onClick={() => onCancel(appointment.id)}
              disabled={cancelling}
              className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              <X size={16} />
              {cancelling ? "در حال لغو..." : "لغو نوبت"}
            </button>
          )}
        </div>
      )}
    </article>
  );
};
