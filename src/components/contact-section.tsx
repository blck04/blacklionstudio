import { ContactForm } from '@/components/contact-form';
import { Button } from '@/components/ui/button';
import { Instagram, Twitter, Facebook, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { ScrollAnimation } from './scroll-animation';

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 text-foreground border-t-2 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <ScrollAnimation>
            <div className="flex flex-col gap-8">
              <h2 className="font-headline font-bold tracking-tighter text-6xl md:text-8xl lg:text-9xl text-primary text-center md:text-left">
                <span className="text-destructive">L</span>ET'S WORK TOGETHER
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link href="tel:+15551234567" aria-label="Call us">
                  <Button size="icon" className="group rounded-full bg-primary text-primary-foreground shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:bg-background hover:border hover:border-muted-foreground/50 hover:shadow-none">
                      <Phone className="group-hover:text-destructive" />
                  </Button>
                </Link>
                <Link href="mailto:hello@blacklionstudio.com" aria-label="Email us">
                  <Button size="icon" className="group rounded-full bg-primary text-primary-foreground shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:bg-background hover:border hover:border-muted-foreground/50 hover:shadow-none">
                      <Mail className="group-hover:text-destructive" />
                  </Button>
                </Link>
                <Link href="#" aria-label="Facebook">
                  <Button size="icon" className="group rounded-full bg-primary text-primary-foreground shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:bg-background hover:border hover:border-muted-foreground/50 hover:shadow-none">
                      <Facebook className="group-hover:text-destructive" />
                  </Button>
                </Link>
                <Link href="#" aria-label="Twitter">
                  <Button size="icon" className="group rounded-full bg-primary text-primary-foreground shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:bg-background hover:border hover:border-muted-foreground/50 hover:shadow-none">
                      <Twitter className="group-hover:text-destructive" />
                  </Button>
                </Link>
                <Link href="#" aria-label="Instagram">
                  <Button size="icon" className="group rounded-full bg-primary text-primary-foreground shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:bg-background hover:border hover:border-muted-foreground/50 hover:shadow-none">
                      <Instagram className="group-hover:text-destructive" />
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
