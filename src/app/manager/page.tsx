"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { projects as initialProjects, type Project } from '@/lib/projects-data';
import { services as initialServices, type Service } from '@/lib/services-data';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Footer } from '@/components/footer';
import Link from 'next/link';

const projectSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  about: z.string().min(10, "About section is required"),
});

const serviceSchema = z.object({
  id: z.string().min(1, "ID is required").regex(/^[a-z0-9-]+$/, "ID can only contain lowercase letters, numbers, and hyphens."),
  title: z.string().min(1, "Title is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  details: z.string().min(10, "Details are required"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;
type ServiceFormValues = z.infer<typeof serviceSchema>;


export default function ManagerPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [services, setServices] = useState<Service[]>(initialServices);

  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const projectForm = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
  });

  const serviceForm = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
  });

  const handleAddProject = () => {
    setEditingProject(null);
    projectForm.reset({ slug: '', title: '', category: '', imageUrl: 'https://placehold.co/800x600.png', about: '' });
    setIsProjectDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    projectForm.reset({
        slug: project.slug,
        title: project.title,
        category: project.category,
        imageUrl: project.imageUrl,
        about: project.about,
    });
    setIsProjectDialogOpen(true);
  };

  const onProjectSubmit = (data: ProjectFormValues) => {
    if (editingProject) {
      const updatedProject: Project = { ...editingProject, ...data };
      setProjects(projects.map(p => p.slug === editingProject.slug ? updatedProject : p));
      toast({ title: "Project Updated", description: "The project has been successfully updated." });
    } else {
      const newProject: Project = {
        ...data,
        description: data.about.substring(0, 100) + '...',
        details: { client: 'New Client', year: new Date().getFullYear().toString(), services: 'New Services' },
        galleryImages: [{ url: data.imageUrl, alt: data.title, dataAiHint: 'placeholder' }]
      };
      setProjects([newProject, ...projects]);
      toast({ title: "Project Added", description: "The new project has been successfully added." });
    }
    setIsProjectDialogOpen(false);
  };
  
  const handleDeleteProject = (slug: string) => {
    setProjects(projects.filter(p => p.slug !== slug));
    toast({ variant: 'destructive', title: "Project Deleted", description: "The project has been removed." });
  };

  const handleAddService = () => {
    setEditingService(null);
    serviceForm.reset({ id: '', title: '', imageUrl: 'https://placehold.co/800x600.png', details: '' });
    setIsServiceDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    serviceForm.reset(service);
    setIsServiceDialogOpen(true);
  };

  const onServiceSubmit = (data: ServiceFormValues) => {
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? data : s));
      toast({ title: "Service Updated", description: "The service has been successfully updated." });
    } else {
      setServices([data, ...services]);
      toast({ title: "Service Added", description: "The new service has been successfully added." });
    }
    setIsServiceDialogOpen(false);
  };
  
  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
    toast({ variant: 'destructive', title: "Service Deleted", description: "The service has been removed." });
  };


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
                 <FormField control={projectForm.control} name="imageUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Image URL</FormLabel>
                    <FormControl><Input {...field} placeholder="https://placehold.co/800x600.png" /></FormControl>
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
                  <Button type="button" variant="ghost" onClick={() => setIsProjectDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Project</Button>
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
                 <FormField control={serviceForm.control} name="id" render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl><Input {...field} disabled={!!editingService} placeholder="e.g., new-service" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={serviceForm.control} name="imageUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl><Input {...field} placeholder="https://placehold.co/800x600.png" /></FormControl>
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
                  <Button type="button" variant="ghost" onClick={() => setIsServiceDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Service</Button>
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
                  <TableRow key={project.slug}>
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
                            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => handleDeleteProject(project.slug)}>
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
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
