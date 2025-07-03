"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function NavCard() {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#work' },
  ];
  
  const isHomePage = pathname === '/';

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (isHomePage) {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 96;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
        }
    } else {
        router.push(`/#${id}`);
    }
  };
  
  return (
    <div className="bg-background/20 backdrop-blur-lg border border-white/10 rounded-full p-2 w-auto flex items-center shadow-lg">
        <nav className="flex justify-center items-center gap-1 md:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => link.href.startsWith('#') && handleScrollTo(e, link.href.substring(1))}
                className="relative group py-2 px-3 md:px-4 text-primary-foreground hover:text-white uppercase tracking-wider text-xs md:text-sm font-bold transition-colors duration-300 rounded-full hover:bg-white/10"
              >
                {link.name}
              </Link>
            ))}
        </nav>
        <Button asChild variant="default" className="ml-4 rounded-full px-5 py-2 text-sm transition-all duration-300 shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:bg-primary/80">
            <Link href="#contact" onClick={(e) => handleScrollTo(e, 'contact')}>
                Contact Us
            </Link>
        </Button>
    </div>
  );
}
