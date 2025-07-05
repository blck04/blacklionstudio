import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollAnimation } from "./scroll-animation";

export function AboutSection() {
  const accordionItems = [
    {
      value: "item-1",
      title: "Our Story",
      content: "Founded on the principles of collaboration and innovation, BLACK LION STUDIO started as a small collective of passionate creatives. We believed that by blending artistic vision with technological expertise, we could create digital experiences that not only look beautiful but also function flawlessly and resonate deeply with users."
    },
    {
      value: "item-2",
      title: "Our Mission",
      content: "Our mission is to make work meaningful. We strive to partner with brands and businesses that inspire us, helping them to tell their stories and connect with their audiences in authentic ways. We are committed to pushing the boundaries of design and technology to deliver solutions that drive growth and create lasting value."
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 text-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24">
            <div className="text-center md:text-left">
              <h2 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-primary">
                <span className="text-destructive">A</span>BOUT
              </h2>
            </div>
            <div className="text-center md:text-left">
              <p className="text-muted-foreground">
                Black Lion Studio is a creative powerhouse dedicated to crafting digital experiences that truly resonate. We transform bold visions into precise, high-impact realities, specializing in strategic branding, intuitive UI/UX, and cutting-edge web development. Our meticulous craftsmanship and unwavering commitment to exceptional quality ensure every digital solution we deliver leaves an unforgettable mark.
              </p>
            </div>
          </div>
        </ScrollAnimation>

        <Accordion type="single" collapsible className="w-full">
          {accordionItems.map((item, index) => (
            <ScrollAnimation delay={(index + 1) * 200} key={item.value}>
              <AccordionItem value={item.value}>
                <AccordionTrigger className="text-xl md:text-3xl font-headline font-bold uppercase py-8 text-left">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground md:text-lg">
                    {item.content}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </ScrollAnimation>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
