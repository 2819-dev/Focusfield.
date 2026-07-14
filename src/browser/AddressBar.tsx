import { useState, useEffect } from "react";
import type { SearchBarPosition, TrialStatus } from "../state/types";

interface AddressBarProps {
  position: SearchBarPosition;
  url: string;
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  trialStatus: TrialStatus;
  trialLabel: string;
  onTrialClick: () => void;
}

export default function AddressBar({
  position,
  url,
  onNavigate,
  onBack,
  onForward,
  onReload,
  trialStatus,
  trialLabel,
  onTrialClick,
}: AddressBarProps) {
  const [draft, setDraft] = useState(url);

  useEffect(() => setDraft(url), [url]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onNavigate(draft);
  }

  return (
    <div className={"address-bar" + (position === "bottom" ? " address-bar--bottom" : "")}>
      <button className="address-bar__btn" onClick={onBack} title="Back">
        ‹
      </button>
      <button className="address-bar__btn" onClick={onForward} title="Forward">
        ›
      </button>
      <button className="address-bar__btn" onClick={onReload} title="Reload">
        ⟳
      </button>
      <form style={{ flex: 1, display: "flex" }} onSubmit={submit}>
        <input
          className="address-bar__input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Search or enter address"
        />
      </form>
      <button
        className={"trial-pill" + (trialStatus === "trialing" ? " trial-pill--trialing" : "")}
        onClick={onTrialClick}
      >
        {trialLabel}
      </button>
    </div>
  );
}
