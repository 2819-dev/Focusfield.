import type { OnboardingPrefs } from "../../state/types";
import type { Palette } from "../../theme/useTheme";

export interface StepProps {
  prefs: OnboardingPrefs;
  updatePrefs: (patch: Partial<OnboardingPrefs>) => void;
  theme: Palette;
  stepIndex: number;
  stepCount: number;
  onNext: () => void;
  onBack?: () => void;
}
