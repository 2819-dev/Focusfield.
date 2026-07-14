import { StyleSheet, Text, View } from "react-native";
import { TRIAL_MILESTONES } from "../state/trial";
import type { Palette } from "../theme/useTheme";

interface TrialTimelineProps {
  theme: Palette;
  /** Days elapsed in the trial; -1 means the trial hasn't started (pre-purchase preview). */
  elapsedDays: number;
}

export default function TrialTimeline({ theme, elapsedDays }: TrialTimelineProps) {
  return (
    <View style={[styles.wrap, { backgroundColor: theme.bgElevated, borderColor: theme.border }]}>
      {TRIAL_MILESTONES.map((m, i) => {
        const passed = elapsedDays > m.day;
        const active = elapsedDays >= 0 && elapsedDays === m.day;
        const markerColor = active || passed ? theme.accent : theme.bgElevated;
        return (
          <View key={m.day} style={styles.node}>
            <View style={styles.lineRow}>
              <View
                style={[styles.line, { backgroundColor: i === 0 ? "transparent" : passed || active ? theme.accent : theme.border }]}
              />
              <View style={[styles.marker, { backgroundColor: markerColor, borderColor: active || passed ? theme.accent : theme.border }]} />
              <View
                style={[
                  styles.line,
                  { backgroundColor: i === TRIAL_MILESTONES.length - 1 ? "transparent" : passed ? theme.accent : theme.border },
                ]}
              />
            </View>
            <Text style={[styles.day, { color: theme.text }]}>{m.title}</Text>
            <Text style={[styles.desc, { color: theme.textMuted }]}>{m.description}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", borderRadius: 20, borderWidth: 1, padding: 16, paddingTop: 20 },
  node: { flex: 1, alignItems: "center", paddingHorizontal: 4 },
  lineRow: { flexDirection: "row", alignItems: "center", width: "100%", marginBottom: 8 },
  line: { flex: 1, height: 2 },
  marker: { width: 12, height: 12, borderRadius: 6, borderWidth: 2 },
  day: { fontSize: 12, fontWeight: "700", marginBottom: 3, textAlign: "center" },
  desc: { fontSize: 10.5, lineHeight: 14, textAlign: "center" },
});
