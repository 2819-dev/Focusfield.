import OnboardingLayout from "../OnboardingLayout";
import type { StepProps } from "./types";
import type { ThemeMode } from "../../state/types";
import { ACCENT_COLORS } from "../../state/defaults";

const MODES: { id: ThemeMode; title: string; desc: string }[] = [
  { id: "light", title: "Light", desc: "Bright chrome, best in daylight." },
  { id: "dark", title: "Dark", desc: "Easy on the eyes at night." },
  { id: "auto", title: "Auto", desc: "Follows your system setting." },
];

export default function ThemeStep({ prefs, updatePrefs, stepIndex, stepCount, onNext, onBack }: StepProps) {
  return (
    <OnboardingLayout
      stepIndex={stepIndex}
      stepCount={stepCount}
      eyebrow="Appearance"
      title="Make it look like yours."
      subtitle="Pick a base theme and an accent color. Both apply everywhere in qw, instantly."
      onBack={onBack}
      onContinue={onNext}
    >
      <div className="onboarding__options onboarding__options--row" style={{ marginBottom: 22 }}>
        {MODES.map((mode) => (
          <button
            key={mode.id}
            className={"option-card" + (prefs.themeMode === mode.id ? " option-card--selected" : "")}
            onClick={() => updatePrefs({ themeMode: mode.id })}
          >
            <div>
              <div className="option-card__title">{mode.title}</div>
              <div className="option-card__desc">{mode.desc}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="option-card__title" style={{ marginBottom: 4 }}>
        Accent color
      </div>
      <div className="swatch-row">
        {ACCENT_COLORS.map((c) => (
          <button
            key={c.id}
            aria-label={c.label}
            className={"swatch" + (prefs.accentColor.id === c.id ? " swatch--selected" : "")}
            style={{ background: c.value }}
            onClick={() => updatePrefs({ accentColor: c })}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}
