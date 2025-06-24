import { ContactForm } from '@/components/contact-form';
import { Button } from '@/components/ui/button';
import { Instagram, Twitter, Facebook, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { ScrollAnimation } from './scroll-animation';

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-background text-foreground border-b overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <ScrollAnimation>
            <div className="flex flex-col gap-8">
              <h2 className="font-headline font-bold tracking-tighter text-6xl md:text-7xl lg:text-8xl text-primary text-center md:text-left">
                <span className="text-destructive">L</span>ET'S WORK TOGETHER
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link href="tel:+15551234567" aria-label="Call us">
                  <Button variant="outline" size="icon" className="rounded-full border-muted-foreground/50 hover:border-primary hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)]">
                      <Phone />
                  </Button>
                </Link>
                <Link href="mailto:hello@blacklionstudio.com" aria-label="Email us">
                  <Button variant="outline" size="icon" className="rounded-full border-muted-foreground/50 hover:border-primary hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)]">
                      <Mail />
                  </Button>
                </Link>
                <Link href="#" aria-label="Facebook">
                  <Button variant="outline" size="icon" className="rounded-full border-muted-foreground/50 hover:border-primary hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)]">
                      <Facebook />
                  </Button>
                </Link>
                <Link href="#" aria-label="Twitter">
                  <Button variant="outline" size="icon" className="rounded-full border-muted-foreground/50 hover:border-primary hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)]">
                      <Twitter />
                  </Button>
                </Link>
                <Link href="#" aria-label="Instagram">
                  <Button variant="outline" size="icon" className="rounded-full border-muted-foreground/50 hover:border-primary hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)]">
                      <Instagram />
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <div>
              <ContactForm />
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
