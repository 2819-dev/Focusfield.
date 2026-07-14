import type { AccentColor, OnboardingPrefs, PersistedState } from "./types";

export const ACCENT_COLORS: AccentColor[] = [
  { id: "violet", label: "Violet", value: "#7c6cf6" },
  { id: "coral", label: "Coral", value: "#ff6b5e" },
  { id: "mint", label: "Mint", value: "#2fd6a5" },
  { id: "amber", label: "Amber", value: "#f5a623" },
  { id: "sky", label: "Sky", value: "#3aa8ff" },
];

export const DEFAULT_PREFS: OnboardingPrefs = {
  displayName: "",
  searchBarPosition: "top",
  themeMode: "auto",
  accentColor: ACCENT_COLORS[0],
  tabLayout: "vertical",
  homepage: "https://www.google.com",
};

export const DEFAULT_STATE: PersistedState = {
  phase: "onboarding",
  onboardingStep: 0,
  prefs: DEFAULT_PREFS,
  trial: {
    status: "none",
    trialStartedAt: null,
    simulatedDayOffset: 0,
  },
};
