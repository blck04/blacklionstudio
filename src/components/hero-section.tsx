"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  const handleLetsTalkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = 'contact';
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        const headerOffset = 0; // No offset
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
    }
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (isHomePage) {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 0; // No offset
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

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#work' },
  ];

  return (
    <section id="home" className="relative w-full h-svh flex flex-col md:flex-row items-center text-foreground overflow-hidden">
      {/* Left Column (on desktop) / Bottom section (on mobile) */}
      <div className="relative md:w-[20vw] w-full p-8 md:p-4 flex flex-col gap-6 items-center justify-center text-center order-2 md:order-1 h-1/2 md:h-full">
        {/* Mobile Scroll Arrow */}
        <Link
          href="#about"
          onClick={(e) => handleScrollTo(e, 'about')}
          aria-label="Scroll to about section"
          className="absolute left-8 bottom-8 z-10 md:hidden"
        >
            <svg
              width="28"
              height="40"
              viewBox="0 0 28 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-7 text-muted-foreground animate-bounce"
            >
              <path
                d="M1 21C1 21 12.5818 29.991 14 39C15.4182 29.991 27 21 27 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 1V33"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
        </Link>

        <div className="w-[20vw] md:w-[6vw]">
            <Image 
                src="/LOGO-LIGHT-MODE.png"
                alt="BLACK LION STUDIO Logo"
                width={150}
                height={40}
                className="w-full h-auto"
            />
        </div>
        <p className="text-muted-foreground text-xs md:text-sm">
            In a world overflowing with digital noise, your brand deserves more than just a presence – it deserves a voice that cuts through and connects. We craft digital experiences that resonate, meticulously designing every detail to not only capture attention, but to genuinely engage your audience, build lasting connections, and drive measurable results. Let us transform your vision into an unforgettable online journey that leaves a lasting impact.
        </p>
        <Button asChild variant="default" className="rounded-full px-6 transition-all duration-300 shadow-[0_0_25px_hsl(var(--primary)/0.3)] border border-primary hover:bg-background hover:text-accent-foreground hover:border-foreground/50 hover:shadow-none">
            <Link href="#contact" onClick={handleLetsTalkClick}>
                Let's Talk
            </Link>
        </Button>
      </div>

      {/* Right Card with background image (on desktop) / Top section (on mobile) */}
      <div
        className="relative md:w-[80vw] w-full h-1/2 md:h-[95vh] order-1 md:order-2 md:rounded-l-3xl bg-cover bg-center flex justify-center items-center md:justify-start md:items-start p-4"
        style={{ backgroundImage: "url('/bls-hero.png')" }}
      >
        {/* Desktop View */}
        <nav className="hidden md:flex absolute top-4 left-4 justify-start items-center gap-4">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                asChild
                variant="ghost"
                className="relative group py-2 w-32 text-primary-foreground hover:text-white uppercase tracking-wider text-xs md:text-sm font-bold transition-colors duration-300 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/30 border border-white/20"
              >
                <Link
                  href={link.href}
                  onClick={(e) => link.href.startsWith('#') && handleScrollTo(e, link.href.substring(1))}
                >
                  {link.name}
                </Link>
              </Button>
            ))}
        </nav>
        <div className="absolute hidden md:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center md:left-auto md:translate-x-0 md:right-16 md:text-right">
          <div className="font-headline text-6xl md:text-9xl lg:text-[9rem] lg:leading-none font-bold text-primary-foreground tracking-tighter">
            <div>
              <span>
                BLACK
              </span>
            </div>
            <div>
              <span>
                LION
              </span>
            </div>
            <div>
              <span>
                STUDIO
              </span>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex flex-col items-center justify-center p-8 text-center md:hidden w-full h-full">
            <div className="font-headline text-7xl font-bold text-primary-foreground tracking-tighter">
                <div><span>BLACK</span></div>
                <div><span>LION</span></div>
                <div><span>STUDIO</span></div>
            </div>
        </div>
      </div>

      {/* Scroll Arrow */}
      <Link
        href="#about"
        onClick={(e) => handleScrollTo(e, 'about')}
        aria-label="Scroll to about section"
        className="absolute bottom-10 right-10 z-10 hidden md:block"
      >
        <svg
          width="28"
          height="40"
          viewBox="0 0 28 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-7 text-primary-foreground/80 animate-bounce"
        >
          <path
            d="M1 21C1 21 12.5818 29.991 14 39C15.4182 29.991 27 21 27 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 1V33"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </section>
  );
}
