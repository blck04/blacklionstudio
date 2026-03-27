"use client";

import { useState, useEffect } from "react";
import { Loader } from "./loader";
import { AnimatePresence } from "framer-motion";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Only show loader on initial site entry
    const hasVisited = window.sessionStorage.getItem('visited');
    if (!hasVisited) {
      setLoading(true);
      document.body.style.overflow = 'hidden';
      
      const timer = setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = "auto";
        window.sessionStorage.setItem("visited", "true");
      }, 2500);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'auto';
      };
    }
  }, []);

  // During initial mount or if loading, we might want to hide the content
  // to avoid a flash of the full page before the template animation kicks in.
  const showContent = mounted && !loading;

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      <div 
        className="flex-1 w-full transition-opacity duration-500"
        style={{ opacity: showContent ? 1 : 0 }}
      >
        {children}
      </div>
    </>
  );
}
