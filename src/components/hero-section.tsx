export function HeroSection() {
  return (
    <section id="home" className="relative w-full h-screen flex flex-col justify-center items-center text-foreground overflow-hidden p-4">
      {/* Card with background image */}
      <div
        className="relative w-full max-w-6xl h-[85vh] rounded-3xl bg-cover bg-center shadow-2xl"
        style={{ backgroundImage: "url('/bls-hero.png')" }}
      >
        {/* Card content can be added here */}
      </div>
    </section>
  );
}
