import { MetadataRoute } from 'next'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Project } from '@/lib/projects-data';
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://blacklion.studio';

  // Fetch dynamic project routes
  const projectsCol = collection(db, 'projects');
  const projectSnapshot = await getDocs(projectsCol);
  const projects = projectSnapshot.docs.map(doc => doc.data() as Project);

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    // Add other static routes here
    // e.g. { url: `${baseUrl}/about`, lastModified: new Date() },
    ...projectUrls,
  ]
}
