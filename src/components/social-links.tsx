import { Instagram, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const socialLinks = [
  { href: '#', Icon: Instagram },
  { href: '#', Icon: Twitter },
  { href: '#', Icon: Facebook },
];

export function SocialLinks() {
  return (
    <div className="hidden md:flex flex-col gap-4">
      {socialLinks.map(({ href, Icon }, i) => (
        <div 
          key={i} 
          className="animate-fade-in-up opacity-0" 
          style={{ animationDelay: `${0.7 + i * 0.1}s`, animationFillMode: 'forwards' }}
        >
          <Button asChild size="icon" className="group rounded-full bg-primary text-primary-foreground shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:bg-background hover:border hover:border-muted-foreground/50 hover:shadow-none">
            <Link href={href}>
              <Icon className="group-hover:text-destructive" />
            </Link>
          </Button>
        </div>
      ))}
    </div>
  )
}
