# brycendoesroofs.com

One-page site for Brycen Autrey (Bartlett Roofing): plain HTML, CSS, and a few lines of vanilla JS. There's no build step. Everything that gets deployed is in `public/`.

```
public/
  index.html          the page (all sections, SEO tags, LocalBusiness schema)
  styles.css          mobile-first styles
  script.js           footer year + booking-iframe guard
  favicon.svg         placeholder "BA" monogram
  apple-touch-icon.png
  og-image.png        1200x630 social share image
  404.html, robots.txt, sitemap.xml
  _headers            Cloudflare Pages headers (security + caching)
wrangler.toml         Cloudflare Pages project config (name: brycendoesroofs)
```

## Placeholders to fill in

Search the project for `[` to find these:

| Placeholder | Where | What to put |
|---|---|---|
| `[BOOKING_LINK]` | `index.html`, 2 places (iframe `data-src` + "Book here" button) | Google Calendar appointment schedule URL. For the iframe, use the embed link, which ends in `?gv=true`. |
| `[GOOGLE_REVIEWS_EMBED]` | `index.html`, `#google-reviews` | Replace the placeholder `<p>` with the official Google reviews embed code. Don't add hand-written reviews. |
| `[PHOTO_OF_BRYCEN]` | `index.html`, About section | Add `public/brycen.webp` (about 480x600, under 80 KB) and swap the placeholder div for the `<img>` tag shown in the comment |
| `[ABOUT_BRYCEN_DETAILS]` | `index.html`, About section (HTML comment) | Optional extra background |
| `[BARTLETT_WA_REG]`, `[BARTLETT_ID_REG]` | footer | Contractor registration numbers |
| `[FAVICON]` | `favicon.svg` / `apple-touch-icon.png` | Optional: replace the placeholder monogram |

Until `[BOOKING_LINK]` is a real `https://` URL, the iframe stays hidden and a short note points people to the "Book here" button.

## Preview locally

```
python3 -m http.server 8080 -d public
```

Then open http://localhost:8080.

## Deploy to Cloudflare Pages

### Option A: Git integration (recommended, auto-deploys on push)

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and pick this repo.
2. Project name: `brycendoesroofs`. Production branch: `main`.
3. Framework preset: **None**. Leave the build command empty. Set the build output directory to `public`.
4. Save and deploy.

### Option B: Wrangler CLI (one-off deploy)

```
npx wrangler login
npx wrangler pages project create brycendoesroofs --production-branch main   # first time only
npx wrangler pages deploy
```

### Custom domains + www redirect

1. Go to **Pages project → Custom domains → Set up a custom domain** and add `brycendoesroofs.com`. The DNS is already on Cloudflare, so the record is created automatically.
2. Add `www.brycendoesroofs.com` as a second custom domain, so it gets DNS and a certificate.
3. Set up the 301 redirect: go to **brycendoesroofs.com zone → Rules → Redirect Rules → Create rule**.
   - Name: `www to apex`
   - If: Hostname equals `www.brycendoesroofs.com`
   - Then: Dynamic redirect, expression `concat("https://brycendoesroofs.com", http.request.uri.path)`, status **301**, **Preserve query string** checked.

   (Pages' `_redirects` file can't redirect by hostname, so this is done as a zone rule.)
4. Check it: `curl -I https://www.brycendoesroofs.com/` should return `301` with `location: https://brycendoesroofs.com/`.

The canonical tag, Open Graph URLs, schema, and sitemap all already point to `https://brycendoesroofs.com/`.

## Copy rules (keep these when editing)

- No made-up stats, years, or review counts. No fake reviews.
- Never say homeowners "qualify" or are "covered", "free roof", "insurance will pay", or "guaranteed approval".
- Never mention waiving, covering, or reducing the deductible.
- Never say Brycen negotiates with insurers or represents homeowners to them.
- Never use #6BB8A4 for text on white. Buttons filled with #6BB8A4 use #253038 text.
- Don't use the Bartlett logo unless it's provided.
