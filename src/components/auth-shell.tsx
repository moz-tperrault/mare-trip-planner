import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function AuthShell({
  backHref = "/onboarding",
  title,
  subtitle,
  children,
  footer,
}: {
  backHref?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pt-6 pb-12">
      <Link
        href={backHref}
        aria-label="Back"
        className="inline-flex size-11 items-center justify-center rounded-full bg-muted text-foreground transition hover:bg-muted/80"
      >
        <ChevronLeft className="size-5" />
      </Link>

      <header className="mt-12 flex flex-col items-center gap-3 text-center">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
        {subtitle && (
          <p className="max-w-sm text-base text-muted-foreground">{subtitle}</p>
        )}
      </header>

      <div className="mt-10 flex flex-1 flex-col gap-6">{children}</div>

      {footer && <footer className="mt-8 flex flex-col items-center gap-4">{footer}</footer>}
    </main>
  );
}

export function AuthInput({
  type = "text",
  defaultValue,
  placeholder,
  ariaLabel,
  endAdornment,
}: {
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  ariaLabel: string;
  endAdornment?: React.ReactNode;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{ariaLabel}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-14 w-full rounded-2xl border-none bg-muted px-5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      {endAdornment && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2">{endAdornment}</span>
      )}
    </label>
  );
}

export function AuthPrimaryButton({
  children,
  variant = "primary",
  type = "submit",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "action";
}) {
  return (
    <button
      type={type}
      {...rest}
      className={
        "inline-flex h-14 w-full items-center justify-center rounded-2xl text-base font-semibold transition " +
        (variant === "primary"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "bg-action text-action-foreground hover:bg-action/90")
      }
    >
      {children}
    </button>
  );
}
