import { NavCard } from "./nav-card";

export function HeroSection() {
  return (
    <section id="home" className="relative w-full h-screen flex flex-col justify-center items-end text-foreground overflow-hidden">
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
