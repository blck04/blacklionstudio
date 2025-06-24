"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#work' },
    { name: 'Contact', href: '#contact' },
    { name: 'Manager', href: '/manager' },
  ];
  
  const isHomePage = pathname === '/';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // For page links like '/manager', do nothing and let the Link component handle it.
    if (href.startsWith('/')) {
      return;
    }
    
    e.preventDefault();
    if (isHomePage) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/${href}`);
    }
  };
  
  const handleLetsTalkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isHomePage) {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
        router.push('/#contact');
    }
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


  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-sm border-b border-border" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 md:h-24 items-center justify-between px-4 md:px-6">
        <Logo showText={false} logoSrc="/HEADER-LOGO.png"/>
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center gap-8">
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
          <Button asChild variant="outline" className="rounded-full px-6 transition-all duration-300 hover:bg-primary hover:text-primary-foreground border-foreground/50 hover:border-primary hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)]">
            <Link href="#contact" onClick={handleLetsTalkClick}>
              Let's Talk
            </Link>
          </Button>
        </div>
        <div className="lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="font-headline text-destructive uppercase tracking-widest font-bold text-2xl hover:bg-transparent">
                        Menu
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-sm p-0">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <div className="flex flex-col h-full">
                        <div className="p-6 border-b">
                            <Logo showText={false} logoSrc="/HEADER-LOGO.png" />
                        </div>
                        <nav className="flex flex-col gap-1 p-6">
                            {navLinks.map((link) => (
                                <SheetClose asChild key={link.name}>
                                    <Link
                                        href={getHref(link)}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="py-3 text-4xl font-headline font-bold tracking-tighter text-foreground/80 hover:text-primary transition-colors uppercase"
                                    >
                                      <span className="text-destructive">{link.name.charAt(0)}</span>{link.name.slice(1)}
                                    </Link>
                                </SheetClose>
                            ))}
                        </nav>
                        <div className="mt-auto p-6">
                            <Button asChild size="lg" className="w-full rounded-full">
                                <SheetClose asChild>
                                    <Link href="#contact" onClick={handleLetsTalkClick}>
                                        Let's Talk
                                    </Link>
                                </SheetClose>
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
