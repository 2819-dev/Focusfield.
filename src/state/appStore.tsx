import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { DEFAULT_STATE } from "./defaults";
import type { AppPhase, OnboardingPrefs, PersistedState } from "./types";

const STORAGE_KEY = "qw.state.v1";

function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as PersistedState;
    return { ...DEFAULT_STATE, ...parsed, prefs: { ...DEFAULT_STATE.prefs, ...parsed.prefs } };
  } catch {
    return DEFAULT_STATE;
  }
}

type Action =
  | { type: "SET_ONBOARDING_STEP"; step: number }
  | { type: "UPDATE_PREFS"; prefs: Partial<OnboardingPrefs> }
  | { type: "COMPLETE_ONBOARDING" }
  | { type: "START_TRIAL" }
  | { type: "CONTINUE_FREE" }
  | { type: "SET_SIMULATED_DAY_OFFSET"; days: number }
  | { type: "SET_PHASE"; phase: AppPhase }
  | { type: "RESTART_ONBOARDING" };

function reducer(state: PersistedState, action: Action): PersistedState {
  switch (action.type) {
    case "SET_ONBOARDING_STEP":
      return { ...state, onboardingStep: action.step };
    case "UPDATE_PREFS":
      return { ...state, prefs: { ...state.prefs, ...action.prefs } };
    case "COMPLETE_ONBOARDING":
      return { ...state, phase: "paywall" };
    case "START_TRIAL":
      return {
        ...state,
        phase: "browser",
        trial: { ...state.trial, status: "trialing", trialStartedAt: Date.now() },
      };
    case "CONTINUE_FREE":
      return { ...state, phase: "browser", trial: { ...state.trial, status: "declined" } };
    case "SET_SIMULATED_DAY_OFFSET":
      return { ...state, trial: { ...state.trial, simulatedDayOffset: action.days } };
    case "SET_PHASE":
      return { ...state, phase: action.phase };
    case "RESTART_ONBOARDING":
      return { ...DEFAULT_STATE };
    default:
      return state;
  }
}

interface AppStore {
  state: PersistedState;
  dispatch: React.Dispatch<Action>;
}

const AppStoreContext = createContext<AppStore | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore(): AppStore {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
}
