"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
      <div className="relative">
        {/* Large Decorative 404 */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-headline text-[20vw] font-bold leading-none tracking-tighter text-foreground/5 md:text-[15rem]"
        >
          404
        </motion.h1>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <h2 className="font-headline text-4xl font-bold uppercase tracking-tighter text-foreground md:text-6xl">
              BEYOND THE <span className="text-destructive">FRONTIER</span>
            </h2>
            <p className="mx-auto max-w-md text-muted-foreground">
              The coordinate you seek does not exist within this architecture. It has either been deconstructed or relocated to a new digital dimension.
            </p>
            <div className="pt-4">
              <Button asChild variant="outline" className="rounded-full border-2 border-primary px-8 h-12 hover:bg-primary hover:text-primary-foreground font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300">
                <Link href="/" className="flex items-center gap-2">
                  Return Home <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Bento-style Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute left-10 top-10 h-32 w-32 rounded-3xl border border-foreground/10" />
        <div className="absolute right-20 top-40 h-64 w-64 rounded-[3rem] border border-foreground/10" />
        <div className="absolute bottom-20 left-1/4 h-48 w-48 rounded-[2rem] border border-foreground/10" />
      </div>
    </div>
  );
}
