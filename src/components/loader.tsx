"use client";

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { TypingAnimation } from './typing-animation';
import { useTheme } from './theme-provider';
import { useState, useEffect } from 'react';

export function Loader({ className }: { className?: string }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted && theme === 'light' ? '/LOGO-LIGHT-MODE.png' : '/LOGO-DARK-MODE.png';

  return (
    <div className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background",
        className
    )}>
        <Image
            src={logoSrc}
            alt="BLACK LION STUDIO Logo"
            width={250}
            height={66}
            className="animate-heartbeat"
            priority
        />
        <div className="mt-6">
            <TypingAnimation text="DISTINCT . REFINED . TIMELESS" />
        </div>
    </div>
  );
}
