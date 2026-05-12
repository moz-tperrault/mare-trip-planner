import Link from "next/link";

export default function SplashPage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-primary text-primary-foreground">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=80"
        alt=""
        className="absolute inset-0 size-full object-cover opacity-25"
        aria-hidden
      />
      <div className="relative flex flex-col items-center gap-10 px-6 text-center">
        <span className="text-xs tracking-[0.4em] text-primary-foreground/70">
          QUIET PLACES, SLOWLY VISITED
        </span>
        <h1 className="text-7xl font-light leading-none tracking-tight md:text-9xl">
          Maré
        </h1>
        <p className="max-w-md text-base leading-relaxed text-primary-foreground/80">
          A concierge for unhurried travel — wellness retreats, spa resorts,
          and quiet places held by hand.
        </p>
        <Link
          href="/onboarding"
          className="mt-4 inline-flex h-12 items-center gap-3 rounded-full border border-primary-foreground/40 px-8 text-sm tracking-[0.2em] text-primary-foreground transition hover:bg-primary-foreground hover:text-primary"
        >
          BEGIN
          <span aria-hidden>→</span>
        </Link>
      </div>
    </main>
  );
}
