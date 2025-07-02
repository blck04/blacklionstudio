import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SocialLinks } from './social-links';

export function HeroSection() {
  return (
    <section id="home" className="relative w-full h-screen flex flex-col justify-center items-start text-left text-foreground overflow-hidden">
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6">
        <h1 className={cn(
          "font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider text-balance uppercase",
          "text-outline-destructive"
        )}>
            WE CRAFT DIGITAL<br />
            EXPERIENCES THAT<br />
            RESONATE...
        </h1>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-10 z-20">
        <SocialLinks />
      </div>

      {/* Scroll Down Arrow */}
      <Link href="#about" aria-label="Scroll to about section" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="cursor-pointer bg-background/80 backdrop-blur px-3 py-2 rounded-full text-destructive tracking-wider shadow-xl animate-bounce hover:animate-none">
              <svg className="w-5 h-5" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" strokeLinejoin="round" strokeLinecap="round"></path>
              </svg>
          </div>
      </Link>
    </section>
  );
}
