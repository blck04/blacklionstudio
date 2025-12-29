"use client";

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight';
}

export function ScrollAnimation({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  triggerOnce = false,
  animation = 'fadeInUp',
}: ScrollAnimationProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else {
          if (!triggerOnce) {
            setIsInView(false);
          }
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [triggerOnce, threshold]);

  const animationClasses = {
    fadeInUp: {
      in: 'opacity-100 translate-y-0',
      out: 'opacity-0 translate-y-5',
    },
    fadeInLeft: {
        in: 'opacity-100 translate-x-0',
        out: 'opacity-0 -translate-x-10',
    },
    fadeInRight: {
        in: 'opacity-100 translate-x-0',
        out: 'opacity-0 translate-x-10',
    },
  };

  const currentAnimation = animationClasses[animation] || animationClasses.fadeInUp;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out duration-700",
        isInView ? currentAnimation.in : currentAnimation.out,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
