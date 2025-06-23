"use client"

import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number;
}

export function AnimatedText({ text, className, wordClassName, stagger = 0.05 }: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <div className={cn("text-balance", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-2">
          <span
            className={cn("inline-block animate-fade-in-up opacity-0", wordClassName)}
            style={{ animationDelay: `${i * stagger}s`, animationFillMode: 'forwards' }}
          >
            {word}&nbsp;
          </span>
        </span>
      ))}
    </div>
  );
}
