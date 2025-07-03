"use client";

import { NavCard } from "./nav-card";
import { AnimatedText } from "./animated-text";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export function HeroSection() {
  const handleLetsTalkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = 'contact';
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        const headerOffset = 96; // Corresponds to h-24 in Tailwind for aesthetic spacing
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
    }
  };

  return (
    <section id="home" className="relative w-full h-screen flex justify-end items-center text-foreground overflow-hidden">
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-[15vw] flex flex-col gap-6 items-start">
        <p className="text-muted-foreground text-sm">
            In a world overflowing with digital noise, your brand deserves more than just a presence – it deserves a voice that cuts through and connects. We craft digital experiences that resonate, meticulously designing every detail to not only capture attention, but to genuinely engage your audience, build lasting connections, and drive measurable results. Let us transform your vision into an unforgettable online journey that leaves a lasting impact.
        </p>
        <Button asChild variant="default" className="rounded-full px-6 transition-all duration-300 shadow-[0_0_25px_hsl(var(--primary)/0.3)] border border-primary hover:bg-background hover:text-accent-foreground hover:border-foreground/50 hover:shadow-none">
            <Link href="#contact" onClick={handleLetsTalkClick}>
                Let's Talk
            </Link>
        </Button>
      </div>
      {/* Card with background image */}
      <div
        className="relative w-[80vw] h-[95vh] rounded-l-3xl bg-cover bg-center shadow-2xl flex justify-center items-start p-4"
        style={{ backgroundImage: "url('/bls-hero.png')" }}
      >
        <NavCard />
        <div className="absolute bottom-16 left-16">
          <AnimatedText 
            text="WE CRAFT DIGITAL EXPERIENCES THAT RESONATE." 
            className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground max-w-4xl text-left tracking-tighter leading-none"
            stagger={0.02}
          />
        </div>
      </div>
    </section>
  );
}
