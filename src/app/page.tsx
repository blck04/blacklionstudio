import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { ContactSection } from "@/components/contact-section";
import { WorkSection } from "@/components/work-section";
import { Footer } from "@/components/footer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Project } from "@/lib/projects-data";
import type { Service } from "@/lib/services-data";

async function getProjects(): Promise<Project[]> {
  const projectsCol = collection(db, 'projects');
  const projectSnapshot = await getDocs(projectsCol);
  const projectList = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  return projectList;
}

async function getServices(): Promise<Service[]> {
    const servicesCol = collection(db, 'services');
    const serviceSnapshot = await getDocs(servicesCol);
    const serviceList = serviceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
    return serviceList;
}

export default async function Home() {
  const projects = await getProjects();
  const services = await getServices();

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection services={services} />
        <WorkSection projects={projects} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
