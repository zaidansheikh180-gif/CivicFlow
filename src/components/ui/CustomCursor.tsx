import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Immediate position for inner dot
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out',
      });

      // Smooth physics trailing ring with lerp
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.45,
        ease: 'power3.out',
      });
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    // Event listeners for interactive elements hover
    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.glass-panel-interactive') ||
        target.classList.contains('interactive')
      ) {
        setIsHovered(true);
      }
    };

    const onPointerOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.glass-panel-interactive') ||
        target.classList.contains('interactive')
      ) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onPointerOver);
    document.addEventListener('mouseout', onPointerOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onPointerOver);
      document.removeEventListener('mouseout', onPointerOut);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Inner Glowing Cursor Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-150 ${
          isClicked ? 'w-2 h-2 bg-cyan-300 shadow-glow' : isHovered ? 'w-4 h-4 bg-blue-400' : 'w-3 h-3 bg-blue-500'
        }`}
        style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.9)' }}
      />

      {/* Outer Smooth Trailing Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/60 backdrop-blur-[1px] transition-all duration-300 ${
          isHovered
            ? 'w-14 h-14 border-cyan-400 bg-blue-500/10 scale-110 shadow-glow'
            : isClicked
            ? 'w-8 h-8 border-white bg-blue-400/30 scale-90'
            : 'w-10 h-10 border-blue-500/40 bg-transparent'
        }`}
      />
    </div>
  );
};

export default CustomCursor;
