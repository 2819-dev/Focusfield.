import type { ReactNode } from "react";

interface OnboardingLayoutProps {
  stepIndex: number;
  stepCount: number;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  onBack?: () => void;
  onContinue: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
}

export default function OnboardingLayout({
  stepIndex,
  stepCount,
  eyebrow,
  title,
  subtitle,
  children,
  onBack,
  onContinue,
  continueLabel = "Continue",
  continueDisabled,
}: OnboardingLayoutProps) {
  return (
    <div className="onboarding">
      <div className="onboarding__progress">
        {Array.from({ length: stepCount }).map((_, i) => (
          <div
            key={i}
            className={
              "onboarding__dot" +
              (i === stepIndex ? " onboarding__dot--active" : i < stepIndex ? " onboarding__dot--done" : "")
            }
          />
        ))}
      </div>

      <div className="onboarding__card">
        <p className="onboarding__eyebrow">{eyebrow}</p>
        <h1 className="onboarding__title">{title}</h1>
        {subtitle && <p className="onboarding__subtitle">{subtitle}</p>}

        {children}

        <div className="onboarding__nav">
          {onBack ? (
            <button className="onboarding__back" onClick={onBack}>
              Back
            </button>
          ) : (
            <span />
          )}
          <button className="onboarding__continue" onClick={onContinue} disabled={continueDisabled}>
            {continueLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
