function parseEmailList(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

export interface ContactEmailConfig {
  apiKey: string;
  from: string;
  adminRecipients: string[];
}

export function getContactEmailConfig(): ContactEmailConfig {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const adminRecipients = parseEmailList(process.env.CONTACT_FORM_ADMIN_EMAILS);

  const missing: string[] = [];

  if (!apiKey) {
    missing.push("RESEND_API_KEY");
  }

  if (!from) {
    missing.push("RESEND_FROM_EMAIL");
  }

  if (adminRecipients.length === 0) {
    missing.push("CONTACT_FORM_ADMIN_EMAILS");
  }

  if (missing.length > 0) {
    throw new Error(`Missing required contact email environment variables: ${missing.join(", ")}`);
  }

  return {
    apiKey: apiKey!,
    from: from!,
    adminRecipients,
  };
}
