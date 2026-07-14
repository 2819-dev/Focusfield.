import { useColorScheme } from "react-native";
import type { OnboardingPrefs } from "../state/types";

export interface Palette {
  accent: string;
  accentSoft: string;
  bg: string;
  bgElevated: string;
  bgElevated2: string;
  border: string;
  text: string;
  textMuted: string;
  textFaint: string;
  isDark: boolean;
}

const DARK: Omit<Palette, "accent" | "accentSoft" | "isDark"> = {
  bg: "#0b0b0f",
  bgElevated: "#17171f",
  bgElevated2: "#1f1f2a",
  border: "rgba(255,255,255,0.1)",
  text: "#f2f2f7",
  textMuted: "rgba(242,242,247,0.6)",
  textFaint: "rgba(242,242,247,0.4)",
};

const LIGHT: Omit<Palette, "accent" | "accentSoft" | "isDark"> = {
  bg: "#f4f4f8",
  bgElevated: "#ffffff",
  bgElevated2: "#f0f0f5",
  border: "rgba(10,10,20,0.1)",
  text: "#16161d",
  textMuted: "rgba(22,22,29,0.6)",
  textFaint: "rgba(22,22,29,0.4)",
};

function withAlpha(hex: string, alpha: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

export function useTheme(prefs: OnboardingPrefs): Palette {
  const systemScheme = useColorScheme();
  const resolvedDark = prefs.themeMode === "auto" ? systemScheme !== "light" : prefs.themeMode === "dark";
  const base = resolvedDark ? DARK : LIGHT;
  return {
    ...base,
    accent: prefs.accentColor.value,
    accentSoft: withAlpha(prefs.accentColor.value, resolvedDark ? 0.16 : 0.12),
    isDark: resolvedDark,
  };
}
