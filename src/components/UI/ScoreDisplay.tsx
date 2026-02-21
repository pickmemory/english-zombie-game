interface ScoreDisplayProps {
  score: number;
  lives: number;
  level: number;
  combo?: number;
}

export function ScoreDisplay({ score, lives, level, combo = 0 }: ScoreDisplayProps) {
  return (
    <div className="game-header">
      <div className="score-display">
        ⭐ {score}
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${Math.min(100, (level / 15) * 100)}%` }}
          />
        </div>
      </div>

      <div className="lives-display">
        ❤️ {'❤️'.repeat(lives)}
      </div>

      <div className="level-display">
        Level {level}
      </div>

      {combo > 0 && (
        <div style={{
          marginLeft: '16px',
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          color: 'var(--projectile-gold)'
        }}>
          🔥 x{combo}
        </div>
      )}
    </div>
  );
}
