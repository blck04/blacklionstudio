import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ 
  className, 
  showText = true, 
  logoSrc = "/logo.png" 
}: { 
  className?: string; 
  showText?: boolean;
  logoSrc?: string;
}) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 h-full", className)}>
      <Image
        src={logoSrc}
        alt="BLACK LION STUDIO Logo"
        width={150}
        height={40}
        className={cn(
          "h-[70%] w-auto"
        )}
      />
      {showText && (
        <span className="font-headline text-2xl md:text-5xl font-bold tracking-tighter uppercase text-foreground">
          <span className="text-destructive">B</span>LACK LION STUDIO
        </span>
      )}
    </Link>
  );
}
