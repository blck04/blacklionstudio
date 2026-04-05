import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/projects-data';
import { ScrollAnimation } from './scroll-animation';
import Magnetic from './ui/magnetic';

interface WorkSectionProps {
  projects: Project[];
}

export function WorkSection({ projects }: WorkSectionProps) {
  return (
    <section id="work" className="py-20 md:py-32 text-foreground border-t-2 overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
        <ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-16 md:mb-24">
            <h2 className="font-headline text-6xl md:text-8xl lg:text-9xl 2xl:text-[10rem] font-bold tracking-tighter text-primary leading-none m-0 p-0 text-center md:text-left">
              <span className="text-destructive">O</span>UR WORK
            </h2>
            <p className="text-muted-foreground text-balance m-0 pb-[29px] text-center md:text-right text-xs leading-relaxed uppercase tracking-widest">
              An archive of resonance. A curated selection of digital artifacts that redefine expectation. These projects represent the convergence of ruthless precision and artistic soul, each one a testament to our pursuit of the extraordinary in a world of digital noise.
            </p>
          </div>
        </ScrollAnimation>

        <div className="flex flex-col gap-20 md:gap-32">
          {projects.map((project, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={project.id}>
                <Link href={`/work/${project.slug}`} data-cursor="VIEW">
                  <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end group">
                    <ScrollAnimation
                      animation={isEven ? 'fadeInRight' : 'fadeInLeft'}
                      delay={100}
                      className={cn(
                        "flex flex-col text-center",
                        isEven ? "md:order-last md:items-end md:text-right" : "md:text-left"
                      )}>
                      <h3 className={cn(
                          "font-headline font-bold tracking-tighter text-4xl sm:text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl"
                      )}>
                          {project.title}
                      </h3>
                      <p className="mt-6 text-destructive uppercase tracking-widest font-bold">                        {project.category}
                      </p>
                    </ScrollAnimation>
                    <ScrollAnimation
                        animation={isEven ? 'fadeInLeft' : 'fadeInRight'}
                        delay={100}
                        className="relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[4/3] shadow-[0_0_0_2px_hsl(var(--secondary)),0_0_0_4px_hsl(var(--destructive))]">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                      />
                    </ScrollAnimation>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
