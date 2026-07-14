import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppStoreProvider, useAppStore } from "./src/state/appStore";
import { useTheme } from "./src/theme/useTheme";
import Onboarding from "./src/onboarding/Onboarding";
import Paywall from "./src/paywall/Paywall";
import BrowserShell from "./src/browser/BrowserShell";

function Root() {
  const { state } = useAppStore();
  const theme = useTheme(state.prefs);

  return (
    <>
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      {state.phase === "onboarding" && <Onboarding />}
      {state.phase === "paywall" && <Paywall />}
      {state.phase === "browser" && <BrowserShell />}
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppStoreProvider>
        <Root />
      </AppStoreProvider>
    </SafeAreaProvider>
  );
}
