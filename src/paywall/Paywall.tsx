import { useState } from "react";
import { useAppStore } from "../state/appStore";
import TrialTimeline from "./TrialTimeline";
import "./paywall.css";

const FEATURES = [
  "Move the search bar anywhere",
  "Unlimited custom themes & accents",
  "Vertical or horizontal tab layouts",
  "Sync every setting across devices",
];

type Plan = "monthly" | "yearly";

export default function Paywall() {
  const { state, dispatch } = useAppStore();
  const [plan, setPlan] = useState<Plan>("yearly");
  const name = state.prefs.displayName.trim();

  return (
    <div className="paywall">
      <div className="paywall__inner">
        <p className="paywall__eyebrow">Your qw is ready</p>
        <h1 className="paywall__title">{name ? `Nicely done, ${name}.` : "Nicely done."}</h1>
        <p className="paywall__subtitle">
          You've already set qw up exactly how you want it. Keep every Pro customization with a 7-day free
          trial — no charge today.
        </p>

        <div className="paywall__features">
          {FEATURES.map((f) => (
            <div className="paywall__feature" key={f}>
              <span className="paywall__feature-check">✓</span>
              <span>{f}</span>
            </div>
          ))}
        </div>

        <div className="plan-toggle">
          <button
            className={"plan-toggle__option" + (plan === "monthly" ? " plan-toggle__option--active" : "")}
            onClick={() => setPlan("monthly")}
          >
            Monthly — $6.99
          </button>
          <button
            className={"plan-toggle__option" + (plan === "yearly" ? " plan-toggle__option--active" : "")}
            onClick={() => setPlan("yearly")}
          >
            Yearly — $3.99/mo
            <span className="plan-toggle__save">SAVE 43%</span>
          </button>
        </div>

        <TrialTimeline elapsedDays={-1} />

        <button className="paywall__cta" onClick={() => dispatch({ type: "START_TRIAL" })}>
          Start my 7-day free trial
        </button>
        <p className="paywall__fineprint">
          Nothing is charged today. We'll email you on day {5} before your trial ends, and your{" "}
          {plan === "yearly" ? "$3.99/mo (billed yearly)" : "$6.99/mo"} plan starts on day 7. Cancel anytime
          before then in Settings → Subscription.
        </p>

        <button className="paywall__secondary" onClick={() => dispatch({ type: "CONTINUE_FREE" })}>
          Continue with qw Free instead
        </button>

        {import.meta.env.DEV && (
          <div className="paywall__dev-controls">
            Dev preview only
            <div>
              <button onClick={() => dispatch({ type: "RESTART_ONBOARDING" })}>Restart onboarding</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
