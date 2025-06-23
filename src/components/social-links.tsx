import { Instagram, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const socialLinks = [
  { href: '#', icon: <Instagram /> },
  { href: '#', icon: <Twitter /> },
  { href: '#', icon: <Facebook /> },
];

export function SocialLinks() {
  return (
    <div className="hidden md:flex flex-col gap-4">
      {socialLinks.map((link, i) => (
        <div 
          key={i} 
          className="animate-fade-in-up opacity-0" 
          style={{ animationDelay: `${0.7 + i * 0.1}s`, animationFillMode: 'forwards' }}
        >
          <Button variant="outline" size="icon" className="rounded-full border-muted-foreground/50 hover:border-primary hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)]" asChild>
            <Link href={link.href}>
              {link.icon}
            </Link>
          </Button>
        </div>
      ))}
    </div>
  )
}
