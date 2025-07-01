"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ScrollAnimation } from './scroll-animation';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { services } from '@/lib/services-data';

export function ServicesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="services" className="py-20 md:py-32 text-foreground border-t border-b overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24">
            <div className="text-center md:order-last md:text-right">
              <h2 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-primary text-center md:text-right">
                <span className="text-destructive">S</span>ERVICES
              </h2>
            </div>
            <div className="text-center md:text-left">
              <p className="text-muted-foreground md:text-xl text-balance text-center md:text-left">
                We use the power of design to solve complex problems and cultivate business solutions.
              </p>
            </div>
          </div>
        </ScrollAnimation>
        
        <div className="flex flex-col gap-4">
          {services.map((service, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <ScrollAnimation key={service.title} delay={index * 150}>
                <div
                  className={cn(
                    "group border border-border/50 rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 transition-all duration-500 ease-in-out bg-card/20 backdrop-blur-lg",
                    isExpanded 
                      ? "shadow-[0_0_25px_hsl(var(--primary)/0.3)]" 
                      : "cursor-pointer hover:border-primary/80 hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:bg-card/40"
                  )}
                  onClick={() => !isExpanded && handleToggle(index)}
                >
                  <div className={cn(
                    "flex justify-between items-center gap-4 md:gap-8",
                  )}>
                    <div className="flex-grow flex flex-col justify-center">
                      <div className="flex items-center gap-4 md:gap-6 w-full">
                        {isExpanded && (
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
                        )}
                        <span className="text-xl md:text-2xl font-code text-destructive">
                          {`0${index + 1}`}
                        </span>
                        <h3 className="font-headline text-3xl md:text-6xl font-bold tracking-tighter text-left">
                          {service.title}
                        </h3>
                      </div>

                      <div className={cn("grid transition-all duration-500 ease-in-out", isExpanded ? "grid-rows-[1fr] opacity-100 mt-8" : "grid-rows-[0fr] opacity-0")}>
                          <div className="overflow-hidden">
                              <p className="text-muted-foreground text-base md:text-lg text-center md:text-left">
                                  {service.details}
                              </p>
                          </div>
                      </div>
                    </div>
                    
                    {!isExpanded && (
                      <div className={cn(
                        "overflow-hidden relative flex-shrink-0 transition-all duration-500 ease-in-out self-center w-5/12 h-24 md:w-48 md:h-[120px] rounded-full shadow-[0_0_0_2px_hsl(var(--secondary)),0_0_0_4px_hsl(var(--destructive))]"
                      )}>
                        <Image
                          src={service.imageUrl}
                          alt={service.title}
                          fill
                          className={cn(
                              "object-cover w-full h-full transition-transform duration-500 ease-in-out",
                              "group-hover:scale-110"
                          )}
                        />
                      </div>
                    )}
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
