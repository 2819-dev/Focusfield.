import { StyleSheet, View } from "react-native";
import OnboardingLayout from "../OnboardingLayout";
import OptionCard from "../../ui/OptionCard";
import type { StepProps } from "./types";
import type { SearchBarPosition } from "../../state/types";

const OPTIONS: { id: SearchBarPosition; title: string; desc: string }[] = [
  { id: "top", title: "Top", desc: "Classic — always visible above the page." },
  { id: "bottom", title: "Bottom", desc: "Thumb-friendly — reach it one-handed." },
];

export default function SearchBarStep({ prefs, updatePrefs, theme, stepIndex, stepCount, onNext, onBack }: StepProps) {
  return (
    <OnboardingLayout
      theme={theme}
      stepIndex={stepIndex}
      stepCount={stepCount}
      eyebrow="Layout"
      title="Where should your search bar live?"
      subtitle="You said this was the whole reason you left your last browser. Pick where it feels right."
      onBack={onBack}
      onContinue={onNext}
    >
      <View style={[styles.preview, { backgroundColor: theme.bgElevated, borderColor: theme.border }]}>
        {prefs.searchBarPosition === "top" && (
          <View style={[styles.bar, { backgroundColor: theme.bgElevated2 }]}>
            <View style={[styles.pillWide, { backgroundColor: theme.accentSoft }]} />
          </View>
        )}
        <View style={[styles.body, { backgroundColor: theme.bg }]} />
        {prefs.searchBarPosition === "bottom" && (
          <View style={[styles.bar, { backgroundColor: theme.bgElevated2 }]}>
            <View style={[styles.pillWide, { backgroundColor: theme.accentSoft }]} />
          </View>
        )}
      </View>

      {OPTIONS.map((opt) => (
        <OptionCard
          key={opt.id}
          theme={theme}
          title={opt.title}
          desc={opt.desc}
          selected={prefs.searchBarPosition === opt.id}
          onPress={() => updatePrefs({ searchBarPosition: opt.id })}
        />
      ))}
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  preview: {
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 10,
    marginBottom: 20,
  },
  bar: { height: 30, borderRadius: 999, justifyContent: "center", paddingHorizontal: 12 },
  pillWide: { height: 12, borderRadius: 999, width: "70%" },
  body: { height: 120, borderRadius: 12, marginVertical: 8 },
});
