# qw.

The world's most customizable browser — built on Chromium via Electron.

## What's here

This first pass focuses on the part of the product that decides whether anyone sticks around: the first-run
experience.

- **Onboarding** (`src/onboarding/`) — a short, visual setup flow (search bar position, theme, accent color,
  tab layout, homepage) that gets you invested in a qw that already looks like yours before you're asked for
  anything.
- **Paywall** (`src/paywall/`) — a premium upsell screen with an honest day 1 / day 5 / day 7 trial timeline:
  everything unlocks today, we remind you on day 5, you're only charged on day 7 if you don't cancel. A
  one-tap "Continue with qw Free" exit is always visible — no dark patterns.
- **Browser shell** (`src/browser/`) — a minimal but functional Chromium shell (via Electron's `<webview>`)
  that actually applies what you picked during onboarding: search bar on top or bottom, vertical or
  horizontal tabs, your theme and accent color.

State lives in `src/state/` and persists to `localStorage` between launches.

## Development

```bash
npm install
npm run electron:dev   # runs Vite + Electron together
```

```bash
npm run typecheck      # type-check renderer + main/preload
npm run build           # production build (renderer + main/preload)
```
