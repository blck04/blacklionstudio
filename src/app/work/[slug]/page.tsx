import { projects } from '@/lib/projects-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/header';
import { ContactSection } from '@/components/contact-section';
import { Separator } from '@/components/ui/separator';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const projectTitleUpper = project.title.toUpperCase();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative w-full flex flex-col justify-center py-12 md:py-16">
          <div className="absolute inset-0">
            <Image
              src="/project-img.jpg"
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/0 dark:bg-black/50" />
          </div>
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <Link
              href="/#work"
              className="group mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-destructive transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Portfolio
            </Link>
            <Separator className="mb-6 md:mb-8 bg-foreground/30" />
            <h1 className="font-headline text-5xl font-bold tracking-tighter text-foreground md:text-7xl lg:text-9xl">
              <span className="text-destructive">{projectTitleUpper.charAt(0)}</span>{projectTitleUpper.slice(1)}
            </h1>
          </div>
          <div className="absolute bottom-10 right-10 z-10 hidden md:block">
            <svg
              width="28"
              height="40"
              viewBox="0 0 28 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-7 text-foreground/80 animate-bounce"
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

        <section className="pt-12 pb-20 md:pt-16 md:pb-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 gap-12 md:gap-16 md:grid-cols-3">
              <div className="md:col-span-1">
                <h2 className="font-headline text-2xl md:text-3xl font-bold">About the project</h2>
                <div className="mt-4 space-y-2 text-muted-foreground">
                    <p><strong>Client:</strong> {project.details.client}</p>
                    <p><strong>Year:</strong> {project.details.year}</p>
                    <p><strong>Services:</strong> {project.details.services}</p>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-lg text-foreground/90">
                  {project.about}
                </p>
              </div>
            </div>
            
            <div className="mt-16 md:mt-20 grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
              {project.galleryImages.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-[0_0_0_2px_hsl(var(--secondary)),0_0_0_4px_hsl(var(--destructive))]">
                    <Image 
                        src={image.url}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        data-ai-hint={image.dataAiHint}
                    />
                </div>
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
