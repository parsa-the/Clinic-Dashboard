import { useState } from "react";
import { Ban, CalendarPlus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { AsyncState } from "@/components/ui/AsyncState";
import { sortAppointmentTimes } from "@/types/appointmentTimes";
import type { BlockedAvailabilityDate, ConsultantAvailability } from "@/types";
import { formatClinicDate } from "@/utils/date";
import { BlockAvailabilityModal } from "../components/BlockAvailabilityModal";
import {
  useAvailability,
  useUpdateAvailability,
} from "../hooks/useConsultantPanel";

const mergeBlockedDate = (
  availability: ConsultantAvailability,
  blockedDate: BlockedAvailabilityDate,
): ConsultantAvailability => {
  const existingDate = availability.blockedDates.find(
    (item) => item.date === blockedDate.date,
  );
  const blockedSlots = sortAppointmentTimes([
    ...new Set([
      ...(existingDate?.blockedSlots ?? []),
      ...blockedDate.blockedSlots,
    ]),
  ]);
  const remainingDates = availability.blockedDates.filter(
    (item) => item.date !== blockedDate.date,
  );

  return {
    ...availability,
    blockedDates: [...remainingDates, { ...blockedDate, blockedSlots }].sort(
      (firstDate, secondDate) => firstDate.date.localeCompare(secondDate.date),
    ),
  };
};

const AvailabilityPage = () => {
  const availabilityQuery = useAvailability();
  const updateAvailability = useUpdateAvailability();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (availabilityQuery.isError) {
    return (
      <div className="h-full overflow-y-auto bg-slate-50 p-6">
        <AsyncState
          type="error"
          onRetry={() => void availabilityQuery.refetch()}
        />
      </div>
    );
  }

  if (availabilityQuery.isLoading || !availabilityQuery.data) {
    return (
      <div className="h-full overflow-y-auto bg-slate-50 p-6">
        <AsyncState type="loading" />
      </div>
    );
  }

  const availability = availabilityQuery.data;

  const saveAvailability = (
    nextAvailability: ConsultantAvailability,
    successMessage: string,
    closeModal = false,
  ) => {
    updateAvailability.mutate(nextAvailability, {
      onSuccess: () => {
        if (closeModal) setIsModalOpen(false);
        toast.success(successMessage);
      },
      onError: () => toast.error("ذخیره زمان‌های مسدود انجام نشد."),
    });
  };

  const addBlockedDate = (blockedDate: BlockedAvailabilityDate) => {
    saveAvailability(
      mergeBlockedDate(availability, blockedDate),
      "زمان‌های انتخاب‌شده مسدود شدند.",
      true,
    );
  };

  const removeBlockedDate = (date: string) => {
    saveAvailability(
      {
        ...availability,
        blockedDates: availability.blockedDates.filter(
          (item) => item.date !== date,
        ),
      },
      "محدودیت این تاریخ حذف شد.",
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-4 pb-28 sm:p-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black">مدیریت زمان‌های مسدود</h1>
            <p className="mt-2 text-sm text-slate-500">
              تاریخ و ساعت‌هایی را ثبت کنید که کاربران نباید رزرو کنند.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex w-fit items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-bold text-white"
          >
            <CalendarPlus size={19} />
            افزودن تاریخ و ساعت
          </button>
        </div>

        <section className="mt-6 rounded-2xl border  bg-white flex gap-3 flex-col p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Ban className="text-zinc-500" size={23} />
            <h2 className="font-bold"> زمان‌های مسدود شده</h2>
            <span className="mr-auto rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
              {availability.blockedDates.length.toLocaleString("fa-IR")} تاریخ
            </span>
          </div>

          {availability.blockedDates.length === 0 ? (
            <AsyncState
              type="empty"
              title="هنوز زمانی مسدود نشده است"
              description="برای ثبت اولین محدودیت، دکمه افزودن تاریخ و ساعت را بزنید."
            />
          ) : (
            <div className="mt-4 grid gap-3">
              {availability.blockedDates.map((blockedDate) => (
                <article
                  key={blockedDate.date}
                  className="rounded-xl border border-red-100 bg-red-50/40 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-800">
                        {formatClinicDate(blockedDate.date)}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400" dir="ltr">
                        {blockedDate.date}
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={updateAvailability.isPending}
                      onClick={() => removeBlockedDate(blockedDate.date)}
                      className="grid size-10 place-items-center rounded-lg text-red-500 hover:bg-red-100 disabled:opacity-40"
                      aria-label={`حذف محدودیت ${formatClinicDate(blockedDate.date)}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2" dir="ltr">
                    {blockedDate.blockedSlots.map((time) => (
                      <span
                        key={time}
                        className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-semibold text-red-600"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {isModalOpen && (
        <BlockAvailabilityModal
          pending={updateAvailability.isPending}
          onClose={() => setIsModalOpen(false)}
          onSubmit={addBlockedDate}
        />
      )}
    </div>
  );
};

export default AvailabilityPage;
