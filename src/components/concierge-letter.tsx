import { Reveal } from "@/components/motion/reveal";

/**
 * A weekly note from the concierge. The week number is computed at request
 * time so the eyebrow stays current without redeploying.
 *
 * The body is intentionally hardcoded — promote to a `letters` table in
 * Supabase if/when there are multiple entries to rotate.
 */

function weekOfYear(date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const days =
    (date.getTime() - start.getTime()) / 86_400_000 + start.getDay();
  return Math.ceil(days / 7);
}

export function ConciergeLetter() {
  const week = weekOfYear();
  return (
    <Reveal>
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-7 border-y border-border/60 py-16 text-center md:py-24">
        <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
          From the concierge · Week {week}
        </p>
        <p className="text-2xl font-light leading-[1.55] tracking-tight text-foreground md:text-3xl">
          There&rsquo;s a particular hour in late afternoon when the light at
          Casa del Mare turns ivory and the cliffs go quiet &mdash; the staff
          call it <em>l&rsquo;ora del respiro</em>, the hour of breath. We&rsquo;re
          sending more guests there this month than any other. If you&rsquo;d
          like to be among them, the suites with the western terraces are still
          held.
        </p>
        <p className="text-sm italic tracking-wide text-action">
          &mdash; M., your concierge
        </p>
      </section>
    </Reveal>
  );
}
