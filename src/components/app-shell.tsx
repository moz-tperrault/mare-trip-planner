import Link from "next/link";
import { Bell, CalendarDays, Home, MessageCircle, Search, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NAV = [
  { href: "/", label: "Atlas", icon: Home },
  { href: "/trips", label: "Journeys", icon: CalendarDays },
  { href: "/messages", label: "Concierge", icon: MessageCircle },
  { href: "/profile", label: "You", icon: User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <TopBar />
      <main className="mx-auto w-full max-w-screen-xl px-5 pt-8 pb-28 md:pb-16 md:px-10 lg:px-16">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/40 bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between gap-4 px-5 py-4 md:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-display text-2xl font-light tracking-tight text-foreground">
            Maré
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Search className="size-4" />
          </Link>
          <Link
            href="/notifications"
            aria-label="Notifications"
            className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Bell className="size-4" />
          </Link>
          <Link href="/profile" className="ml-1">
            <Avatar className="size-9 border border-border">
              <AvatarImage src="https://i.pravatar.cc/96?img=12" alt="" />
              <AvatarFallback>L</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}

function BottomNav() {
  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-border/40 bg-background/95 px-2 py-2 backdrop-blur md:hidden"
    >
      {NAV.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-1 flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] tracking-wide text-muted-foreground hover:text-foreground"
        >
          <Icon className="size-5" strokeWidth={1.5} />
          {label}
        </Link>
      ))}
      <Link
        href="/search"
        aria-label="Search"
        className="absolute -top-6 left-1/2 flex size-12 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30"
      >
        <Search className="size-5" strokeWidth={1.5} />
      </Link>
    </nav>
  );
}
