// Word to GIF/Image mapping with high-quality, kid-appropriate content
// Using Giphy official CDN links - stable and reliable

export const WORD_IMAGES: Record<string, string> = {
  // === EASY WORDS (1-10) ===
  'apple': 'https://media.giphy.com/media/4QJHVGsX4iT8QeDMfF/giphy.gif', // Cute red apple
  'cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif', // Cute kitten
  'dog': 'https://media.giphy.com/media/Bc1lvG9UPlHlm/giphy.gif', // Cute puppy
  'sun': 'https://media.giphy.com/media/OPU7wjx8qC0gFkeuGb/giphy.gif', // Sunny animation
  'moon': 'https://media.giphy.com/media/u4PmB1jL6A90q/giphy.gif', // Moon animation
  'tree': 'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif', // Beautiful tree
  'bird': 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif', // Flying bird
  'fish': 'https://media.giphy.com/media/3o7aCSPa3mSj4dN3qU/giphy.gif', // Colorful fish
  'book': 'https://media.giphy.com/media/ufPhavd0yX3mWYi9vX/giphy.gif', // Open book
  'hand': 'https://media.giphy.com/media/1O0yac5b4g4i0/giphy.gif', // Hand gesture

  // === MEDIUM WORDS (11-20) ===
  'happy': 'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif', // Happy celebration
  'sad': 'https://media.giphy.com/media/l0MYGb8LuZ3n7dRnO/giphy.gif', // Sad animation
  'eat': 'https://media.giphy.com/media/3o6TlyC4Y4uJgXqB2Q/giphy.gif', // Eating animation
  'drink': 'https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif', // Drinking
  'run': 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif', // Running
  'jump': 'https://media.giphy.com/media/l378p60yRSCeVoyAM/giphy.gif', // Jumping
  'big': 'https://media.giphy.com/media/xT9IgzoXW8jEp0L4Q/giphy.gif', // Big/biggest
  'small': 'https://media.giphy.com/media/9EFCRjJF6Eq5m/giphy.gif', // Small/cute
  'red': 'https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif', // Red color
  'blue': 'https://media.giphy.com/media/l0Iy69RBwZd6u0wYQ/giphy.gif', // Blue water

  // === HARD WORDS (21-30) ===
  'beautiful': 'https://media.giphy.com/media/3o7btW7rE5JfJf3kQU/giphy.gif', // Beautiful flower
  'wonderful': 'https://media.giphy.com/media/3o7btW1vc3HjfdXqQU/giphy.gif', // Wonderful sparkles
  'delicious': 'https://media.giphy.com/media/3o6TlyC4Y4uJgXqB2Q/giphy.gif', // Delicious food
  'exciting': 'https://media.giphy.com/media/3o7btY0X4Jf1Cj8nGM/giphy.gif', // Exciting fireworks
  'rainbow': 'https://media.giphy.com/media/3o7btM2JJatNRF6jWc/giphy.gif', // Rainbow
  'computer': 'https://media.giphy.com/media/l0Iyl55kTeh71nTXy/giphy.gif', // Computer typing
  'elephant': 'https://media.giphy.com/media/3o7btN3Cpy4IpX3pAQ/giphy.gif', // Elephant
  'butterfly': 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif', // Butterfly
  'adventure': 'https://media.giphy.com/media/3o7btYJD5y0mPZ8kQU/giphy.gif', // Adventure map
  'treasure': 'https://media.giphy.com/media/3o7btW1vc3HjfdXqQU/giphy.gif', // Treasure chest
};

// Fallback placeholder for words without specific GIF
export const PLACEHOLDER_GIF = 'https://media.giphy.com/media/xT9IgGzoXW8jEp0L4Q/giphy.gif';

export function getWordGifUrl(word: string): string {
  const lowerWord = word.toLowerCase();
  return WORD_IMAGES[lowerWord] || PLACEHOLDER_GIF;
}
