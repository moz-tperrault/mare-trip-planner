import Link from "next/link";
import { Eye } from "lucide-react";
import { AuthInput, AuthPrimaryButton, AuthShell } from "@/components/auth-shell";

export default function SignUpPage() {
  return (
    <AuthShell
      title="Sign up now"
      subtitle="Please fill the details and create account"
      backHref="/onboarding"
      footer={
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="font-medium text-action hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <AuthInput type="text" ariaLabel="Full name" defaultValue="Leonardo Smith" />
      <AuthInput type="email" ariaLabel="Email" defaultValue="leonardo@travenor.app" />
      <AuthInput
        type="password"
        ariaLabel="Password"
        defaultValue="••••••••"
        endAdornment={<Eye className="size-5 text-muted-foreground" />}
      />
      <p className="text-sm text-muted-foreground">Password must be at least 8 characters</p>
      <AuthPrimaryButton>Sign Up</AuthPrimaryButton>
    </AuthShell>
  );
}
