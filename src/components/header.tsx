"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Magnetic from '@/components/ui/magnetic';

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);


  if (!isHomePage) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#work' },
    { name: 'Journal', href: '/journal' },
    { name: 'Contact', href: '#contact' },
  ];

  const mobileNavLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Journal', href: '/journal' },
    { name: 'Contact', href: '#contact' },
  ];
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/')) {
      setIsSheetOpen(false);
      return;
    }
    
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        const headerOffset = 0; // No offset
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
    } else {
      window.location.assign(`/${href}`);
    }
    setIsSheetOpen(false);
  };
  
  const handleLetsTalkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const headerOffset = 0; // No offset
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
    setIsSheetOpen(false);
  };

  const headerLogo = '/BLS-NEW-LOGO.png';


  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        !scrolled && "pointer-events-none opacity-0 -translate-y-full",
        scrolled
          ? "bg-background/[.03] backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 md:h-24 items-center px-4 md:px-6">
        <div className="flex-1 flex justify-start h-full items-center">
            <Logo showText={false} logoSrc={headerLogo}/>
        </div>
        
        <nav className="hidden lg:flex justify-center items-center gap-8">
            {navLinks.map((link) => (
              <Magnetic key={link.name}>
                <Link
                  href={link.href}
                  data-cursor="GO"
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative group py-2 text-destructive uppercase tracking-wider text-base font-bold"
                >
                  {link.name}
                </Link>
              </Magnetic>
            ))}
        </nav>
        
        <div className="flex-1 flex justify-end">
            <div className="hidden lg:flex items-center gap-2">
                <Magnetic>
                    <Button asChild variant="default" data-cursor="GO" className="rounded-full px-6 transition-all duration-300 shadow-[0_0_25px_hsl(var(--primary)/0.3)] border border-primary hover:bg-background hover:text-accent-foreground hover:border-foreground/50 hover:shadow-none">
                    <Link href="#contact" onClick={handleLetsTalkClick}>
                        Let's Talk
                    </Link>
                    </Button>
                </Magnetic>
            </div>
            <div className="lg:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="inline-flex h-9 items-center justify-center rounded-full border-2 border-black bg-[#8A0000] px-5 !py-0 text-center !font-headline text-lg uppercase tracking-[0.08em] text-black shadow-[0_0_20px_rgba(138,0,0,0.35)] backdrop-blur-sm transition-all duration-300 hover:bg-[#6f0000] hover:border-black hover:text-black"
                        >
                            <span className="mt-[4px] inline-block">Menu</span>
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
                                {mobileNavLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="font-headline text-3xl uppercase tracking-tight text-white transition-colors hover:text-[#8A0000] sm:text-4xl md:text-5xl"
                                    >
                                      {link.name}
                                    </Link>
                                ))}
                            </nav>
                            <Link
                              href="/process"
                              onClick={() => setIsSheetOpen(false)}
                              className="mt-auto text-xs font-bold uppercase tracking-[0.25em] text-[#D10000] sm:text-sm md:text-base"
                            >
                              Our process
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
