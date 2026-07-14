import { useEffect } from "react";
import type { OnboardingPrefs } from "./types";

export function useThemeEffect(prefs: OnboardingPrefs): void {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", prefs.accentColor.value);

    function applyResolvedTheme() {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const resolved = prefs.themeMode === "auto" ? (prefersDark ? "dark" : "light") : prefs.themeMode;
      root.setAttribute("data-theme", resolved);
    }

    applyResolvedTheme();

    if (prefs.themeMode !== "auto") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", applyResolvedTheme);
    return () => media.removeEventListener("change", applyResolvedTheme);
  }, [prefs.accentColor.value, prefs.themeMode]);
}
