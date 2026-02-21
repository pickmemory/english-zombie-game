import { Zombie as ZombieType } from '../../types/game';
import { useGameStore } from '../../stores/gameStore';
import { Zombie, ZombieList } from './Zombie';

export { ZombieList };

export function GameCanvas() {
  const zombies = useGameStore(s => s.state.zombies);

  return (
    <div className="game-area">
      <div className="clouds">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>
      <ZombieList zombies={zombies} />
      <div className="projectile-lane"></div>
      <div className="launcher-lane">
        <Launcher />
        <Launcher />
        <Launcher />
        <Launcher />
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
