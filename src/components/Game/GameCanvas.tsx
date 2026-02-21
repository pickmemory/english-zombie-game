import { Zombie as ZombieType } from '../../types/game';
import { useGameStore } from '../../stores/gameStore';
import { Zombie, ZombieList } from './Zombie';
import { getGameDimensions } from '../../utils/orientation';
import { useState, useEffect } from 'react';

export { ZombieList };

export function GameCanvas() {
  const zombies = useGameStore(s => s.state.zombies);
  const [dims, setDims] = useState(getGameDimensions());

  useEffect(() => {
    const updateDims = () => setDims(getGameDimensions());
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  const isPortrait = dims.orientation === 'portrait';

  return (
    <div className="game-area" style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
    }}>
      <div className="clouds">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>
      <ZombieList zombies={zombies} />
      <div className="projectile-lane"></div>
      {/* Single centered launcher */}
      <div 
        className="launcher-container"
        style={{
          position: 'absolute',
          left: '50%',
          top: isPortrait ? '20%' : '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Launcher />
      </div>
    </div>
  );
}

function Launcher() {
  return (
    <div className="launcher">
      <div className="launcher-cannon"></div>
      <div className="launcher-base"></div>
    </div>
  );
}

export function ProjectileDisplay() {
  const projectiles = useGameStore(s => s.state.projectiles);

  return (
    <>
      {projectiles.map(projectile => (
        <div
          key={projectile.id}
          className="projectile"
          style={{ left: `${projectile.x}px`, top: '200px' }}
        >
          <div className="projectile-image">🍎</div>
        </div>
      ))}
    </>
  );
}
