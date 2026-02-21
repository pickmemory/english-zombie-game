interface ProgressBarProps {
  progress: number; // 0-100
  max?: number;
}

export function ProgressBar({ progress, max = 100 }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (progress / max) * 100));

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
