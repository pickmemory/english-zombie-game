import { Button } from '../UI';
import { useGameStore, startGame, setScreen } from '../../stores/gameStore';

const LEVELS = [
  { level: 1, label: '1', difficulty: 'easy' },
  { level: 2, label: '2', difficulty: 'easy' },
  { level: 3, label: '3', difficulty: 'easy' },
  { level: 4, label: '4', difficulty: 'medium' },
  { level: 5, label: '5', difficulty: 'medium' },
  { level: 6, label: '6', difficulty: 'medium' },
  { level: 7, label: '7', difficulty: 'hard' },
  { level: 8, label: '8', difficulty: 'hard' },
  { level: 9, label: '9', difficulty: 'hard' },
];

export function LevelSelect() {
  const handleLevelSelect = (level: number) => {
    startGame(level);
  };

  const handleBack = () => {
    setScreen('start');
  };

  return (
    <div className="screen">
      <h1 className="screen-title">Select Level</h1>

      <div className="level-select">
        <div className="level-grid">
          {LEVELS.map(({ level, label, difficulty }) => (
            <button
              key={level}
              className={`level-button ${difficulty}`}
              onClick={() => handleLevelSelect(level)}
            >
              {label}
              <span className="level-label">{difficulty}</span>
            </button>
          ))}
        </div>

        <Button onClick={handleBack} variant="secondary">
          Back
        </Button>
      </div>
    </div>
  );
}
