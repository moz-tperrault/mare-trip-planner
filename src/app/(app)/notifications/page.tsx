import Link from "next/link";
import { Bell, CalendarDays, CreditCard, MessageCircle, CloudSun } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { notifications } from "@/lib/data";
import { cn } from "@/lib/utils";

const TABS = ["Recent", "Earlier", "Archived"] as const;

const ICONS = {
  payment: CreditCard,
  trip: CalendarDays,
  message: MessageCircle,
  weather: CloudSun,
} as const;

const dateFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  hour: "numeric",
  minute: "2-digit",
});

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Notification"
        action={
          <Link
            href="#"
            className="block text-right text-sm font-semibold text-action hover:underline"
          >
            Clear all
          </Link>
        }
      />

      <nav
        className="flex items-center justify-between border-b border-border/60 pb-3"
        aria-label="Notification filters"
      >
        {TABS.map((tab, i) => (
          <button
            key={tab}
            type="button"
            className={cn(
              "px-2 py-1 text-base font-medium tracking-wide",
              i === 0 ? "font-semibold text-action" : "text-foreground",
            )}
          >
            {tab}
          </button>
        ))}
      </nav>

      <ul className="flex flex-col gap-2">
        {notifications.map((n, i) => {
          const Icon = ICONS[n.icon] ?? Bell;
          const highlighted = i === 0;
          return (
            <li
              key={n.id}
              className={cn(
                "flex items-start gap-4 rounded-2xl px-3 py-4",
                highlighted ? "bg-frame-shape" : "bg-transparent",
              )}
            >
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-card text-foreground shadow-sm">
                <Icon className="size-5" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <h3 className="text-base font-medium tracking-wide">{n.title}</h3>
                <p className="text-sm text-muted-foreground">{n.body}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {dateFmt.format(new Date(n.timestamp))}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
