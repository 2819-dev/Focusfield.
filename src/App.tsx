import { useAppStore } from "./state/appStore";
import { useThemeEffect } from "./state/useThemeEffect";
import Onboarding from "./onboarding/Onboarding";
import Paywall from "./paywall/Paywall";
import BrowserShell from "./browser/BrowserShell";

export default function App() {
  const { state } = useAppStore();
  useThemeEffect(state.prefs);

  return (
    <div className="app-shell">
      {state.phase === "onboarding" && <Onboarding />}
      {state.phase === "paywall" && <Paywall />}
      {state.phase === "browser" && <BrowserShell />}
    </div>
  );
}
