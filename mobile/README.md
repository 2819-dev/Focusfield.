# qw. — mobile

The primary target for qw right now: an iPhone-first customizable browser, built with Expo/React Native.
Rendering goes through `react-native-webview`, which on iOS is backed by WKWebView — Apple requires every
iOS browser to use WebKit, so this isn't a Chromium browser on this platform. The Chromium/Electron desktop
version (`../electron`, `../src`) is a separate, later phase of the same product.

## What's here

Same shape as the desktop app, ported to React Native:

- `src/onboarding/` — search bar position, theme/accent, tabs, personalize, summary
- `src/paywall/` — premium upsell with the day 1 / day 5 / day 7 trial timeline and an honest free exit
- `src/browser/` — address bar (top or bottom, per your onboarding choice) + `react-native-webview`

State persists via `@react-native-async-storage/async-storage`.

## Running it — free, no Apple Developer account needed

```bash
npm install
npm start          # or: npx expo start --tunnel  if your phone isn't on the same network
```

Scan the QR code with the **Expo Go** app on your iPhone (free, from the App Store) to see it live. Every
time you want to see a new change, just re-run `npm start` (or leave it running — Metro reloads on save).

`npm run web` renders it in a browser for a quick visual check (the WebView tab itself won't load there —
`react-native-webview` is iOS/Android only — but the rest of the UI does).

A real installable build (TestFlight/App Store) requires a paid Apple Developer account ($99/yr) and is a
separate step (`eas build`) — not needed for day-to-day development or for testing on your own phone via
Expo Go.
