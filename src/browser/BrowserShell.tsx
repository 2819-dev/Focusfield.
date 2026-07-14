import { useEffect, useRef, useState, type RefObject } from "react";
import type { WebviewTag } from "electron";
import { useAppStore } from "../state/appStore";
import AddressBar from "./AddressBar";
import { normalizeUrl } from "./urls";
import { getElapsedTrialDays, hasTrialEnded, TRIAL_LENGTH_DAYS } from "../state/trial";
import "./browser.css";

function trialLabel(status: string, elapsed: number, ended: boolean): string {
  if (status === "subscribed") return "qw Pro";
  if (status === "trialing") return ended ? "Trial ended" : `Trial · Day ${elapsed} of ${TRIAL_LENGTH_DAYS}`;
  return "Free — Upgrade";
}

export default function BrowserShell() {
  const { state, dispatch } = useAppStore();
  const { prefs, trial } = state;
  const webviewRef = useRef<WebviewTag | null>(null);
  const [url, setUrl] = useState(prefs.homepage);

  useEffect(() => {
    const el = webviewRef.current;
    if (!el) return;
    const handleNavigate = () => setUrl(el.getURL());
    el.addEventListener("did-navigate", handleNavigate);
    el.addEventListener("did-navigate-in-page", handleNavigate);
    return () => {
      el.removeEventListener("did-navigate", handleNavigate);
      el.removeEventListener("did-navigate-in-page", handleNavigate);
    };
  }, []);

  const elapsed = getElapsedTrialDays(trial);
  const ended = hasTrialEnded(trial);
  const label = trialLabel(trial.status, elapsed, ended);

  const addressBar = (
    <AddressBar
      position={prefs.searchBarPosition}
      url={url}
      onNavigate={(next) => {
        const target = normalizeUrl(next);
        setUrl(target);
        webviewRef.current?.loadURL(target);
      }}
      onBack={() => webviewRef.current?.goBack()}
      onForward={() => webviewRef.current?.goForward()}
      onReload={() => webviewRef.current?.reload()}
      trialStatus={trial.status}
      trialLabel={label}
      onTrialClick={() => dispatch({ type: "SET_PHASE", phase: "paywall" })}
    />
  );

  return (
    <div className="browser">
      {prefs.tabLayout === "vertical" && (
        <div className="browser__rail">
          <div className="rail__brand">qw.</div>
          <div className="tab tab--active">
            <span className="tab__dot" />
            New Tab
          </div>
        </div>
      )}

      <div className="browser__main">
        {prefs.tabLayout === "horizontal" && (
          <div className="browser__strip">
            <div className="tab tab--active">
              <span className="tab__dot" />
              New Tab
            </div>
          </div>
        )}

        {prefs.searchBarPosition === "top" && addressBar}

        <div className="browser__content">
          <webview
            ref={webviewRef as unknown as RefObject<HTMLWebViewElement>}
            src={prefs.homepage}
            allowpopups
          />
        </div>

        {prefs.searchBarPosition === "bottom" && addressBar}
      </div>
    </div>
  );
}
