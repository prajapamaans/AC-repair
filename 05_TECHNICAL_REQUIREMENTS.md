# Technical Requirements — Jyoti AC Repair & Service

> **Stack:** WordPress + Elementor
> **Host Requirements:** cPanel hosting, PHP 8.1+, MySQL 8.0+, SSL included

---

## Hosting Requirements

| Requirement | Minimum Spec |
|-------------|-------------|
| PHP version | 8.1 or higher |
| MySQL | 8.0+ |
| RAM | 512MB+ (1GB recommended) |
| Storage | 5GB+ |
| SSL | Free Let's Encrypt is fine |
| cPanel | Yes (or equivalent) |
| Bandwidth | Unmetered preferred |

**Recommended Indian Hosts (good for local SEO speed):**
- Hostinger India (cheapest, good speed)
- Bluehost India
- SiteGround (if budget allows)
- BigRock (for local clients)

---

## WordPress Setup

### Installation
1. Install WordPress via cPanel Softaculous or manual upload
2. Set site URL to `https://jyotiacrepair.com` (non-www, HTTPS)
3. Set timezone to `Asia/Kolkata`
4. Set date format to `d/m/Y`

### WordPress Settings
```
Settings > General:
  Site Title: Jyoti AC Repair & Service
  Tagline: Professional AC Repair & Service in Vadodara
  URL: https://jyotiacrepair.com

Settings > Permalinks:
  Structure: /%postname%/   ← IMPORTANT for SEO-friendly URLs

Settings > Discussion:
  Disable comments unless blog is active

Settings > Reading:
  Static front page → select Home page
```

---

## Required Plugins

### Essential (Install All)

| Plugin | Purpose | Free/Paid |
|--------|---------|----------|
| **Elementor** | Page builder | Free (Pro optional) |
| **Rank Math SEO** | Meta tags, schema, sitemap | Free |
| **WP Rocket** or **LiteSpeed Cache** | Page speed, caching | Paid/Free |
| **Smush** or **ShortPixel** | Image compression + WebP | Free tier |
| **Contact Form 7** | Inquiry forms | Free |
| **WP Mail SMTP** | Form email delivery reliability | Free |
| **Really Simple SSL** | Force HTTPS | Free |
| **Google Site Kit** | Analytics + Search Console | Free |
| **WP Super Cache** | Backup caching option | Free |
| **UpdraftPlus** | Automated backups | Free |

### Optional (Add If Needed)
| Plugin | Purpose |
|--------|---------|
| **Elementor Pro** | Theme builder, popup forms |
| **Yoast SEO** (alternative to Rank Math) | SEO plugin |
| **MonsterInsights** | GA4 dashboard in WP admin |
| **WPForms** | Better form builder |
| **Floating Social** | Sticky WhatsApp/call buttons |

---

## Rank Math SEO Configuration

```
General Settings:
  ✅ Enable breadcrumbs
  ✅404 monitor ON
  ✅ Redirections ON

Titles & Meta:
  Separator: |
  Set meta for Home, all service pages manually (see SEO Strategy doc)

Sitemap:
  ✅ Enable XML Sitemap
  ✅ Include all pages
  ❌ Exclude media attachments
  Submit sitemap URL to Google Search Console

Schema:
  Default schema: LocalBusiness
  Fill in: Name, Address, Phone, Coordinates, Hours
```

---

## Google Services Integration

### Google Analytics 4
1. Create GA4 property at analytics.google.com
2. Get Measurement ID (G-XXXXXXXXXX)
3. Install via Google Site Kit plugin or paste gtag in `<head>`
4. Enable enhanced measurement (form submissions, scroll depth, click tracking)
5. Set up conversion event for: `generate_lead` (form submit + phone click)

### Google Search Console
1. Add property at search.google.com/search-console
2. Verify via HTML tag (paste in WordPress `<head>`) or Google Site Kit
3. Submit sitemap: `https://jyotiacrepair.com/sitemap_index.xml`
4. Monitor: Coverage, Performance, Core Web Vitals

### Google Maps / GMB
1. Claim/create Google Business Profile at business.google.com
2. Category: Air Conditioning Repair Service
3. Add all 20 Vadodara service areas
4. Upload 10+ photos
5. Add all services from the services list
6. Embed GMB map on Contact page

---

## Performance Optimization

### Caching (WP Rocket / LiteSpeed Cache)
- Enable page caching
- Enable browser caching (1 week for static assets)
- Minify CSS + JS (enable, test that nothing breaks)
- Combine CSS files: Yes
- Lazy load images: Yes
- Preload critical pages

### Image Optimization (Smush/ShortPixel)
- Convert all uploads to WebP automatically
- Compress on upload (lossy, ~80% quality)
- Strip EXIF data
- Lazy load: enable

### Database
- Run database cleanup weekly (Rank Math or WP-Optimize)
- Remove post revisions (set limit to 5)
- Remove spam comments, transients

### CDN (Optional but Recommended)
- Cloudflare free plan: add domain, set to "Flexible" SSL initially
- Benefits: global CDN, DDoS protection, free SSL, faster load
- After setup, set Cloudflare SSL to "Full Strict"

---

## Security Configuration

### Basic Hardening
```
[ ] Delete default admin user — create new admin with non-obvious username
[ ] Use strong password (20+ chars) for admin
[ ] Enable 2FA on WordPress admin (Wordfence or Google Authenticator)
[ ] Disable file editing in WordPress:
    Add to wp-config.php: define('DISALLOW_FILE_EDIT', true);
[ ] Change wp-login.php URL (WPS Hide Login plugin)
[ ] Limit login attempts (Limit Login Attempts Reloaded plugin)
[ ] Keep WordPress core + all plugins updated
[ ] Delete unused plugins and themes (including default Twenty* themes)
```

### SSL / HTTPS
```
[ ] SSL certificate installed and active
[ ] Force HTTPS via Really Simple SSL plugin
[ ] Update WordPress URL to https:// in Settings > General
[ ] Add HSTS header (via .htaccess or Cloudflare)
```

### .htaccess Security Rules (add to .htaccess)
```apache
# Disable directory browsing
Options -Indexes

# Protect wp-config.php
<Files wp-config.php>
  Order allow,deny
  Deny from all
</Files>

# Protect .htaccess
<Files .htaccess>
  Order allow,deny
  Deny from all
</Files>

# Block XML-RPC (if not needed)
<Files xmlrpc.php>
  Order Deny,Allow
  Deny from all
</Files>
```

### Contact Form Security
- Enable reCAPTCHA v3 on all contact forms
- Validate: name (text only), phone (numeric, 10 digits), email format
- Never expose raw email in form action
- Use WP Mail SMTP to prevent form email going to spam

---

## WhatsApp & Phone Integration

### Sticky WhatsApp Button
```html
<!-- Add to footer or use Elementor sticky section -->
<a href="https://wa.me/917698918030?text=Hi%2C%20I%20need%20AC%20service%20in%20Vadodara"
   target="_blank"
   class="whatsapp-sticky-btn"
   aria-label="WhatsApp Jyoti AC">
  <img src="/icons/whatsapp.svg" alt="WhatsApp" />
</a>
```

### Sticky Call Button
```html
<a href="tel:+917698918030"
   class="call-sticky-btn"
   aria-label="Call Jyoti AC">
  <img src="/icons/phone.svg" alt="Call Now" />
</a>
```

Both buttons: `position: fixed; bottom: 20px; right: 20px; z-index: 9999`
Stack them vertically with 70px gap.

### Mobile Call Button
- Add click-to-call button prominently in mobile header
- Track phone clicks as GA4 conversion event

---

## Robots.txt

```
User-agent: *
Allow: /
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-login.php
Disallow: /wp-content/plugins/
Disallow: /cart/
Disallow: /?s=

Sitemap: https://jyotiacrepair.com/sitemap_index.xml
```

---

## Launch Checklist

```
PRE-LAUNCH:
[ ] All pages created and reviewed
[ ] All meta titles + descriptions set in Rank Math
[ ] Schema markup added and tested (schema.org validator)
[ ] All images compressed, WebP, ALT tags added
[ ] Internal links verified (no broken links)
[ ] Contact form tested (sends email to contact@jyotiacrepair.com)
[ ] Mobile responsiveness tested on real device (not just browser)
[ ] Page speed test: PageSpeed Insights > 80 mobile score
[ ] SSL active and all pages load on HTTPS
[ ] WhatsApp + Phone sticky buttons working
[ ] Google Map embedded on Contact page

POST-LAUNCH:
[ ] Google Search Console verified + sitemap submitted
[ ] Google Analytics 4 live and tracking
[ ] GMB linked to website
[ ] All redirects (www → non-www, http → https) working
[ ] Test all forms one more time on live site
[ ] Backup created (UpdraftPlus)
```
