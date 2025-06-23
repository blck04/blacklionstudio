"use client";

import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  text: string;
  className?: string;
  stagger?: number;
}

export function TypingAnimation({ text, className, stagger = 0.05 }: TypingAnimationProps) {
  const letters = text.split("");

  return (
    <h2 className={cn("font-headline font-bold tracking-tighter uppercase text-foreground text-3xl md:text-4xl flex justify-center", className)}>
      <span className="sr-only">{text}</span>
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-block animate-wave-in opacity-0"
          style={{ animationDelay: `${(index * stagger).toFixed(3)}s`, animationFillMode: 'forwards' }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </h2>
  );
}
