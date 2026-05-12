import { AuthInput, AuthPrimaryButton, AuthShell } from "@/components/auth-shell";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot password"
      subtitle="Enter your email account to reset your password"
      backHref="/auth/sign-in"
    >
      <AuthInput type="email" ariaLabel="Email" defaultValue="leonardo@travenor.app" />
      <AuthPrimaryButton>Reset Password</AuthPrimaryButton>
    </AuthShell>
  );
}
