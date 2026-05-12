import Link from "next/link";
import { Check, CheckCheck, MoreVertical, PenSquare, Search as SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/page-header";
import { conversations } from "@/lib/data";

const timeFmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });
const dayFmt = new Intl.DateTimeFormat("en-US", { weekday: "short" });

function formatTimestamp(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) return timeFmt.format(date);
  const diff = (now.getTime() - date.getTime()) / 86_400_000;
  if (diff < 7) return dayFmt.format(date);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Messages"
        action={
          <button
            type="button"
            aria-label="Menu"
            className="inline-flex size-10 items-center justify-center rounded-full bg-muted text-foreground hover:bg-muted/80"
          >
            <MoreVertical className="size-5" />
          </button>
        }
      />

      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Messages</h2>
        <button
          type="button"
          aria-label="Compose"
          className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <PenSquare className="size-5" />
        </button>
      </div>

      <label className="relative block">
        <span className="sr-only">Search chats and messages</span>
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search for chats & messages"
          className="h-12 w-full rounded-2xl border-none bg-muted pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </label>

      <ul className="flex flex-col">
        {conversations.map((c) => (
          <li key={c.id}>
            <Link
              href={`/messages/${c.id}`}
              className="flex items-center gap-4 rounded-2xl px-2 py-4 transition hover:bg-muted/60"
            >
              <div className="relative">
                <Avatar className="size-12">
                  <AvatarImage src={c.avatarUrl} alt={c.name} />
                  <AvatarFallback>{c.name[0]}</AvatarFallback>
                </Avatar>
                {c.online && (
                  <span className="absolute bottom-0 right-0 inline-block size-3 rounded-full border-2 border-card bg-success" />
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <h3 className="truncate text-base font-medium">{c.name}</h3>
                {c.lastMessage.startsWith("You: ") ? (
                  <p className="truncate text-sm text-muted-foreground">
                    <span className="font-medium text-foreground/80">You:</span>{" "}
                    {c.lastMessage.slice(5)}
                  </p>
                ) : c.unread === 0 ? (
                  <p className="truncate text-sm text-primary">Typing…</p>
                ) : (
                  <p className="truncate text-sm text-muted-foreground">{c.lastMessage}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(c.lastMessageAt)}
                </span>
                {c.unread > 0 ? (
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {c.unread}
                  </span>
                ) : c.lastMessage.startsWith("You: ") ? (
                  <CheckCheck className="size-4 text-primary" />
                ) : (
                  <Check className="size-4 text-muted-foreground" />
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
