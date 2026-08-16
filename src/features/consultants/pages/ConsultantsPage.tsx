import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AsyncState } from "@/components/ui/AsyncState";
import { ConsultantCard } from "../components/ConsultantCard";
import { useConsultants } from "../hooks/useConsultants";
import { useBookingStore } from "@/features/booking/store/booking.store";

const ConsultantsPage = () => {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const navigate = useNavigate();
  const booking = useBookingStore();
  const query = useConsultants(search);

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-4 pb-28 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-black">مشاوران</h1>
        <p className="mt-2 text-sm text-slate-500">
          با جستجو و بررسی تخصص مشاور، گزینه مناسب را انتخاب کنید.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_240px]">
          <label className="flex items-center gap-3 rounded-2xl border bg-white px-4 shadow-sm">
            <Search className="text-slate-400" size={20} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-14 w-full bg-transparent outline-none"
              placeholder="جستجوی نام یا تخصص مشاور..."
            />
          </label>
          <select
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
            className="h-14 rounded-2xl border bg-white px-4 text-sm font-semibold outline-none"
          >
            <option value="all">همه تخصص‌ها</option>
            <option value="فردی">مشاوره فردی</option>
            <option value="کودک">کودک و نوجوان</option>
            <option value="خانواده">خانواده و زوج‌درمانی</option>
            <option value="بالینی">روانشناسی بالینی</option>
          </select>
        </div>

        <div className="mt-5">
          {query.isLoading ? (
            <AsyncState type="loading" />
          ) : query.isError ? (
            <AsyncState type="error" onRetry={() => void query.refetch()} />
          ) : (query.data ?? []).filter(
              (consultant) =>
                specialty === "all" || consultant.specialty.includes(specialty),
            ).length === 0 ? (
            <AsyncState type="empty" title="مشاوری پیدا نشد" />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {(query.data ?? [])
                .filter(
                  (consultant) =>
                    specialty === "all" ||
                    consultant.specialty.includes(specialty),
                )
                .map((consultant) => (
                <ConsultantCard
                  key={consultant.id}
                  consultant={consultant}
                  actionLabel="رزرو نوبت"
                  onSelect={() => {
                    booking.reset();
                    navigate("/booking");
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultantsPage;
