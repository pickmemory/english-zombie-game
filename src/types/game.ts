export interface Word {
  id: string;
  word: string;
  difficulty: 'easy' | 'medium' | 'hard';
  image?: string;
}

export interface Zombie {
  id: string;
  word: Word;
  x: number;
  y?: number; // For vertical movement in portrait mode
  speed: number;
  status: 'walking' | 'hit' | 'dying' | 'dead';
}

export interface Projectile {
  id: string;
  x: number;
  targetZombieId: string;
  status: 'flying' | 'hit' | 'missed';
}

export interface Launcher {
  id: string;
  x: number;
  status: 'ready' | 'loading' | 'firing' | 'cooldown';
}

export interface GameState {
  screen: 'start' | 'levelSelect' | 'playing' | 'gameOver';
  level: number;
  score: number;
  lives: number;
  zombies: Zombie[];
  projectiles: Projectile[];
  launchers: Launcher[];
  currentWord: Word | null;
  isListening: boolean;
  lastRecognition: string;
  pronunciationResult: 'none' | 'correct' | 'wrong';
  combo: number;
  gameResult: 'win' | 'lose' | null;
}

export interface UserProgress {
  currentLevel: number;
  highScore: number;
  wordsMastered: Record<string, { attempts: number; correct: number }>;
  totalGamesPlayed: number;
}

export type GameAction =
  | { type: 'START_GAME'; payload: number }
  | { type: 'SET_SCREEN'; payload: GameState['screen'] }
  | { type: 'SPAWN_ZOMBIE'; payload: Zombie }
  | { type: 'UPDATE_ZOMBIE'; payload: Zombie }
  | { type: 'REMOVE_ZOMBIE'; payload: string }
  | { type: 'LAUNCH_PROJECTILE'; payload: Projectile }
  | { type: 'REMOVE_PROJECTILE'; payload: string }
  | { type: 'SET_CURRENT_WORD'; payload: Word | null }
  | { type: 'SET_LISTENING'; payload: boolean }
  | { type: 'SET_RECOGNITION'; payload: string }
  | { type: 'SET_PRONUNCIATION_RESULT'; payload: GameState['pronunciationResult'] }
  | { type: 'ADD_SCORE'; payload: number }
  | { type: 'LOSE_LIFE' }
  | { type: 'INCREMENT_COMBO' }
  | { type: 'RESET_COMBO' }
  | { type: 'SET_GAME_RESULT'; payload: GameState['gameResult'] }
  | { type: 'RESET_GAME' };
