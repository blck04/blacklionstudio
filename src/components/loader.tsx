import Image from 'next/image';
import { cn } from '@/lib/utils';
import { TypingAnimation } from './typing-animation';

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background",
        className
    )}>
        <Image
            src="/logo.png"
            alt="BLACK LION STUDIO Logo"
            width={250}
            height={66}
            className="animate-heartbeat"
            priority
        />
        <div className="mt-6">
            <TypingAnimation text="DISTINCT . REFINED . TIMELESS" />
        </div>
    </div>
  );
}
