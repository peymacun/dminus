# dMinus website

Static, Vercel-ready multilingual website for **dMinus only**. Pages: `/de/`, `/en/`, `/tr/`, `/impressum/`, `/datenschutz/`. Main site remains framework-free HTML/CSS/JS. Contact submission uses a small Vercel Function.

## Deploy

Vercel: Framework Preset **Other**, Root Directory `./`, no build command or output directory. Configure the following environment variables in the DMinus Vercel project:

- `RESEND_API_KEY` — Resend API key (server-side only; never put it in Git).
- `CONTACT_FROM_EMAIL` — verified sender under the DMinus domain, e.g. `dMinus <contact@dminus.co>`.
- `CONTACT_TO_EMAIL` — optional recipient; defaults to `info@dminus.co`.

Verify the sending domain at your chosen provider and validate live form delivery before treating the form as production-ready. If the env vars are missing, the API intentionally responds with 503 and the form shows an error; it does not pretend delivery succeeded. This implementation uses the Resend HTTPS API directly and no npm packages.

## Notes

- Personal name, registered business details and full postal address have **not** been invented. `/impressum/` intentionally remains unchanged as requested. Privacy notice must be checked against final controller identity, hosting and email-provider setup before accepting real submissions.
- Onsite and support availability are subject to agreement; no 24/7 promise.
- Language preference and theme are stored locally when available. The root page has a no-JavaScript language fallback.
- Contact API validates inputs, rejects cross-origin browser requests, has a honeypot and best-effort instance-local rate limiting. For high traffic use Vercel WAF or durable rate limiting. Never submit passwords or sensitive personal data through the public inquiry form.
- Security headers are defined in `vercel.json`. Inline theme/language script currently requires a limited `unsafe-inline` CSP exception. For a stricter policy migrate inline scripts to external resources and remove the exception.
- Basic accessibility and responsive styles are included. Check at real device widths, run Lighthouse/aXe and verify email delivery after configuring the Vercel environment.

## Verification checklist

1. Open `/de/`, `/en/`, `/tr/` in light and dark mode.
2. On a narrow screen open the menu, switch language, close with Escape and navigate an anchor.
3. Inspect all service links, FAQ and contact labels.
4. Submit a valid inquiry, invalid email, overly long message, spam-field and repeated requests.
5. Verify that exactly one email arrives at `info@dminus.co`.
6. Confirm response headers, sitemap and canonical redirects on both apex and www hosts.
