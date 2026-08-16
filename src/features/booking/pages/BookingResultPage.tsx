import { CalendarDays, CheckCircle2 } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";
import type { BookingResponse } from "@/types";
import { formatClinicDate } from "@/utils/date";

const BookingResultPage = () => {
  const location = useLocation();
  const result = location.state as BookingResponse | null;

  if (!result) {
    return <Navigate to="/appointments" replace />;
  }

  const addToCalendar = () => {
    const appointment = result.appointment;
    const start = new Date(`${appointment.date}T${appointment.startTime}:00`);
    const end = new Date(
      start.getTime() + (appointment.duration ?? 60) * 60 * 1000,
    );

    const toIcsDate = (value: Date) =>
      value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Aramesh Clinic//Appointment//FA",
      "BEGIN:VEVENT",
      `UID:${appointment.id}@aramesh-clinic.local`,
      `DTSTAMP:${toIcsDate(new Date())}`,
      `DTSTART:${toIcsDate(start)}`,
      `DTEND:${toIcsDate(end)}`,
      `SUMMARY:${appointment.service}`,
      `DESCRIPTION:کد پیگیری: ${result.trackingCode}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `appointment-${result.trackingCode}.ics`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid h-full place-items-center overflow-y-auto bg-slate-50 p-5 pb-28">
      <div className="w-full max-w-xl rounded-3xl border bg-white p-7 text-center shadow-sm">
        <CheckCircle2 className="mx-auto text-emerald-500" size={64} />
        <h1 className="mt-4 text-2xl font-black text-slate-900">
          نوبت با موفقیت ثبت شد
        </h1>
        <p className="mt-2 text-sm leading-7 text-slate-500">
          اطلاعات رزرو شما ثبت شد و از بخش نوبت‌های من قابل پیگیری است.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-right">
          <div className="flex justify-between gap-4">
            <span className="text-slate-500">کد پیگیری</span>
            <span className="font-black tracking-wider text-blue-700">
              {result.trackingCode}
            </span>
          </div>
          <div className="mt-3 flex justify-between gap-4">
            <span className="text-slate-500">خدمت</span>
            <span className="font-semibold">{result.appointment.service}</span>
          </div>
          <div className="mt-3 flex justify-between gap-4">
            <span className="text-slate-500">تاریخ</span>
            <span className="font-semibold">
              {formatClinicDate(result.appointment.date)}
            </span>
          </div>
          <div className="mt-3 flex justify-between gap-4">
            <span className="text-slate-500">ساعت</span>
            <span className="font-semibold">{result.appointment.startTime}</span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            to="/appointments"
            className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"
          >
            مشاهده نوبت‌های من
          </Link>
          <button
            type="button"
            onClick={addToCalendar}
            className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold text-slate-700"
          >
            <CalendarDays size={18} />
            افزودن به تقویم
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingResultPage;
