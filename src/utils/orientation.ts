// Game orientation and device detection utilities

export type DeviceOrientation = 'portrait' | 'landscape';

export function getDeviceOrientation(): DeviceOrientation {
  if (typeof window === 'undefined') return 'landscape';
  
  return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
}

export function getGameDimensions() {
  const orientation = getDeviceOrientation();
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (orientation === 'portrait' || isMobile) {
    // Portrait mode (mobile): zombie moves from bottom to top
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      orientation: 'portrait' as const,
      zombieStartX: window.innerWidth / 2,
      zombieStartY: window.innerHeight * 0.7, // Start from lower area
      launcherX: window.innerWidth / 2,
      launcherY: window.innerHeight * 0.2, // Launcher near top
      zombieMoveDirection: -1, // Move upward
    };
  } else {
    // Landscape mode (desktop): zombie moves from right to left
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      orientation: 'landscape' as const,
      zombieStartX: window.innerWidth * 0.7, // Start from right side
      zombieStartY: window.innerHeight / 2,
      launcherX: window.innerWidth / 2,
      launcherY: window.innerHeight / 2, // Launcher in center
      zombieMoveDirection: -1, // Move left
    };
  }
}

// Listen for orientation changes
export function onOrientationChange(callback: (orientation: DeviceOrientation) => void) {
  if (typeof window === 'undefined') return;
  
  const handler = () => callback(getDeviceOrientation());
  window.addEventListener('resize', handler);
  window.addEventListener('orientationchange', handler);
  
  return () => {
    window.removeEventListener('resize', handler);
    window.removeEventListener('orientationchange', handler);
  };
}
