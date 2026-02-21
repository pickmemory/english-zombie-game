import { create } from 'zustand';
import { GameState, GameAction, Zombie, Projectile, Word, Launcher } from '../types/game';
import { getWordsByLevel } from '../data/words';

const initialState: GameState = {
  screen: 'start',
  level: 1,
  score: 0,
  lives: 3,
  zombies: [],
  projectiles: [],
  launchers: [
    { id: 'launcher-1', x: 100, status: 'ready' },
    { id: 'launcher-2', x: 250, status: 'ready' },
    { id: 'launcher-3', x: 400, status: 'ready' },
    { id: 'launcher-4', x: 550, status: 'ready' },
    { id: 'launcher-5', x: 700, status: 'ready' },
  ],
  currentWord: null,
  isListening: false,
  lastRecognition: '',
  pronunciationResult: 'none',
  combo: 0,
  gameResult: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        screen: 'playing',
        level: action.payload,
        currentWord: getWordsByLevel(action.payload)[0] || null,
      };

    case 'SET_SCREEN':
      return { ...state, screen: action.payload };

    case 'SPAWN_ZOMBIE':
      return { ...state, zombies: [...state.zombies, action.payload] };

    case 'UPDATE_ZOMBIE':
      return {
        ...state,
        zombies: state.zombies.map(z =>
          z.id === action.payload.id ? action.payload : z
        ),
      };

    case 'REMOVE_ZOMBIE':
      return {
        ...state,
        zombies: state.zombies.filter(z => z.id !== action.payload),
      };

    case 'LAUNCH_PROJECTILE':
      return { ...state, projectiles: [...state.projectiles, action.payload] };

    case 'REMOVE_PROJECTILE':
      return {
        ...state,
        projectiles: state.projectiles.filter(p => p.id !== action.payload),
      };

    case 'SET_CURRENT_WORD':
      return { ...state, currentWord: action.payload };

    case 'SET_LISTENING':
      return { ...state, isListening: action.payload };

    case 'SET_RECOGNITION':
      return { ...state, lastRecognition: action.payload };

    case 'SET_PRONUNCIATION_RESULT':
      return { ...state, pronunciationResult: action.payload };

    case 'ADD_SCORE':
      return { ...state, score: state.score + action.payload };

    case 'LOSE_LIFE':
      const newLives = state.lives - 1;
      return {
        ...state,
        lives: newLives,
        gameResult: newLives <= 0 ? 'lose' : null,
      };

    case 'INCREMENT_COMBO':
      return { ...state, combo: state.combo + 1 };

    case 'RESET_COMBO':
      return { ...state, combo: 0 };

    case 'SET_GAME_RESULT':
      return { ...state, gameResult: action.payload };

    case 'RESET_GAME':
      return initialState;

    default:
      return state;
  }
}

export const useGameStore = create<{
  state: GameState;
  dispatch: (action: GameAction) => void;
}>((set) => ({
  state: initialState,
  dispatch: (action) => set((s) => ({ state: gameReducer(s.state, action) })),
}));

// Action helpers
export const startGame = (level: number) => useGameStore.getState().dispatch({ type: 'START_GAME', payload: level });
export const setScreen = (screen: GameState['screen']) => useGameStore.getState().dispatch({ type: 'SET_SCREEN', payload: screen });
export const spawnZombie = (zombie: Zombie) => useGameStore.getState().dispatch({ type: 'SPAWN_ZOMBIE', payload: zombie });
export const updateZombie = (zombie: Zombie) => useGameStore.getState().dispatch({ type: 'UPDATE_ZOMBIE', payload: zombie });
export const removeZombie = (id: string) => useGameStore.getState().dispatch({ type: 'REMOVE_ZOMBIE', payload: id });
export const launchProjectile = (projectile: Projectile) => useGameStore.getState().dispatch({ type: 'LAUNCH_PROJECTILE', payload: projectile });
export const removeProjectile = (id: string) => useGameStore.getState().dispatch({ type: 'REMOVE_PROJECTILE', payload: id });
export const setCurrentWord = (word: Word | null) => useGameStore.getState().dispatch({ type: 'SET_CURRENT_WORD', payload: word });
export const setListening = (listening: boolean) => useGameStore.getState().dispatch({ type: 'SET_LISTENING', payload: listening });
export const setRecognition = (text: string) => useGameStore.getState().dispatch({ type: 'SET_RECOGNITION', payload: text });
export const setPronunciationResult = (result: GameState['pronunciationResult']) => useGameStore.getState().dispatch({ type: 'SET_PRONUNCIATION_RESULT', payload: result });
export const addScore = (points: number) => useGameStore.getState().dispatch({ type: 'ADD_SCORE', payload: points });
export const loseLife = () => useGameStore.getState().dispatch({ type: 'LOSE_LIFE' });
export const incrementCombo = () => useGameStore.getState().dispatch({ type: 'INCREMENT_COMBO' });
export const resetCombo = () => useGameStore.getState().dispatch({ type: 'RESET_COMBO' });
export const setGameResult = (result: GameState['gameResult']) => useGameStore.getState().dispatch({ type: 'SET_GAME_RESULT', payload: result });
export const resetGame = () => useGameStore.getState().dispatch({ type: 'RESET_GAME' });
