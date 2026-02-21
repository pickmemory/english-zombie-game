import { Button } from '../UI';
import { useGameStore, setScreen } from '../../stores/gameStore';

export function StartScreen() {
  const handleStart = () => {
    setScreen('levelSelect');
  };

  return (
    <div className="screen">
      <h1 className="screen-title">English Zombie</h1>
      <p className="screen-subtitle">Learn English by defeating zombies!</p>

      <div style={{
        fontSize: '80px',
        marginBottom: '32px',
        animation: 'title-bounce 2s ease-in-out infinite',
      }}>
        🧟📚
      </div>

      <Button onClick={handleStart} variant="primary">
        Start Game
      </Button>

      <div style={{
        marginTop: '48px',
        textAlign: 'center',
        color: 'var(--text-dark)',
        maxWidth: '400px',
      }}>
        <p>🎮 How to Play:</p>
        <p>1. Click the microphone button</p>
        <p>2. Say the word you see on the zombie</p>
        <p>3. Correct pronunciation launches an attack!</p>
      </div>
    </div>
  );
}
