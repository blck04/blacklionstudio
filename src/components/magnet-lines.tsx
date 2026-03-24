"use client";

import React, { useRef, useEffect, CSSProperties } from 'react';

export interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  outlineThickness?: string;
  baseAngle?: number;
  className?: string;
  style?: CSSProperties;
  fixed?: boolean;
}

const MagnetLines: React.FC<MagnetLinesProps> = ({
  rows = 15,
  columns = 15,
  containerSize = '100%',
  lineColor = '#8A0000',
  lineWidth = '1.5vmin',
  lineHeight = '5vmin',
  outlineThickness = '3px',
  baseAngle = -10,
  className = '',
  style = {},
  fixed = false
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLSpanElement>('span');

    const onPointerMove = (pointer: { x: number; y: number }) => {
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        
        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);
        
        item.style.setProperty('--rotate', `${r}deg`);
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      onPointerMove({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('pointermove', handlePointerMove);
    
    // Initial position based on mouse position if possible, else center
    onPointerMove({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const total = rows * columns;
  
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      className="block origin-center"
      style={{
        width: lineWidth,
        height: lineHeight,
        borderRadius: '9999px',
        backgroundColor: 'transparent',
        border: `${outlineThickness} solid ${lineColor}`,
        '--rotate': `${baseAngle}deg` as any,
        transform: 'rotate(var(--rotate))',
        willChange: 'transform',
        boxSizing: 'border-box',
        transition: 'transform 0.1s ease-out'
      } as React.CSSProperties}
    />
  ));

  const combinedStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    width: containerSize,
    height: containerSize,
    ...(fixed ? {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none',
    } : {}),
    ...style
  };

  return (
    <div
      ref={containerRef}
      className={`grid place-items-center ${className}`}
      style={combinedStyle}
    >
      {spans}
    </div>
  );
};

export default MagnetLines;
