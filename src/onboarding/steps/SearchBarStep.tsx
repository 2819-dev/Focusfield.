import OnboardingLayout from "../OnboardingLayout";
import type { StepProps } from "./types";
import type { SearchBarPosition } from "../../state/types";

const OPTIONS: { id: SearchBarPosition; title: string; desc: string }[] = [
  { id: "top", title: "Top", desc: "Classic — address bar sits above the page, always in view." },
  { id: "bottom", title: "Bottom", desc: "Thumb-friendly — reach it without moving your hand up." },
];

export default function SearchBarStep({ prefs, updatePrefs, stepIndex, stepCount, onNext, onBack }: StepProps) {
  return (
    <OnboardingLayout
      stepIndex={stepIndex}
      stepCount={stepCount}
      eyebrow="Layout"
      title="Where should your search bar live?"
      subtitle="You said this was the whole reason you left your last browser. Pick where it feels right — you can move it again anytime."
      onBack={onBack}
      onContinue={onNext}
    >
      <div className="preview-frame">
        {prefs.searchBarPosition === "top" && (
          <div className="preview-frame__bar-top">
            <div className="preview-frame__dot" />
            <div className="preview-frame__dot" />
            <div className="preview-frame__search" />
          </div>
        )}
        <div className="preview-frame__body" />
        {prefs.searchBarPosition === "bottom" && (
          <div className="preview-frame__bar-bottom">
            <div className="preview-frame__dot" />
            <div className="preview-frame__dot" />
            <div className="preview-frame__search" />
          </div>
        )}
      </div>

      <div className="onboarding__options onboarding__options--row">
        {OPTIONS.map((opt) => (
          <button
            key={opt.id}
            className={
              "option-card" + (prefs.searchBarPosition === opt.id ? " option-card--selected" : "")
            }
            onClick={() => updatePrefs({ searchBarPosition: opt.id })}
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
