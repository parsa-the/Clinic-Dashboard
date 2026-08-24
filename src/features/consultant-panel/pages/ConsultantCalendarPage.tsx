import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { AsyncState } from "@/components/ui/AsyncState";
import { ClinicCalendar } from "@/components/ui/ClinicCalendar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatClinicDate, getIranToday, toClinicDate } from "@/utils/date";
import { useConsultantAppointments } from "../hooks/useConsultantPanel";
import { appointments } from "@/mocks/appointments";
import { useAuthStore } from "@/features/auth/model/auth.store";

const ConsultantCalendarPage = () => {
  const [date, setDate] = useState(() => toClinicDate(getIranToday()));
  const appointmentsQuery = useConsultantAppointments(date);
  const consultant = useAuthStore((state) => state.user);
  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-4 pb-28 sm:p-6">
      <div className="mx-auto flex flex-col gap-6 max-w-6xl">
        <div className="flex items-center gap-3">
          <CalendarDays className="text-teal-700" />
          <div>
            <h1 className="text-2xl font-black">تقویم نوبت‌ها</h1>
            <p className="mt-1 text-sm text-slate-500">
              تاریخ موردنظر را انتخاب کنید و نوبت‌ها را ببینید.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <ClinicCalendar
            value={date}
            onChange={setDate}
            disablePastDates={false}
          />

          <section className="rounded-2xl border bg-white p-5">
            <h2 className="font-bold">نوبت‌های {formatClinicDate(date)}</h2>

            <div className="mt-4">
              {appointmentsQuery.isLoading ? (
                <AsyncState type="loading" />
              ) : appointmentsQuery.isError ? (
                <AsyncState
                  type="error"
                  onRetry={() => void appointmentsQuery.refetch()}
                />
              ) : (appointmentsQuery.data ?? []).length === 0 ? (
                <AsyncState type="empty" title="برای این تاریخ نوبتی ندارید" />
              ) : (
                <div className="divide-y">
                  {(appointmentsQuery.data ?? []).map((appointment) => (
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
          </section>
        </div>
        <div className="w-full bg-white p-5 flex flex-col gap-3 border shadow rounded-lg">
          {appointments.filter((appointment)=> appointment.consultantId===consultant?.id)
          .map((appointment) => (
           (
            <div
              key={appointment.id}
              className="flex flex-col shadow rounded-xl p-4 gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">{appointment.service}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {formatClinicDate(appointment.date)} • {appointment.startTime}
                </p>
                
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={appointment.status} />
              </div>
            </div>
         ) ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultantCalendarPage;
