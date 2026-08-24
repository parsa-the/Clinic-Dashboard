import type { BookingDraft } from "@/types";
import { formatClinicDate } from "@/utils/date";

export const BookingSummary = ({ booking }: { booking: BookingDraft }) => {
  if (!booking.service || !booking.consultant || !booking.date || !booking.time) {
    return null;
  }

  const rows = [
    ["خدمت", booking.service.name],
    ["مشاور", booking.consultant.name],
    ["تاریخ", formatClinicDate(booking.date)],
    ["ساعت", booking.time],
    ["مدت جلسه", `${booking.service.duration.toLocaleString("fa-IR")} دقیقه`],
    ["هزینه", `${booking.service.price.toLocaleString("fa-IR")} تومان`],
  ];

  return (
    <div className="rounded-2xl border bg-white p-5">
      <h3 className="font-bold text-slate-900">خلاصه رزرو</h3>
      <div className="mt-4 divide-y">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-start justify-between gap-6 py-3 text-sm"
          >
            <span className="text-slate-500">{label}</span>
            <span className="text-left font-semibold text-slate-800">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="font-semibold text-blue-900">روش پرداخت</p>
        <p className="mt-1 text-sm text-blue-700">پرداخت آنلاین</p>
      </div>
    </div>
  );
};
