import React, { useRef, useState } from 'react';
import gsap from 'gsap';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  intensity?: number;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  onClick,
  intensity = 15,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    // Smooth GSAP 3D rotation update
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      scale3d: 1.02,
      duration: 0.25,
      ease: 'power2.out',
    });

    // Dynamic light sheen glare effect
    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 75%)`;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    // Elastic reset on leave
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale3d: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });

    if (glare) {
      glare.style.background = 'transparent';
    }
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="inline-block w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={`relative overflow-hidden transition-shadow duration-300 transform-gpu ${className} ${
          isHovered ? 'shadow-2xl shadow-blue-500/20' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic Sheen Glare Overlay */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* 3D Content Container with Depth */}
        <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card3D;
