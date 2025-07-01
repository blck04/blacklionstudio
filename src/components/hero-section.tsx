import Image from 'next/image';
import Link from 'next/link';
import { MadeWithLoveSeal } from './made-with-love-seal';

export function HeroSection() {
  return (
    <section id="home" className="relative w-full h-[calc(100svh-5rem)] md:h-[calc(100vh-6rem)] flex flex-col justify-center items-center text-center text-foreground overflow-hidden border-t-2">
      {/* Background Image */}
      <Image
        src="/lion-hero.png"
        alt="Majestic lion background"
        fill
        className="-z-10 object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/0 -z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 z-10">
        <h1 
          className="font-headline font-bold tracking-tighter text-6xl md:text-8xl lg:text-9xl text-balance animate-fade-in-up opacity-0 text-center uppercase text-destructive-foreground"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          <span className="block">We Craft Digital</span>
          <span className="block">Experiences That</span>
          <span className="inline-flex items-center justify-center gap-2 md:gap-4">
            Resonate
            <MadeWithLoveSeal className="w-12 h-12 md:w-20 md:h-20 lg:w-28 lg:h-28" />
          </span>
        </h1>
      </div>
      
      <Link 
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div
          className="cursor-pointer bg-background/80 backdrop-blur px-3 py-2 rounded-full text-foreground tracking-wider shadow-xl animate-bounce hover:animate-none"
        >
          <svg
            className="w-5 h-5"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
      </Link>
    </section>
  );
}
