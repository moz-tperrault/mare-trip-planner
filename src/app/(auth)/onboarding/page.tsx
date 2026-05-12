"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "I.",
    title: "Arrive",
    accent: "before you leave.",
    body:
      "From the first moment you begin planning, we hold a quiet space for you — no clutter, no urgency.",
    cta: "Begin",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "II.",
    title: "Slow",
    accent: "places, slowly visited.",
    body:
      "Wellness retreats, fjord cabins, sea-cliff villas — each held by a person, never a feed.",
    cta: "Continue",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "III.",
    title: "Reserve",
    accent: "in a breath.",
    body: "Hand off the logistics. Your concierge confirms within the hour.",
    cta: "Open Maré",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  function next() {
    if (isLast) {
      router.push("/auth/sign-up");
    } else {
      setStep((s) => s + 1);
    }
  }

  return (
    <main className="flex min-h-dvh flex-col bg-background md:flex-row">
      <div className="relative h-[55vh] min-h-[320px] overflow-hidden md:h-auto md:flex-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.image}
          src={current.image}
          alt=""
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/10 via-transparent to-foreground/30 md:bg-gradient-to-r md:from-foreground/0 md:via-foreground/0 md:to-background" />
        <Link
          href="/auth/sign-in"
          className="absolute right-6 top-6 text-sm tracking-[0.2em] text-background/90 hover:text-background"
        >
          SKIP
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-8 py-12 md:flex-[0_0_44%] md:justify-center md:px-16">
        <span className="text-xs tracking-[0.32em] text-action">{current.eyebrow}</span>
        <h1 className="text-5xl font-light leading-[1.04] tracking-tight md:text-6xl">
          {current.title}{" "}
          <em className="not-italic text-action">{current.accent}</em>
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
          {current.body}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-2" aria-hidden>
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-px transition-all",
                i === step ? "w-12 bg-foreground" : "w-6 bg-foreground/20",
              )}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-6">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="text-sm tracking-[0.2em] text-muted-foreground hover:text-foreground"
            >
              BACK
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={next}
            className="inline-flex h-12 items-center gap-3 rounded-full bg-foreground px-8 text-sm font-medium tracking-wide text-background transition hover:bg-foreground/90"
          >
            {current.cta}
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </main>
  );
}
