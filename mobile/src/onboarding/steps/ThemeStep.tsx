import { Pressable, StyleSheet, Text, View } from "react-native";
import OnboardingLayout from "../OnboardingLayout";
import OptionCard from "../../ui/OptionCard";
import type { StepProps } from "./types";
import type { ThemeMode } from "../../state/types";
import { ACCENT_COLORS } from "../../state/defaults";

const MODES: { id: ThemeMode; title: string; desc: string }[] = [
  { id: "light", title: "Light", desc: "Bright chrome, best in daylight." },
  { id: "dark", title: "Dark", desc: "Easy on the eyes at night." },
  { id: "auto", title: "Auto", desc: "Follows your system setting." },
];

export default function ThemeStep({ prefs, updatePrefs, theme, stepIndex, stepCount, onNext, onBack }: StepProps) {
  return (
    <OnboardingLayout
      theme={theme}
      stepIndex={stepIndex}
      stepCount={stepCount}
      eyebrow="Appearance"
      title="Make it look like yours."
      subtitle="Pick a base theme and an accent color. Both apply everywhere in qw, instantly."
      onBack={onBack}
      onContinue={onNext}
    >
      {MODES.map((mode) => (
        <OptionCard
          key={mode.id}
          theme={theme}
          title={mode.title}
          desc={mode.desc}
          selected={prefs.themeMode === mode.id}
          onPress={() => updatePrefs({ themeMode: mode.id })}
        />
      ))}

      <Text style={[styles.label, { color: theme.text }]}>Accent color</Text>
      <View style={styles.swatchRow}>
        {ACCENT_COLORS.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => updatePrefs({ accentColor: c })}
            style={[
              styles.swatch,
              { backgroundColor: c.value },
              prefs.accentColor.id === c.id && { borderColor: theme.text, borderWidth: 2 },
            ]}
          />
        ))}
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: "600", marginTop: 4, marginBottom: 10 },
  swatchRow: { flexDirection: "row", gap: 12 },
  swatch: { width: 42, height: 42, borderRadius: 21 },
});
