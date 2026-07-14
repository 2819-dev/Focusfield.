# qw.

The world's most customizable browser.

Mobile (`mobile/`) is the current priority — an iPhone-first browser built with Expo/React Native. The
desktop version at the repo root (Chromium via Electron) is a later phase of the same product; it's on
pause while mobile is being built out.

## What's here

Both apps share the same shape: a first-run experience that decides whether anyone sticks around.

- **Onboarding** — a short, visual setup flow (search bar position, theme, accent color, tab layout,
  homepage) that gets you invested in a qw that already looks like yours before you're asked for anything.
- **Paywall** — a premium upsell screen with an honest day 1 / day 5 / day 7 trial timeline: everything
  unlocks today, we remind you on day 5, you're only charged on day 7 if you don't cancel. A one-tap
  "Continue with qw Free" exit is always visible — no dark patterns.
- **Browser shell** — a minimal but functional browser chrome that applies what you picked during
  onboarding: search bar on top or bottom, your theme and accent color, your tab layout.

## Mobile (primary, active development)

See [`mobile/README.md`](mobile/README.md). Runs for free via Expo Go — no Apple Developer account needed
for day-to-day testing on your own iPhone.

## Desktop (paused, later phase)

Electron + Vite + React, rendering via Chromium's `<webview>`.

```bash
npm install
npm run electron:dev   # runs Vite + Electron together
```

```bash
npm run typecheck      # type-check renderer + main/preload
npm run build           # production build (renderer + main/preload)
```
