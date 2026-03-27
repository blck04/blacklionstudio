"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const isHovering = useMotionValue(0); // 0 for false, 1 for true
  const scale = useSpring(useTransform(isHovering, [0, 1], [1, 1.8]), springConfig);
  
  // Update scale further if there's text
  useEffect(() => {
    if (cursorText) {
      isHovering.set(1);
    }
  }, [cursorText]);

  const lastTargetRef = useRef<EventTarget | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (e.target === lastTargetRef.current) return;
      lastTargetRef.current = e.target;

      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, [role='button']");
      const text = (clickable as HTMLElement)?.getAttribute("data-cursor") || "";
      
      if (text !== cursorText) {
        setCursorText(text);
      }
      
      isHovering.set(clickable ? 1 : 0);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [cursorText]);

  const backgroundColor = useTransform(
    isHovering,
    [0, 1],
    ["rgba(255, 255, 255, 1)", "rgba(138, 0, 0, 1)"]
  );

  const finalScale = useTransform(
    [scale, isHovering],
    ([latestScale, latestHover]) => {
      if (cursorText && latestHover) return (latestScale as number) * 2;
      return latestScale as number;
    }
  );

  return (
    <motion.div
      ref={cursorRef}
      className="hidden md:block pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <motion.div
        style={{
          scale: finalScale,
          backgroundColor: backgroundColor,
        }}
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
    </motion.div>
  );
}
