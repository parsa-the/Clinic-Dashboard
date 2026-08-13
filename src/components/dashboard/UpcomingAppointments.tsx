import type { Appointment } from "@/types";
import { useCancelAppointment } from "../../features/hooks/useCancelAppointment";
import { useState } from "react";
import DetailModal from "./DetailModal";
type Props = {
  appointments: Appointment[];
};

const UpcomingAppointments = ({ appointments }: Props) => {
  const {
    mutate: cancelAppointment,
    isPending,
    variables: cancellingId,
  } = useCancelAppointment();
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const StatusStyle = (status: Appointment["status"]) => {
    switch (status) {
      case "تایید شده":
        return "bg-green-100 text-green-600";

      case "در انتظار":
        return "bg-yellow-100 text-yellow-600";

      case "لغو شده":
        return "bg-red-100 text-red-600";

      case "تکمیل شده":
        return "bg-blue-100 text-blue-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
      <h1 className="text-lg font-medium sm:text-xl md:text-2xl">
        نوبت‌های آینده
      </h1>

      <div className="mt-4">
        {appointments.map((items) => (
          <div
            key={items.id}
            className="my-2 flex flex-col gap-4 rounded-xl border p-4 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex min-w-0 items-center gap-3 sm:gap-6">
              <div className="flex shrink-0 flex-col items-center pl-2 text-sm sm:pl-5">
                <p className="font-bold">{items.startTime}</p>
                <p className="text-slate-400">{items.date}</p>
              </div>

              <img
                src={items.ProfilePicture}
                alt={items.doctorName}
                className="h-14 w-14 shrink-0 rounded-full border object-cover sm:h-20 sm:w-20"
              />

              <div className="flex min-w-0 flex-col">
                <p className="truncate font-medium">{items.doctorName}</p>

                <p className="truncate text-sm text-slate-500">
                  {items.service}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-start sm:gap-15 lg:justify-end">
              <p
                className={`shrink-0 rounded-full px-3 py-1 text-sm ${StatusStyle(
                  items.status,
                )}`}
              >
                {items.status}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedAppointment(items);
                  }}
                  className="rounded-sm border border-zinc-600 px-3 p-2 text-sm text-zinc-600 sm:text-base"
                >
                  جزئیات
                </button>
                <button
                  disabled={isPending}
                  onClick={() => cancelAppointment(items.id)}
                  className="
                  rounded-md border border-red-400
                  px-3 py-2 text-xs text-red-500
                  transition hover:bg-red-50
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:px-4 sm:text-sm
                  "
                  >
                  {isPending && cancellingId === items.id
                    ? "در حال لغو..."
                    : "لغو نوبت"}
                </button>
              </div>
            </div>
            
          </div>
        ))}
      </div>
        {selectedAppointment && (
          <DetailModal
            appointment={selectedAppointment}
            toggleModal={() => setSelectedAppointment(null)}
          />
        )}
      <button className="w-full pt-5 font-semibold text-blue-600">
        مشاهده همه نوبت ها
      </button>
    </section>
  );
};

export default UpcomingAppointments;
