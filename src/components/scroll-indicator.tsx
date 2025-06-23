"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={cn(
      "absolute bottom-10 left-10 z-20 transition-opacity duration-500 animate-fade-in-up opacity-0",
      "hidden md:block",
      !isVisible && "opacity-0 pointer-events-none"
    )} style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
      <div className="relative w-px h-24 bg-muted-foreground/50">
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 text-muted-foreground animate-scroll-bounce">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1"/>
                <text x="50%" y="50%" textAnchor="middle" fill="currentColor" dy=".3em" fontSize="10" className="font-headline font-semibold">N</text>
            </svg>
        </div>
      </div>
    </div>
  );
}
