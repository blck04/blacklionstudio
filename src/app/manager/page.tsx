"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Edit, Trash2, Loader2 } from 'lucide-react';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db, storage } from '@/lib/firebase';
import type { Project } from '@/lib/projects-data';
import type { Service } from '@/lib/services-data';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const projectSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.any(),
  secondaryImageUrl: z.any().optional(),
  about: z.string().min(10, "About section is required"),
  client: z.string().min(1, "Client is required"),
  year: z.string().min(4, "Year is required"),
  services: z.string().min(1, "Services are required"),
});

const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  imageUrl: z.any(),
  details: z.string().min(10, "Details are required"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;
type ServiceFormValues = z.infer<typeof serviceSchema>;


export default function ManagerPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[];
    setProjects(projectsData);
  };
  
  const fetchServices = async () => {
    const querySnapshot = await getDocs(collection(db, "services"));
    const servicesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Service[];
    setServices(servicesData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        setIsDataLoading(true);
        Promise.all([fetchProjects(), fetchServices()]).finally(() => setIsDataLoading(false));
      } else {
        router.push('/manager/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const projectForm = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
  });

  const serviceForm = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
  });

  const handleAddProject = () => {
    setEditingProject(null);
    projectForm.reset({ slug: '', title: '', category: '', imageUrl: null, secondaryImageUrl: null, about: '', client: '', year: '', services: '' });
    setIsProjectDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    projectForm.reset({
        slug: project.slug,
        title: project.title,
        category: project.category,
        imageUrl: project.imageUrl,
        secondaryImageUrl: project.galleryImages?.[1]?.url || null,
        about: project.about,
        client: project.details.client,
        year: project.details.year,
        services: project.details.services,
    });
    setIsProjectDialogOpen(true);
  };

  const uploadImage = async (file: File) => {
    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const onProjectSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    try {
        let finalImageUrl = editingProject?.imageUrl;
        if (data.imageUrl && typeof data.imageUrl !== 'string' && data.imageUrl.length > 0) {
            finalImageUrl = await uploadImage(data.imageUrl[0]);
        } else if (typeof data.imageUrl === 'string') {
            finalImageUrl = data.imageUrl;
        }

        let finalSecondaryImageUrl: string | undefined = editingProject?.galleryImages?.[1]?.url;
        if (data.secondaryImageUrl && typeof data.secondaryImageUrl !== 'string' && data.secondaryImageUrl.length > 0) {
            finalSecondaryImageUrl = await uploadImage(data.secondaryImageUrl[0]);
        } else if (typeof data.secondaryImageUrl === 'string') {
            finalSecondaryImageUrl = data.secondaryImageUrl;
        }

        const galleryImages = [];
        if (finalImageUrl) {
            galleryImages.push({ url: finalImageUrl, alt: data.title, dataAiHint: 'placeholder' });
        }
        if (finalSecondaryImageUrl) {
            galleryImages.push({ url: finalSecondaryImageUrl, alt: `${data.title} - secondary`, dataAiHint: 'placeholder' });
        }

        const projectData = {
          slug: data.slug,
          title: data.title,
          category: data.category,
          about: data.about,
          description: data.about.substring(0, 100) + '...',
          details: {
            client: data.client,
            year: data.year,
            services: data.services,
          },
          imageUrl: finalImageUrl || '',
          galleryImages: galleryImages.length > 0 ? galleryImages : (editingProject?.galleryImages || [])
        };

        if (editingProject) {
            const projectRef = doc(db, "projects", editingProject.id);
            await updateDoc(projectRef, projectData);
            toast({ title: "Project Updated", description: "The project has been successfully updated." });
        } else {
            await addDoc(collection(db, "projects"), projectData);
            toast({ title: "Project Added", description: "The new project has been successfully added." });
        }
        await fetchProjects();
        setIsProjectDialogOpen(false);
    } catch (error) {
        console.error("Error saving project:", error);
        toast({ variant: 'destructive', title: "Error", description: "Failed to save project." });
    } finally {
        setIsSubmitting(false);
    }
  };
  
  const handleDeleteProject = async (projectId: string) => {
    try {
        await deleteDoc(doc(db, "projects", projectId));
        toast({ variant: 'destructive', title: "Project Deleted", description: "The project has been removed." });
        await fetchProjects();
    } catch (error) {
        console.error("Error deleting project:", error);
        toast({ variant: 'destructive', title: "Error", description: "Failed to delete project." });
    }
  };

  const handleAddService = () => {
    setEditingService(null);
    serviceForm.reset({ title: '', imageUrl: null, details: '' });
    setIsServiceDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    serviceForm.reset(service);
    setIsServiceDialogOpen(true);
  };

  const onServiceSubmit = async (data: ServiceFormValues) => {
    setIsSubmitting(true);
    try {
        let imageUrl = editingService?.imageUrl;
        if (data.imageUrl && typeof data.imageUrl !== 'string' && data.imageUrl.length > 0) {
            imageUrl = await uploadImage(data.imageUrl[0]);
        }
        const serviceData = { ...data, imageUrl };

        if (editingService) {
            const serviceRef = doc(db, "services", editingService.id);
            await updateDoc(serviceRef, serviceData);
            toast({ title: "Service Updated", description: "The service has been successfully updated." });
        } else {
            await addDoc(collection(db, "services"), serviceData);
            toast({ title: "Service Added", description: "The new service has been successfully added." });
        }
        await fetchServices();
        setIsServiceDialogOpen(false);
    } catch (error) {
        console.error("Error saving service:", error);
        toast({ variant: 'destructive', title: "Error", description: "Failed to save service." });
    } finally {
        setIsSubmitting(false);
    }
  };
  
  const handleDeleteService = async (serviceId: string) => {
    try {
        await deleteDoc(doc(db, "services", serviceId));
        toast({ variant: 'destructive', title: "Service Deleted", description: "The service has been removed." });
        await fetchServices();
    } catch (error) {
        console.error("Error deleting service:", error);
        toast({ variant: 'destructive', title: "Error", description: "Failed to delete service." });
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold tracking-tighter">Manager Dashboard</h1>
          <Button variant="outline" asChild>
            <Link href="/">Back to Site</Link>
          </Button>
        </div>

        <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Edit Project' : 'Add Project'}</DialogTitle>
              <DialogDescription>
                {editingProject ? 'Update the details of your project.' : 'Add a new project to your portfolio.'}
              </DialogDescription>
            </DialogHeader>
            <Form {...projectForm}>
              <form onSubmit={projectForm.handleSubmit(onProjectSubmit)} className="space-y-4">
                <FormField control={projectForm.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={projectForm.control} name="slug" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl><Input {...field} disabled={!!editingProject} placeholder="e.g., my-awesome-project" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={projectForm.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl><Input {...field} placeholder="e.g., Branding, Design" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={projectForm.control} name="client" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <FormControl><Input {...field} placeholder="e.g., Awesome Corp" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={projectForm.control} name="year" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl><Input {...field} placeholder="e.g., 2024" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={projectForm.control} name="services" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Services</FormLabel>
                    <FormControl><Input {...field} placeholder="e.g., Web Design, Branding" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={projectForm.control} name="imageUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Image</FormLabel>
                    <FormControl><Input type="file" onChange={(e) => field.onChange(e.target.files)} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={projectForm.control} name="secondaryImageUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Image</FormLabel>
                    <FormControl><Input type="file" onChange={(e) => field.onChange(e.target.files)} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={projectForm.control} name="about" render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl><Textarea {...field} className="min-h-32" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <DialogFooter>
                  <Button type="button" variant="ghost" onClick={() => setIsProjectDialogOpen(false)} disabled={isSubmitting}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Project
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{editingService ? 'Edit Service' : 'Add Service'}</DialogTitle>
              <DialogDescription>
                {editingService ? 'Update the details of your service.' : 'Add a new service offered.'}
              </DialogDescription>
            </DialogHeader>
             <Form {...serviceForm}>
              <form onSubmit={serviceForm.handleSubmit(onServiceSubmit)} className="space-y-4">
                 <FormField control={serviceForm.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={serviceForm.control} name="imageUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl><Input type="file" onChange={(e) => field.onChange(e.target.files)} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={serviceForm.control} name="details" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Details</FormLabel>
                    <FormControl><Textarea {...field} className="min-h-32" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <DialogFooter>
                  <Button type="button" variant="ghost" onClick={() => setIsServiceDialogOpen(false)} disabled={isSubmitting}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Service
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Card className="mb-12">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manage Projects</CardTitle>
              <CardDescription>Add, edit, or delete projects.</CardDescription>
            </div>
            <Button onClick={handleAddProject}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </CardHeader>
          <CardContent>
             {isDataLoading ? <div className="flex justify-center items-center h-40"><Loader2 className="h-8 w-8 animate-spin" /></div> : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>{project.category}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditProject(project)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                             <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                               <Trash2 className="h-4 w-4" />
                             </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the project "{project.title}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => handleDeleteProject(project.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
             )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manage Services</CardTitle>
              <CardDescription>Add, edit, or delete services.</CardDescription>
            </div>
            <Button onClick={handleAddService}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Service
            </Button>
          </CardHeader>
          <CardContent>
            {isDataLoading ? <div className="flex justify-center items-center h-40"><Loader2 className="h-8 w-8 animate-spin" /></div> : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell className="text-muted-foreground max-w-md truncate">{service.details}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditService(service)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                         <AlertDialog>
                          <AlertDialogTrigger asChild>
                             <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                               <Trash2 className="h-4 w-4" />
                             </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the service "{service.title}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => handleDeleteService(service.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
