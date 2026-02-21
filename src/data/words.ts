import { Word } from '../types/game';

export const WORDS: Word[] = [
  // Easy - Level 1-5
  { id: '1', word: 'apple', difficulty: 'easy' },
  { id: '2', word: 'cat', difficulty: 'easy' },
  { id: '3', word: 'dog', difficulty: 'easy' },
  { id: '4', word: 'sun', difficulty: 'easy' },
  { id: '5', word: 'moon', difficulty: 'easy' },
  { id: '6', word: 'tree', difficulty: 'easy' },
  { id: '7', word: 'bird', difficulty: 'easy' },
  { id: '8', word: 'fish', difficulty: 'easy' },
  { id: '9', word: 'book', difficulty: 'easy' },
  { id: '10', word: 'hand', difficulty: 'easy' },

  // Medium - Level 6-10
  { id: '11', word: 'happy', difficulty: 'medium' },
  { id: '12', word: 'sad', difficulty: 'medium' },
  { id: '13', word: 'eat', difficulty: 'medium' },
  { id: '14', word: 'drink', difficulty: 'medium' },
  { id: '15', word: 'run', difficulty: 'medium' },
  { id: '16', word: 'jump', difficulty: 'medium' },
  { id: '17', word: 'big', difficulty: 'medium' },
  { id: '18', word: 'small', difficulty: 'medium' },
  { id: '19', word: 'red', difficulty: 'medium' },
  { id: '20', word: 'blue', difficulty: 'medium' },

  // Hard - Level 11-15
  { id: '21', word: 'beautiful', difficulty: 'hard' },
  { id: '22', word: 'wonderful', difficulty: 'hard' },
  { id: '23', word: 'delicious', difficulty: 'hard' },
  { id: '24', word: 'exciting', difficulty: 'hard' },
  { id: '25', word: 'rainbow', difficulty: 'hard' },
  { id: '26', word: 'computer', difficulty: 'hard' },
  { id: '27', word: 'elephant', difficulty: 'hard' },
  { id: '28', word: 'butterfly', difficulty: 'hard' },
  { id: '29', word: 'adventure', difficulty: 'hard' },
  { id: '30', word: 'treasure', difficulty: 'hard' },
];

export const getWordsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Word[] => {
  return WORDS.filter(w => w.difficulty === difficulty);
};

export const getWordsByLevel = (level: number): Word[] => {
  if (level <= 3) return getWordsByDifficulty('easy').slice(0, 5);
  if (level <= 6) return [...getWordsByDifficulty('easy').slice(0, 3), ...getWordsByDifficulty('medium').slice(0, 3)];
  if (level <= 10) return [...getWordsByDifficulty('medium'), ...getWordsByDifficulty('hard').slice(0, 2)];
  return WORDS;
};

export const getLevelDifficulty = (level: number): 'easy' | 'medium' | 'hard' => {
  if (level <= 3) return 'easy';
  if (level <= 10) return 'medium';
  return 'hard';
};
