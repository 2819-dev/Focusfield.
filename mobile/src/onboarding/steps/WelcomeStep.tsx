import OnboardingLayout from "../OnboardingLayout";
import type { StepProps } from "./types";

export default function WelcomeStep({ theme, stepIndex, stepCount, onNext }: StepProps) {
  return (
    <OnboardingLayout
      theme={theme}
      stepIndex={stepIndex}
      stepCount={stepCount}
      eyebrow="Welcome to qw."
      title="Let's make this browser yours."
      subtitle="A couple of quick choices and qw will feel like it was built around the way you actually browse — not the other way around. Takes about a minute."
      onContinue={onNext}
      continueLabel="Let's go"
    />
  );
}
