import { CalendarDays, Clock3, Users, XCircle } from "lucide-react";
import { AsyncState } from "@/components/ui/AsyncState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  useConsultantAppointments,
  useUpdateAppointmentStatus,
} from "../hooks/useConsultantPanel";

const ConsultantDashboardPage = () => {
  const query = useConsultantAppointments();
  const updateStatus = useUpdateAppointmentStatus();

  if (query.isLoading) {
    return (
      <div className="h-full overflow-y-auto bg-slate-50 p-6">
        <AsyncState type="loading" />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="h-full overflow-y-auto bg-slate-50 p-6">
        <AsyncState type="error" onRetry={() => void query.refetch()} />
      </div>
    );
  }

  const appointments = query.data ?? [];
  const cards = [
    {
      title: "نوبت‌های امروز",
      value: appointments.filter((item) => item.date === "امروز").length,
      icon: Clock3,
    },
    {
      title: "نوبت‌های آینده",
      value: appointments.filter(
        (item) => item.status === "تایید شده" || item.status === "در انتظار",
      ).length,
      icon: CalendarDays,
    },
    {
      title: "نوبت‌های لغوشده",
      value: appointments.filter((item) => item.status === "لغو شده").length,
      icon: XCircle,
    },
    {
      title: "تعداد مراجعین",
      value: new Set(appointments.map((item) => item.patientId)).size,
      icon: Users,
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-4 pb-28 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-black">داشبورد مشاور</h1>
        <p className="mt-2 text-sm text-slate-500">
          خلاصه نوبت‌ها و وضعیت مراجعین شما
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
          {cards.map(({ title, value, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <Icon className="text-teal-700" size={28} />
              <p className="mt-4 text-sm text-slate-500">{title}</p>
              <p className="mt-2 text-3xl font-black">
                {value.toLocaleString("fa-IR")}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">نوبت‌های اخیر</h2>
            <span className="text-sm text-slate-400">
              {appointments.length.toLocaleString("fa-IR")} نوبت
            </span>
          </div>

          <div className="mt-4 divide-y">
            {appointments.length === 0 ? (
              <AsyncState type="empty" title="نوبتی ثبت نشده است" />
            ) : (
              appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold">{appointment.service}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {appointment.date} • {appointment.startTime}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={appointment.status} />
                    <select
                      value={appointment.status}
                      disabled={updateStatus.isPending}
                      onChange={(event) =>
                        updateStatus.mutate({
                          id: appointment.id,
                          status: event.target
                            .value as typeof appointment.status,
                        })
                      }
                      className="rounded-lg border bg-white p-2 px-3 text-xs font-semibold"
                    >
                      <option value="در انتظار">در انتظار</option>
                      <option value="تایید شده">تأیید شده</option>
                      <option value="تکمیل شده">انجام شده</option>
                      <option value="لغو شده">لغو شده</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ConsultantDashboardPage;
