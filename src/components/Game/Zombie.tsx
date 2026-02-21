import { useState } from 'react';
import { Zombie as ZombieType } from '../../types/game';

interface ZombieProps {
  zombie: ZombieType;
}

// Map common words to image URLs (using placeholder images for demo)
const WORD_IMAGES: Record<string, string> = {
  // Easy words
  'apple': 'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif',
  'cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'dog': 'https://media.giphy.com/media/Bc1lvG9UPlHlm/giphy.gif',
  'sun': 'https://media.giphy.com/media/8vUEXZA2mT7NA26poM/giphy.gif',
  'moon': 'https://media.giphy.com/media/u4PmB1jL6A90q/giphy.gif',
  'tree': 'https://media.giphy.com/media/3o7Lt15ik56d0cnkQU/giphy.gif',
  'bird': 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
  'fish': 'https://media.giphy.com/media/3o7aCSPa3mSj4dN3qU/giphy.gif',
  'book': 'https://media.giphy.com/media/ufPhavd0yX3mWYi9vX/giphy.gif',
  'hand': 'https://media.giphy.com/media/1O0yac5b4g4i0/giphy.gif',
  // Medium words
  'happy': 'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif',
  'sad': 'https://media.giphy.com/media/OPU7wjx8qC0gFkeuGb/giphy.gif',
  'eat': 'https://media.giphy.com/media/3o6ozvv0zsJskzOCbu/giphy.gif',
  'drink': 'https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif',
  'run': 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif',
  'jump': 'https://media.giphy.com/media/l378p60yRSCeVoyAM/giphy.gif',
  'big': 'https://media.giphy.com/media/3o7TKP9lnvKkmnG9qg/giphy.gif',
  'small': 'https://media.giphy.com/media/9EFCRjJF6Eq5m/giphy.gif',
  'red': 'https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif',
  'blue': 'https://media.giphy.com/media/l0Iy69RBwZd6u0wYQ/giphy.gif',
  // Hard words
  'beautiful': 'https://media.giphy.com/media/3o7btW7rE5JfJf3kQU/giphy.gif',
  'wonderful': 'https://media.giphy.com/media/3o7btW1vc3HjfdXqQU/giphy.gif',
  'delicious': 'https://media.giphy.com/media/3o7btY0X4Jf1Cj8nGM/giphy.gif',
  'exciting': 'https://media.giphy.com/media/3o7btYJD5y0mPZ8kQU/giphy.gif',
  'rainbow': 'https://media.giphy.com/media/3o7btM2JJatNRF6jWc/giphy.gif',
  'computer': 'https://media.giphy.com/media/l0Iyl55kTeh71nTXy/giphy.gif',
  'elephant': 'https://media.giphy.com/media/3o7btN3Cpy4IpX3pAQ/giphy.gif',
  'butterfly': 'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif',
  'adventure': 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
  'treasure': 'https://media.giphy.com/media/3o7btW1vc3HjfdXqQU/giphy.gif',
};

function getWordImageUrl(word: string): string {
  const lowerWord = word.toLowerCase();
  return WORD_IMAGES[lowerWord] || `https://media.giphy.com/media/xT9IgGzoXW8jEp0L4Q/giphy.gif`;
}

export function Zombie({ zombie }: ZombieProps) {
  const x = zombie.x;
  const y = zombie.y || window.innerHeight / 2;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const imageUrl = getWordImageUrl(zombie.word.word);
  const statusClass = zombie.status === 'hit' ? 'hit' : zombie.status === 'dying' ? 'dying' : '';

  return (
    <div className={`zombie ${statusClass}`} style={{ 
      left: `${x}px`,
      top: `${y}px`,
      transform: 'translate(-50%, -50%)'
    }}>
      {/* 头顶的单词牌 - 包含单词和图片/GIF */}
      <div className="zombie-word-sign">
        <div className="word-sign-image">
          {!imageError ? (
            <img 
              src={imageUrl} 
              alt={zombie.word.word}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              style={{ opacity: imageLoaded ? 1 : 0 }}
            />
          ) : (
            <div className="image-placeholder">🖼️</div>
          )}
        </div>
        <div className="word-sign-text">{zombie.word.word}</div>
      </div>
      
      {/* 僵尸身体 */}
      <div className="zombie-body">
        <div className="zombie-face">
          <div className="zombie-eye left"></div>
          <div className="zombie-eye right"></div>
          <div className="zombie-mouth"></div>
        </div>
        <div className="zombie-arms">
          <div className="zombie-arm left"></div>
          <div className="zombie-arm right"></div>
        </div>
      </div>
      
      {/* 僵尸腿 */}
      <div className="zombie-legs">
        <div className="zombie-leg left"></div>
        <div className="zombie-leg right"></div>
      </div>
    </div>
  );
}

interface ZombieListProps {
  zombies: ZombieType[];
}

export function ZombieList({ zombies }: ZombieListProps) {
  // Each level has only ONE zombie
  if (zombies.length === 0) {
    return null;
  }
  
  return (
    <div className="zombie-lane">
      {zombies.map(zombie => (
        <Zombie key={zombie.id} zombie={zombie} />
      ))}
    </div>
  );
}
