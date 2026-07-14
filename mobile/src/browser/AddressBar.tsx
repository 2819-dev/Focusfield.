import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { SearchBarPosition, TrialStatus } from "../state/types";
import type { Palette } from "../theme/useTheme";

interface AddressBarProps {
  theme: Palette;
  position: SearchBarPosition;
  url: string;
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  trialStatus: TrialStatus;
  trialLabel: string;
  onTrialPress: () => void;
}

export default function AddressBar({
  theme,
  position,
  url,
  onNavigate,
  onBack,
  onForward,
  onReload,
  canGoBack,
  canGoForward,
  trialStatus,
  trialLabel,
  onTrialPress,
}: AddressBarProps) {
  const [draft, setDraft] = useState(url);
  useEffect(() => setDraft(url), [url]);

  return (
    <View
      style={[
        styles.bar,
        { backgroundColor: theme.bgElevated, borderColor: theme.border },
        position === "top" ? styles.borderBottom : styles.borderTop,
      ]}
    >
      <Pressable onPress={onBack} disabled={!canGoBack} hitSlop={8} style={styles.icon}>
        <Text style={[styles.iconText, { color: canGoBack ? theme.text : theme.textFaint }]}>‹</Text>
      </Pressable>
      <Pressable onPress={onForward} disabled={!canGoForward} hitSlop={8} style={styles.icon}>
        <Text style={[styles.iconText, { color: canGoForward ? theme.text : theme.textFaint }]}>›</Text>
      </Pressable>
      <Pressable onPress={onReload} hitSlop={8} style={styles.icon}>
        <Text style={[styles.iconText, { color: theme.text }]}>⟳</Text>
      </Pressable>
      <TextInput
        value={draft}
        onChangeText={setDraft}
        onSubmitEditing={() => onNavigate(draft)}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="go"
        placeholder="Search or enter address"
        placeholderTextColor={theme.textFaint}
        style={[styles.input, { backgroundColor: theme.bg, color: theme.text, borderColor: theme.border }]}
      />
      <Pressable
        onPress={onTrialPress}
        style={[
          styles.pill,
          {
            borderColor: trialStatus === "trialing" ? theme.accent : theme.border,
            backgroundColor: theme.bgElevated2,
          },
        ]}
      >
        <Text
          style={[styles.pillText, { color: trialStatus === "trialing" ? theme.accent : theme.textMuted }]}
          numberOfLines={1}
        >
          {trialLabel}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, paddingVertical: 8 },
  borderBottom: { borderBottomWidth: 1 },
  borderTop: { borderTopWidth: 1 },
  icon: { width: 28, height: 28, alignItems: "center", justifyContent: "center" },
  iconText: { fontSize: 17 },
  input: { flex: 1, borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, fontSize: 13.5 },
  pill: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, maxWidth: 120 },
  pillText: { fontSize: 10.5, fontWeight: "700" },
});
