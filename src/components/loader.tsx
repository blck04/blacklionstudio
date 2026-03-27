"use client";

import { TypingAnimation } from './typing-animation';
import { motion } from 'framer-motion';

export function Loader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      style={{ backgroundImage: "url('/asfalt-dark.png')", backgroundRepeat: 'repeat', backgroundAttachment: 'fixed' }}
    >
        <h1 className="font-headline font-bold text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase animate-heartbeat text-foreground">
            BLACK LION STUDIO
        </h1>
        <div className="mt-6">
            <TypingAnimation text="DISTINCT . REFINED . TIMELESS" />
        </div>
    </motion.div>
  );
}
