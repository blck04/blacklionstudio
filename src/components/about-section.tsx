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
      content: "Born from a shared commitment to redefine digital presence, Blacklion Studio emerged as a sanctuary for meticulous craftsmanship and bold innovation. Our journey began with a profound belief: that digital spaces should not merely exist, but truly resonate. We set out to blend strategic insight with artistic precision, transforming complex ideas into seamless, high-impact digital experiences. Over the years, we've cultivated a team of passionate creators, dedicated to pushing boundaries and consistently delivering unparalleled quality."
    },
    {
      value: "item-2",
      title: "Our Mission",
      content: "Our mission is to empower brands to not just compete, but to lead within the dynamic digital landscape. We are committed to crafting distinctive, high-impact digital experiences that elevate our clients' presence, foster deep connections with their audience, and drive measurable growth. Through a relentless pursuit of excellence and a blend of strategic foresight and creative mastery, we aim to ensure every digital interaction we craft becomes an unforgettable, resonating journey."
    },
    {
      value: "item-3",
      title: "Why Choose Us",
      content: "Choosing us means partnering with a team that values precision, innovation, and measurable results. We combine strategic thinking with creative excellence to deliver digital solutions that are not only beautiful but also effective. Our client-centric approach ensures your vision is at the heart of everything we do, resulting in a collaborative process and a final product that exceeds expectations. We are dedicated to your success, providing ongoing support and insights to help your brand thrive in the ever-evolving digital world."
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
                  <p className="text-muted-foreground">
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
