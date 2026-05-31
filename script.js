// /
//  * Jyoti AC Repair & Service - Main Site Interactions
//  * Author: Antigravity Codebase Assistant
//  * Last Updated: 2026-05-28
//  */

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
    const serviceInput = document.getElementById('form-service');
    const areaInput = document.getElementById('form-area');
    const messageInput = document.getElementById('form-message');

    const nameVal = nameInput ? nameInput.value.trim() : '';
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    const serviceVal = serviceInput ? serviceInput.value : '';

    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!nameRegex.test(nameVal)) {
      showFormMessage('Please enter a valid name (letters & spaces only, 2-50 characters).', 'error');
      if (nameInput) nameInput.focus();
      return;
    }

    if (!phoneRegex.test(phoneVal)) {
      showFormMessage('Please enter a valid 10-digit mobile number (numbers only).', 'error');
      if (phoneInput) phoneInput.focus();
      return;
    }

    if (!serviceVal || serviceVal === 'Select Service...') {
      showFormMessage('Please select the service you are looking for.', 'error');
      if (serviceInput) serviceInput.focus();
      return;
    }

    const leadData = {
      name: nameVal,
      phone: phoneVal,
      service: serviceVal,
      area: areaInput ? areaInput.value.trim() : '',
      message: messageInput ? messageInput.value.trim() : ''
    };

    const submitButton = form.querySelector('[type="submit"]');
    const originalButtonText = submitButton ? submitButton.innerHTML : null;
    if (submitButton) {
      submitButton.setAttribute('disabled', 'disabled');
      submitButton.innerHTML = 'Processing...';
    }

    try {
      saveLeadLocally(leadData);
      showFormMessage(`<strong>Thank you, ${nameVal}!</strong> Your request has been received. We will contact you shortly.`, 'success');
      form.reset();
    } catch (err) {
      console.error('Form submission error:', err);
      showFormMessage('There was an error processing your request. Please try again.', 'error');
    } finally {
      if (submitButton) {
        submitButton.removeAttribute('disabled');
        if (originalButtonText) submitButton.innerHTML = originalButtonText;
      }
    }
  });

  function saveLeadLocally(leadData) {
    const storedLeads = JSON.parse(localStorage.getItem('ac_leads') || '[]');
    storedLeads.push({
      ...leadData,
      submittedAt: new Date().toISOString()
    });
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


