import type { OnboardingPrefs } from "../../state/types";

export interface StepProps {
  prefs: OnboardingPrefs;
  updatePrefs: (patch: Partial<OnboardingPrefs>) => void;
  stepIndex: number;
  stepCount: number;
  onNext: () => void;
  onBack?: () => void;
}
