"use client";

import { cn } from '@/lib/utils';
import { TypingAnimation } from './typing-animation';

export function Loader({ className }: { className?: string }) {

  return (
    <div className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background",
        className
    )}>
        <h1 className="font-headline font-bold text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase animate-heartbeat text-foreground">
            <span className="text-destructive">B</span>LACK <span className="text-destructive">L</span>ION <span className="text-destructive">S</span>TUDIO
        </h1>
        <div className="mt-6">
            <TypingAnimation text="DISTINCT . REFINED . TIMELESS" />
        </div>
    </div>
  );
}
