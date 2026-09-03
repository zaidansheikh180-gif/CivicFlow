import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
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
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const [hoveredSuggestion, setHoveredSuggestion] = useState<SuggestionWithDetails | null>(null);

  // Smooth continuous 3D rotations & animations
  useFrame((state, delta) => {
    if (!isReducedMotion) {
      if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.4;
      if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.3;
      if (particlesRef.current) particlesRef.current.rotation.y += delta * 0.02;
    }
  });

  // Particle positions
  const particleCount = 180;
  const particlePositions = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = Math.random() * 12 + 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 35;
    }
    return positions;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Civic Ground Grid */}
      <gridHelper args={[36, 36, '#3B82F6', '#1E293B']} position={[0, -0.01, 0]} />
      
      {/* Glowing Refractive Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[45, 45]} />
        <meshStandardMaterial color="#0B1120" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* levitating 3D Civic Centerpiece */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[0, 1.2, 0]}>
          {/* Main Civic Dome */}
          <mesh position={[0, 1, 0]}>
            <sphereGeometry args={[1.8, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial color="#3B82F6" opacity={0.65} transparent roughness={0.1} metalness={0.9} />
          </mesh>

          {/* Core Crystal Spire */}
          <mesh position={[0, 1.5, 0]}>
            <octahedronGeometry args={[0.9]} />
            <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.6} />
          </mesh>

          {/* 3D Rotating Civic Energy Rings */}
          <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]} position={[0, 1, 0]}>
            <torusGeometry args={[2.5, 0.03, 16, 100]} />
            <meshBasicMaterial color="#60A5FA" transparent opacity={0.7} />
          </mesh>

          <mesh ref={ring2Ref} rotation={[0, Math.PI / 4, Math.PI / 6]} position={[0, 1, 0]}>
            <torusGeometry args={[3.2, 0.02, 16, 100]} />
            <meshBasicMaterial color="#34D399" transparent opacity={0.5} />
          </mesh>
        </group>
      </Float>

      {/* Levitating 3D Landmark Districts */}
      <group>
        {/* District 1: Transit Hub Arch */}
        <Float speed={1.5} floatIntensity={0.4}>
          <group position={[-7, 1.5, -6]}>
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[1.8, 0.15, 16, 32, Math.PI]} />
              <meshStandardMaterial color="#3B82F6" emissive="#2563EB" emissiveIntensity={0.3} />
            </mesh>
            <mesh position={[0, -0.6, 0]}>
              <boxGeometry args={[3, 0.3, 2]} />
              <meshStandardMaterial color="#1E293B" />
            </mesh>
          </group>
        </Float>

        {/* District 2: Eco Solar Tower */}
        <Float speed={1.8} floatIntensity={0.3}>
          <group position={[7, 2, -5]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.8, 4, 6]} />
              <meshStandardMaterial color="#10B981" emissive="#059669" emissiveIntensity={0.4} />
            </mesh>
            <mesh position={[0, 2.2, 0]}>
              <sphereGeometry args={[0.6, 16, 16]} />
              <meshBasicMaterial color="#34D399" />
            </mesh>
          </group>
        </Float>

        {/* District 3: Public Culture Stage */}
        <Float speed={1.2} floatIntensity={0.5}>
          <group position={[-6, 1.2, 7]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[3.5, 0.4, 3.5]} />
              <meshStandardMaterial color="#8B5CF6" emissive="#6D28D9" emissiveIntensity={0.3} />
            </mesh>
            <mesh position={[0, 1.2, 0]}>
              <octahedronGeometry args={[0.7]} />
              <meshStandardMaterial color="#EC4899" />
            </mesh>
          </group>
        </Float>
      </group>

      {/* Ambient Floating Particle Cloud */}
      {!isReducedMotion && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial size={0.09} color="#60A5FA" transparent opacity={0.7} />
        </points>
      )}

      {/* Interactive 3D Proposal Pins */}
      {suggestions.map((suggestion) => {
        const isSelected = selectedId === suggestion.id;
        const statusConfig = STATUS_CONFIG[suggestion.status] || STATUS_CONFIG.submitted;
        const color = suggestion.category?.color_token || statusConfig.color;

        const x = suggestion.location?.x ?? (Math.sin(suggestion.id.length) * 6);
        const y = suggestion.location?.y ?? 1.5;
        const z = suggestion.location?.z ?? (Math.cos(suggestion.id.length) * 6);

        return (
          <Float key={suggestion.id} speed={2.5} floatIntensity={0.6} position={[x, y, z]}>
            <group
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
              {/* Stem */}
              <mesh position={[0, -0.7, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 1.4, 8]} />
                <meshBasicMaterial color={color} />
              </mesh>

              {/* 3D Glowing Crystal Marker Pin */}
              <mesh position={[0, 0.3, 0]}>
                <octahedronGeometry args={[isSelected ? 0.65 : 0.45]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={isSelected ? 1.2 : 0.5}
                  roughness={0.1}
                  metalness={0.9}
                />
              </mesh>

              {/* Pulsing Aura Ring */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]}>
                <ringGeometry args={[0.5, 0.75, 32]} />
                <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={isSelected ? 0.9 : 0.4} />
              </mesh>

              {/* HTML Tooltip on Hover */}
              {hoveredSuggestion?.id === suggestion.id && (
                <Html position={[0, 1, 0]} center distanceFactor={12}>
                  <div className="bg-slate-950/90 backdrop-blur-xl text-white text-xs p-3 rounded-xl border border-blue-500/40 shadow-2xl whitespace-nowrap pointer-events-none transform -translate-y-2 transition-all">
                    <div className="font-bold text-blue-400 mb-0.5">{suggestion.title}</div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                      <span>{suggestion.category?.name || 'Proposal'}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-emerald-400 font-bold">👍 {suggestion.support_count}</span>
                    </div>
                  </div>
                </Html>
              )}
            </group>
          </Float>
        );
      })}
    </group>
  );
};

export default CivicWorld;
