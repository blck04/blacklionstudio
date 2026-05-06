import { NextResponse } from "next/server";
import { Resend } from "resend";

import { ContactAdminEmail } from "@/emails/contact-admin-email";
import { ContactConfirmationEmail } from "@/emails/contact-confirmation-email";
import { getContactEmailConfig } from "@/lib/contact-email-config";
import { contactFormSchema } from "@/lib/contact-form-schema";

export const runtime = "nodejs";

function formatSubmissionDate(date: Date): string {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();

    if (!rawBody) {
      return NextResponse.json({ message: "Request body is required." }, { status: 400 });
    }

    let payload: unknown;

    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ message: "Request body must be valid JSON." }, { status: 400 });
    }

    const parsedSubmission = contactFormSchema.safeParse(payload);

    if (!parsedSubmission.success) {
      return NextResponse.json(
        {
          message: parsedSubmission.error.issues[0]?.message ?? "Invalid contact form submission.",
        },
        { status: 400 }
      );
    }

    let config;

    try {
      config = getContactEmailConfig();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Contact email configuration is invalid.";
      console.error(message);
      return NextResponse.json({ message: "Contact form email is not configured yet." }, { status: 500 });
    }

    const resend = new Resend(config.apiKey);
    const submittedAt = new Date();

    const [adminResult, confirmationResult] = await Promise.all([
      resend.emails.send({
        from: config.from,
        to: config.adminRecipients,
        subject: `New contact form message from ${parsedSubmission.data.name}`,
        replyTo: parsedSubmission.data.email,
        react: ContactAdminEmail({
          submittedAt: formatSubmissionDate(submittedAt),
          submission: parsedSubmission.data,
        }),
        text: [
          "New contact form message",
          "",
          `Name: ${parsedSubmission.data.name}`,
          `Email: ${parsedSubmission.data.email}`,
          `Submitted: ${submittedAt.toISOString()}`,
          "",
          "Message:",
          parsedSubmission.data.message,
        ].join("\n"),
        tags: [
          { name: "source", value: "contact-form" },
          { name: "type", value: "admin-notification" },
        ],
      }),
      resend.emails.send({
        from: config.from,
        to: parsedSubmission.data.email,
        subject: "We received your message",
        replyTo: config.adminRecipients,
        react: ContactConfirmationEmail({
          name: parsedSubmission.data.name,
        }),
        text: [
          `Hi ${parsedSubmission.data.name},`,
          "",
          "Thanks for reaching out to Blacklion Studio.",
          "We received your message and will get back to you as soon as possible.",
          "",
          "Best,",
          "Blacklion Studio",
        ].join("\n"),
        tags: [
          { name: "source", value: "contact-form" },
          { name: "type", value: "sender-confirmation" },
        ],
      }),
    ]);

    if (adminResult.error) {
      console.error("Failed to send admin contact email:", adminResult.error);
      return NextResponse.json({ message: "We couldn't deliver your message right now. Please try again." }, { status: 502 });
    }

    if (confirmationResult.error) {
      console.error("Failed to send sender confirmation email:", confirmationResult.error);
      return NextResponse.json({ message: "Your message could not be confirmed right now. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
  } catch (error) {
    console.error("Unexpected contact form error:", error);
    return NextResponse.json({ message: "We couldn't send your message right now. Please try again." }, { status: 500 });
  }
}
