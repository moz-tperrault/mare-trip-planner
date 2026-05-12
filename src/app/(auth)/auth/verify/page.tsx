import { AuthPrimaryButton, AuthShell } from "@/components/auth-shell";

const OTP = ["8", "6", "9", "5"];

export default function VerifyPage() {
  return (
    <AuthShell
      title="OTP Verification"
      subtitle="Please check your email leonardo@travenor.app to see the verification code"
      backHref="/auth/forgot-password"
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold tracking-tight">OTP Code</h2>
        <div className="grid grid-cols-4 gap-3">
          {OTP.map((digit, i) => (
            <input
              key={i}
              defaultValue={digit}
              inputMode="numeric"
              maxLength={1}
              aria-label={`Digit ${i + 1}`}
              className="h-14 rounded-2xl border-none bg-muted text-center text-lg font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          ))}
        </div>
      </div>
      <AuthPrimaryButton>Verify</AuthPrimaryButton>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Resend code in</span>
        <span>01:26</span>
      </div>
    </AuthShell>
  );
}
