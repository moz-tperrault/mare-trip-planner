"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function PageHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between gap-3 pb-2">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Back"
        className="inline-flex size-10 items-center justify-center rounded-full bg-muted text-foreground transition hover:bg-muted/80"
      >
        <ChevronLeft className="size-5" />
      </button>
      <h1 className="flex-1 text-center text-lg font-semibold tracking-tight">{title}</h1>
      <div className="w-10">{action}</div>
    </div>
  );
}
