"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Use refs for all frequently updated values to avoid re-renders
  const mousePosition = useRef({ x: -100, y: -100 });
  const cursorPosition = useRef({ x: -100, y: -100 });
  const isHoveringRef = useRef(false);
  const currentScale = useRef(1);
  
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      isHoveringRef.current = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a, button");
    };

    let rafId: number | null = null;
    const animate = () => {
      if (cursorRef.current) {
        // Lerp (linear interpolate) position for smoothness
        cursorPosition.current.x += (mousePosition.current.x - cursorPosition.current.x) * 0.15;
        cursorPosition.current.y += (mousePosition.current.y - cursorPosition.current.y) * 0.15;

        // Lerp scale for smoothness
        const targetScale = isHoveringRef.current ? 1.8 : 1;
        currentScale.current += (targetScale - currentScale.current) * 0.2;
        
        // Apply transform. Center the cursor by offsetting by half its width/height (12px)
        cursorRef.current.style.transform = `translate3d(${cursorPosition.current.x - 12}px, ${cursorPosition.current.y - 12}px, 0) scale(${currentScale.current})`;
      }
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []); // Run only once on mount

  return (
    <div
      ref={cursorRef}
      className={cn(
        "hidden md:block",
        "fixed top-0 left-0 w-6 h-6 rounded-full bg-foreground pointer-events-none z-[9999]",
        "mix-blend-difference"
      )}
    />
  );
}
