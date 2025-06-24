import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MadeWithLoveSeal({ className }: { className?: string }) {
  return (
    <div className={cn("relative animate-spin-slow", className)}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <path id="circle" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
        </defs>
        <text dy="5" className="text-[12px] uppercase tracking-wider fill-current">
          <textPath xlinkHref="#circle">
            BLACK • LION • STUDIO • BLACK • LION • STUDIO • BLACK • LION •
          </textPath>
        </text>
      </svg>
      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25%] h-[25%] text-destructive-foreground" />
    </div>
  )
}
