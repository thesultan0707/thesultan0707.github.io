# MOHAMMED SULTAN THE SERIES — a Netflix-style portfolio

A static, zero-build personal portfolio for **Mohammed Sultan**
(Healthcare Operations & Digital Innovation Professional, Karimnagar, India)
that mimics the Netflix streaming UI: animated loader → cinematic title card →
"Who's watching?" profiles → homepage with content rails, detail modals, a
skill universe with honest level tags, services, project filters, an
experience overview, an approach section, and a "TO BE CONTINUED…" contact
finale with a frontend-demo contact form.

**Tech:** plain HTML + CSS + JS. No build step, no dependencies to install.
The only externals are the GSAP CDN (animations degrade gracefully offline)
and Google Fonts. Ready for GitHub Pages as-is.

## Files

| File          | What it is                                                        |
|---------------|-------------------------------------------------------------------|
| `index.html`  | Page structure: loader, title card, profiles, app shell, modal    |
| `styles.css`  | All styling — Netflix palette (`#141414`, `#E50914`), responsive  |
| `app.js`      | Screen flow, rails, filters, modal, form demo, keyboard nav      |
| `data.js`     | **★ Edit this file only ★ — every text content lives here**       |
| `favicon.svg` | Site icon                                                         |
| `404.html`    | Custom "not found" page (used automatically by GitHub Pages)      |

## Personalize it (only `data.js`)

1. Open `data.js`.
2. Search for `TODO` — the few remaining placeholders are:
   - profile photo (see the comment block above `avatarInitial`),
   - professional email, phone, LinkedIn, Instagram (under `contact.placeholders`),
   - employer names, job titles, and dates (under `employers`).
3. Replace each one with real details. No other file needs to change.

Tips:
- Skill `level` is one of `hands-on` / `familiar` / `exploring` / `learning`
  (see the `skillLevels` legend). Tags are honest by design.
- Project `status` is one of `Concept` / `In Progress` / `Professional
  Experience`; the ORIGINALS rail has working filters for these.
- The **Recruiter** profile shows a different hero line: edit its
  `heroEmphasis` (leave it as `""` to reuse the default hero text).
- The contact form is a **frontend demonstration**: submitting shows a clear
  "demo" notice and never claims delivery. To receive real enquiries, connect
  a form backend (e.g. Formspree, Netlify Forms) and update the submit handler
  in `app.js`.
- Avatars and tile art are pure CSS/SVG gradients — no images needed.

## Preview locally

Any static server works, e.g.:

```bash
cd portfolio-mohammed-sultan
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

**Option A — via the GitHub website (no terminal):**

1. Create a new repository on GitHub (e.g. `mohammed-sultan-portfolio`).
   Don't add a README.
2. On the repo page, click **Add file → Upload files** and upload all files
   from this folder.
3. Commit, then go to **Settings → Pages**.
4. Under *Build and deployment*, set **Source** to `Deploy from a branch`,
   choose `main` and `/ (root)`, and save.
5. After ~1 minute your site is live at
   `https://<your-username>.github.io/mohammed-sultan-portfolio/`.

**Option B — via the terminal:**

```bash
cd portfolio-mohammed-sultan
git init -b main
git add .
git commit -m "MOHAMMED SULTAN THE SERIES — Netflix-style portfolio"
gh repo create mohammed-sultan-portfolio --public --source=. --push
# then enable Pages: Settings → Pages → Deploy from a branch → main / root
```

**Custom domain (optional):** add a file named `CNAME` containing your domain,
then point your DNS at GitHub Pages per their docs.

## Notes

- This is a playful homage to the Netflix UI for portfolio purposes and is
  not affiliated with or endorsed by Netflix.
- Content is written to stay honest: no invented employers, dates, degrees,
  certifications, testimonials, results, or contact details. Placeholders are
  clearly marked.
- Keyboard: `←`/`→` + `Enter` on the profile screen, `Esc` closes the modal,
  `←`/`→` scroll a focused content row, hamburger menu on mobile.
- Respects `prefers-reduced-motion`.
