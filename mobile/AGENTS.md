# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

On SDK 57 (latest at time of writing) since development is happening via the iOS Simulator, not Expo Go —
the simulator runs a dev build compiled against whatever SDK is in package.json, so it isn't gated by
Expo Go's App Store release the way physical-device testing is.

If testing switches back to Expo Go on a real device, check the SDK your installed Expo Go supports first
(open the app — it's shown on the home/profile screen) and pin `expo`/`react-native`/`expo-*` to match; a
mismatch produces "Project is incompatible with this version of Expo Go" either direction (too new or too
old). Pull the exact paired versions from the `expo` package's own `bundledNativeModules.json` for the
target SDK if `npx expo install --fix` isn't available (it needs network access to Expo's dependency API).
