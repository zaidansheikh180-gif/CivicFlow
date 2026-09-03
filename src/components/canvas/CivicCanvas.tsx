import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CivicWorld from './CivicWorld';
import { SuggestionWithDetails } from '../../types/domain';

interface CivicCanvasProps {
  suggestions?: SuggestionWithDetails[];
  selectedId?: string | null;
  onSelectSuggestion?: (suggestion: SuggestionWithDetails) => void;
  activeRoute?: string;
}

export const CivicCanvas: React.FC<CivicCanvasProps> = ({
  suggestions = [],
  selectedId = null,
  onSelectSuggestion,
  activeRoute = '/',
}) => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Detect WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch {
      setHasWebGL(false);
    }

    // Detect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-300 p-6 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xl">
          2D
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">2D Accessibility Mode Active</h3>
        <p className="text-sm text-slate-400 max-w-md">
          WebGL acceleration is disabled or unsupported. Displaying full 2D accessibility layer.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 8, 14], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 15, 10]} intensity={1.2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <CivicWorld
            suggestions={suggestions}
            selectedId={selectedId}
            onSelectSuggestion={onSelectSuggestion}
            isReducedMotion={isReducedMotion}
            activeRoute={activeRoute}
          />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={6}
          maxDistance={24}
          autoRotate={!isReducedMotion && activeRoute === '/'}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default CivicCanvas;
