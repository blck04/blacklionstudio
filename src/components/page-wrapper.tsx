"use client";

import { useState, useEffect } from "react";
import { Loader } from "./loader";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [hiding, setHiding] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only show loader on initial site entry
    if (window.sessionStorage.getItem('visited')) {
      setLoading(false);
      return;
    }

    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => setHiding(true), 1600);
    const removeTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'auto';
      window.sessionStorage.setItem('visited', 'true');
    }, 2100);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <Loader 
            key="loader"
            className={cn(hiding && 'opacity-0 transition-opacity duration-500')} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
