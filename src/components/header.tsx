"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === '/';
  const isProjectPage = pathname.startsWith('/work/');
  const isManagerPage = pathname === '/manager';

  useEffect(() => {
    if (isProjectPage || isManagerPage || isHomePage) {
      const handleScroll = () => {
        const isScrolled = window.scrollY > 20;
        setScrolled(isScrolled);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Check on mount
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [pathname, isProjectPage, isManagerPage, isHomePage]);


  if (isProjectPage || isManagerPage) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#work' },
    { name: 'Contact', href: '#contact' },
  ];
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // For page links like '/manager', let the Link component handle it.
    if (href.startsWith('/')) {
      setIsSheetOpen(false);
      return;
    }
    
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (isHomePage) {
        if (targetElement) {
            const headerOffset = 0; // No offset
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
        }
    } else {
      router.push(`/${href}`);
    }
    setIsSheetOpen(false);
  };
  
  const handleLetsTalkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isHomePage) {
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
    } else {
        router.push('/#contact');
    }
    setIsSheetOpen(false);
  };

  const getHref = (link: { href: string }) => {
    if (link.href.startsWith('/')) {
      return link.href; // It's a page link
    }
    if (isHomePage) {
      return link.href; // It's a hash on the home page
    }
    if (link.href === '#home') {
      return '/'; // Special case for home
    }
    return `/${link.href}`; // It's a hash on another page
  };
  
  const headerLogo = '/LOGO-LIGHT-MODE.png';


  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        "md:opacity-100 md:translate-y-0",
        isHomePage && !scrolled && "md:opacity-0 md:-translate-y-full",
        !isHomePage || scrolled
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
              <Link
                key={link.name}
                href={getHref(link)}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative group py-2 text-destructive uppercase tracking-wider text-base font-bold"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 block w-full h-[1px] bg-destructive scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 origin-center" />
              </Link>
            ))}
        </nav>
        
        <div className="flex-1 flex justify-end">
            <div className="hidden lg:flex items-center gap-2">
                <Button asChild variant="default" className="rounded-full px-6 transition-all duration-300 shadow-[0_0_25px_hsl(var(--primary)/0.3)] border border-primary hover:bg-background hover:text-accent-foreground hover:border-foreground/50 hover:shadow-none">
                <Link href="#contact" onClick={handleLetsTalkClick}>
                    Let's Talk
                </Link>
                </Button>
            </div>
            <div className="lg:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="rounded-full px-6 transition-all duration-300 hover:bg-background hover:text-accent-foreground border-foreground/50 hover:shadow-none">
                            Menu
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] bg-background/[.03] backdrop-blur-md p-0 border-none">
                        <SheetTitle className="sr-only">Menu</SheetTitle>
                        <div className="flex flex-col h-full">
                            <nav className="flex flex-col gap-1 p-6 pt-24">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={getHref(link)}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="py-3 text-6xl font-headline font-bold tracking-tighter transition-colors uppercase text-destructive-foreground"
                                    >
                                      <span className="text-destructive">{link.name.charAt(0)}</span>{link.name.slice(1)}
                                    </Link>
                                ))}
                            </nav>
                            <div className="mt-auto p-6">
                                <Button asChild size="lg" className="w-full rounded-full">
                                    <Link href="#contact" onClick={handleLetsTalkClick}>
                                        Let's Talk
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
