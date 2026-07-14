import type { TrialState } from "./types";

const DAY_MS = 24 * 60 * 60 * 1000;
export const TRIAL_LENGTH_DAYS = 7;
export const REMINDER_DAY = 5;

export interface TrialMilestone {
  day: number;
  title: string;
  description: string;
}

export const TRIAL_MILESTONES: TrialMilestone[] = [
  {
    day: 0,
    title: "Today",
    description: "Every Pro customization unlocks instantly — no card charge yet.",
  },
  {
    day: REMINDER_DAY,
    title: `Day ${REMINDER_DAY}`,
    description: "We'll email you a heads-up before anything is charged.",
  },
  {
    day: TRIAL_LENGTH_DAYS,
    title: `Day ${TRIAL_LENGTH_DAYS}`,
    description: "Your trial ends and your subscription begins, unless you've canceled.",
  },
];

/** Days elapsed since the trial started, including any dev-only simulated offset. */
export function getElapsedTrialDays(trial: TrialState, now = Date.now()): number {
  if (!trial.trialStartedAt) return 0;
  const elapsedMs = now - trial.trialStartedAt + trial.simulatedDayOffset * DAY_MS;
  return Math.max(0, Math.floor(elapsedMs / DAY_MS));
}

export function getDaysRemaining(trial: TrialState, now = Date.now()): number {
  return Math.max(0, TRIAL_LENGTH_DAYS - getElapsedTrialDays(trial, now));
}

export function hasTrialEnded(trial: TrialState, now = Date.now()): boolean {
  return getElapsedTrialDays(trial, now) >= TRIAL_LENGTH_DAYS;
}
