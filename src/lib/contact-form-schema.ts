import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(100, "Name must be 100 characters or less."),
  email: z.string().trim().email("Please enter a valid email address.").max(320, "Email must be 320 characters or less."),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(5000, "Message must be 5000 characters or less."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
