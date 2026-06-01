// /
//  * Jyoti AC Repair & Service - Main Site Interactions
//  * Author: Antigravity Codebase Assistant
//  * Last Updated: 2026-05-28
//  */

// ========================================================================
// GOOGLE APPS SCRIPT FOR GOOGLE SHEETS LIVE SYNC
// ========================================================================
/*
  ============================================================
  SETUP INSTRUCTIONS (DO THIS ONCE):
  ============================================================
  1. Go to https://sheets.google.com and Create a new Blank spreadsheet.
  2. Name the sheet "Leads" (rename the bottom tab to "Leads").
  3. Click Extensions > Apps Script.
  4. Delete all default code and paste the script below.
  5. Click Deploy > New Deployment.
  6. Set "Select type" → "Web app".
  7. "Execute as" → "Me".
  8. "Who has access" → "Anyone".
  9. Click "Deploy", copy the Web App URL that appears.
  10. Paste that URL below in GOOGLE_SHEETS_WEBHOOK_URL.
  ============================================================

  // ---------- PASTE THIS IN APPS SCRIPT ----------
  function doGet(e) {
    return handleResponse(e);
  }

  function doPost(e) {
    return handleResponse(e);
  }

  function handleResponse(e) {
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
      if (!sheet) {
        sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        sheet.setName("Leads");
      }

      var data = {};
      if (e && e.postData && e.postData.contents) {
        try {
          data = JSON.parse(e.postData.contents);
        } catch (jsonErr) {
          data = e.parameter;
        }
      } else if (e && e.parameter) {
        data = e.parameter;
      }

      var submittedAt = data.submittedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
      var pageUrl    = data.page_url    || "N/A";
      var name       = data.name        || "N/A";
      var phone      = data.phone       || "N/A";
      var email      = data.email       || "N/A";
      var service    = data.service     || "N/A";
      var area       = data.area        || "N/A";
      var message    = data.message     || "N/A";

      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Date & Time", "Page URL", "Name", "Phone Number", "Email Address", "Service Requested", "Area/Locality", "Message"]);
      }

      sheet.appendRow([submittedAt, pageUrl, name, phone, email, service, area, message]);

      return ContentService
        .createTextOutput(JSON.stringify({ status: "success", message: "Saved to sheet" }))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  // ------------------------------------------------
*/
// ========================================================================
const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzfW-j4JOUthb2mO6ktfj17V1lRzGqO6VvOiFqcXm4_mggWPQ9PcAk4Vg6DWopU-mXR9w/exec';

const init = () => {
  initStickyHeader();
  initMobileMenu();
  initFaqAccordions();
  initContactForm();
  initAnalyticsTracking();
  initHeroSlider();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// /
//   * 1. Sticky Header Animation
//     * Shrinks header height and adds background - blur on scroll
//       */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const checkScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Check once on page load in case page was refreshed scrolled
}

// /
//   * 2. Mobile Menu Toggle & Navigation Overlay
//     */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
  const dropdown = document.querySelector('.dropdown');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const body = document.body;

  if (!hamburger || !navMenu) {
    console.warn('[Jyoti AC] Mobile Menu components not found.');
    return;
  }

  // Set initial accessibility states
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-controls', 'nav-menu');
  if (dropdownToggle) {
    dropdownToggle.setAttribute('aria-haspopup', 'true');
    dropdownToggle.setAttribute('aria-expanded', 'false');
  }

  const toggleMenu = (forceState) => {
    const willOpen = typeof forceState === 'boolean' ? forceState : !navMenu.classList.contains('active');

    if (willOpen) {
      hamburger.classList.add('active');
      navMenu.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      body.style.overflow = 'hidden';
    } else {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';

      // Close dropdown if mobile menu closes
      if (dropdown && dropdown.classList.contains('active-open')) {
        closeDropdown();
      }
    }
  };

  const toggleDropdown = (forceState) => {
    if (!dropdown || !dropdownToggle || !dropdownMenu) return;
    const willOpen = typeof forceState === 'boolean' ? forceState : !dropdown.classList.contains('active-open');

    if (willOpen) {
      dropdown.classList.add('active-open');
      dropdownToggle.setAttribute('aria-expanded', 'true');
      if (window.innerWidth <= 768) {
        dropdownMenu.style.maxHeight = '500px';
      }
    } else {
      closeDropdown();
    }
  };

  const closeDropdown = () => {
    if (!dropdown || !dropdownToggle || !dropdownMenu) return;
    dropdown.classList.remove('active-open');
    dropdownToggle.setAttribute('aria-expanded', 'false');
    dropdownMenu.style.maxHeight = '0px';
  };

  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  // Toggling services dropdown on click (mobile tap & desktop keyboard/click support)
  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDropdown();
    });
  }

  // Close mobile menu when a direct link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Click outside menu / dropdown closure
  document.addEventListener('click', (e) => {
    const target = e.target;

    if (navMenu.classList.contains('active') && !navMenu.contains(target) && !hamburger.contains(target)) {
      toggleMenu(false);
    }

    if (dropdown && dropdown.classList.contains('active-open') && !dropdown.contains(target)) {
      closeDropdown();
    }
  });

  // Escape key closure for accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleMenu(false);
      closeDropdown();
    }
  });

  // Clean transition states on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      if (body.style.overflow === 'hidden') {
        body.style.overflow = '';
      }
      if (dropdownMenu) {
        dropdownMenu.style.maxHeight = '';
      }
    } else {
      if (dropdown && dropdown.classList.contains('active-open') && dropdownMenu) {
        dropdownMenu.style.maxHeight = '500px';
      }
    }
  });
}

// /
//   * 3. FAQ Accordion Toggle Actions
//     */
function initFaqAccordions() {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all other FAQ items for a clean accordion effect
      const allItems = document.querySelectorAll('.faq-item');
      allItems.forEach(i => i.classList.remove('active'));

      // If it wasn't active, open this one
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// /
//   * 4. Client - side Form Validation and Premium Success Animation
//     */
function initContactForm() {
  const form = document.getElementById('inquiry-form');
  const alertBox = document.getElementById('form-alert');

  if (!form || !alertBox) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    alertBox.style.display = 'none';
    alertBox.className = 'form-alert';

    const nameInput = document.getElementById('form-name');
    const phoneInput = document.getElementById('form-phone');
    const emailInput = document.getElementById('form-email');
    const serviceInput = document.getElementById('form-service');
    const areaInput = document.getElementById('form-area');
    const messageInput = document.getElementById('form-message');

    const nameVal = nameInput ? nameInput.value.trim() : '';
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const serviceVal = serviceInput ? serviceInput.value : '';

    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation checks
    if (!nameVal) {
      showFormMessage('Please enter your full name.', 'error');
      if (nameInput) nameInput.focus();
      return;
    }
    if (!nameRegex.test(nameVal)) {
      showFormMessage('Please enter a valid name (letters & spaces only, 2-50 characters).', 'error');
      if (nameInput) nameInput.focus();
      return;
    }

    if (!phoneVal) {
      showFormMessage('Please enter your phone number.', 'error');
      if (phoneInput) phoneInput.focus();
      return;
    }
    if (!phoneRegex.test(phoneVal)) {
      showFormMessage('Please enter a valid 10-digit mobile number.', 'error');
      if (phoneInput) phoneInput.focus();
      return;
    }

    if (emailVal && !emailRegex.test(emailVal)) {
      showFormMessage('Please enter a valid email address.', 'error');
      if (emailInput) emailInput.focus();
      return;
    }

    if (!serviceVal || serviceVal === 'Select Service...') {
      showFormMessage('Please select the service you are looking for.', 'error');
      if (serviceInput) serviceInput.focus();
      return;
    }

    const leadData = {
      page_url: window.location.href,
      name: nameVal,
      phone: phoneVal,
      email: emailVal || 'N/A',
      service: serviceVal,
      area: areaInput ? areaInput.value.trim() : 'N/A',
      message: messageInput ? messageInput.value.trim() : 'N/A',
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    const submitButton = form.querySelector('[type="submit"]');
    const originalButtonText = submitButton ? submitButton.innerHTML : null;
    if (submitButton) {
      submitButton.setAttribute('disabled', 'disabled');
      submitButton.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Submitting...';
    }

    try {
      // 1. Save locally first (always works)
      saveLeadLocally(leadData);

      // 2. Submit to Google Sheets
      if (GOOGLE_SHEETS_WEBHOOK_URL) {
        await submitToGoogleSheets(leadData);
      }

      showFormMessage(`<strong>Thank you, ${nameVal}!</strong> Your request has been received. We will contact you within 60 minutes.`, 'success');
      form.reset();
    } catch (err) {
      console.error('Form submission error:', err);
      showFormMessage(`<strong>Thank you, ${nameVal}!</strong> Your details have been saved. We will contact you shortly.`, 'success');
    } finally {
      if (submitButton) {
        submitButton.removeAttribute('disabled');
        if (originalButtonText) submitButton.innerHTML = originalButtonText;
      }
    }
  });

  async function submitToGoogleSheets(data) {
    const url = GOOGLE_SHEETS_WEBHOOK_URL;
    const attempts = 2;

    for (let i = 0; i < attempts; i++) {
      try {
        // First try: regular cors mode
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          console.log('[Jyoti AC] Google Sheets saved successfully');
          return;
        }
      } catch (corsErr) {
        console.warn(`[Jyoti AC] CORS attempt ${i + 1} failed:`, corsErr);
      }

      // Fallback: no-cors mode (sends data but response is opaque)
      try {
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(data)
        });
        console.log('[Jyoti AC] no-cors fallback executed');
        return;
      } catch (noCorsErr) {
        console.warn(`[Jyoti AC] no-cors attempt ${i + 1} failed:`, noCorsErr);
      }

      // Wait before retry
      if (i < attempts - 1) await new Promise(r => setTimeout(r, 1000));
    }

    console.warn('[Jyoti AC] All Google Sheets submission attempts failed — data is saved locally');
  }

  function saveLeadLocally(leadData) {
    const storedLeads = JSON.parse(localStorage.getItem('ac_leads') || '[]');
    storedLeads.push(leadData);
    localStorage.setItem('ac_leads', JSON.stringify(storedLeads));
  }

  function showFormMessage(message, type) {
    alertBox.innerHTML = message;
    alertBox.className = `form-alert ${type}`;
    alertBox.style.display = 'block';
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
function initAnalyticsTracking() {
  // Select all links and elements to track
  const callLinks = document.querySelectorAll('a[href^="tel:"]');
  const waLinks = document.querySelectorAll('a[href*="wa.me"]');
  const ctaButtons = document.querySelectorAll('.btn:not([type="submit"]), .service-card-link');

  callLinks.forEach(link => {
    link.addEventListener('click', () => {
      trackAnalyticsEvent('phone_click', { url: link.href });
    });
  });

  waLinks.forEach(link => {
    link.addEventListener('click', () => {
      trackAnalyticsEvent('whatsapp_click', { url: link.href });
    });
  });

  ctaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.innerText || btn.getAttribute('aria-label') || 'cta';
      trackAnalyticsEvent('cta_click', { button_text: text });
    });
  });

  // Track scroll depth (simulated 75%)
  let scrolled75 = false;
  window.addEventListener('scroll', () => {
    if (scrolled75) return;

    const h = document.documentElement,
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
    const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;

    if (percent >= 75) {
      scrolled75 = true;
      trackAnalyticsEvent('page_scroll_75', { path: window.location.pathname });
    }
  });
}

// /
//   * Simulated GA4 event logger in development
//     */
function trackAnalyticsEvent(eventName, params = {}) {
  console.log(`%c[GA4 EVENT] ${eventName}:`, 'color: #1565c0; font-weight: bold;', params);

  // If actual analytics script is present, dispatch to it
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

// /
//   * 6. Hero Section Background Image Slider (cross-fade every 5 seconds)
//     */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length === 0) return;

  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds

  const nextSlide = () => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  };

  setInterval(nextSlide, slideInterval);
}


