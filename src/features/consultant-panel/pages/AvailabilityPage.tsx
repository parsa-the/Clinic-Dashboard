import { useEffect, useState } from "react";
import { Ban, Clock3, Plus, Save, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import { AsyncState } from "@/components/ui/AsyncState";
import type { ConsultantAvailability } from "@/types";
import {
  useAvailability,
  useUpdateAvailability,
} from "../hooks/useConsultantPanel";

const AvailabilityPage = () => {
  const query = useAvailability();
  const update = useUpdateAvailability();
  const [draft, setDraft] = useState<ConsultantAvailability | null>(null);
  const [blockedInputs, setBlockedInputs] = useState<Record<number, string>>(
    {},
  );

  useEffect(() => {
    if (query.data) setDraft(query.data);
  }, [query.data]);

  if (query.isError) {
    return (
      <div className="h-full overflow-y-auto bg-slate-50 p-6">
        <AsyncState type="error" onRetry={() => void query.refetch()} />
      </div>
    );
  }

  if (query.isLoading || !draft) {
    return (
      <div className="h-full overflow-y-auto bg-slate-50 p-6">
        <AsyncState type="loading" />
      </div>
    );
  }

  const toggleDay = (index: number) => {
    setDraft((current) => {
      if (!current) return current;
      const workingDays = [...current.workingDays];
      const currentDay = workingDays[index];
      workingDays[index] = {
        ...currentDay,
        enabled: !currentDay.enabled,
        ranges:
          !currentDay.enabled && currentDay.ranges.length === 0
            ? [{ from: "09:00", to: "13:00" }]
            : currentDay.ranges,
      };
      return { ...current, workingDays };
    });
  };

  const setRange = (
    dayIndex: number,
    rangeIndex: number,
    key: "from" | "to",
    value: string,
  ) => {
    setDraft((current) => {
      if (!current) return current;
      const workingDays = current.workingDays.map((day, index) => {
        if (index !== dayIndex) return day;
        const ranges = day.ranges.map((range, index2) =>
          index2 === rangeIndex ? { ...range, [key]: value } : range,
        );
        return { ...day, ranges };
      });
      return { ...current, workingDays };
    });
  };

  const addRange = (dayIndex: number) => {
    setDraft((current) => {
      if (!current) return current;
      return {
        ...current,
        workingDays: current.workingDays.map((day, index) =>
          index === dayIndex
            ? {
                ...day,
                ranges: [...day.ranges, { from: "14:00", to: "18:00" }],
              }
            : day,
        ),
      };
    });
  };

  const removeRange = (dayIndex: number, rangeIndex: number) => {
    setDraft((current) => {
      if (!current) return current;
      return {
        ...current,
        workingDays: current.workingDays.map((day, index) =>
          index === dayIndex
            ? {
                ...day,
                ranges: day.ranges.filter((_, index2) => index2 !== rangeIndex),
              }
            : day,
        ),
      };
    });
  };

  const addBlockedSlot = (dayIndex: number) => {
    const value = blockedInputs[dayIndex];
    if (!value) return;

    setDraft((current) => {
      if (!current) return current;
      const workingDays = current.workingDays.map((day, index) => {
        if (index !== dayIndex || day.blockedSlots.includes(value)) return day;
        return { ...day, blockedSlots: [...day.blockedSlots, value].sort() };
      });
      return { ...current, workingDays };
    });

    setBlockedInputs((current) => ({ ...current, [dayIndex]: "" }));
  };

  const removeBlockedSlot = (dayIndex: number, slot: string) => {
    setDraft((current) => {
      if (!current) return current;
      const workingDays = current.workingDays.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              blockedSlots: day.blockedSlots.filter((item) => item !== slot),
            }
          : day,
      );
      return { ...current, workingDays };
    });
  };

  const save = () => {
    const invalidRange = draft.workingDays.some((day) =>
      day.ranges.some((range) => range.from >= range.to),
    );

    if (invalidRange) {
      toast.error("ساعت شروع هر بازه باید قبل از ساعت پایان باشد.");
      return;
    }

    update.mutate(draft, {
      onSuccess: () => toast.success("برنامه کاری ذخیره شد."),
      onError: () => toast.error("ذخیره برنامه کاری انجام نشد."),
    });
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-4 pb-28 sm:p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-black">مدیریت زمان‌های کاری</h1>
        <p className="mt-2 text-sm text-slate-500">
          روز کاری، بازه‌های حضور و ساعت‌های مسدودشده را مدیریت کنید.
        </p>

        <div className="mt-6 grid gap-4">
          {draft.workingDays.map((day, dayIndex) => (
            <section
              key={day.day}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-bold">{day.day}</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {day.enabled ? "روز کاری" : "تعطیل"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleDay(dayIndex)}
                  className={`rounded-full px-4 py-2 text-xs font-bold ${
                    day.enabled
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {day.enabled ? "فعال" : "غیرفعال"}
                </button>
              </div>

              {day.enabled && (
                <div className="mt-4 grid gap-3">
                  {day.ranges.map((range, rangeIndex) => (
                    <div
                      key={`${day.day}-${rangeIndex}`}
                      className="grid items-center gap-3 rounded-xl bg-slate-50 p-3 sm:grid-cols-[auto_1fr_auto_1fr_auto]"
                    >
                      <Clock3
                        className="hidden text-slate-400 sm:block"
                        size={18}
                      />
                      <input
                        type="time"
                        value={range.from}
                        onChange={(event) =>
                          setRange(
                            dayIndex,
                            rangeIndex,
                            "from",
                            event.target.value,
                          )
                        }
                        className="rounded-lg border bg-white px-3 py-2"
                      />
                      <span className="text-center text-slate-400">تا</span>
                      <input
                        type="time"
                        value={range.to}
                        onChange={(event) =>
                          setRange(
                            dayIndex,
                            rangeIndex,
                            "to",
                            event.target.value,
                          )
                        }
                        className="rounded-lg border bg-white px-3 py-2"
                      />
                      <button
                        type="button"
                        onClick={() => removeRange(dayIndex, rangeIndex)}
                        className="grid size-9 place-items-center rounded-lg text-red-500 hover:bg-red-50"
                        aria-label="حذف بازه"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addRange(dayIndex)}
                    className="flex w-fit items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-700"
                  >
                    <Plus size={15} />
                    افزودن بازه کاری
                  </button>

                  <div className="rounded-xl border border-dashed p-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Ban size={16} className="text-red-500" />
                        مسدود کردن یک ساعت خاص
                      </div>
                      <div className="flex gap-2 sm:mr-auto">
                        <input
                          type="time"
                          value={blockedInputs[dayIndex] ?? ""}
                          onChange={(event) =>
                            setBlockedInputs((current) => ({
                              ...current,
                              [dayIndex]: event.target.value,
                            }))
                          }
                          className="rounded-lg border bg-white px-3 py-2"
                        />
                        <button
                          type="button"
                          onClick={() => addBlockedSlot(dayIndex)}
                          className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600"
                        >
                          <Plus size={15} />
                          مسدود
                        </button>
                      </div>
                    </div>

                    {day.blockedSlots.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        {day.blockedSlots.map((slot) => (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => removeBlockedSlot(dayIndex, slot)}
                            className="flex items-center gap-1 rounded-lg bg-red-50 px-2 py-1 font-semibold text-red-600"
                          >
                            {slot}
                            <X size={13} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        <button
          type="button"
          onClick={save}
          disabled={update.isPending}
          className="mt-6 flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3 font-bold text-white disabled:opacity-60"
        >
          <Save size={18} />
          {update.isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </div>
    </div>
  );
};

export default AvailabilityPage;
