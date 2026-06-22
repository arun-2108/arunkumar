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
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>New Portfolio Message Received</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0b0f19; padding: 40px 10px;">
            <tr>
              <td align="center">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);">
                  <!-- Banner Header -->
                  <tr>
                    <td style="background-color: #1e1b4b; padding: 28px 32px; border-bottom: 2px solid #6366f1;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                            <span style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; color: #818cf8; text-transform: uppercase; letter-spacing: 0.15em; display: block; margin-bottom: 4px;">Inquiry Notification</span>
                            <h2 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; tracking-tight: -0.025em;">New Portfolio Message Received</h2>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Content Area -->
                  <tr>
                    <td style="padding: 32px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <!-- Intro Text -->
                        <tr>
                          <td style="color: #9ca3af; font-size: 14px; padding-bottom: 24px; line-height: 1.5;">
                            You received a new inquiry from your portfolio website contact form. The submission details are listed below:
                          </td>
                        </tr>

                        <!-- Name Field -->
                        <tr>
                          <td style="padding-bottom: 20px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 6px;">
                                  Name
                                </td>
                              </tr>
                              <tr>
                                <td style="background-color: #1f2937; border: 1px solid #374151; border-radius: 8px; padding: 12px 16px; font-size: 14px; color: #f3f4f6; line-height: 1.5;">
                                  ${body.name}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Email Field -->
                        <tr>
                          <td style="padding-bottom: 20px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 6px;">
                                  Email Address
                                </td>
                              </tr>
                              <tr>
                                <td style="background-color: #1f2937; border: 1px solid #374151; border-radius: 8px; padding: 12px 16px; font-size: 14px; color: #f3f4f6; line-height: 1.5;">
                                  <a href="mailto:${body.email}" style="color: #60a5fa; text-decoration: none; font-weight: 600;">${body.email}</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Company Field -->
                        ${
                          body.company
                            ? `
                        <tr>
                          <td style="padding-bottom: 20px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 6px;">
                                  Company / Organization
                                </td>
                              </tr>
                              <tr>
                                <td style="background-color: #1f2937; border: 1px solid #374151; border-radius: 8px; padding: 12px 16px; font-size: 14px; color: #f3f4f6; line-height: 1.5;">
                                  ${body.company}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        `
                            : ""
                        }

                        <!-- Subject Field -->
                        <tr>
                          <td style="padding-bottom: 20px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 6px;">
                                  Subject
                                </td>
                              </tr>
                              <tr>
                                <td style="background-color: #1f2937; border: 1px solid #374151; border-radius: 8px; padding: 12px 16px; font-size: 14px; color: #f3f4f6; line-height: 1.5; font-weight: 600;">
                                  ${body.subject}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Message Field -->
                        <tr>
                          <td style="padding-bottom: 28px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 6px;">
                                  Message
                                </td>
                              </tr>
                              <tr>
                                <td style="background-color: #1f2937; border: 1px solid #374151; border-radius: 8px; padding: 16px; font-size: 14px; color: #f3f4f6; line-height: 1.6; white-space: pre-wrap;">
                                  ${body.message}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Footer / Timestamp -->
                        <tr>
                          <td style="border-top: 1px solid #1f2937; padding-top: 20px; text-align: center;">
                            <span style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #4b5563;">
                              Submitted on ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} (IST) from Portfolio.
                            </span>
                          </td>
                        </tr>
                      </table>
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
