import MobileNav from "../../components/user-dashboard/MobileNav";
import Header from "../../components/user-dashboard/Header";
import { useDashboard } from "../../features/hooks/useDashboard";
import toast, { LoaderIcon } from "react-hot-toast";
import { CalendarDaysIcon, CheckCircle2, Clock, Star } from "lucide-react";
import type { DashboardStats } from "@/types";
import UpcomingAppointments from "../../components/user-dashboard/UpcomingAppointments";
import DetailModal from "../../components/user-dashboard/DetailModal";
import { useState } from "react";
import { useConsultants } from "../../features/hooks/useConsultants";

const Dashboard = () => {
  const CardsDataArray = (stats: DashboardStats) => [
    {
      title: "امتیاز شما",
      value: stats.totalScore,
      icon: Star,
      iconColor: "text-yellow-400",
      after: "از 5",
    },
    {
      title: "نوبت‌های لغوشده",
      value: stats.cancelledAppointments,
      icon: Clock,
      iconColor: "text-red-500",
      after: "نوبت",
    },
    {
      title: "نوبت‌های انجام‌شده",
      value: stats.completedAppointments, // fixed: was upcomingAppointments
      icon: CheckCircle2,
      iconColor: "text-green-500",
      after: "نوبت",
    },
    {
      title: "نوبت‌های آینده",
      value: stats.upcomingAppointments, // fixed: was cancelledAppointments
      icon: CalendarDaysIcon,
      iconColor: "text-blue-500",
      after: "نوبت",
    },
  ];

  const { data, isError, isLoading } = useDashboard();
  const { data: consultants = [] } = useConsultants();

  if (isError) {
    toast.error("یک مشکلی پیش آمده!");
  }

  return (
    <section className="flex  h-full w-full flex-col">
      <Header />

      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <LoaderIcon />
        </div>
      )}

      {data && (
        <main className="flex-1  overflow-auto pb-30 bg-slate-50 px-4 py-2 sm:px-6 md:px-10">
          <div className="mx-auto  w-full max-w-[1600px]">
            <h1 className="py-6 text-xl font-bold sm:py-8 sm:text-2xl md:text-3xl">
              داشبورد
            </h1>
            <div className="grid mb-5 grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-4  lg:gap-5 ">
              {CardsDataArray(data.stats).map((item) => (
                <div
                  key={item.title}
                  className="flex w-full min-w-0 flex-row items-start justify-between gap-3 rounded-xl bg-white p-4 shadow-sm transition-shadow sm:p-6 lg:py-7"
                >
                  <div className="flex min-w-0 flex-col justify-between gap-3 sm:gap-4">
                    <p className="truncate text-sm text-slate-500 sm:text-base">
                      {item.title}
                    </p>

                    <p className="text-2xl font-black sm:text-3xl lg:text-4xl">
                      {item.value}
                    </p>

                    <p className="text-xs text-slate-400 sm:text-sm">
                      {item.after}
                    </p>
                  </div>

                  <item.icon
                    className={`size-8 shrink-0 sm:size-11 lg:size-14 ${item.iconColor}`}
                  />
                </div>
              ))}
            </div>
            <UpcomingAppointments
              appointments={data.upcomingAppointments}
              consultants={consultants}
            />
          </div>
        </main>
      )}
      
    </section>
  );
};

export default Dashboard;
