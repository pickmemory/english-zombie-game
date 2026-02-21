import { useEffect } from 'react';
import { Button } from '../UI';
import { useGameStore, setScreen, resetGame } from '../../stores/gameStore';

export function GameOverScreen() {
  const { state } = useGameStore();
  const { score, gameResult, level } = state;

  const isWin = gameResult === 'win';
  const isLose = gameResult === 'lose';

  useEffect(() => {
    // Stop any ongoing voice or TTS
    if (typeof window !== 'undefined') {
      window.speechSynthesis?.cancel();
    }
  }, []);

  const handlePlayAgain = () => {
    resetGame();
    setScreen('levelSelect');
  };

  const handleMainMenu = () => {
    resetGame();
    setScreen('start');
  };

  if (!isWin && !isLose) {
    return null;
  }

  return (
    <div className="screen">
      <div className="game-over-content">
        <h1 className={`game-over-title ${isWin ? 'win' : 'lose'}`}>
          {isWin ? '🎉 You Win!' : '💀 Game Over'}
        </h1>

        <div className="final-score">
          Level: {level}
          <br />
          Score: {score}
        </div>

        <div className="game-over-buttons">
          <Button onClick={handlePlayAgain} variant="primary">
            Play Again
          </Button>

          <Button onClick={handleMainMenu} variant="secondary">
            Main Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
