import type { Appointment } from "@/types";
import {
  CalendarDays,
  Clock3,
  FileText,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";

type Props = {
  appointment: Appointment;
  toggleModal: () => void;
};

const DetailModal = ({ appointment, toggleModal }: Props) => {
  const getStatusStyle = (status: Appointment["status"]) => {
    switch (status) {
      case "تایید شده":
        return "bg-green-100 text-green-700";

      case "در انتظار":
        return "bg-yellow-100 text-yellow-700";

      case "لغو شده":
        return "bg-red-100 text-red-700";

      case "تکمیل شده":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div
      className="fixed inset-0 z-200 flex min-h-screen w-full items-center justify-center bg-black/30 p-3 backdrop-blur-sm sm:p-5"
      onClick={toggleModal}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b bg-white px-4 py-4 sm:px-6">
          <div>
            <h2 className="text-base font-bold text-zinc-800 sm:text-lg">
              جزئیات نوبت
            </h2>

            <p className="mt-1 text-xs text-zinc-400">اطلاعات کامل نوبت شما</p>
          </div>

          <button
            onClick={toggleModal}
            className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
          >
            <X size={21} />
          </button>
        </header>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6">
          {/* Doctor */}
          <div className="flex flex-col items-center rounded-xl border bg-white p-5 shadow-sm sm:flex-row sm:gap-5">
            <img
              src={appointment.ProfilePicture}
              alt={appointment.doctorName}
              className="h-20 w-20 rounded-full border-2 border-slate-100 object-cover sm:h-24 sm:w-24"
            />

            <div className="mt-4 text-center sm:mt-0 sm:text-right">
              <p className="text-xl font-bold text-zinc-800">
                {appointment.doctorName}
              </p>

              <div className="mt-2 flex items-center justify-center gap-2 text-sm text-zinc-500 sm:justify-start">
                <Stethoscope size={16} />
                <span>{appointment.service}</span>
              </div>

              <span
                className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                  appointment.status,
                )}`}
              >
                {appointment.status}
              </span>
            </div>
          </div>

          {/* Appointment information */}
          <div className="mt-4 rounded-xl border bg-white p-4 shadow-sm sm:p-5">
            <h3 className="mb-4 text-base font-bold text-zinc-800">
              اطلاعات نوبت
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Date */}
              <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
                <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <p className="text-xs text-zinc-400">تاریخ</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-700">
                    {appointment.date}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
                <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
                  <Clock3 size={20} />
                </div>

                <div>
                  <p className="text-xs text-zinc-400">ساعت</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-700">
                    {appointment.startTime}
                  </p>
                </div>
              </div>

              {/* Doctor */}
              <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
                <div className="rounded-lg bg-green-100 p-2 text-green-600">
                  <UserRound size={20} />
                </div>

                <div>
                  <p className="text-xs text-zinc-400">مشاور</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-700">
                    {appointment.doctorName}
                  </p>
                </div>
              </div>

              {/* Service */}
              <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
                <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
                  <FileText size={20} />
                </div>

                <div>
                  <p className="text-xs text-zinc-400">نوع خدمت</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-700">
                    {appointment.service}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mt-4 rounded-xl border bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-zinc-800">وضعیت نوبت</p>

                <p className="mt-1 text-xs text-zinc-400">
                  وضعیت فعلی نوبت شما
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium sm:text-sm ${getStatusStyle(
                  appointment.status,
                )}`}
              >
                {appointment.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
