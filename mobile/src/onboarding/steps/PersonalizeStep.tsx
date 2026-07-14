import { StyleSheet, TextInput } from "react-native";
import OnboardingLayout from "../OnboardingLayout";
import type { StepProps } from "./types";

export default function PersonalizeStep({ prefs, updatePrefs, theme, stepIndex, stepCount, onNext, onBack }: StepProps) {
  return (
    <OnboardingLayout
      theme={theme}
      stepIndex={stepIndex}
      stepCount={stepCount}
      eyebrow="Personalize"
      title="Last couple of details."
      subtitle="Optional, but it makes qw feel a little more like home."
      onBack={onBack}
      onContinue={onNext}
    >
      <TextInput
        style={[styles.input, { backgroundColor: theme.bgElevated, borderColor: theme.border, color: theme.text }]}
        placeholder="What should qw call you?"
        placeholderTextColor={theme.textFaint}
        value={prefs.displayName}
        onChangeText={(v) => updatePrefs({ displayName: v })}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.bgElevated, borderColor: theme.border, color: theme.text }]}
        placeholder="Homepage (e.g. https://...)"
        placeholderTextColor={theme.textFaint}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="url"
        value={prefs.homepage}
        onChangeText={(v) => updatePrefs({ homepage: v })}
      />
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    marginBottom: 12,
  },
});
