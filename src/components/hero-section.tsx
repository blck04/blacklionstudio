import { NavCard } from "./nav-card";
import Image from 'next/image';
import { AnimatedText } from "./animated-text";

export function HeroSection() {
  return (
    <section id="home" className="relative w-full h-screen flex justify-end items-center text-foreground overflow-hidden">
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-[15vw]">
        <Image
          src="/LOGO-LIGHT-MODE.png"
          alt="BLACK LION STUDIO Logo"
          width={200}
          height={53}
          className="w-full h-auto"
        />
      </div>
      {/* Card with background image */}
      <div
        className="relative w-[80vw] h-[95vh] rounded-l-3xl bg-cover bg-center shadow-2xl flex justify-center items-start p-4"
        style={{ backgroundImage: "url('/bls-hero.png')" }}
      >
        <NavCard />
        <div className="absolute bottom-16 left-16">
          <AnimatedText 
            text="WE CRAFT DIGITAL EXPERIENCES THAT RESONATE." 
            className="font-headline text-5xl md:text-7xl font-bold text-primary-foreground max-w-2xl text-left"
            stagger={0.02}
          />
        </div>
      </div>
    </section>
  );
}
