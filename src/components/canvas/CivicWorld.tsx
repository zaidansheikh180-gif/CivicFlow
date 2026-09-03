import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { SuggestionWithDetails, STATUS_CONFIG } from '../../types/domain';

interface CivicWorldProps {
  suggestions: SuggestionWithDetails[];
  selectedId: string | null;
  onSelectSuggestion?: (suggestion: SuggestionWithDetails) => void;
  isReducedMotion: boolean;
  activeRoute: string;
}

export const CivicWorld: React.FC<CivicWorldProps> = ({
  suggestions,
  selectedId,
  onSelectSuggestion,
  isReducedMotion,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const [hoveredSuggestion, setHoveredSuggestion] = useState<SuggestionWithDetails | null>(null);

  // Gentle ambient rotation
  useFrame((_, delta) => {
    if (!isReducedMotion && particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.03;
    }
  });

  // Particle positions
  const particleCount = 120;
  const particlePositions = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = Math.random() * 8 + 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Civic Ground Grid */}
      <gridHelper args={[32, 32, '#3B82F6', '#1E293B']} position={[0, -0.01, 0]} />
      
      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0B1120" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* City Landmarks / Procedural Buildings */}
      <group position={[0, 0, 0]}>
        {/* Central Civic Hall */}
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, 3.25, 0]}>
          <coneGeometry args={[2.2, 1.5, 4]} />
          <meshStandardMaterial color="#3B82F6" opacity={0.8} transparent />
        </mesh>

        {/* Surrounding Civic Buildings */}
        <mesh position={[-6, 1.2, -5]}>
          <boxGeometry args={[2.5, 2.4, 2.5]} />
          <meshStandardMaterial color="#131C2E" />
        </mesh>
        <mesh position={[6, 1.8, -4]}>
          <boxGeometry args={[2.2, 3.6, 2.2]} />
          <meshStandardMaterial color="#0F172A" />
        </mesh>
        <mesh position={[-5, 1, 6]}>
          <boxGeometry args={[2, 2, 3]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        <mesh position={[7, 1.4, 5]}>
          <boxGeometry args={[3, 2.8, 2]} />
          <meshStandardMaterial color="#131C2E" />
        </mesh>
      </group>

      {/* Floating Ambient Sparks / Particles */}
      {!isReducedMotion && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial size={0.08} color="#60A5FA" transparent opacity={0.6} />
        </points>
      )}

      {/* Suggestion 3D Markers */}
      {suggestions.map((suggestion) => {
        const isSelected = selectedId === suggestion.id;
        const statusConfig = STATUS_CONFIG[suggestion.status] || STATUS_CONFIG.submitted;
        const color = suggestion.category?.color_token || statusConfig.color;

        // Position coordinates
        const x = suggestion.location?.x ?? (Math.sin(suggestion.id.length) * 5);
        const y = suggestion.location?.y ?? 1.2;
        const z = suggestion.location?.z ?? (Math.cos(suggestion.id.length) * 5);

        return (
          <group
            key={suggestion.id}
            position={[x, y, z]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectSuggestion?.(suggestion);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredSuggestion(suggestion);
            }}
            onPointerOut={() => setHoveredSuggestion(null)}
          >
            {/* Marker Stem */}
            <mesh position={[0, -0.6, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
              <meshBasicMaterial color={color} />
            </mesh>

            {/* Marker Gem / Pin */}
            <mesh position={[0, 0.2, 0]}>
              <octahedronGeometry args={[isSelected ? 0.55 : 0.4]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={isSelected ? 0.8 : 0.3}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Glowing Aura Ring if Selected */}
            {isSelected && (
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
                <ringGeometry args={[0.5, 0.7, 32]} />
                <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.8} />
              </mesh>
            )}

            {/* HTML Tooltip on Hover */}
            {hoveredSuggestion?.id === suggestion.id && (
              <Html position={[0, 0.8, 0]} center distanceFactor={12}>
                <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs p-2.5 rounded-lg border border-slate-700 shadow-xl whitespace-nowrap pointer-events-none">
                  <div className="font-semibold text-blue-400 mb-0.5">{suggestion.title}</div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <span>{suggestion.category?.name || 'Civic Proposal'}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-emerald-400 font-medium">👍 {suggestion.support_count}</span>
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};

export default CivicWorld;
