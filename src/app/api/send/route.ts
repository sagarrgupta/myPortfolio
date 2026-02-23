import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy-key-for-build");

function sanitize(str: string): string {
  return str.replace(/\0/g, "").replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

const Email = z.object({
  fullName: z
    .string()
    .min(2, "Full name is invalid!")
    .max(200, "Full name is too long!")
    .transform((s) => sanitize(s.trim())),
  email: z
    .string()
    .email({ message: "Email is invalid!" })
    .max(254)
    .transform((s) => sanitize(s.trim().toLowerCase())),
  message: z
    .string()
    .min(10, "Message is too short!")
    .max(1000, "Message must be 1000 characters or less.")
    .transform((s) => sanitize(s.trim())),
});
/**
 * Contact form API endpoint
 * 
 * TODO: Future hardening steps when enabling in production:
 * 1. Add rate limiting (e.g., using Upstash Redis or middleware)
 * 2. Add CAPTCHA or honeypot field to prevent spam
 * 3. Configure proper 'from' address on verified domain for Resend
 * 4. Add IP-based throttling at edge/middleware level
 * 5. Consider adding request validation middleware
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Removed console.log to avoid logging PII (name, email, message)
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = Email.safeParse(body);
    if (!zodSuccess)
      return Response.json({ error: zodError?.message }, { status: 400 });

    // TODO: Update 'from' address to use verified domain when enabling in production
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [config.email],
      subject: "Contact me from portfolio",
      react: EmailTemplate({
        fullName: zodData.fullName,
        email: zodData.email,
        message: zodData.message,
      }),
    });

    if (resendError) {
      const message = resendError instanceof Error ? resendError.message : "Failed to send email.";
      return Response.json({ error: message }, { status: 500 });
    }

    return Response.json(resendData);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server error.";
    return Response.json({ error: message }, { status: 500 });
  }
}
