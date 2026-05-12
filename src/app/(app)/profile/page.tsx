import Link from "next/link";
import { Bookmark, ChevronRight, Info, Plane, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menu = [
  { href: "/profile/edit", label: "Profile details", icon: User },
  { href: "/trips", label: "Saved escapes", icon: Bookmark },
  { href: "/trips", label: "Past journeys", icon: Plane },
  { href: "#", label: "Preferences", icon: Settings },
  { href: "#", label: "About Maré", icon: Info },
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-16 md:gap-20">
      <header className="flex flex-col items-center gap-5 pt-2 text-center">
        <Avatar className="size-28 border border-border">
          <AvatarImage src="https://i.pravatar.cc/192?img=12" alt="Leonardo" />
          <AvatarFallback>L</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs tracking-[0.32em] text-muted-foreground">A GUEST OF MARÉ</p>
          <h1 className="text-5xl font-light tracking-tight md:text-6xl">Leonardo</h1>
          <p className="text-sm text-muted-foreground">leonardo@mare.travel</p>
        </div>
      </header>

      <section className="grid grid-cols-3 divide-x divide-border/60 border-y border-border/60 py-10">
        {[
          { label: "Saved escapes", value: "12" },
          { label: "Journeys taken", value: "08" },
          { label: "On your atlas", value: "47" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-3 px-3 text-center"
          >
            <span className="text-4xl font-light tracking-tight text-action md:text-5xl">
              {stat.value}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs sm:tracking-[0.28em]">
              {stat.label}
            </span>
          </div>
        ))}
      </section>

      <section className="flex flex-col">
        {menu.map(({ href, label, icon: Icon }, i) => (
          <Link
            key={label + i}
            href={href}
            className="group flex items-center gap-5 border-t border-border/60 py-6 transition-colors hover:bg-muted/30 [&:last-child]:border-b"
          >
            <Icon className="size-5 text-muted-foreground" strokeWidth={1.5} />
            <span className="flex-1 text-lg font-light tracking-tight">{label}</span>
            <ChevronRight
              className="size-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-foreground"
              strokeWidth={1.5}
            />
          </Link>
        ))}
      </section>
    </div>
  );
}
