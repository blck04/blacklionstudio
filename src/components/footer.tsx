"use client";

export function Footer() {
  return (
    <footer 
      className="relative border-t-2 bg-cover bg-center text-primary-foreground"
      style={{ backgroundImage: "url('/bls-hero.png')" }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative container mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-4">
        <div className="flex flex-col items-center">
          <div className="relative font-headline font-bold uppercase text-center">
            <div className="text-primary-foreground text-[15vw] md:text-[12vw] lg:text-[13rem] tracking-tighter -mx-4">
                <span className="text-destructive">B</span>LACK LION STUDIO
            </div>
          </div>
          <p className="mt-[5px] text-center text-sm text-primary-foreground/80">
            © 2025 BLACK LION STUDIO
          </p>
        </div>
      </div>
    </footer>
  );
}
