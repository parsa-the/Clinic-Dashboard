import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useDashboard } from "../hooks/useDashboard";
import type { DashboardStats } from "@/types";
import UpcomingAppointments from "../components/UpcomingAppointments";
import { useConsultants } from "@/features/consultants/hooks/useConsultants";
import { ConsultantCard } from "@/features/consultants/components/ConsultantCard";
import { useBookingStore } from "@/features/booking/store/booking.store";
import { AsyncState } from "@/components/ui/AsyncState";
import { StarIcon,CalendarDaysIcon, CircleCheckIcon, ClockIcon } from "@animateicons/react/lucide";

const createDashboardCards = (stats: DashboardStats) => [
  {
    title: "امتیاز شما",
    value: stats.totalScore,
    icon: StarIcon,
    iconColor: "text-yellow-400",
    after: "از ۵",
  },
  {
    title: "نوبت‌های لغوشده",
    value: stats.cancelledAppointments,
    icon: ClockIcon,
    iconColor: "text-red-500",
    after: "نوبت",
  },
  {
    title: "نوبت‌های انجام‌شده",
    value: stats.completedAppointments,
    icon: CircleCheckIcon,
    iconColor: "text-green-500",
    after: "نوبت",
  },
  {
    title: "نوبت‌های آینده",
    value: stats.upcomingAppointments,
    icon: CalendarDaysIcon,
    iconColor: "text-blue-500",
    after: "نوبت",
  },
];

const DashboardPage = () => {
  const { data, isError, isLoading, refetch } = useDashboard();
  const { data: consultants = [] } = useConsultants();
  const navigate = useNavigate();
  const booking = useBookingStore();

  return (
    <section className="flex h-full w-full flex-col">
      <Header />

      <main className="flex-1 overflow-auto bg-slate-50 px-4 py-2 pb-30 sm:px-6 md:px-10">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="flex items-end justify-between gap-4 py-6 sm:py-8">
            <div>
              <h1 className="text-xl font-black sm:text-2xl md:text-3xl">
                داشبورد
              </h1>
            </div>
          </div>

          {isLoading ? (
            <AsyncState type="loading" />
          ) : isError || !data ? (
            <AsyncState type="error" onRetry={() => void refetch()} />
          ) : (
            <>
              <div className="mb-5 grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-4 lg:gap-5">
                {createDashboardCards(data.stats).map((item) => (
                  <div
                    key={item.title}
                    className="flex w-full min-w-0 flex-row items-start justify-between gap-3 rounded-xl bg-white p-4 shadow-sm sm:p-6 lg:py-7"
                  >
                    <div className="flex min-w-0 flex-col justify-between gap-3 sm:gap-4">
                      <p className="truncate text-sm text-slate-500 sm:text-base">
                        {item.title}
                      </p>
                      <p className="text-2xl font-black sm:text-3xl lg:text-4xl">
                        {item.value.toLocaleString("fa-IR")}
                      </p>
                      <p className="text-xs text-slate-400 sm:text-sm">{item.after}</p>
                    </div>
                    <item.icon
                    size={55}
                      className={`size-8 shrink-0 sm:size-11 lg:size-14 ${item.iconColor}`}
                    />
                  </div>
                ))}
              </div>

              <UpcomingAppointments
                appointments={data.upcomingAppointments}
                consultants={consultants}
              />

              <section className="mt-5 rounded-2xl bg-white p-4 shadow-sm sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold sm:text-xl">مشاوران پیشنهادی</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      چند گزینه پیشنهادی بر اساس خدمات پرمراجعه
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/consultants")}
                    className="text-sm font-bold text-blue-600"
                  >
                    مشاهده همه
                  </button>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {data.recommendedConsultants.map((consultant) => (
                    <ConsultantCard
                      key={consultant.id}
                      consultant={consultant}
                      actionLabel="رزرو با این مشاور"
                      onSelect={() => {
                        booking.reset();
                        navigate("/booking");
                      }}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </section>
  );
};

export default DashboardPage;
