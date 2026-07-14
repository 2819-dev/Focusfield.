export type SearchBarPosition = "top" | "bottom";
export type ThemeMode = "light" | "dark" | "auto";
export type TabLayout = "vertical" | "horizontal";

export interface AccentColor {
  id: string;
  label: string;
  value: string;
}

export interface OnboardingPrefs {
  displayName: string;
  searchBarPosition: SearchBarPosition;
  themeMode: ThemeMode;
  accentColor: AccentColor;
  tabLayout: TabLayout;
  homepage: string;
}

export type AppPhase = "onboarding" | "paywall" | "browser";

export type TrialStatus = "none" | "trialing" | "subscribed" | "declined";

export interface TrialState {
  status: TrialStatus;
  trialStartedAt: number | null;
  /** Dev-only knob to preview day 1/5/7 states without waiting a week. */
  simulatedDayOffset: number;
}

export interface PersistedState {
  phase: AppPhase;
  onboardingStep: number;
  prefs: OnboardingPrefs;
  trial: TrialState;
}
