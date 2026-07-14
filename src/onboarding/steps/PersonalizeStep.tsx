import OnboardingLayout from "../OnboardingLayout";
import type { StepProps } from "./types";

export default function PersonalizeStep({ prefs, updatePrefs, stepIndex, stepCount, onNext, onBack }: StepProps) {
  return (
    <OnboardingLayout
      stepIndex={stepIndex}
      stepCount={stepCount}
      eyebrow="Personalize"
      title="Last couple of details."
      subtitle="Optional, but it makes qw feel a little more like home."
      onBack={onBack}
      onContinue={onNext}
    >
      <div className="onboarding__options" style={{ marginBottom: 4 }}>
        <input
          className="text-input"
          placeholder="What should qw call you?"
          value={prefs.displayName}
          onChange={(e) => updatePrefs({ displayName: e.target.value })}
        />
        <input
          className="text-input"
          placeholder="Homepage (e.g. https://...)"
          value={prefs.homepage}
          onChange={(e) => updatePrefs({ homepage: e.target.value })}
        />
      </div>
    </OnboardingLayout>
  );
}
