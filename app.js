/**
 * LAMBERT DERMATOLOGY // Clean & Lightweight Script
 * Simple, elegant interactions matching Hostinger Lambert template
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initContactForm();
});

/* ==========================================================================
   1. NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const nav = document.getElementById('siteNav');
  const toggleBtn = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const links = document.querySelectorAll('.nav-links a, .mobile-menu a');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when link clicked
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.remove('active');
    });
  });
}

/* ==========================================================================
   2. APPOINTMENT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successBanner = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const service = document.getElementById('userService').value;
    const date = document.getElementById('userDate').value;
    const message = document.getElementById('userMessage').value.trim();

    // Show clean success confirmation
    if (successBanner) {
      successBanner.style.display = 'block';
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Optional fast-track to WhatsApp
    const clinicPhone = '919876543210';
    const textMsg = `Hi Lambert Dermatology! I would like to request an appointment:\n\n• Name: ${name}\n• Phone: ${phone}\n${email ? `• Email: ${email}\n` : ''}• Service: ${service}\n• Preferred Date: ${date || 'Earliest available'}\n${message ? `• Notes: ${message}` : ''}`;
    
    // Open WhatsApp in new tab after 800ms
    setTimeout(() => {
      window.open(`https://wa.me/${clinicPhone}?text=${encodeURIComponent(textMsg)}`, '_blank');
    }, 600);

    form.reset();
  });
}
