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
      title: "DECONSTRUCTION",
      description: "To build something extraordinary, we must first understand its essence. We dismantle existing paradigms to uncover the core truths that will anchor our strategic evolution.",
      details: [
        "In-depth stakeholder interviews",
        "Market and competitor analysis",
        "User persona development",
        "Unique positioning and narrative crafting"
      ]
    },
    {
      id: "02",
      title: "ARCHITECTURE",
      description: "Form follows soul. We architect digital landscapes with ruthless precision, ensuring that aesthetic elegance is underpinned by high-performance structural integrity.",
      details: [
        "Strategic wireframing and user flows",
        "High-fidelity visual design (UI)",
        "Intuitive user experience (UX) mapping",
        "Interactive prototyping and testing"
      ]
    },
    {
      id: "03",
      title: "REALIZATION",
      description: "The translation of vision into reality requires uncompromising craft. We engineer scalable, high-performance ecosystems that are as robust in code as they are in concept.",
      details: [
        "Scalable front-end and back-end architecture",
        "Modern framework implementation (Next.js/React)",
        "Clean, maintainable code standards",
        "Seamless third-party integrations"
      ]
    },
    {
      id: "04",
      title: "ASCENSION",
      description: "Excellence is not a destination, but a state of being. We refine every touchpoint for maximum resonance, ensuring a seamless transition into the digital consciousness.",
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
              THE <span className="text-destructive">E</span>VOLUTION
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
              <div className="grid grid-cols-1 gap-12 md:gap-16 md:grid-cols-3 items-end">
                <h2 className="md:col-span-1 font-headline text-2xl md:text-3xl font-bold uppercase 2xl:text-4xl leading-none m-0 p-0 text-left">
                  Radical Intentionality
                  <div className="mt-4 text-muted-foreground uppercase tracking-widest text-[10px] font-black leading-none">
                     Meticulous. Strategic. Unrivaled.
                  </div>
                </h2>
                <p className="md:col-span-2 text-foreground/90 m-0 pb-[29px] text-xs leading-relaxed uppercase tracking-widest">
                  Our workflow is a disciplined journey of deconstruction and rebirth. We don't just execute; we evolve. Each phase is a deliberate step toward an outcome that transcends the expected, ensuring your vision is realized through a masterclass of architectural precision and creative provocation.
                </p>
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
                    <div className="md:col-span-8 flex flex-col justify-center space-y-8">
                      <p className="text-foreground/90 m-0 text-xs leading-relaxed uppercase tracking-widest">
                        {phase.description}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {phase.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                            <span className="text-xs uppercase tracking-widest text-foreground font-bold">{detail}</span>
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
