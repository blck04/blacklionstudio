"use client";

import Image from 'next/image';

export function Footer() {
  const logoSrc = '/LOGO-LIGHT-MODE.png';

  return (
    <footer className="text-muted-foreground border-t-2">
      <div className="container mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-4">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <Image
              src={logoSrc}
              alt="BLACK LION STUDIO Logo"
              width={200}
              height={53}
            />
          </div>
          <div className="relative font-headline font-bold uppercase text-center">
            <div className="text-foreground text-[15vw] md:text-[12vw] lg:text-[13rem] tracking-tighter -mx-4">
                <span className="text-destructive">B</span>LACK LION STUDIO
            </div>
          </div>
          <p className="mt-[5px] text-center text-sm text-muted-foreground">
            © 2025 BLACK LION STUDIO
          </p>
        </div>
      </div>
    </footer>
  );
}
