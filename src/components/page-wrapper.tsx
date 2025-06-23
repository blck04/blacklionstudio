"use client";

import { useState, useEffect } from "react";
import { Loader } from "./loader";
import { cn } from "@/lib/utils";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    // Prevent body scroll while loader is visible
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setHiding(true); // Start fade-out animation
    }, 1600); // Total text animation time

    const removeTimer = setTimeout(() => {
      setLoading(false); // Remove loader from DOM
      document.body.style.overflow = 'auto'; // Restore scroll
    }, 2100); // 1600ms show + 500ms fade-out transition

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
      document.body.style.overflow = 'auto';
    };
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <>
      {loading && <Loader className={cn(hiding && 'opacity-0 transition-opacity duration-500')} />}
      {children}
    </>
  );
}
