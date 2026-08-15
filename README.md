# dMinus V4

Static, Vercel-ready website.

## Structure
- `/` detects the visitor's preferred browser language and redirects to `/de/`, `/en/`, or `/tr/`.
- A manually selected language is saved in `localStorage` and wins on the next visit.
- Light/dark mode follows the operating-system preference on first visit, then remembers the user's selection.
- No build step or npm dependencies are required.

## Deploy to the existing GitHub/Vercel setup
Copy the contents of this folder directly into the root of the `dminus` repository, then:

```bash
git add .
git commit -m "Launch dMinus V4"
git push origin main
```

For Vercel:
- Framework Preset: Other
- Root Directory: ./
- Build Command: empty
- Output Directory: empty

## Important before production
`/impressum/` and `/datenschutz/` intentionally contain placeholders because the complete legal entity/address and the final analytics/form stack were not provided. Replace them with legally reviewed content before going live.

## Contact form
The current form opens the visitor's email client and prepares a message to `info@dminus.co`. This avoids shipping a fake backend. A Vercel serverless form endpoint can be added later.
