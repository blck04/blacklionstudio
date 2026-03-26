"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  
  const mousePosition = useRef({ x: -100, y: -100 });
  const cursorPosition = useRef({ x: -100, y: -100 });
  
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, [role='button']");
      const text = clickable?.getAttribute("data-cursor") || "";
      
      setCursorText(text);
      setIsHovering(!!clickable);
    };

    let rafId: number | null = null;
    const animate = () => {
      if (cursorRef.current) {
        cursorPosition.current.x += (mousePosition.current.x - cursorPosition.current.x) * 0.15;
        cursorPosition.current.y += (mousePosition.current.y - cursorPosition.current.y) * 0.15;
        
        cursorRef.current.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hidden md:block pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{
          scale: isHovering ? (cursorText ? 3.5 : 1.8) : 1,
          backgroundColor: isHovering ? "rgba(138, 0, 0, 1)" : "rgba(255, 255, 255, 1)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.5 }}
        className={cn(
          "flex items-center justify-center rounded-full mix-blend-difference overflow-hidden",
          cursorText ? "w-12 h-12" : "w-6 h-6"
        )}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[4px] font-black uppercase tracking-widest text-white whitespace-nowrap"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
