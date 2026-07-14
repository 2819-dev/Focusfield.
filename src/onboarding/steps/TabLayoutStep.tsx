import OnboardingLayout from "../OnboardingLayout";
import type { StepProps } from "./types";
import type { TabLayout } from "../../state/types";

const OPTIONS: { id: TabLayout; title: string; desc: string }[] = [
  { id: "vertical", title: "Vertical tabs", desc: "A sidebar list — built for people who keep 30 tabs open." },
  { id: "horizontal", title: "Horizontal tabs", desc: "Classic row across the top." },
];

export default function TabLayoutStep({ prefs, updatePrefs, stepIndex, stepCount, onNext, onBack }: StepProps) {
  return (
    <OnboardingLayout
      stepIndex={stepIndex}
      stepCount={stepCount}
      eyebrow="Tabs"
      title="How do you like your tabs?"
      subtitle="qw remembers this per window, so you can always change it later in settings."
      onBack={onBack}
      onContinue={onNext}
    >
      <div className="onboarding__options">
        {OPTIONS.map((opt) => (
          <button
            key={opt.id}
            className={"option-card" + (prefs.tabLayout === opt.id ? " option-card--selected" : "")}
            onClick={() => updatePrefs({ tabLayout: opt.id })}
          >
            <div>
              <div className="option-card__title">{opt.title}</div>
              <div className="option-card__desc">{opt.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </OnboardingLayout>
  );
}
