import { Clock3 } from "lucide-react";
import type { ClinicService } from "@/types";

type Props = {
  service: ClinicService;
  selected?: boolean;
  onSelect: (service: ClinicService) => void;
};

export const ServiceCard = ({ service, selected, onSelect }: Props) => (
  <button
    type="button"
    onClick={() => onSelect(service)}
    className={`w-full rounded-2xl border bg-white p-5 text-right transition ${
      selected
        ? "border-blue-500 ring-2 ring-blue-100"
        : "border-slate-200 hover:border-blue-300"
    }`}
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="font-bold text-slate-900">{service.name}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-500">
          {service.description}
        </p>
      </div>
      <span
        className={`mt-1 size-5 shrink-0 rounded-full border-2 ${
          selected ? "border-blue-600 bg-blue-600 ring-4 ring-blue-100" : ""
        }`}
      />
    </div>
    <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm">
      <span className="flex items-center gap-2 text-slate-500">
        <Clock3 size={16} />
        {service.duration} دقیقه
      </span>
      <span className="font-bold text-slate-800">
        {service.price.toLocaleString("fa-IR")} تومان
      </span>
    </div>
  </button>
);
