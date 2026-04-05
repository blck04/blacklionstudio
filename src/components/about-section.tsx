import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollAnimation } from "./scroll-animation";
import Link from "next/link";
import Magnetic from "./ui/magnetic";

export function AboutSection() {
  const accordionItems = [
    {
      value: "item-1",
      title: "The Genesis",
      content: "Born from a refusal to accept the mediocre, Black Lion Studio emerged as a response to a world saturated with digital noise. We chose the path of the meticulous, the deliberate, and the uncompromising, building a sanctuary where craftsmanship is not just a standard, but a foundational philosophy. Our journey began with a single provocation: that digital spaces should not merely serve a function, but should exist as living archives of resonance and architectural beauty."
    },
    {
      value: "item-2",
      title: "The Vision",
      content: "To elevate the digital landscape through radical intentionality and a commitment to the extraordinary. We empower visionaries to lead their respective industries by providing them with the architectural foundations and creative soul required to leave an indelible mark on the digital consciousness. Our vision is to define the next era of human-centric design, where every interaction is an intentional step toward a more refined and meaningful future."
    },
    {
      value: "item-3",
      title: "The Distinction",
      content: "We value the silence as much as the statement, understanding that true sophistication lies in the balance between what is seen and what is felt. Our approach is a masterclass in equilibrium—where cutting-edge technology serves as the invisible engine for narrative-driven design, and every pixel is a deliberate choice made with ruthless precision. We are the architects for those who refuse to settle for the conventional and seek to build something that endures.",
      link: { text: "Learn more about our process", href: "/process" }
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 text-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
        <ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-16 md:mb-24">
            <h2 className="font-headline text-6xl md:text-8xl lg:text-9xl 2xl:text-[10rem] font-bold tracking-tighter text-primary leading-none m-0 p-0 text-center md:text-left">
              <span className="text-destructive">A</span>BOUT
            </h2>
            <p className="text-muted-foreground m-0 pb-[29px] text-center md:text-left text-xs leading-relaxed uppercase tracking-widest">
              A sanctuary for the meticulous and the bold. We exist at the intersection of architectural discipline and artistic provocation, crafting digital experiences that linger in the consciousness. We deconstruct traditional boundaries to build legacies of radical intentionality and resonance.
            </p>
          </div>
        </ScrollAnimation>


        <Accordion type="single" collapsible className="w-full">
          {accordionItems.map((item, index) => (
            <ScrollAnimation delay={(index + 1) * 200} key={item.value}>
              <AccordionItem value={item.value}>
                <AccordionTrigger className="text-xl md:text-3xl 2xl:text-4xl font-headline font-bold uppercase py-8 text-left">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">
                    {item.content}
                  </p>
                  {item.link && (
                    <Link 
                      href={item.link.href}
                      className="inline-block text-destructive font-bold uppercase tracking-widest text-xs transition-all"
                    >
                      {item.link.text} →
                    </Link>
                  )}
                </AccordionContent>
              </AccordionItem>
            </ScrollAnimation>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
