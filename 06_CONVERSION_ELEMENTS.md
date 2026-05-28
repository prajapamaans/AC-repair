# Conversion Elements & Lead Generation

> **Goal:** Turn every website visitor into a phone call or WhatsApp lead.
> Every page should give the visitor at least 3 ways to contact Jyoti AC.

---

## Conversion Priority Order

1. **Phone Call** — highest quality lead (direct, immediate)
2. **WhatsApp Message** — high quality (personal, fast response)
3. **Contact Form** — medium quality (async, needs follow-up)

Design and layout must make calling/WhatsApp the **easiest action** on every page.

---

## Sticky Buttons (Always Visible)

### Phone Button
- Fixed position: bottom-right corner
- Icon: phone icon (white on blue circle)
- On mobile: shows "Call Now — +91 076989 18030" label
- On desktop: icon only (tooltip on hover)
- Link: `tel:+917698918030`
- GA4 event: `phone_click`

### WhatsApp Button
- Fixed position: bottom-right, 70px above phone button
- Icon: WhatsApp logo (white on green circle)
- Link: `https://wa.me/917698918030?text=Hi%2C%20I%20need%20AC%20service%20in%20Vadodara`
- Opens in new tab
- GA4 event: `whatsapp_click`

```css
/* Sticky button base styles */
.sticky-btn {
  position: fixed;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  transition: transform 0.2s;
}
.sticky-btn:hover { transform: scale(1.1); }
.sticky-call { bottom: 20px; background: #1565C0; }
.sticky-whatsapp { bottom: 88px; background: #25D366; }
```

---

## CTA Placement Rules

Every page must have CTAs in these positions:

| Position | CTA Type |
|----------|---------|
| Above the fold (hero) | Call Now + WhatsApp button |
| After "Why Choose Us" section | "Book Service Now" button → scroll to form |
| Mid-page banner | Call Now (full-width colored section) |
| After any service description | "Call for [Service] in Vadodara" |
| End of every page | Contact form + phone number |

**Rule:** The phone number `+91 076989 18030` must appear as text (clickable link) at minimum 3 times per page.

---

## Contact / Inquiry Form

### Fields (all pages)
```
Full Name         [text, required, placeholder: "Your Name"]
Phone Number      [tel, required, placeholder: "10-digit mobile number"]
Service Needed    [select, required]
                  Options:
                  - Select Service...
                  - AC Repair
                  - AC Service
                  - AC AMC
                  - AC Installation
                  - AC PCB Repair
                  - AC Foam Wash
                  - AC Gas Filling
                  - Split AC Repair
                  - Window AC Repair
                  - Other
Area / Locality   [text, optional, placeholder: "Your area in Vadodara"]
Message           [textarea, optional, placeholder: "Describe your issue (optional)"]
Submit            [button: "Request Callback →"]
```

### Form Behavior
- Show success message on submit: "Thank you! We'll call you back shortly. For urgent help, call +91 076989 18030."
- Send email to: contact@jyotiacrepair.com
- Subject line: `New AC Service Inquiry — [Service] — [Name]`
- Reply-to: visitor's email if provided
- Enable reCAPTCHA v3 (invisible — no checkbox)

### Form Validation (client + server)
- Name: letters and spaces only, min 2 chars
- Phone: exactly 10 digits, numbers only
- Service: must be selected (not default)
- Block obvious spam (empty submissions, bot patterns)

---

## Homepage CTA Lines (copy for buttons/banners)

Priority order — use the most impactful ones above the fold:
- **Call Now for Fast AC Service**
- **Same Day AC Repair in Vadodara**
- **Trusted AC Technicians Near You**
- **Expert AC Repair & Installation Services**
- **Book AC Service — Fast Response Guaranteed**
- **Get Your AC Fixed Today — ☎ +91 076989 18030**

---

## "Book Service Now" Banner

Full-width section between main content sections:

```
Background: Dark Blue (#0D47A1) or gradient
Heading: Need AC Repair in Vadodara? We're Available Now!
Sub: Same-day service · All brands · Transparent pricing
Buttons: [📞 Call +91 076989 18030]  [💬 WhatsApp Us]
```

Place this banner:
- On Home: between Testimonials and FAQ
- On every service page: between Areas and FAQ sections
- On About: at bottom

---

## Testimonials / Social Proof

### Why it matters for conversion:
Visitors from Google are suspicious of unknown businesses. Testimonials with a person's name + locality = trust signal.

### Requirements:
- Minimum 3 testimonials on Home page
- Add 2 testimonials on each service page
- Include locality name (e.g. "Priya S., Alkapuri")
- Show 5-star rating with gold stars
- Optional: Add Google review badge (link to GMB reviews)

### Schema for reviews (if using real reviews):
```json
{
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Priya Shah"
  },
  "reviewBody": "Excellent service...",
  "datePublished": "2025-04-15"
}
```

---

## FAQ Section (Conversion Driver)

FAQs reduce doubts and push undecided visitors to convert. Place on Home + all service pages.

### Home Page FAQ (8 questions)
1. How much does AC repair cost in Vadodara?
2. Do you offer same-day AC service?
3. Which AC brands do you service?
4. Do you repair both split and window ACs?
5. What is AC AMC and should I get it?
6. How long does a standard AC service take?
7. Do you provide AC gas filling in Vadodara?
8. Which areas in Vadodara do you cover?

### Per-Service FAQ (4–5 per page, service-specific)
**AC Repair:**
1. Why is my AC not cooling properly?
2. How long does AC repair take?
3. Is it better to repair or replace an old AC?
4. Do you offer warranty on repairs?
5. Can you repair all brands of AC?

**AC AMC:**
1. What is included in AC AMC?
2. How many services per year in AMC?
3. Is AMC worth it for a single AC?
4. What is the cost of AC AMC in Vadodara?

*(Create 4–5 relevant questions for each of the 10 service pages)*

---

## Conversion Tracking Setup (GA4)

Set up these GA4 events to measure lead performance:

| Event Name | Trigger |
|------------|---------|
| `phone_click` | Click on any `tel:` link |
| `whatsapp_click` | Click on WhatsApp link |
| `form_submit` | Contact form successful submission |
| `cta_click` | Click on "Call Now" / "Book Service" buttons |
| `page_scroll_75` | User scrolls 75% of service pages |

Mark `phone_click`, `whatsapp_click`, and `form_submit` as **Conversions** in GA4.

This tells you exactly how many leads the website generates each month.
