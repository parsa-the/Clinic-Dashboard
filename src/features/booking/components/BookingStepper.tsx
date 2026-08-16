import { Check } from "lucide-react";

const steps = ["انتخاب خدمت", "انتخاب مشاور", "انتخاب زمان", "تأیید و پرداخت"];

export const BookingStepper = ({ currentStep }: { currentStep: number }) => (
  <div className="grid grid-cols-4 gap-1 rounded-2xl border bg-white p-4">
    {steps.map((label, index) => {
      const step = index + 1;
      const active = currentStep === step;
      const done = currentStep > step;

      return (
        <div key={label} className="relative flex flex-col items-center gap-2">
          {index < steps.length - 1 && (
            <span className="absolute right-1/2 top-4 hidden h-px w-full bg-slate-200 sm:block" />
          )}
          <span
            className={`relative z-1 grid size-8 place-items-center rounded-full border text-xs font-bold ${
              done
                ? "border-blue-600 bg-blue-600 text-white"
                : active
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-400"
            }`}
          >
            {done ? <Check size={16} /> : step.toLocaleString("fa-IR")}
          </span>
          <span
            className={`text-center text-[10px] sm:text-xs ${
              active || done ? "font-semibold text-slate-800" : "text-slate-400"
            }`}
          >
            {label}
          </span>
        </div>
      );
    })}
  </div>
);
