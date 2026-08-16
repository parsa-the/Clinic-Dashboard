import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { AsyncState } from "@/components/ui/AsyncState";
import { ConsultantCard } from "@/features/consultants/components/ConsultantCard";
import { useConsultants } from "@/features/consultants/hooks/useConsultants";
import { ServiceCard } from "@/features/services/components/ServiceCard";
import { useServices } from "@/features/services/hooks/useServices";
import { BookingStepper } from "../components/BookingStepper";
import { BookingSummary } from "../components/BookingSummary";
import { DateTimeStep } from "../components/DateTimeStep";
import { useCreateBooking } from "../hooks/useCreateBooking";
import { useBookingStore } from "../store/booking.store";

const stepTitles = [
  "خدمت موردنظر را انتخاب کنید",
  "مشاور مناسب را انتخاب کنید",
  "تاریخ و ساعت جلسه را مشخص کنید",
  "اطلاعات رزرو را بررسی کنید",
];

const BookingPage = () => {
  const navigate = useNavigate();
  const booking = useBookingStore();
  const servicesQuery = useServices();
  const consultantsQuery = useConsultants("", booking.service?.id ?? "");
  const createBooking = useCreateBooking();

  const canContinue =
    booking.currentStep === 1
      ? Boolean(booking.service)
      : booking.currentStep === 2
        ? Boolean(booking.consultant)
        : booking.currentStep === 3
          ? Boolean(booking.date && booking.time)
          : true;

  const previous = () => {
    if (booking.currentStep === 1) {
      navigate("/dashboard");
      return;
    }
    booking.setStep(booking.currentStep - 1);
  };

  const next = () => {
    if (!canContinue) return;
    booking.setStep(Math.min(4, booking.currentStep + 1));
  };

  const submit = () => {
    if (!booking.service || !booking.consultant || !booking.date || !booking.time) {
      toast.error("اطلاعات رزرو کامل نیست.");
      return;
    }

    createBooking.mutate(
      {
        serviceId: booking.service.id,
        consultantId: booking.consultant.id,
        date: booking.date,
        time: booking.time,
      },
      {
        onSuccess: (result) => {
          booking.reset();
          navigate(`/booking/result/${result.appointment.id}`, {
            state: result,
          });
        },
        onError: () => toast.error("ثبت رزرو ناموفق بود. دوباره تلاش کنید."),
      },
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-50 pb-28">
      <div className="mx-auto w-full max-w-6xl p-4 sm:p-6">
        <div className="mb-5">
          <h1 className="text-2xl font-black text-slate-900">رزرو نوبت</h1>
          <p className="mt-2 text-sm text-slate-500">
            {stepTitles[booking.currentStep - 1]}
          </p>
        </div>

        <BookingStepper currentStep={booking.currentStep} />

        <div className="mt-5">
          {booking.currentStep === 1 &&
            (servicesQuery.isLoading ? (
              <AsyncState type="loading" />
            ) : servicesQuery.isError ? (
              <AsyncState
                type="error"
                onRetry={() => void servicesQuery.refetch()}
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {(servicesQuery.data ?? []).map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    selected={booking.service?.id === service.id}
                    onSelect={booking.setService}
                  />
                ))}
              </div>
            ))}

          {booking.currentStep === 2 &&
            (consultantsQuery.isLoading ? (
              <AsyncState type="loading" />
            ) : consultantsQuery.isError ? (
              <AsyncState
                type="error"
                onRetry={() => void consultantsQuery.refetch()}
              />
            ) : (consultantsQuery.data ?? []).length === 0 ? (
              <AsyncState
                type="empty"
                title="مشاوری برای این خدمت پیدا نشد"
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {(consultantsQuery.data ?? []).map((consultant) => (
                  <ConsultantCard
                    key={consultant.id}
                    consultant={consultant}
                    selected={booking.consultant?.id === consultant.id}
                    onSelect={booking.setConsultant}
                  />
                ))}
              </div>
            ))}

          {booking.currentStep === 3 && booking.consultant && (
            <DateTimeStep
              consultantId={booking.consultant.id}
              selectedDate={booking.date}
              selectedTime={booking.time}
              onDateChange={booking.setDate}
              onTimeChange={booking.setTime}
            />
          )}

          {booking.currentStep === 4 && (
            <div className="grid gap-4">
              <BookingSummary
                booking={{
                  service: booking.service,
                  consultant: booking.consultant,
                  date: booking.date,
                  time: booking.time,
                  paymentMethod: booking.paymentMethod,
                }}
              />
              {createBooking.isError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  ثبت رزرو با خطا مواجه شد. اطلاعات شما حفظ شده است؛ دوباره روی
                  «تأیید و پرداخت» بزنید.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={previous}
            className="flex items-center gap-2 rounded-xl border bg-white px-5 py-3 font-semibold text-slate-700"
          >
            <ArrowRight size={18} />
            بازگشت
          </button>

          {booking.currentStep < 4 ? (
            <button
              onClick={next}
              disabled={!canContinue}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              ادامه
              <ArrowLeft size={18} />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={createBooking.isPending}
              className="rounded-xl bg-emerald-600 px-7 py-3 font-bold text-white disabled:opacity-60"
            >
              {createBooking.isPending ? "در حال ثبت..." : "تأیید و پرداخت"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
