import { AlertCircle, Inbox } from "lucide-react";

type Props = {
  type: "loading" | "error" | "empty";
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export const AsyncState = ({ type, title, description, onRetry }: Props) => {
  if (type === "loading") {
    return (
      <div className="grid gap-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-24 animate-pulse rounded-2xl border bg-white"
          />
        ))}
      </div>
    );
  }

  const isError = type === "error";
  const Icon = isError ? AlertCircle : Inbox;

  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border bg-white p-8 text-center">
      <Icon className={isError ? "text-red-500" : "text-slate-400"} size={34} />
      <h3 className="mt-3 font-bold text-slate-800">
        {title ?? (isError ? "خطایی رخ داد" : "موردی پیدا نشد")}
      </h3>
      {description && (
        <p className="mt-2 max-w-md text-sm leading-7 text-slate-500">
          {description}
        </p>
      )}
      {isError && onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white"
        >
          تلاش مجدد
        </button>
      )}
    </div>
  );
};
