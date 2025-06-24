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
    <section id="about" className="py-16 md:py-24 bg-background text-foreground border-t border-b overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24">
            <div className="text-center md:text-left">
              <h2 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-primary">
                <span className="text-destructive">A</span>BOUT
              </h2>
            </div>
            <div className="text-center md:text-left">
              <p className="text-muted-foreground md:text-xl">
                BLACK LION STUDIO is an independent full-service studio creating beautiful digital experiences and products. We are an award winning group specializing in branding, design and engineering. Our mission is to make work meaningful.
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
