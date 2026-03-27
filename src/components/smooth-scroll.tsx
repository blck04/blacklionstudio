"use client";

import { ReactLenis } from 'lenis/react';
import { useEffect } from 'react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Standard manual restoration for smooth scroll stability
    if (history.scrollRestoration !== 'manual') {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <ReactLenis root options={{
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    }}>
      {children}
    </ReactLenis>
  );
}
