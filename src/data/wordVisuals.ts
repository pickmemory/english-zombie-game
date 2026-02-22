// Word to visual mapping using emojis and icons
// No external dependencies - always works

export const WORD_VISUALS: Record<string, { emoji: string; color: string; label: string }> = {
  // === EASY WORDS ===
  'apple': { emoji: '🍎', color: '#FF6B6B', label: 'Apple' },
  'cat': { emoji: '🐱', color: '#FFB347', label: 'Cat' },
  'dog': { emoji: '🐕', color: '#D2691E', label: 'Dog' },
  'sun': { emoji: '☀️', color: '#FFD700', label: 'Sun' },
  'moon': { emoji: '🌙', color: '#C0C0C0', label: 'Moon' },
  'tree': { emoji: '🌳', color: '#228B22', label: 'Tree' },
  'bird': { emoji: '🐦', color: '#87CEEB', label: 'Bird' },
  'fish': { emoji: '🐟', color: '#4169E1', label: 'Fish' },
  'book': { emoji: '📚', color: '#8B4513', label: 'Book' },
  'hand': { emoji: '✋', color: '#FFDAB9', label: 'Hand' },

  // === MEDIUM WORDS ===
  'happy': { emoji: '😊', color: '#FFD700', label: 'Happy' },
  'sad': { emoji: '😢', color: '#6495ED', label: 'Sad' },
  'eat': { emoji: '🍽️', color: '#FFA500', label: 'Eat' },
  'drink': { emoji: '🥤', color: '#00CED1', label: 'Drink' },
  'run': { emoji: '🏃', color: '#32CD32', label: 'Run' },
  'jump': { emoji: '🦘', color: '#90EE90', label: 'Jump' },
  'big': { emoji: '🐘', color: '#A9A9A9', label: 'Big' },
  'small': { emoji: '🐭', color: '#D3D3D3', label: 'Small' },
  'red': { emoji: '🔴', color: '#FF0000', label: 'Red' },
  'blue': { emoji: '🔵', color: '#0000FF', label: 'Blue' },

  // === HARD WORDS ===
  'beautiful': { emoji: '💐', color: '#FF69B4', label: 'Beautiful' },
  'wonderful': { emoji: '✨', color: '#FFD700', label: 'Wonderful' },
  'delicious': { emoji: '🍕', color: '#FF6347', label: 'Delicious' },
  'exciting': { emoji: '🎉', color: '#FF1493', label: 'Exciting' },
  'rainbow': { emoji: '🌈', color: '#FF00FF', label: 'Rainbow' },
  'computer': { emoji: '💻', color: '#708090', label: 'Computer' },
  'elephant': { emoji: '🐘', color: '#A9A9A9', label: 'Elephant' },
  'butterfly': { emoji: '🦋', color: '#DA70D6', label: 'Butterfly' },
  'adventure': { emoji: '🗺️', color: '#20B2AA', label: 'Adventure' },
  'treasure': { emoji: '💎', color: '#00CED1', label: 'Treasure' },
};

export function getWordVisual(word: string): { emoji: string; color: string; label: string } {
  const lowerWord = word.toLowerCase();
  return WORD_VISUALS[lowerWord] || { emoji: '❓', color: '#888888', label: word };
}
