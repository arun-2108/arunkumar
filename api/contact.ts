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
      const isRealVercelCloud = process.env.VERCEL === "1" && process.env.NOW_REGION !== "dev";

      if (!isRealVercelCloud) {
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
        error:
          "Configuration Error: RESEND_API_KEY environment variable is not defined in your Vercel Dashboard project settings.",
      });
    }

    const resend = new Resend(resendApiKey);

    // Format professional HTML email with standard table-based layouts (guarantees cross-client styling)
    const emailHtml = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                  <!-- Header -->
                  <tr>
                    <td style="border-bottom: 2px solid #3b82f6; padding-bottom: 16px;">
                      <h2 style="margin: 0; color: #1e3a8a; font-size: 20px; font-weight: 700;">New Portfolio Message Received</h2>
                    </td>
                  </tr>
                  
                  <tr><td height="24"></td></tr>

                  <!-- Name Field -->
                  <tr>
                    <td>
                      <div style="font-family: 'Courier New', Courier, monospace; font-weight: bold; color: #64748b; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; margin-bottom: 6px;">Name</div>
                      <div style="background-color: #f8fafc; padding: 12px 16px; border: 1px solid #f1f5f9; border-radius: 8px; font-size: 14px; color: #334155; white-space: pre-wrap;">${body.name}</div>
                    </td>
                  </tr>
                  
                  <tr><td height="20"></td></tr>

                  <!-- Email Field -->
                  <tr>
                    <td>
                      <div style="font-family: 'Courier New', Courier, monospace; font-weight: bold; color: #64748b; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; margin-bottom: 6px;">Email Address</div>
                      <div style="background-color: #f8fafc; padding: 12px 16px; border: 1px solid #f1f5f9; border-radius: 8px; font-size: 14px; color: #334155; white-space: pre-wrap;"><a href="mailto:${body.email}" style="color: #3b82f6; text-decoration: none; font-weight: 500;">${body.email}</a></div>
                    </td>
                  </tr>
                  
                  ${
                    body.company
                      ? `
                  <tr><td height="20"></td></tr>
                  <tr>
                    <td>
                      <div style="font-family: 'Courier New', Courier, monospace; font-weight: bold; color: #64748b; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; margin-bottom: 6px;">Company / Organization</div>
                      <div style="background-color: #f8fafc; padding: 12px 16px; border: 1px solid #f1f5f9; border-radius: 8px; font-size: 14px; color: #334155; white-space: pre-wrap;">${body.company}</div>
                    </td>
                  </tr>
                  `
                      : ""
                  }
                  
                  <tr><td height="20"></td></tr>

                  <!-- Subject Field -->
                  <tr>
                    <td>
                      <div style="font-family: 'Courier New', Courier, monospace; font-weight: bold; color: #64748b; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; margin-bottom: 6px;">Subject</div>
                      <div style="background-color: #f8fafc; padding: 12px 16px; border: 1px solid #f1f5f9; border-radius: 8px; font-size: 14px; color: #334155; white-space: pre-wrap;">${body.subject}</div>
                    </td>
                  </tr>
                  
                  <tr><td height="20"></td></tr>

                  <!-- Message Field -->
                  <tr>
                    <td>
                      <div style="font-family: 'Courier New', Courier, monospace; font-weight: bold; color: #64748b; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; margin-bottom: 6px;">Message</div>
                      <div style="background-color: #f8fafc; padding: 12px 16px; border: 1px solid #f1f5f9; border-radius: 8px; font-size: 14px; color: #334155; white-space: pre-wrap;">${body.message}</div>
                    </td>
                  </tr>
                  
                  <tr><td height="32"></td></tr>

                  <!-- Footer -->
                  <tr>
                    <td style="border-top: 1px solid #f1f5f9; padding-top: 20px; text-align: center; font-size: 11px; color: #94a3b8; font-family: 'Courier New', Courier, monospace;">
                      Submitted on ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} (IST) from Portfolio.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
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
