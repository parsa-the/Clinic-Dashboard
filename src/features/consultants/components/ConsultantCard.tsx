import { BriefcaseBusiness, Clock3, Star } from "lucide-react";
import type { Consultant } from "@/types";

type Props = {
  consultant: Consultant;
  selected?: boolean;
  onSelect?: (consultant: Consultant) => void;
  actionLabel?: string;
};

export const ConsultantCard = ({
  consultant,
  selected,
  onSelect,
  actionLabel = "انتخاب مشاور",
}: Props) => (
  <article
    className={`flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition ${
      selected ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200"
    }`}
  >
    <div className="flex items-start gap-4">
      <img
        src={consultant.profilePicture}
        alt={consultant.name}
        className="size-20 rounded-full border object-cover"
      />
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-slate-900">{consultant.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{consultant.specialty}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Star size={15} className="fill-amber-400 text-amber-400" />
            {consultant.rating}
          </span>
          <span className="flex items-center gap-1">
            <BriefcaseBusiness size={15} />
            {consultant.experience} سال سابقه
          </span>
        </div>
      </div>
    </div>

    <p className="mt-4 flex-1 text-sm leading-7 text-slate-500">
      {consultant.bio}
    </p>

    <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm">
      <span className="flex items-center gap-1 text-slate-500">
        <Clock3 size={15} />
        {consultant.span} دقیقه
      </span>
      <span className="font-bold">
        {consultant.consultationPrice.toLocaleString("fa-IR")} تومان
      </span>
    </div>

    {onSelect && (
      <button
        onClick={() => onSelect(consultant)}
        disabled={consultant.isAvailable === false}
        className="mt-4 w-full rounded-xl border-2 border-blue-600 py-2.5 font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400"
      >
        {consultant.isAvailable === false ? "در حال حاضر غیرفعال" : actionLabel}
      </button>
    )}
  </article>
);
