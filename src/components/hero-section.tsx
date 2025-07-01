import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section id="home" className="relative w-full h-screen flex flex-col justify-center items-start text-left text-foreground overflow-hidden">
      {/* Background Image */}
      <Image
        src="/lionhero.jpg"
        alt="Hero image of a lion"
        fill
        className="-z-10 object-cover"
        priority
        style={{
          maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 z-10">
        <h1 className="font-headline text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[#121212] text-balance">
            We Craft Digital<br />
            Experiences That<br />
            Resonate.
        </h1>
      </div>

      {/* Scroll Down Arrow */}
      <Link href="#about" aria-label="Scroll to about section" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="cursor-pointer bg-background/80 backdrop-blur px-3 py-2 rounded-full text-foreground tracking-wider shadow-xl animate-bounce hover:animate-none">
              <svg className="w-5 h-5" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" strokeLinejoin="round" strokeLinecap="round"></path>
              </svg>
          </div>
      </Link>
    </section>
  );
}
