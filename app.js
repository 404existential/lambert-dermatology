/**
 * LAMBERT DERMATOLOGY // Clean & Lightweight Script
 * Simple, elegant interactions matching Hostinger Lambert template
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initServiceSelect();
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
   2. SERVICE CARD BUTTON SELECTION
   ========================================================================== */
function initServiceSelect() {
  const serviceButtons = document.querySelectorAll('.select-service-trigger');
  const serviceDropdown = document.getElementById('userService');
  const contactSection = document.getElementById('contact');

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetService = btn.getAttribute('data-service');
      if (serviceDropdown && targetService) {
        for (let i = 0; i < serviceDropdown.options.length; i++) {
          if (serviceDropdown.options[i].value === targetService || 
              serviceDropdown.options[i].text.toLowerCase().includes(targetService.toLowerCase())) {
            serviceDropdown.selectedIndex = i;
            break;
          }
        }
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('userName');
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 600);
        }
      }
    });
  });
}

/* ==========================================================================
   3. APPOINTMENT FORM SUBMISSION
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
