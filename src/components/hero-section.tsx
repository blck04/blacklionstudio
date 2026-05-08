"use client";

import React, { useState, useLayoutEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import MagnetLines from './magnet-lines';
import Magnetic from './ui/magnetic';

export function HeroSection() {
  const [dimensions, setDimensions] = useState({ w: 1600, h: 900 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Journal', href: '/journal' },
    { name: 'Contact', href: '#contact' },
  ];

  useLayoutEffect(() => {
    const handleResize = () => {
      // Uniform 32px margin on all sides (matching p-8)
      setDimensions({
        w: window.innerWidth - 64,
        h: window.innerHeight - 64
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        setIsMenuOpen(false);
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
    }
  };

  /**
   * Dynamic Neo-Brutalist Bento Path
   * All corners: 24px radius
   * Top Cutouts: 80px height
   */
  const { w, h } = dimensions;
  const R = 24;
  const HT = 80;
  const WL = 300;
  const WA = 650;
  const WB = 550;
  const HB = 250;

  const heroBentoPath = `path('M 0 ${HT + R} A ${R} ${R} 0 0 1 ${R} ${HT} L ${WL - R} ${HT} A ${R} ${R} 0 0 0 ${WL} ${HT - R} L ${WL} ${R} A ${R} ${R} 0 0 1 ${WL + R} 0 L ${w - WA - R} 0 A ${R} ${R} 0 0 1 ${w - WA} ${R} L ${w - WA} ${HT - R} A ${R} ${R} 0 0 0 ${w - WA + R} ${HT} L ${w - R} ${HT} A ${R} ${R} 0 0 1 ${w} ${HT + R} L ${w} ${h - HB - R} A ${R} ${R} 0 0 1 ${w - R} ${h - HB} L ${w - WB + R} ${h - HB} A ${R} ${R} 0 0 0 ${w - WB} ${h - HB + R} L ${w - WB} ${h - R} A ${R} ${R} 0 0 1 ${w - WB - R} ${h} L ${R} ${h} A ${R} ${R} 0 0 1 0 ${h - R} Z')`;

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-background"
      style={{ backgroundImage: "url('/asfalt-dark.png')", backgroundRepeat: 'repeat', backgroundAttachment: 'fixed' }}
    >
      <div className="flex h-[100svh] flex-col overflow-hidden lg:hidden">
        <div className="relative flex-[0_0_48%] overflow-hidden bg-black">
          <Image
            src="/bls-hero.png"
            alt="Black Lion Studio hero artwork"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5">
            <Link href="/" data-cursor="GO" className="flex items-center">
              <Image
                src="/BLS-NEW-LOGO.png"
                alt="Black Lion Studio"
                width={76}
                height={42}
                className="h-auto w-[76px] object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]"
              />
            </Link>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="inline-flex h-9 items-center justify-center rounded-full border-2 border-white bg-black/20 px-5 text-center font-headline text-base font-bold uppercase tracking-[0.08em] text-white shadow-[0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-sm hover:bg-white hover:text-black sm:text-lg md:text-xl"
                >
                  Menu
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                onCloseAutoFocus={(e) => e.preventDefault()}
                className="w-[280px] border-l border-white/10 bg-black/95 p-0 text-white"
              >
                <SheetTitle className="sr-only">Mobile menu</SheetTitle>
                <div className="flex h-full flex-col px-6 pb-8 pt-20">
                  <nav className="flex flex-col gap-3">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={(e) => {
                          if (link.href.startsWith('#')) {
                            handleScrollTo(e, link.href.substring(1));
                            return;
                          }
                          setIsMenuOpen(false);
                        }}
                        className="font-headline text-3xl uppercase tracking-tight text-white transition-colors hover:text-[#8A0000] sm:text-4xl md:text-5xl"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                  <Link
                    href="/process"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-auto text-xs font-bold uppercase tracking-[0.25em] text-[#D10000] sm:text-sm md:text-base"
                  >
                    Our process
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div
          className="flex min-h-0 flex-1 flex-col items-center justify-between border-t border-black/10 bg-background px-5 pb-6 pt-5 text-center sm:pb-8 sm:pt-6"
          style={{
            backgroundImage: "url('/asfalt-dark.png')",
            backgroundRepeat: 'repeat',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="min-h-0">
            <h1 className="font-headline text-[2.85rem] font-bold uppercase leading-[0.9] tracking-tighter text-black sm:text-6xl md:text-7xl">
              <span className="block">Defining the Digital</span>
              <span className="mt-1 block text-[#8A0000]">Avant-Garde</span>
            </h1>

            <p className="mx-auto mt-5 max-w-[17.5rem] font-mono text-[0.72rem] leading-[1.25] tracking-[0.1em] text-black sm:mt-6 sm:max-w-[20rem] sm:text-[0.82rem] md:max-w-[30rem] md:text-[0.95rem]">
              WE TRANSCEND THE CONVENTIONAL. BLACK LION STUDIO ARCHITECTS DIGITAL SANCTUARIES WHERE PRECISION MEETS SOUL. WE DON&apos;T JUST BUILD INTERFACES; WE PROVOKE RESONANCE AND DEFINE THE FUTURE OF NARRATIVE-DRIVEN DESIGN.
            </p>

          </div>

          <Link
            href="#about"
            onClick={(e) => handleScrollTo(e, 'about')}
            aria-label="Scroll to about section"
            data-cursor="VIEW"
            className="mt-4 flex items-center justify-center sm:mt-6"
          >
            <svg
              width="28"
              height="40"
              viewBox="0 0 28 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-8 animate-bounce text-[#8A0000]"
            >
              <path
                d="M1 21C1 21 12.5818 29.991 14 39C15.4182 29.991 27 21 27 21"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 1V33"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="relative hidden h-svh items-center justify-center overflow-hidden p-8 lg:flex">
        <div
          className="relative h-full w-full flex-shrink-0 transition-all duration-300"
          style={{ width: `${w}px`, height: `${h}px` }}
        >
          <div className="absolute top-0 left-0 z-30 flex h-[80px] w-[300px] items-start justify-start overflow-hidden p-0">
            <Link href="/" data-cursor="GO" className="flex h-full items-start gap-4 p-0">
              <div className="flex h-[80px] w-auto flex-shrink-0 items-start">
                <img
                  src="/BLS-NEW-LOGO.png"
                  alt="Black Lion Logo"
                  className="block h-[80%] w-auto object-contain"
                />
              </div>
              <div className="flex h-[80%] items-center">
                <span className="mt-[8px] font-headline text-6xl font-bold leading-none tracking-tighter text-black uppercase">
                  B<span className="text-[#8A0000]">.</span>L<span className="text-[#8A0000]">.</span>S
                </span>
              </div>
            </Link>
          </div>

          <div className="absolute top-0 right-0 z-30 flex h-[80px] w-[650px] items-center justify-end gap-6 px-6">
            {[
              { name: 'About', href: '#about' },
              { name: 'Services', href: '/#services' },
              { name: 'Work', href: '/#work' },
              { name: 'Journal', href: '/journal' },
              { name: 'Get in Touch', href: '#contact' },
            ].map((link) => (
              <Magnetic key={link.name}>
                <Link
                  href={link.href}
                  onClick={(e) => link.href.startsWith('#') ? handleScrollTo(e, link.href.substring(1)) : undefined}
                  data-cursor="GO"
                  className="font-headline text-[1.75rem] font-bold uppercase leading-none tracking-[0.06em] text-black transition-colors duration-300 hover:text-[#8A0000]"
                >
                  {link.name}
                </Link>
              </Magnetic>
            ))}
          </div>

          <div className="absolute bottom-0 right-0 z-30 flex h-[250px] w-[550px] items-start justify-between p-12 text-left">
            <div className="max-w-[420px] space-y-4">
              <h3 className="font-headline text-4xl font-bold uppercase leading-none tracking-tighter text-black">
                DEFINING THE DIGITAL <span className="text-[#8A0000]">AVANT-GARDE</span>
              </h3>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                WE TRANSCEND THE CONVENTIONAL. BLACK LION STUDIO ARCHITECTS DIGITAL SANCTUARIES WHERE PRECISION MEETS SOUL. WE DON'T JUST BUILD INTERFACES; WE PROVOKE RESONANCE AND DEFINE THE FUTURE OF NARRATIVE-DRIVEN DESIGN.
              </p>
              <Link
                href="/process"
                data-cursor="GO"
                className="mt-1 inline-block text-xs font-black uppercase tracking-[0.2em] text-[#8A0000] transition-all"
              >
                Learn more about our process →
              </Link>
            </div>

            <div className="absolute bottom-10 right-4">
              <Link
                href="#about"
                onClick={(e) => handleScrollTo(e, 'about')}
                aria-label="Scroll to about section"
                data-cursor="VIEW"
                className="flex flex-col items-center justify-center transition-all duration-300"
              >
                <svg
                  width="28"
                  height="40"
                  viewBox="0 0 28 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-8 animate-bounce text-[#8A0000]"
                >
                  <path
                    d="M1 21C1 21 12.5818 29.991 14 39C15.4182 29.991 27 21 27 21"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 1V33"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div
            className="absolute inset-0 overflow-hidden bg-black"
            style={{
              clipPath: heroBentoPath,
              WebkitClipPath: heroBentoPath
            }}
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/bento-bg.png"
                alt="Black Lion Studio bento background"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <div className="absolute inset-0 z-[5] bg-black/65 pointer-events-none" />
            <div className="absolute inset-0 z-10 pointer-events-none">
              <MagnetLines
                rows={12}
                columns={20}
                containerSize="100%"
                lineColor="#600000"
                outlineThickness="4px"
                style={{ opacity: 0.85 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
