import OnboardingLayout from "../OnboardingLayout";
import OptionCard from "../../ui/OptionCard";
import type { StepProps } from "./types";
import type { TabLayout } from "../../state/types";

const OPTIONS: { id: TabLayout; title: string; desc: string }[] = [
  { id: "vertical", title: "Tab drawer", desc: "A side list you swipe in — built for people who keep dozens of tabs open." },
  { id: "horizontal", title: "Tab strip", desc: "Classic swipeable row, like Safari." },
];

export default function TabLayoutStep({ prefs, updatePrefs, theme, stepIndex, stepCount, onNext, onBack }: StepProps) {
  return (
    <OnboardingLayout
      theme={theme}
      stepIndex={stepIndex}
      stepCount={stepCount}
      eyebrow="Tabs"
      title="How do you like your tabs?"
      subtitle="qw remembers this, so you can always change it later in settings."
      onBack={onBack}
      onContinue={onNext}
    >
      {OPTIONS.map((opt) => (
        <OptionCard
          key={opt.id}
          theme={theme}
          title={opt.title}
          desc={opt.desc}
          selected={prefs.tabLayout === opt.id}
          onPress={() => updatePrefs({ tabLayout: opt.id })}
        />
      ))}
    </OnboardingLayout>
  );
}
