import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { AsyncState } from "@/components/ui/AsyncState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useConsultantAppointments } from "../hooks/useConsultantPanel";

const days = ["امروز", "فردا", "شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه"];

const ConsultantCalendarPage = () => {
  const [day, setDay] = useState("امروز");
  const query = useConsultantAppointments(day);

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-4 pb-28 sm:p-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3">
          <CalendarDays className="text-teal-700" />
          <div>
            <h1 className="text-2xl font-black">تقویم نوبت‌ها</h1>
            <p className="mt-1 text-sm text-slate-500">
              روز موردنظر را انتخاب کنید و نوبت‌ها را ببینید.
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {days.map((item) => (
            <button
              key={item}
              onClick={() => setDay(item)}
              className={`shrink-0 rounded-xl border px-4 py-2 text-sm font-semibold ${
                day === item
                  ? "border-teal-700 bg-teal-700 text-white"
                  : "bg-white text-slate-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border bg-white p-5">
          {query.isLoading ? (
            <AsyncState type="loading" />
          ) : query.isError ? (
            <AsyncState type="error" onRetry={() => void query.refetch()} />
          ) : (query.data ?? []).length === 0 ? (
            <AsyncState type="empty" title="برای این روز نوبتی ندارید" />
          ) : (
            <div className="divide-y">
              {(query.data ?? []).map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-bold">{appointment.startTime}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {appointment.service}
                    </p>
                  </div>
                  <StatusBadge status={appointment.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultantCalendarPage;
