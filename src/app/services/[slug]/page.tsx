import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Service } from '@/lib/services-data';
import { Button } from '@/components/ui/button';

async function getServiceBySlug(slug: string): Promise<Service | null> {
    // For now, we'll match by title converted to slug if needed, or update Service interface.
    // Assuming services will have a slug in the future. For now, let's fetch all and filter.
    const querySnapshot = await getDocs(collection(db, "services"));
    const services = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
    return services.find(s => s.title.toLowerCase().replace(/ /g, '-') === slug) || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Services`,
    description: service.details.substring(0, 155),
  };
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const titleUpper = service.title.toUpperCase();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        {/* Service Hero */}
        <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center md:px-12 md:py-32">
          <div className="container relative z-10 mx-auto max-w-screen-xl">
            <Link
              href="/#services"
              className="group mb-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-destructive transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Services
            </Link>
            <h1 className="font-headline text-6xl font-bold tracking-tighter md:text-8xl lg:text-[10rem] leading-none">
              <span className="text-destructive">{titleUpper.charAt(0)}</span>{titleUpper.slice(1)}
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-muted-foreground md:text-lg">
              {service.details}
            </p>
          </div>
          
          {/* Background Texture Overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-5">
             <div className="absolute inset-0 bg-[url('/asfalt-dark.png')] bg-repeat" />
          </div>
        </section>

        {/* Detailed Content Placeholder (to be filled via CMS later) */}
        <section className="border-y border-foreground/5 bg-foreground/[0.02] py-24 md:py-32">
          <div className="container mx-auto px-6 max-w-screen-xl">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
              <div className="space-y-8">
                <h2 className="font-headline text-4xl font-bold uppercase tracking-tighter md:text-5xl">
                  OUR <span className="text-destructive">APPROACH</span>
                </h2>
                <div className="space-y-6">
                  {[
                    "Discovery & Deep Strategy",
                    "Meticulous Design & Prototyping",
                    "High-Performance Implementation",
                    "Continuous Optimization & Scale"
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="h-6 w-6 text-destructive" />
                      <span className="font-mono text-sm font-bold uppercase tracking-widest">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-destructive/20 md:aspect-video">
                 <Image 
                    src={service.imageUrl || '/project-img.jpg'}
                    alt={service.title}
                    fill
                    className="object-cover"
                 />
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
