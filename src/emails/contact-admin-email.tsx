import type { ContactFormValues } from "@/lib/contact-form-schema";

interface ContactAdminEmailProps {
  submittedAt: string;
  submission: ContactFormValues;
}

const sectionStyle = {
  marginBottom: "24px",
};

const labelStyle = {
  display: "block",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  marginBottom: "8px",
  textTransform: "uppercase" as const,
  color: "#666666",
};

const valueStyle = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#111111",
  margin: 0,
  whiteSpace: "pre-wrap" as const,
};

export function ContactAdminEmail({ submittedAt, submission }: ContactAdminEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f7f7f7", padding: "32px" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "24px", padding: "32px" }}>
        <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#c8102e", marginTop: 0 }}>
          New Contact Form Message
        </p>
        <h1 style={{ fontSize: "30px", lineHeight: "1.2", marginBottom: "32px", color: "#111111" }}>
          {submission.name} just sent a message.
        </h1>

        <div style={sectionStyle}>
          <span style={labelStyle}>Name</span>
          <p style={valueStyle}>{submission.name}</p>
        </div>

        <div style={sectionStyle}>
          <span style={labelStyle}>Email</span>
          <p style={valueStyle}>{submission.email}</p>
        </div>

        <div style={sectionStyle}>
          <span style={labelStyle}>Submitted</span>
          <p style={valueStyle}>{submittedAt}</p>
        </div>

        <div style={{ ...sectionStyle, marginBottom: 0 }}>
          <span style={labelStyle}>Message</span>
          <p style={valueStyle}>{submission.message}</p>
        </div>
      </div>
    </div>
  );
}
