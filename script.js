/**
 * Jyoti AC Repair & Service - Main Site Interactions
 * Author: Antigravity Codebase Assistant
 * Last Updated: 2026-05-28
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initFaqAccordions();
  initContactForm();
  initAnalyticsTracking();
});

/**
 * 1. Sticky Header Animation
 * Shrinks header height and adds background-blur on scroll
 */
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

/**
 * 2. Mobile Menu Toggle & Navigation Overlay
 */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
  const body = document.body;

  if (!hamburger || !navMenu) return;

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Toggle body scroll lock to prevent scroll behind overlay
    if (navMenu.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close mobile menu when a direct link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Mobile Dropdown toggling
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (dropdownToggle && dropdownMenu && window.innerWidth <= 768) {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dropdownMenu.style.maxHeight && dropdownMenu.style.maxHeight !== '0px';

      if (isOpen) {
        dropdownMenu.style.maxHeight = '0px';
      } else {
        dropdownMenu.style.maxHeight = '500px';
      }
    });
  }
}

/**
 * 3. FAQ Accordion Toggle Actions
 */
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

/**
 * 4. Client-side Form Validation and Premium Success Animation
 */
function initContactForm() {
  const form = document.getElementById('inquiry-form');
  const alertBox = document.getElementById('form-alert');

  if (!form || !alertBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset status
    alertBox.style.display = 'none';
    alertBox.className = 'form-alert';

    // Get fields
    const nameInput = document.getElementById('form-name');
    const phoneInput = document.getElementById('form-phone');
    const serviceInput = document.getElementById('form-service');
    const areaInput = document.getElementById('form-area');
    const messageInput = document.getElementById('form-message');

    // Validation
    const nameVal = nameInput ? nameInput.value.trim() : '';
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    const serviceVal = serviceInput ? serviceInput.value : '';

    // Regex check
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const phoneRegex = /^[0-9]{10}$/; // standard Indian mobile format (10 digits)

    if (!nameRegex.test(nameVal)) {
      showFormMessage('Please enter a valid name (letters & spaces only, 2-50 characters).', 'error');
      nameInput.focus();
      return;
    }

    if (!phoneRegex.test(phoneVal)) {
      showFormMessage('Please enter a valid 10-digit mobile number (numbers only).', 'error');
      phoneInput.focus();
      return;
    }

    if (!serviceVal || serviceVal === 'Select Service...') {
      showFormMessage('Please select the service you are looking for.', 'error');
      serviceInput.focus();
      return;
    }

    // Capture submission data (simulated lead submit)
    const leadData = {
      name: nameVal,
      phone: phoneVal,
      service: serviceVal,
      area: areaInput ? areaInput.value.trim() : '',
      message: messageInput ? messageInput.value.trim() : '',
      timestamp: new Date().toISOString()
    };

    console.log('%c Lead Captured Successfully!', 'color: #25d366; font-weight: bold;', leadData);

    // Trigger simulated Google Analytics Event
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        'service_category': leadVal,
        'lead_source': 'website_form'
      });
    }

    // Custom trigger event for tracking
    trackAnalyticsEvent('form_submit', { service: serviceVal });

    // Show premium dynamic success message
    showFormMessage(`<strong>Thank you, ${nameVal}!</strong> Your request for ${serviceVal} has been received. Our technician will call you back within 60 minutes. For urgent issues, dial <strong>+91 076989 18030</strong>.`, 'success');

    // Reset Form
    form.reset();
  });

  function showFormMessage(message, type) {
    alertBox.innerHTML = message;
    alertBox.className = `form-alert ${type}`;
    alertBox.style.display = 'block';

    // Smooth scroll to alert
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * 5. Google Analytics 4 Simulation & Tracker
 */
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

/**
 * Simulated GA4 event logger in development
 */
function trackAnalyticsEvent(eventName, params = {}) {
  console.log(`%c[GA4 EVENT] ${eventName}:`, 'color: #1565c0; font-weight: bold;', params);

  // If actual analytics script is present, dispatch to it
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}
