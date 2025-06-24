"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

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
  ];
  
  const isHomePage = pathname === '/';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isHomePage) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/${href}`);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-sm border-b border-border" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 md:h-24 items-center justify-between px-4 md:px-6">
        <Logo />
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => {
              const href = isHomePage
                ? link.href
                : link.href === '#home'
                ? '/'
                : `/${link.href}`;
              
              return (
                <Link
                  key={link.name}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="relative group py-2 text-destructive uppercase tracking-wider text-sm font-bold"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 block w-full h-[1px] bg-destructive scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 origin-center" />
                </Link>
              );
            })}
          </nav>
          <Button asChild variant="outline" className="rounded-full px-6 transition-all duration-300 hover:bg-primary hover:text-primary-foreground border-foreground/50 hover:border-primary hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)]">
            <Link href="#contact">
              Let's Talk
            </Link>
          </Button>
        </div>
        <div className="lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-8 w-8" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-sm p-0">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <div className="flex flex-col h-full">
                        <div className="p-6 border-b">
                            <Logo />
                        </div>
                        <nav className="flex flex-col gap-1 p-6">
                            {navLinks.map((link) => {
                                const href = isHomePage
                                ? link.href
                                : link.href === '#home'
                                ? '/'
                                : `/${link.href}`;
                                
                                return (
                                <SheetClose asChild key={link.name}>
                                    <Link
                                        href={href}
                                        onClick={(e) => handleNavClick(e, href)}
                                        className="py-3 text-4xl font-headline font-bold tracking-tighter text-foreground/80 hover:text-primary transition-colors uppercase"
                                    >
                                        {link.name}
                                    </Link>
                                </SheetClose>
                                );
                            })}
                        </nav>
                        <div className="mt-auto p-6">
                            <Button asChild size="lg" className="w-full rounded-full">
                                <SheetClose asChild>
                                    <Link href="#contact">
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
