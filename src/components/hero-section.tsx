import Image from 'next/image';

export function HeroSection() {
  return (
    <section id="home" className="relative w-full h-screen flex flex-col justify-center items-start text-left text-foreground overflow-hidden">
      {/* Background Image */}
      <Image
        src="/lion-hero.png"
        alt="Majestic lion background"
        fill
        className="-z-10 object-cover"
        priority
        style={{
          maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
        }}
      />
      <div className="absolute inset-0 bg-black/0 -z-10" />

      {/* Content */}
      <div className="container px-4 md:px-6 z-10">
        <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-[#121212] text-balance">
            We Craft Digital<br />
            Experiences That<br />
            Resonate.
        </h1>
      </div>
      
    </section>
  );
}
