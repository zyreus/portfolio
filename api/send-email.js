import nodemailer from "nodemailer";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map();

const LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }

  return req.headers["x-real-ip"] || req.socket?.remoteAddress || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count += 1;
  return false;
}

function stripHtml(value) {
  return value.replace(/<[^>]*>/g, "");
}

function sanitize(value, maxLength) {
  return stripHtml(String(value ?? "")).trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function buildEmailHtml({ name, email, message }) {
  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Message</title>
  <style>
    @media only screen and (max-width: 640px) {
      .email-shell {
        padding: 24px 12px !important;
      }

      .email-card {
        width: 100% !important;
        border-radius: 16px !important;
      }

      .email-header,
      .email-body {
        padding: 28px 22px !important;
      }

      .email-title {
        font-size: 26px !important;
      }

      .email-panel {
        padding: 20px !important;
      }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;color:#111827;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f4f4f5;margin:0;padding:0;">
    <tr>
      <td class="email-shell" align="center" style="padding:40px 20px;">
        <table class="email-card" width="600" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
          <tr>
            <td class="email-header" style="padding:40px;background:#7c3aed;background-image:linear-gradient(135deg,#7c3aed,#8b5cf6);text-align:center;">
              <p style="margin:0 0 14px 0;color:rgba(255,255,255,0.78);font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                Portfolio Inquiry
              </p>
              <h1 class="email-title" style="margin:0;color:#ffffff;font-size:32px;line-height:1.2;font-weight:800;letter-spacing:-0.03em;">
                New Portfolio Message
              </h1>
              <p style="margin:12px 0 0 0;color:rgba(255,255,255,0.86);font-size:16px;line-height:1.6;">
                Someone contacted you through your portfolio website.
              </p>
            </td>
          </tr>

          <tr>
            <td class="email-body" style="padding:40px;background:#ffffff;">
              <div class="email-panel" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:24px;margin-bottom:24px;">
                <p style="margin:0 0 10px 0;font-size:12px;color:#6b7280;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">
                  Full Name
                </p>
                <h2 style="margin:0;color:#111827;font-size:22px;line-height:1.35;font-weight:800;letter-spacing:-0.02em;">
                  ${escapedName}
                </h2>

                <div style="height:22px;line-height:22px;">&nbsp;</div>

                <p style="margin:0 0 10px 0;font-size:12px;color:#6b7280;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">
                  Email Address
                </p>
                <a href="mailto:${escapedEmail}" style="color:#7c3aed;text-decoration:none;font-size:18px;font-weight:700;line-height:1.5;word-break:break-word;">
                  ${escapedEmail}
                </a>
              </div>

              <div class="email-panel" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:24px;">
                <p style="margin:0 0 16px 0;font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">
                  Message
                </p>
                <p style="margin:0;font-size:16px;line-height:1.8;color:#111827;white-space:pre-line;">
                  ${escapedMessage}
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:30px;text-align:center;background:#f9fafb;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">
                Sent from your portfolio website
              </p>
              <p style="margin:8px 0 0 0;color:#9ca3af;font-size:12px;line-height:1.6;">
                © 2026 Zyreus Portfolio
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { success: false, error: "Method not allowed." });
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    return sendJson(res, 500, {
      success: false,
      error: "Email service is not configured.",
    });
  }

  const clientIp = getClientIp(req);

  if (isRateLimited(clientIp)) {
    return sendJson(res, 429, {
      success: false,
      error: "Too many messages sent. Please try again in 15 minutes.",
    });
  }

  let body = req.body;

  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return sendJson(res, 400, { success: false, error: "Invalid request body." });
    }
  }

  const name = sanitize(body?.name, LIMITS.name);
  const email = sanitize(body?.email, LIMITS.email);
  const message = sanitize(body?.message, LIMITS.message);

  if (!name || !email || !message) {
    return sendJson(res, 400, {
      success: false,
      error: "Please complete all fields before sending.",
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    return sendJson(res, 400, {
      success: false,
      error: "Please enter a valid email address.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.sendMail({
      from: emailUser,
      to: emailUser,
      replyTo: email,
      subject: `New Portfolio Inquiry — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: buildEmailHtml({ name, email, message }),
    });

    return sendJson(res, 200, {
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (error) {
    console.error("Email send failed:", error);
    return sendJson(res, 500, {
      success: false,
      error: "Something went wrong while sending. Please try again.",
    });
  }
}
