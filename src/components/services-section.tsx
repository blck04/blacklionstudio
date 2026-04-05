"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ScrollAnimation } from './scroll-animation';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Magnetic from './ui/magnetic';
import type { Service } from '@/lib/services-data';

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="services" className="py-20 md:py-32 text-foreground border-t-2 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
        <ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-16 md:mb-24">
            <h2 className="font-headline text-6xl md:text-8xl lg:text-9xl 2xl:text-[10rem] font-bold tracking-tighter text-primary text-center md:text-right leading-none m-0 p-0 md:order-last">
              <span className="text-destructive">S</span>ERVICES
            </h2>
            <p className="text-muted-foreground text-balance text-center md:text-left m-0 pb-[29px] text-xs leading-relaxed uppercase tracking-widest">
              We architect the invisible. Design is our tool for deconstructing complexity and rebuilding it into elegant, high-performance systems that drive evolution. Through strategic foresight and meticulous execution, we transform abstract potential into high-impact digital artifacts that redefine the standards of modern engagement.
            </p>
          </div>
        </ScrollAnimation>

        
        <div className="flex flex-col gap-4">
          {services.map((service, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <ScrollAnimation key={service.id} delay={index * 150}>
                <div
                  className={cn(
                    "group border-2 border-[#121212] rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 transition-all duration-500 ease-in-out bg-card",
                    isExpanded 
                      ? "shadow-[0_0_25px_hsl(var(--primary)/0.3)]" 
                      : "cursor-pointer hover:border-[#121212] hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)]"
                  )}
                  onClick={() => !isExpanded && handleToggle(index)}
                  data-cursor={isExpanded ? "" : "VIEW"}
                >
                  <div className={cn(
                    "flex justify-between items-center gap-4 md:gap-8",
                  )}>
                    <div className="flex-grow flex flex-col justify-center">
                      <div className="flex items-center gap-4 md:gap-6 w-full">
                        {isExpanded && (
                          <Magnetic>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full h-12 w-12 bg-foreground text-background hover:bg-foreground/80 flex-shrink-0"
                                onClick={(e) => {
                                e.stopPropagation();
                                handleToggle(index);
                                }}
                            >
                                <X className="h-6 w-6" />
                            </Button>
                          </Magnetic>
                        )}
                        <span className="text-xl md:text-2xl 2xl:text-3xl font-code text-destructive">
                          {`0${index + 1}`}
                        </span>
                        <h3 className="font-headline text-3xl md:text-6xl 2xl:text-7xl font-bold tracking-tighter text-left uppercase">
                          {service.title}
                        </h3>
                      </div>

                      <div className={cn("grid transition-all duration-500 ease-in-out", isExpanded ? "grid-rows-[1fr] opacity-100 mt-8" : "grid-rows-[0fr] opacity-0")}>
                          <div className="overflow-hidden">
                              <p className="text-muted-foreground text-center md:text-left">
                                  {service.details}
                              </p>
                          </div>
                      </div>
                    </div>
                    
                    <div className={cn(
                      "overflow-hidden relative flex-shrink-0 transition-all duration-500 ease-in-out self-center rounded-full shadow-[0_0_0_2px_hsl(var(--secondary)),0_0_0_4px_hsl(var(--destructive))]",
                      isExpanded ? "w-0 h-0 opacity-0 pointer-events-none" : "w-5/12 h-24 md:w-48 md:h-[120px] opacity-100"
                    )}>
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        className={cn(
                            "object-cover w-full h-full transition-transform duration-500 ease-in-out",
                            "group-hover:scale-110"
                        )}
                        priority
                      />
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
