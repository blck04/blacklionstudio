import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { projects } from '@/lib/projects-data';
import { ScrollAnimation } from './scroll-animation';

export function WorkSection() {
  return (
    <section id="work" className="py-20 md:py-32 bg-background text-foreground border-b overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24">
            <div className="text-center md:text-left">
              <h2 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-primary">
                OUR WORK
              </h2>
            </div>
            <div className="text-center md:text-right">
              <p className="text-muted-foreground md:text-xl text-balance">
                A selection of projects that we're proud of.
              </p>
            </div>
          </div>
        </ScrollAnimation>
        <div className="flex flex-col gap-20 md:gap-32">
          {projects.map((project, i) => (
            <ScrollAnimation key={i} delay={i * 100}>
              <Link href={`/work/${project.slug}`}>
                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end group">
                  <div className={cn(
                    "flex flex-col text-center",
                    i % 2 === 0 ? "md:order-last md:items-end md:text-right" : "md:text-left"
                  )}>
                    <h3 className={cn(
                      "font-headline font-bold tracking-tighter text-4xl sm:text-5xl md:text-7xl lg:text-8xl"
                    )}>
                      {project.title}
                    </h3>
                    <p className="mt-6 text-muted-foreground uppercase tracking-widest text-sm">
                      {project.category}
                    </p>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[4/3]">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                  </div>
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
