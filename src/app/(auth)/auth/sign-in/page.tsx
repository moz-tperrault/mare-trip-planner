import Link from "next/link";
import { Eye } from "lucide-react";
import { AuthInput, AuthPrimaryButton, AuthShell } from "@/components/auth-shell";

export default function SignInPage() {
  return (
    <AuthShell
      title="Sign in now"
      subtitle="Please sign in to continue to your trips"
      backHref="/onboarding"
      footer={
        <>
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="font-medium text-action hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-sm text-muted-foreground">Or connect</p>
          <SocialButtons />
        </>
      }
    >
      <AuthInput type="email" ariaLabel="Email" defaultValue="leonardo@travenor.app" />
      <AuthInput
        type="password"
        ariaLabel="Password"
        defaultValue="••••••••"
        endAdornment={<Eye className="size-5 text-muted-foreground" />}
      />
      <div className="-mt-1 flex justify-end">
        <Link
          href="/auth/forgot-password"
          className="text-sm font-medium text-action hover:underline"
        >
          Forget Password?
        </Link>
      </div>
      <AuthPrimaryButton>Sign In</AuthPrimaryButton>
    </AuthShell>
  );
}

function SocialButtons() {
  return (
    <div className="flex items-center gap-4">
      {[
        { Icon: FacebookIcon, label: "Continue with Facebook" },
        { Icon: TwitterIcon, label: "Continue with Twitter" },
        { Icon: GoogleIcon, label: "Continue with Google" },
      ].map(({ Icon, label }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          className="inline-flex size-12 items-center justify-center rounded-2xl border border-border bg-card text-foreground transition hover:bg-muted"
        >
          <Icon className="size-5" />
        </button>
      ))}
    </div>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.6 9.87v-6.98H7.9V12h2.5V9.8c0-2.47 1.47-3.83 3.71-3.83 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.22 0-1.6.76-1.6 1.54V12h2.72l-.44 2.89H13.5v6.98A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.6 8.6 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.3 3.9A12.14 12.14 0 0 1 3 4.86a4.28 4.28 0 0 0 1.33 5.72 4.27 4.27 0 0 1-1.94-.54v.06a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97A8.6 8.6 0 0 1 2 19.07 12.13 12.13 0 0 0 8.56 21c7.87 0 12.18-6.52 12.18-12.18l-.01-.55A8.7 8.7 0 0 0 22.46 6z" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8a12 12 0 1 1 0-24c3 0 5.7 1.1 7.8 3l5.7-5.7A20 20 0 1 0 24 44a20 20 0 0 0 19.6-23.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7A20 20 0 0 0 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44a20 20 0 0 0 13.4-5.1l-6.2-5.2A12 12 0 0 1 12.7 28l-6.5 5A20 20 0 0 0 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.7l6.2 5.2c-.4.4 6.6-4.8 6.6-14.4 0-1.3-.1-2.7-.4-4z"
      />
    </svg>
  );
}
