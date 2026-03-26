import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';
import { Separator } from '@/components/ui/separator';
import { Footer } from '@/components/footer';
import { ScrollAnimation } from '@/components/scroll-animation';

export const metadata = {
  title: 'Our Process | BLACK LION STUDIO',
  description: 'How we transform bold visions into precise, high-impact digital realities.',
};

export default function ProcessPage() {
  const processes = [
    {
      id: "01",
      title: "Discovery & Strategy",
      description: "Every great project begins with deep understanding. We deep-dive into your business, market, and audience to uncover the behavioral patterns and needs that will drive our strategy.",
      details: [
        "In-depth stakeholder interviews",
        "Market and competitor analysis",
        "User persona development",
        "Unique positioning and narrative crafting"
      ]
    },
    {
      id: "02",
      title: "Design & Architecture",
      description: "We architect the user journey for clarity and speed. Our design process balances aesthetic elegance with high-performance functionality, ensuring your brand's soul is reflected in every pixel.",
      details: [
        "Strategic wireframing and user flows",
        "High-fidelity visual design (UI)",
        "Intuitive user experience (UX) mapping",
        "Interactive prototyping and testing"
      ]
    },
    {
      id: "03",
      title: "Development & Execution",
      description: "With architectural precision, we translate designs into clean, high-performance code. We use modern frameworks to build scalable solutions that are as robust as they are beautiful.",
      details: [
        "Scalable front-end and back-end architecture",
        "Modern framework implementation (Next.js/React)",
        "Clean, maintainable code standards",
        "Seamless third-party integrations"
      ]
    },
    {
      id: "04",
      title: "Optimization & Launch",
      description: "Before going live, we perform rigorous speed and SEO performance tuning. Our deployment process ensures secure, seamless delivery to high-availability infrastructure.",
      details: [
        "Comprehensive performance optimization",
        "Rigorous cross-device quality assurance",
        "SEO and accessibility compliance",
        "High-availability secure deployment"
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen text-foreground bg-background" style={{ backgroundImage: "url('/asfalt-dark.png')", backgroundRepeat: 'repeat', backgroundAttachment: 'fixed' }}>
      <main className="flex-1">
        {/* Process Hero */}
        <section className="relative w-full flex flex-col justify-center py-12 md:py-16">
          <div className="absolute inset-0">
            <Image
              src="/hero-dunes.jpg"
              alt="Our Process"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/[.35]" />
          </div>
          <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-screen-xl">
            <Link
              href="/#about"
              className="group mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-destructive transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </Link>
            <Separator className="mb-6 md:mb-8 bg-destructive-foreground/30" />
            <h1 className="font-headline text-5xl font-bold tracking-tighter text-destructive-foreground md:text-7xl lg:text-9xl 2xl:text-[10rem] uppercase">
              <span className="text-destructive">O</span>UR PROCESS
            </h1>
          </div>
          <div className="absolute bottom-10 right-10 z-10 hidden md:block">
            <svg
              width="28"
              height="40"
              viewBox="0 0 28 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-7 text-destructive-foreground/80 animate-bounce"
            >
              <path
                d="M1 21C1 21 12.5818 29.991 14 39C15.4182 29.991 27 21 27 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 1V33"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </section>

        {/* Introduction */}
        <section className="pt-12 pb-20 md:pt-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <ScrollAnimation>
              <div className="grid grid-cols-1 gap-12 md:gap-16 md:grid-cols-3">
                <div className="md:col-span-1">
                  <h2 className="font-headline text-2xl md:text-3xl font-bold uppercase 2xl:text-4xl">Architecting Success</h2>
                  <div className="mt-4 text-muted-foreground uppercase tracking-widest text-[10px] font-black">
                     Meticulous. Strategic. Unrivaled.
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-foreground/90 text-xs uppercase tracking-widest leading-relaxed">
                    Our process is a blend of architectural precision and creative soul. We don't just build websites; we engineer digital experiences that resonate. Each phase is designed to ensure your vision is transformed into a high-impact reality that exceeds expectations.
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Process Steps */}
        <section className="pb-24 md:pb-32">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
            <div className="space-y-12 md:space-y-24">
              {processes.map((phase, index) => (
                <ScrollAnimation key={phase.id} delay={index * 100} animation={index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'}>
                  <div className="grid grid-cols-1 gap-8 md:gap-16 md:grid-cols-12 border-t border-foreground/5 pt-12 md:pt-16">
                    <div className="md:col-span-4">
                      <span className="font-sans text-6xl md:text-8xl font-black text-destructive block mb-4 tracking-tighter">
                        {phase.id}
                      </span>
                      <h3 className="font-headline text-2xl md:text-4xl font-bold uppercase leading-none">
                        {phase.title}
                      </h3>
                    </div>
                    <div className="md:col-span-8 space-y-8">
                      <p className="text-muted-foreground text-xs uppercase tracking-widest leading-relaxed">
                        {phase.description}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {phase.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                            <span className="text-[10px] uppercase tracking-widest text-foreground font-bold">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
