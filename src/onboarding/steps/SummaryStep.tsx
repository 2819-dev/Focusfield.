import OnboardingLayout from "../OnboardingLayout";
import type { StepProps } from "./types";

export default function SummaryStep({ prefs, stepIndex, stepCount, onNext, onBack }: StepProps) {
  const name = prefs.displayName.trim();
  return (
    <OnboardingLayout
      stepIndex={stepIndex}
      stepCount={stepCount}
      eyebrow="All set"
      title={name ? `Here's your qw, ${name}.` : "Here's your qw."}
      subtitle="Everything below applies the moment you continue."
      onBack={onBack}
      onContinue={onNext}
      continueLabel="Finish setup"
    >
      <ul className="summary-list">
        <li>
          <span className="summary-label">Search bar</span>
          <span className="summary-value">{prefs.searchBarPosition === "top" ? "Top" : "Bottom"}</span>
        </li>
        <li>
          <span className="summary-label">Theme</span>
          <span className="summary-value" style={{ textTransform: "capitalize" }}>
            {prefs.themeMode}
          </span>
        </li>
        <li>
          <span className="summary-label">Accent</span>
          <span className="summary-value">{prefs.accentColor.label}</span>
        </li>
        <li>
          <span className="summary-label">Tabs</span>
          <span className="summary-value">{prefs.tabLayout === "vertical" ? "Vertical" : "Horizontal"}</span>
        </li>
        <li>
          <span className="summary-label">Homepage</span>
          <span className="summary-value">{prefs.homepage}</span>
        </li>
      </ul>
    </OnboardingLayout>
  );
}
