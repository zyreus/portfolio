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
      subject: `New Portfolio Message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
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
