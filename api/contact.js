// DMinus contact endpoint. Requires verified sender and RESEND_API_KEY in Vercel.
const MAX_BODY = 10000;
const MAX_MESSAGE = 3000;
const hits = new Map(); // Best-effort per-instance throttle; configure platform WAF for distributed rate limiting.
const send = (res, status, code) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  return res.status(status).json({ ok: status === 200, code });
};
const clean = (value, limit) => typeof value === "string" ? value.trim().slice(0, limit) : "";
const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
export default async function handler(req, res) {
  res.setHeader("Allow", "POST");
  if (req.method !== "POST") return send(res, 405, "method_not_allowed");
  if (Number(req.headers["content-length"] || 0) > MAX_BODY) return send(res, 413, "too_large");
  const origin = req.headers.origin;
  if (origin) {
    try {
      const parsed = new URL(origin);
      const host = String(req.headers.host || "").toLowerCase();
      if (parsed.protocol !== "https:" && parsed.hostname !== "localhost") return send(res, 403, "origin_rejected");
      if (parsed.host.toLowerCase() !== host) return send(res, 403, "origin_rejected");
    } catch { return send(res, 403, "origin_rejected"); }
  }
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body) || JSON.stringify(body).length > MAX_BODY) return send(res, 400, "invalid_body");
  if (clean(body.website, 200)) return send(res, 200, "accepted");
  const elapsed = Date.now() - Number(body.openedAt);
  if (Number.isFinite(elapsed) && Number(body.openedAt) > 0 && elapsed < 2000) return send(res, 429, "too_fast");
  const name = clean(body.name, 120).replace(/[\r\n]/g, " ");
  const company = clean(body.company, 160).replace(/[\r\n]/g, " ");
  const email = clean(body.email, 254);
  const phone = clean(body.phone, 60).replace(/[\r\n]/g, " ");
  const message = clean(body.message, MAX_MESSAGE);
  const lang = ["de","en","tr"].includes(body.lang) ? body.lang : "de";
  if (!name || !validEmail(email) || message.length < 10 || String(body.message || "").length > MAX_MESSAGE) return send(res, 400, "invalid_fields");
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  if (ip) {
    const current = Date.now();
    for (const [key, entry] of hits) if (entry.until < current) hits.delete(key);
    const entry = hits.get(ip) || { count: 0, until: current + 600000 };
    if (entry.count >= 5) return send(res, 429, "rate_limited");
    entry.count++;
    hits.set(ip, entry);
    if (hits.size > 3000) hits.clear();
  }
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) return send(res, 503, "not_configured");
  const subject = ["de","en","tr"].indexOf(lang) >= 0 ?
    ({ de: "Anfrage über dminus.co", en: "Inquiry via dminus.co", tr: "dminus.co üzerinden talep" })[lang] : "DMinus inquiry";
  const text = [
    "Name: " + name,
    "Company: " + company,
    "Email: " + email,
    "Phone: " + phone,
    "Language: " + lang,
    "",
    message
  ].join("\n");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + process.env.RESEND_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL || "info@dminus.co"],
        reply_to: email,
        subject,
        text
      }),
      signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) {
      console.error("Contact email provider failed", response.status);
      return send(res, 502, "delivery_failed");
    }
    return send(res, 200, "sent");
  } catch (error) {
    console.error("Contact email delivery error", error?.name || "unknown");
    return send(res, 502, "delivery_failed");
  }
}
