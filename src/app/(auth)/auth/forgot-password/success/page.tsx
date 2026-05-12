import Link from "next/link";
import { Mail } from "lucide-react";
import { AuthInput, AuthPrimaryButton, AuthShell } from "@/components/auth-shell";

export default function ForgotPasswordSuccessPage() {
  return (
    <>
      <AuthShell
        title="Forgot password"
        subtitle="Enter your email account to reset your password"
        backHref="/auth/sign-in"
      >
        <AuthInput type="email" ariaLabel="Email" defaultValue="leonardo@travenor.app" />
        <AuthPrimaryButton variant="action">Reset Password</AuthPrimaryButton>
      </AuthShell>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 px-6 backdrop-blur-sm">
        <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-card p-8 text-center shadow-2xl">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Mail className="size-6" />
          </span>
          <h2 className="text-lg font-semibold tracking-tight">Check your email</h2>
          <p className="text-sm text-muted-foreground">
            We have sent password recovery instructions to your email
          </p>
          <Link
            href="/auth/verify"
            className="mt-2 inline-flex h-11 items-center justify-center rounded-2xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Open email
          </Link>
        </div>
      </div>
    </>
  );
}
