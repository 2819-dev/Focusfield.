import { TRIAL_MILESTONES } from "../state/trial";

interface TrialTimelineProps {
  /** Days elapsed in the trial; -1 means the trial hasn't started (pre-purchase preview). */
  elapsedDays: number;
}

export default function TrialTimeline({ elapsedDays }: TrialTimelineProps) {
  return (
    <div className="timeline">
      {TRIAL_MILESTONES.map((m) => {
        const passed = elapsedDays > m.day;
        const active = elapsedDays >= 0 && elapsedDays === m.day;
        return (
          <div
            key={m.day}
            className={"timeline__node" + (active ? " timeline__node--active" : passed ? " timeline__node--passed" : "")}
          >
            <div className="timeline__marker" />
            <div className="timeline__day">{m.title}</div>
            <div className="timeline__desc">{m.description}</div>
          </div>
        );
      })}
    </div>
  );
}
