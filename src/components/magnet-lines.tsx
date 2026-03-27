"use client";

import React, { useRef, useEffect, CSSProperties, useMemo } from 'react';

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
    
    // Cache container rect and item centers to avoid layout thrashing
    let containerRect = container.getBoundingClientRect();
    const itemCenters: { x: number; y: number }[] = [];
    
    const updateCache = () => {
      containerRect = container.getBoundingClientRect();
      itemCenters.length = 0;
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        // Store position relative to container
        itemCenters.push({
          x: rect.x - containerRect.x + rect.width / 2,
          y: rect.y - containerRect.y + rect.height / 2
        });
      });
    };

    updateCache();

    const onPointerMove = (pointer: { x: number; y: number }) => {
      if (!containerRect) return;
      
      // Calculate pointer position relative to container
      const relativePointerX = pointer.x - containerRect.x;
      const relativePointerY = pointer.y - containerRect.y;

      items.forEach((item, index) => {
        const center = itemCenters[index];
        if (!center) return;
        
        const b = relativePointerX - center.x;
        const a = relativePointerY - center.y;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (relativePointerY > center.y ? 1 : -1);
        
        item.style.setProperty('--rotate', `${r}deg`);
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      onPointerMove({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      updateCache();
    };
    
    const handleScroll = () => {
        // Still need to update containerRect on scroll to keep relative pointer accurate
        containerRect = container.getBoundingClientRect();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial position based on mouse position if possible, else center
    onPointerMove({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [rows, columns]); // Re-run if grid size changes

  const total = useMemo(() => rows * columns, [rows, columns]);
  
  const spans = useMemo(() => Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      className="block origin-center"
      style={{
        width: lineWidth,
        height: lineHeight,
        borderRadius: '9999px',
        backgroundColor: lineColor,
        '--rotate': `${baseAngle}deg` as any,
        transform: 'rotate(var(--rotate))',
        willChange: 'transform',
        boxSizing: 'border-box',
        transition: 'transform 0.1s ease-out'
      } as React.CSSProperties}
    />
  )), [total, lineWidth, lineHeight, lineColor, baseAngle]);

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
