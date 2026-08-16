import type { AppointmentStatus } from "@/types";

const statusStyles: Record<AppointmentStatus, string> = {
  "تایید شده": "bg-emerald-100 text-emerald-700",
  "در انتظار": "bg-amber-100 text-amber-700",
  "تکمیل شده": "bg-blue-100 text-blue-700",
  "لغو شده": "bg-red-100 text-red-700",
};

export const StatusBadge = ({ status }: { status: AppointmentStatus }) => (
  <span
    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
  >
    {status}
  </span>
);
