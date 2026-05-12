import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH = new Intl.DateTimeFormat("en-US", { month: "long" });

export function DateStrip({
  anchorDate,
  selectedDate,
}: {
  anchorDate: Date;
  selectedDate: Date;
}) {
  const startOfWeek = new Date(anchorDate);
  startOfWeek.setDate(anchorDate.getDate() - anchorDate.getDay());

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  return (
    <div className="flex flex-col gap-5 rounded-3xl bg-card p-5 shadow-card">
      <header className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-tight">
          {anchorDate.getDate()} {MONTH.format(anchorDate)}
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous"
            className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          const selected =
            d.getDate() === selectedDate.getDate() &&
            d.getMonth() === selectedDate.getMonth() &&
            d.getFullYear() === selectedDate.getFullYear();
          return (
            <div
              key={i}
              className={cn(
                "flex flex-col items-center justify-center gap-2 rounded-2xl py-3 transition",
                selected
                  ? "bg-action text-action-foreground"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              <span
                className={cn(
                  "text-xs",
                  selected ? "text-action-foreground/80" : "text-muted-foreground",
                )}
              >
                {DAYS_OF_WEEK[i]}
              </span>
              <span
                className={cn(
                  "text-base font-semibold",
                  selected ? "text-action-foreground" : "text-foreground",
                )}
              >
                {d.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
