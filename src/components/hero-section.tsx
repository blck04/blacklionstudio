import { NavCard } from "./nav-card";
import Image from 'next/image';

export function HeroSection() {
  return (
    <section id="home" className="relative w-full h-screen flex flex-col justify-center items-end text-foreground overflow-hidden">
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
      </div>
    </section>
  );
}
