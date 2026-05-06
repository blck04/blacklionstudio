"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-form-schema";
import Magnetic from "./ui/magnetic";

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Message not sent",
          description: payload?.message ?? "We couldn't send your message right now. Please try again.",
        });
        return;
      }

      toast({
        title: "Message sent",
        description: payload?.message ?? "Thanks for reaching out. We'll get back to you soon.",
      });
      form.reset();
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      toast({
        variant: "destructive",
        title: "Message not sent",
        description: "We couldn't send your message right now. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Name" {...field} className="h-14 rounded-full px-6 border-foreground/50 focus-visible:ring-destructive"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} className="h-14 rounded-full px-6 border-foreground/50 focus-visible:ring-destructive"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Message" {...field} className="min-h-40 rounded-[2rem] p-6 border-foreground/50 focus-visible:ring-destructive" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Magnetic>
            <Button type="submit" size="lg" disabled={isSubmitting} className="group w-full rounded-full px-8 py-7 text-lg">
            {isSubmitting ? "Sending..." : "Send Message"}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
        </Magnetic>
      </form>
    </Form>
  );
}
