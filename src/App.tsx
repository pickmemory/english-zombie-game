import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from './stores/gameStore';
import { useGameLoop } from './hooks/useGameLoop';
import { GameCanvas, VoiceControl } from './components/Game';
import { ScoreDisplay } from './components/UI';
import { StartScreen, LevelSelect, GameOverScreen } from './components/Screens';
import {
  startZombieSpawning,
  stopZombieSpawning,
  gameLoopUpdate,
} from './services/gameEngine';

function Game() {
  const { state, dispatch } = useGameStore();
  const {
    screen,
    score,
    lives,
    level,
    combo,
    gameResult,
  } = state;

  const isGameRunning = screen === 'playing' && gameResult === null;

  const handleGameUpdate = useCallback((deltaTime: number) => {
    if (isGameRunning) {
      gameLoopUpdate(deltaTime);
    }
  }, [isGameRunning]);

  useGameLoop({
    onUpdate: handleGameUpdate,
    isRunning: isGameRunning,
  });

  // Start/stop zombie spawning based on game state
  useEffect(() => {
    if (isGameRunning) {
      startZombieSpawning(level);
    } else {
      stopZombieSpawning();
    }

    return () => {
      stopZombieSpawning();
    };
  }, [isGameRunning, level]);

  // Show game over screen when game ends
  useEffect(() => {
    if (lives <= 0 && screen === 'playing') {
      dispatch({ type: 'SET_GAME_RESULT', payload: 'lose' });
    }
  }, [lives, screen, dispatch]);

  if (screen !== 'playing') {
    return null;
  }

  return (
    <div className="game-container">
      <ScoreDisplay score={score} lives={lives} level={level} combo={combo} />
      <GameCanvas />
      <VoiceControl />
    </div>
  );
}

function App() {
  const screen = useGameStore(s => s.state.screen);
  const gameResult = useGameStore(s => s.state.gameResult);
  const dispatch = useGameStore(s => s.dispatch);

  const showGameOver = screen === 'playing' && gameResult !== null;

  return (
    <>
      {screen === 'start' && <StartScreen />}
      {screen === 'levelSelect' && <LevelSelect />}
      {screen === 'playing' && <Game />}
      {showGameOver && <GameOverScreen />}
    </>
  );
}

export default App;
