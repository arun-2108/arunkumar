import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address"),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, "Message is required").max(2000),
  honeypot: z.string().max(100).optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS configuration
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Validate request body
    const body = contactSchema.parse(req.body);

    // Honeypot check (spam prevention)
    if (body.honeypot && body.honeypot.trim() !== "") {
      // Silently discard and return fake success
      return res.status(200).json({ success: true, message: "Message sent successfully" });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || "arunpvtz2108@gmail.com";

    // Format plain text backup email (defined early for dev mock logging)
    const emailText = `
New Portfolio Message Received
==============================
Name: ${body.name}
Email: ${body.email}
${body.company ? `Company: ${body.company}\n` : ""}Subject: ${body.subject}
Message:
${body.message}

Submitted at: ${new Date().toString()}
    `;

    if (!resendApiKey) {
      const host = req.headers.host || "";
      const isLocalHost =
        host.includes("localhost") || host.includes("127.0.0.1") || host.includes("[::1]");
      const isLocalDev =
        process.env.NODE_ENV === "development" ||
        !process.env.VERCEL ||
        process.env.NOW_REGION === "dev" ||
        isLocalHost;

      if (isLocalDev) {
        console.warn("--- DEVELOPMENT MOCK EMAIL DISPATCH ---");
        console.warn("To:", recipientEmail);
        console.warn("Subject:", body.subject);
        console.warn("Text Content:", emailText);
        console.warn("---------------------------------------");
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        return res
          .status(200)
          .json({ success: true, message: "Message simulated successfully in development mode." });
      }

      console.error("RESEND_API_KEY environment variable is not defined.");
      return res.status(500).json({
        error: "Configuration Error: RESEND_API_KEY is not defined on the host environment.",
      });
    }

    const resend = new Resend(resendApiKey);

    // Format professional HTML email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.6; margin: 0; padding: 0; background-color: #f8fafc; }
            .wrapper { padding: 40px 20px; }
            .container { max-width: 600px; margin: 0 auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); }
            .header { border-bottom: 2px solid #3b82f6; padding-bottom: 16px; margin-bottom: 24px; }
            .header h2 { margin: 0; color: #1e3a8a; font-size: 20px; font-weight: 700; }
            .field { margin-bottom: 20px; }
            .label { font-family: monospace; font-weight: bold; color: #64748b; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; margin-bottom: 6px; }
            .value { background-color: #f8fafc; padding: 12px 16px; border: 1px solid #f1f5f9; border-radius: 8px; font-size: 14px; color: #334155; white-space: pre-wrap; }
            .value a { color: #3b82f6; text-decoration: none; }
            .footer { margin-top: 32px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 20px; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <h2>New Portfolio Message Received</h2>
              </div>
              
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${body.name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${body.email}">${body.email}</a></div>
              </div>
              
              ${
                body.company
                  ? `
              <div class="field">
                <div class="label">Company / Organization</div>
                <div class="value">${body.company}</div>
              </div>
              `
                  : ""
              }
              
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${body.subject}</div>
              </div>
              
              <div class="field">
                <div class="label">Message</div>
                <div class="value">${body.message}</div>
              </div>
              
              <div class="footer">
                Submitted on ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} (IST) from Portfolio.
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // emailText is already defined above

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: recipientEmail,
      subject: `[Portfolio] ${body.subject}`,
      replyTo: body.email,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error("Resend Error:", error);
      return res.status(500).json({ error: "Failed to send message via Resend API" });
    }

    return res.status(200).json({ success: true, message: "Message sent successfully", data });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation Error", details: err.errors });
    }
    console.error("Unknown Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
