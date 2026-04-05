"use client";

import React, { useState, useLayoutEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import MagnetLines from './magnet-lines';
import Magnetic from './ui/magnetic';

export function HeroSection() {
  const [dimensions, setDimensions] = useState({ w: 1600, h: 900 });

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
        window.scrollTo({
          top: element.offsetTop,
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
    <section id="home" className="relative w-full h-svh bg-background flex items-center justify-center overflow-hidden p-8" style={{ backgroundImage: "url('/asfalt-dark.png')", backgroundRepeat: 'repeat', backgroundAttachment: 'fixed' }}>
      
      {/* RESPONSIVE CARD WRAPPER */}
      <div 
        className="relative w-full h-full flex-shrink-0 transition-all duration-300"
        style={{ width: `${w}px`, height: `${h}px` }}
      >
        
        {/* 1. LOGO AREA (Top-Left Cutout) */}
        <div className="absolute top-0 left-0 w-[300px] h-[80px] flex items-start justify-start z-30 p-0 overflow-hidden">
            <Link href="/" data-cursor="GO" className="flex items-start gap-4 p-0 h-full">
                <div className="h-[80px] w-auto flex-shrink-0 flex items-start">
                    <img 
                        src="/BLS-NEW-LOGO.png"
                        alt="Black Lion Logo"
                        className="h-[80%] w-auto object-contain block"
                    />
                </div>
                <div className="h-[80%] flex items-center">
                    <span className="font-headline text-6xl font-bold tracking-tighter uppercase text-black leading-none mt-[8px]">
                        B<span className="text-[#8A0000]">.</span>L<span className="text-[#8A0000]">.</span>S
                    </span>
                </div>
            </Link>
        </div>

        {/* 2. ACTIONS AREA (Top-Right Cutout) - Uniform Nav Buttons */}
        <div className="absolute top-0 right-0 w-[650px] h-[80px] flex items-start justify-end gap-3 z-30 px-6">
            {[
                { name: 'About', href: '#about' },
                { name: 'Services', href: '/#services' },
                { name: 'Work', href: '/#work' },
                { name: 'Journal', href: '/journal' },
                { name: 'Get in Touch', href: '#contact' },
            ].map((link) => (
                <Magnetic key={link.name}>
                    <Button 
                        variant="outline" 
                        asChild
                        data-cursor="GO"
                        className="group w-28 rounded-full border-2 border-[#8A0000] bg-transparent text-[#8A0000] h-11 hover:bg-[#8A0000] hover:text-white font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center p-0 mt-0.5"
                    >
                        <Link href={link.href} onClick={(e) => link.href.startsWith('#') ? handleScrollTo(e, link.href.substring(1)) : undefined}>
                            <span className="transition-all duration-300 group-hover:scale-110 group-hover:font-black">
                                {link.name}
                            </span>
                        </Link>
                    </Button>
                </Magnetic>
            ))}
        </div>

        {/* 3. BRAND STATEMENT (Bottom-Right Cutout) */}
        <div className="absolute bottom-0 right-0 w-[550px] h-[250px] flex items-start justify-between p-12 z-30 text-left">
            <div className="space-y-4 max-w-[420px]">
                <h3 className="font-headline text-4xl font-bold tracking-tighter uppercase leading-none text-black">
                    DEFINING THE DIGITAL <span className="text-[#8A0000]">AVANT-GARDE</span>
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed uppercase tracking-widest">
                    WE TRANSCEND THE CONVENTIONAL. BLACK LION STUDIO ARCHITECTS DIGITAL SANCTUARIES WHERE PRECISION MEETS SOUL. WE DON'T JUST BUILD INTERFACES; WE PROVOKE RESONANCE AND DEFINE THE FUTURE OF NARRATIVE-DRIVEN DESIGN.
                </p>
                <Link 
                    href="/process" 
                    data-cursor="GO"
                    className="inline-block text-[#8A0000] font-black uppercase tracking-[0.2em] text-xs transition-all mt-1"
                >
                    Learn more about our process →
                </Link>
            </div>

            {/* Scroll Arrow - Positioned precisely at bottom-right of the cutout */}
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
                        className="h-16 w-8 text-[#8A0000] animate-bounce"
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

        {/* THE BLACK BENTO CARD */}
        <div 
          className="absolute inset-0 bg-black overflow-hidden"
          style={{ 
            clipPath: heroBentoPath,
            WebkitClipPath: heroBentoPath
          }}
        >
          {/* Hero Background Image */}
          <div className="absolute inset-0 z-0">
            <Image 
                src="/bento-bg.png" 
                alt="Hero Background" 
                fill 
                className="object-cover object-center"
                priority
            />
          </div>

          {/* Red Magnetic Capsules */}
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

          {/* Dark Overlay (on top of image and capsules) */}
          <div className="absolute inset-0 z-15 bg-black/70 pointer-events-none" />
        </div>
      </div>

    </section>
  );
}
