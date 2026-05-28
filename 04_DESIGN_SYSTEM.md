# Design System — Jyoti AC Repair & Service

> **Style:** Clean · Professional · Modern · Trust-focused
> **Stack:** WordPress + Elementor

---

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary Blue | `#1565C0` | Buttons, headers, hero background, links |
| Light Blue | `#1E88E5` | Hover states, secondary buttons, accents |
| Dark Blue | `#0D47A1` | Footer background, dark sections |
| White | `#FFFFFF` | Page background, card backgrounds, text on dark |
| Light Grey | `#F5F7FA` | Alternate section background, subtle fills |
| Border Grey | `#E0E0E0` | Card borders, dividers, input borders |
| Text Dark | `#212121` | Main body text, headings |
| Text Medium | `#555555` | Subheadings, secondary text |
| Text Light | `#888888` | Meta info, captions |
| Success Green | `#2E7D32` | WhatsApp button, success states |
| CTA Orange | `#F57C00` | Alternate CTA buttons (use sparingly) |

---

## Typography

### Font Choices
- **Primary Font:** `Poppins` (Google Fonts) — for headings and UI
- **Body Font:** `Inter` or `Roboto` — for body text, forms, descriptions
- Fallback: `sans-serif`

### Font Size Scale
| Element | Size | Weight |
|---------|------|--------|
| H1 | 36–42px (desktop), 26–30px (mobile) | 700 |
| H2 | 28–32px (desktop), 22–24px (mobile) | 600 |
| H3 | 20–24px (desktop), 18–20px (mobile) | 600 |
| Body | 16px | 400 |
| Small/Caption | 14px | 400 |
| Button text | 16px | 600 |

### Line Height
- Headings: 1.2–1.3
- Body text: 1.6–1.7
- Buttons: 1

---

## Spacing System (8px grid)
- xs: 8px
- sm: 16px
- md: 24px
- lg: 40px
- xl: 64px
- section padding: 80px top/bottom (desktop), 48px (mobile)

---

## Button Styles

### Primary Button (Call Now / Book Service)
```css
background: #1565C0;
color: #FFFFFF;
border-radius: 6px;
padding: 14px 28px;
font-size: 16px;
font-weight: 600;
border: none;
cursor: pointer;
transition: background 0.2s ease;

:hover { background: #0D47A1; }
```

### Secondary Button (Learn More / Know More)
```css
background: transparent;
color: #1565C0;
border: 2px solid #1565C0;
border-radius: 6px;
padding: 12px 24px;
font-size: 16px;
font-weight: 600;

:hover { background: #1565C0; color: #FFFFFF; }
```

### WhatsApp Button
```css
background: #25D366;
color: #FFFFFF;
border-radius: 6px;
padding: 14px 28px;
font-size: 16px;
font-weight: 600;
```

### Sticky Floating Buttons (mobile + desktop)
- Phone button: bottom-right, blue circle, phone icon, z-index: 9999
- WhatsApp button: bottom-right above phone, green circle, WA icon
- Spacing between them: 12px

---

## Card Component

### Service Card
```
- Background: #FFFFFF
- Border: 1px solid #E0E0E0
- Border-radius: 10px
- Padding: 28px
- Box-shadow: 0 2px 12px rgba(0,0,0,0.06)
- Hover: shadow increases, border color → #1565C0
- Icon: 48x48px, brand blue color
- H3: 20px, #212121
- Description: 14px, #555555
- Link/Button: bottom of card
```

### Testimonial Card
```
- Background: #F5F7FA
- Border-radius: 10px
- Padding: 24px
- Star rating: gold (#FFC107)
- Name: bold, #212121
- Location: 13px, #888888
- Quote: 15px, #555555, italic
```

---

## Section Backgrounds (alternating)

| Section | Background |
|---------|-----------|
| Hero | Blue (#1565C0) or dark blue gradient |
| Trust bar | White (#FFFFFF) |
| About | Light Grey (#F5F7FA) |
| Services grid | White (#FFFFFF) |
| Why Choose Us | Light Grey (#F5F7FA) |
| Areas We Serve | White (#FFFFFF) |
| Brands | Light Grey (#F5F7FA) |
| Testimonials | White (#FFFFFF) |
| CTA Banner | Dark Blue (#0D47A1) |
| Contact Form | Light Grey (#F5F7FA) |
| FAQ | White (#FFFFFF) |
| Footer | Dark (#1A1A2E) or Dark Blue (#0D47A1) |

---

## Header / Navigation

- **Logo:** Left aligned — "Jyoti AC" logo + tagline "AC Repair & Service"
- **Nav links:** Home, About, Services (dropdown), Contact
- **Right side:** Phone number (visible on desktop) + "Call Now" button
- **Sticky header:** Yes — shrinks slightly on scroll
- **Mobile:** Hamburger menu, full-screen nav overlay
- **Header height:** 70px (desktop), 60px (mobile)

---

## Footer Layout (4 columns)

```
Col 1: Logo + tagline + social links + "Trusted AC Service Vadodara"
Col 2: Our Services (links to all service pages)
Col 3: Service Areas (links to area pages)
Col 4: Contact info + WhatsApp button
Bottom bar: © 2025 Jyoti AC | Privacy Policy | Sitemap
```

---

## Iconography

- Use **Remix Icons** or **Font Awesome 6** (free tier)
- Service icons: air-conditioner, wrench, gear, snow-flake, thermometer, circuit, spray, gas-tank
- Trust icons: checkmark-circle, clock, star, shield, person, phone
- Contact icons: phone, whatsapp, email, location-pin, clock

---

## Image Guidelines

| Section | Dimensions | Max File Size | Format |
|---------|-----------|--------------|--------|
| Hero banner | 1440×700px | 150KB | WebP |
| Service card images | 400×300px | 60KB | WebP |
| About section image | 600×450px | 80KB | WebP |
| Team photos | 300×300px | 50KB | WebP |
| Brand logos | 120×60px | 20KB | WebP/SVG |
| Testimonial avatar | 60×60px | 10KB | WebP |

**Required images (minimum):**
1. AC technician working on indoor unit
2. AC outdoor unit installation
3. AC foam wash / cleaning
4. Technician with customer at doorstep
5. AC PCB repair close-up
6. Team/office photo (optional but recommended)

---

## Mobile Responsiveness Rules

- **Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px–1024px
  - Desktop: > 1024px

- **Mobile-specific rules:**
  - Hero CTA buttons: full width, stacked vertically
  - Service grid: 1 column (scroll)
  - Header: hamburger, phone number visible
  - Sticky call button: always visible (bottom-right)
  - Font sizes: reduce by 20–25%
  - Section padding: 40px (mobile) vs 80px (desktop)
  - Google Map: full width, height 300px

---

## Performance Rules

- Lazy load all images below the fold
- Use WebP format for all images
- Defer non-critical CSS/JS
- Google Fonts: use `display=swap`
- No sliders/carousels with heavy libraries
- Minimize plugin count (fewer plugins = faster WordPress)
- Target: Lighthouse Performance > 85 on mobile
