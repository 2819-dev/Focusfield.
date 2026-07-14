import { useAppStore } from "../state/appStore";
import "./onboarding.css";
import WelcomeStep from "./steps/WelcomeStep";
import SearchBarStep from "./steps/SearchBarStep";
import ThemeStep from "./steps/ThemeStep";
import TabLayoutStep from "./steps/TabLayoutStep";
import PersonalizeStep from "./steps/PersonalizeStep";
import SummaryStep from "./steps/SummaryStep";
import type { StepProps } from "./steps/types";

const STEPS: Array<(props: StepProps) => JSX.Element> = [
  WelcomeStep,
  SearchBarStep,
  ThemeStep,
  TabLayoutStep,
  PersonalizeStep,
  SummaryStep,
];

export default function Onboarding() {
  const { state, dispatch } = useAppStore();
  const stepIndex = Math.min(state.onboardingStep, STEPS.length - 1);
  const StepComponent = STEPS[stepIndex];

  function goNext() {
    if (stepIndex === STEPS.length - 1) {
      dispatch({ type: "COMPLETE_ONBOARDING" });
    } else {
      dispatch({ type: "SET_ONBOARDING_STEP", step: stepIndex + 1 });
    }
  }

  function goBack() {
    dispatch({ type: "SET_ONBOARDING_STEP", step: Math.max(0, stepIndex - 1) });
  }

  return (
    <StepComponent
      prefs={state.prefs}
      updatePrefs={(patch) => dispatch({ type: "UPDATE_PREFS", prefs: patch })}
      stepIndex={stepIndex}
      stepCount={STEPS.length}
      onNext={goNext}
      onBack={stepIndex === 0 ? undefined : goBack}
    />
  );
}
