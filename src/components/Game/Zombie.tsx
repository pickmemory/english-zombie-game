import { useState } from 'react';
import { Zombie as ZombieType } from '../../types/game';
import { getWordGifUrl } from '../../data/wordImages';

interface ZombieProps {
  zombie: ZombieType;
}

export function Zombie({ zombie }: ZombieProps) {
  const x = zombie.x;
  const y = zombie.y || window.innerHeight / 2;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const imageUrl = getWordGifUrl(zombie.word.word);
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
