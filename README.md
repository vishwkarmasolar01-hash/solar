Himanshu Solar Energy — Website

What's included
- `index.html`, `style.css`, `script.js` — single-page marketing site
- `assets/` — add images, logos, and optimized assets here

Recommended next steps

1) Add optimized hero & OG images
- Place production images in `assets/images/`:
  - `hero.webp` (webp optimized, ~100-300KB)
  - `hero.jpg` (JPEG fallback)
  - `og-image.jpg` (1200x630 px) for social previews
- Use an image compressor (Squoosh, ImageOptim) and serve WebP where possible.

2) Configure contact form (Formspree)
- Sign up at https://formspree.io and create a form to get a form ID.
- Replace the `action` attribute on the contact `<form>` in `index.html` with your Formspree endpoint, for example:

  https://formspree.io/f/xyzabc

- The form is submitted via AJAX for a smooth UX; the page will show success or error messages.

3) Deploy (choices)
- Netlify: drag & drop the folder, or connect your Git repo and set build to none (static site).
- Vercel: import the repo and deploy as a static site.
- GitHub Pages: push to `gh-pages` branch or enable Pages for `main` with root as build output.

4) Social meta and SEO
- Update meta tags in `index.html` (`og:title`, `og:description`, `og:image`) with final copy and images.
- Add `sitemap.xml` and `robots.txt` when ready.

5) Optional enhancements
- Add analytics (Plausible, Google Analytics) and conversion tracking.
- Implement a lightweight CMS or lead tracking backend if you want to store leads server-side.

If you want, I can:
- Add placeholder optimized images now (SVG/photo placeholders).
- Wire the form to EmailJS instead of Formspree.
- Create a deploy-ready GitHub repo and push changes.

Tell me which of those you'd like me to do next.