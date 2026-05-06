interface ContactConfirmationEmailProps {
  name: string;
}

export function ContactConfirmationEmail({ name }: ContactConfirmationEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f7f7f7", padding: "32px" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "24px", padding: "32px" }}>
        <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#c8102e", marginTop: 0 }}>
          Blacklion Studio
        </p>
        <h1 style={{ fontSize: "30px", lineHeight: "1.2", marginBottom: "24px", color: "#111111" }}>
          Thanks, {name} - we received your message.
        </h1>
        <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#111111", marginBottom: "16px" }}>
          This is a confirmation that your contact form submission reached our team successfully.
        </p>
        <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#111111", marginBottom: "16px" }}>
          We&apos;ll review your message and get back to you as soon as possible.
        </p>
        <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#111111", marginBottom: 0 }}>
          Best,<br />
          Blacklion Studio
        </p>
      </div>
    </div>
  );
}
