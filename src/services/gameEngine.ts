import { Zombie, Projectile, Word } from '../types/game';
import { getWordsByLevel } from '../data/words';
import { getGameDimensions, getDeviceOrientation } from '../utils/orientation';
import {
  useGameStore,
  spawnZombie,
  updateZombie,
  removeZombie,
  launchProjectile as launchProjectileAction,
  removeProjectile,
  setCurrentWord,
  addScore,
  loseLife,
  incrementCombo,
  resetCombo,
  setGameResult,
  setPronunciationResult,
} from '../stores/gameStore';

const ZOMBIE_SPAWN_INTERVAL = 3000;
const ZOMBIE_SPEED_BASE = 0.3; // Slower speed for kids to see
const PROJECTILE_SPEED = 8;
const GAME_OVER_MARGIN = 100;

let zombieIdCounter = 0;
let projectileIdCounter = 0;
let spawnTimer: number | null = null;
let lastSpawnTime = 0;

export function getNextZombieId(): string {
  return `zombie-${++zombieIdCounter}`;
}

export function getNextProjectileId(): string {
  return `projectile-${++projectileIdCounter}`;
}

export function startZombieSpawning(level: number) {
  // Each level only has ONE zombie (one word)
  // Spawn only if no zombie exists
  const { zombies } = useGameStore.getState().state;
  
  if (zombies.length === 0) {
    spawnNewZombie(level);
  }
  
  // Still run the check loop in case zombie gets defeated
  const checkAndSpawn = () => {
    const { zombies: currentZombies } = useGameStore.getState().state;
    if (currentZombies.length === 0) {
      spawnNewZombie(level);
    }
    spawnTimer = requestAnimationFrame(checkAndSpawn);
  };
  
  spawnTimer = requestAnimationFrame(checkAndSpawn);
}

export function stopZombieSpawning() {
  if (spawnTimer) {
    cancelAnimationFrame(spawnTimer);
    spawnTimer = null;
  }
}

export function spawnNewZombie(level: number) {
  const words = getWordsByLevel(level);
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const dims = getGameDimensions();
  
  // Spawn zombie in visible area, not off-screen
  // For kids: zombie should start visible so they can see the word immediately
  const zombie: Zombie = {
    id: getNextZombieId(),
    word: randomWord,
    x: dims.zombieStartX,
    speed: ZOMBIE_SPEED_BASE + (level - 1) * 0.05, // Slower increment for kids
    status: 'walking',
    // Store orientation for movement logic
    y: dims.zombieStartY,
  };

  spawnZombie(zombie);
}

export function updateZombies(deltaTime: number) {
  const { zombies } = useGameStore.getState().state;
  const dims = getGameDimensions();
  const isPortrait = dims.orientation === 'portrait';

  zombies.forEach(zombie => {
    if (zombie.status === 'walking') {
      let newX = zombie.x;
      let newY = zombie.y || dims.zombieStartY;
      
      // Move zombie based on orientation
      if (isPortrait) {
        // Portrait: move from bottom to top (y decreases)
        newY = zombie.y! - zombie.speed * deltaTime * 0.06;
        
        if (newY <= dims.launcherY + 50) {
          // Zombie reached the launcher
          loseLife();
          removeZombie(zombie.id);
        } else {
          updateZombie({ ...zombie, y: newY });
        }
      } else {
        // Landscape: move from right to left (x decreases)
        newX = zombie.x - zombie.speed * deltaTime * 0.06;

        if (newX <= GAME_OVER_MARGIN) {
          // Zombie reached the launcher
          loseLife();
          removeZombie(zombie.id);
        } else {
          updateZombie({ ...zombie, x: newX });
        }
      }
    }
  });
}

export function launchProjectile(targetZombie: Zombie) {
  const dims = getGameDimensions();

  const projectile: Projectile = {
    id: getNextProjectileId(),
    x: dims.launcherX,
    targetZombieId: targetZombie.id,
    status: 'flying',
  };

  launchProjectileAction(projectile);
}

export function updateProjectiles(deltaTime: number) {
  const { projectiles, zombies } = useGameStore.getState().state;

  projectiles.forEach(projectile => {
    if (projectile.status === 'flying') {
      const targetZombie = zombies.find(z => z.id === projectile.targetZombieId);

      if (!targetZombie || targetZombie.status === 'dead') {
        // Target gone, remove projectile
        removeProjectile(projectile.id);
        return;
      }

      // Move projectile toward target
      const dx = targetZombie.x - projectile.x;

      if (Math.abs(dx) < 30) {
        // Hit!
        updateZombie({ ...targetZombie, status: 'hit' });
        removeProjectile(projectile.id);

        // Score
        const baseScore = 10;
        const comboBonus = useGameStore.getState().state.combo * 5;
        addScore(baseScore + comboBonus);
        incrementCombo();

        // Remove zombie after hit animation
        setTimeout(() => {
          removeZombie(targetZombie.id);
          setPronunciationResult('none');
        }, 300);
      } else {
        const direction = dx > 0 ? 1 : -1;
        const newX = projectile.x + direction * PROJECTILE_SPEED * deltaTime * 0.1;
        // Note: We'd need to update projectile position here
        // For simplicity, we just keep tracking
      }
    }
  });
}

export function checkPronunciation(spokenWord: string, targetWord: Word) {
  const normalizedSpoken = spokenWord.toLowerCase().trim();
  const normalizedTarget = targetWord.word.toLowerCase();

  // Simple fuzzy matching
  const isCorrect =
    normalizedSpoken === normalizedTarget ||
    normalizedSpoken.includes(normalizedTarget) ||
    normalizedTarget.includes(normalizedSpoken) ||
    levenshteinDistance(normalizedSpoken, normalizedTarget) <= 2;

  if (isCorrect) {
    setPronunciationResult('correct');

    // Find the zombie with this word
    const { zombies } = useGameStore.getState().state;
    const targetZombie = zombies.find(z => z.word.id === targetWord.id);

    if (targetZombie) {
      launchProjectile(targetZombie);
    }

    // Select next word
    const { level } = useGameStore.getState().state;
    const words = getWordsByLevel(level);
    const currentWord = useGameStore.getState().state.currentWord;

    if (currentWord && currentWord.id === targetWord.id) {
      const nextWordIndex = words.findIndex(w => w.id === targetWord.id) + 1;
      if (nextWordIndex < words.length) {
        setCurrentWord(words[nextWordIndex]);
      } else {
        setCurrentWord(words[0]);
      }
    }

    return true;
  } else {
    setPronunciationResult('wrong');
    resetCombo();
    return false;
  }
}

// Simple Levenshtein distance for fuzzy matching
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function checkWinCondition() {
  const { zombies, gameResult } = useGameStore.getState().state;

  if (gameResult === 'lose') {
    return;
  }

  // Check if all zombies are defeated (empty zombie list)
  // This is simplified - in a full game, you'd track total zombies vs killed
}

export function gameLoopUpdate(deltaTime: number) {
  updateZombies(deltaTime);
  updateProjectiles(deltaTime);
}
