/**
 * LAMBERT CLINICAL DERMATOLOGY // Core Application & Interactive Engine
 * Refined Medical Interactions, Smart Quiz, Before/After Slider, Modal Booking & .ICS Generator
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStatsCounter();
  initSkinQuiz();
  initTreatmentTabs();
  initBeforeAfterSlider();
  initFaqAccordion();
  initBookingModal();
});

/* ==========================================================================
   1. NAVBAR & SCROLL BEHAVIOR
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('siteHeader');
  const hamburger = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const drawerClose = document.getElementById('drawerClose');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Drawer handlers
  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Escape key closes drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
}

/* ==========================================================================
   2. STATS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const counters = document.querySelectorAll('[data-counter]');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-counter'));
          const suffix = counter.getAttribute('data-suffix') || '';
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          const intervalTime = duration / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = (isDecimal ? target.toFixed(1) : Math.round(target).toLocaleString()) + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = (isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString()) + suffix;
            }
          }, intervalTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const targetSection = document.querySelector('.hero-trust-bar');
  if (targetSection) observer.observe(targetSection);
}

/* ==========================================================================
   3. SMART SKIN CONCERN QUIZ
   ========================================================================== */
const QUIZ_DATA = {
  acne: {
    badge: 'Clinical Acne Protocol',
    title: 'Triple-Action Medical Acne Elimination',
    desc: 'Combines medical-grade salicylic peel, targeted FDA-cleared laser anti-inflammatory wavelength, and high-frequency pore purification. Targets Propionibacterium acnes at the root without gut antibiotics.',
    sessions: '3 to 4 Sessions',
    downtime: 'Zero (Immediate Glow)',
    suitability: 'Fitzpatrick I - VI Safe',
    serviceKey: 'Triple-Action Acne Elimination'
  },
  melasma: {
    badge: 'Pigmentation Mastery',
    title: 'PicoWay® Photo-Acoustic Melasma Reversal',
    desc: 'Non-thermal picosecond laser pulses shatter dermal melanin deposits into microscopic dust that the lymphatic system clears naturally. Eliminates rebound hyperpigmentation risks on darker skin tones.',
    sessions: '4 to 6 Sessions',
    downtime: '2 - 4 Hours Flushing',
    suitability: 'Optimized for Indian/Olive Skin',
    serviceKey: 'PicoWay Melasma Laser'
  },
  aging: {
    badge: 'Regenerative Anti-Aging',
    title: 'Micro-Focused Ultrasound & Polynucleotide Infusion',
    desc: 'Lifts the deep SMAS layer and stimulates natural Type-I collagen production. Combined with salmon-derived polynucleotides (PDRN) for profound cellular skin barrier density restoration.',
    sessions: '1 - 2 Annual Sessions',
    downtime: 'Zero Downtime',
    suitability: 'Ages 28 - 75+',
    serviceKey: 'Ultrasound Lift & Polynucleotide'
  },
  scars: {
    badge: 'Structural Scar Revision',
    title: 'Subcision + Fractional CO2 & Exosome Matrix',
    desc: 'Tethered scar bands beneath the skin are released mechanically, followed by micro-ablative fractional columns and high-potency exosome regenerative growth factors to rebuild a smooth dermis.',
    sessions: '3 Sessions (6 wks apart)',
    downtime: '3 - 4 Days Micro-Crusting',
    suitability: 'Deep Icepick & Boxcar Scars',
    serviceKey: 'Structural Scar Revision'
  },
  hair: {
    badge: 'Trichology & Scalp Health',
    title: 'Autologous GFC (Growth Factor Concentrate)',
    desc: 'Next-generation bio-cellular therapy. Highly concentrated growth factors extracted from your own blood platelets stimulate miniaturized hair follicles, arrest shedding, and thicken terminal hair.',
    sessions: '4 Monthly Sessions',
    downtime: 'Zero Downtime',
    suitability: 'Male & Female Pattern Thinning',
    serviceKey: 'GFC Scalp Therapy'
  }
};

function initSkinQuiz() {
  const buttons = document.querySelectorAll('.concern-btn');
  const badge = document.getElementById('quizBadge');
  const title = document.getElementById('quizTitle');
  const desc = document.getElementById('quizDesc');
  const sessions = document.getElementById('quizSessions');
  const downtime = document.getElementById('quizDowntime');
  const suitability = document.getElementById('quizSuitability');
  const ctaBtn = document.getElementById('quizBookBtn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const concernKey = btn.getAttribute('data-concern');
      const data = QUIZ_DATA[concernKey];

      if (data) {
        badge.textContent = data.badge;
        title.textContent = data.title;
        desc.textContent = data.desc;
        sessions.textContent = data.sessions;
        downtime.textContent = data.downtime;
        suitability.textContent = data.suitability;
        ctaBtn.setAttribute('data-service', data.serviceKey);
      }
    });
  });
}

/* ==========================================================================
   4. TREATMENT TABS FILTER
   ========================================================================== */
function initTreatmentTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.treatment-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. BEFORE & AFTER INTERACTIVE COMPARISON SLIDER
   ========================================================================== */
const CASE_DATA = {
  acne: {
    beforeImg: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80',
    caption: 'Case 1: Inflammatory Cystic Acne & Post-Acne Erythema — 14 Weeks on Clinical Laser + Topical Protocol'
  },
  pigment: {
    beforeImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    caption: 'Case 2: Dermal Melasma & Sun-Induced Hyperpigmentation — 4 Sessions of PicoWay® Laser'
  },
  glow: {
    beforeImg: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    caption: 'Case 3: Skin Texture, Pores & Fine Expression Lines — HydraFacial MD Elite & Skin Boosters'
  }
};

function initBeforeAfterSlider() {
  const container = document.getElementById('baSliderContainer');
  const beforeLayer = document.getElementById('baBeforeLayer');
  const handle = document.getElementById('baHandle');
  const captionEl = document.getElementById('baCaption');
  const caseBtns = document.querySelectorAll('.case-tab-btn');
  const beforeImg = document.getElementById('baBeforeImg');
  const afterImg = document.getElementById('baAfterImg');

  if (!container || !beforeLayer || !handle) return;

  let isDragging = false;

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percentage = (x / rect.width) * 100;
    beforeLayer.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Mouse Events
  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  // Touch Events (Mobile)
  handle.addEventListener('touchstart', (e) => {
    isDragging = true;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  // Container Click Support
  container.addEventListener('click', (e) => {
    updateSliderPosition(e.clientX);
  });

  // Case Tab Switcher
  caseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      caseBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const caseKey = btn.getAttribute('data-case');
      const data = CASE_DATA[caseKey];

      if (data) {
        beforeImg.src = data.beforeImg;
        afterImg.src = data.afterImg;
        captionEl.textContent = data.caption;
        // reset to 50%
        beforeLayer.style.width = '50%';
        handle.style.left = '50%';
      }
    });
  });
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   7. BOOKING MODAL, WHATSAPP DISPATCH & .ICS GENERATOR
   ========================================================================== */
function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const triggers = document.querySelectorAll('.trigger-booking-modal');
  const form = document.getElementById('bookingForm');
  const formContent = document.getElementById('formContent');
  const confirmBox = document.getElementById('bookingConfirmBox');
  const serviceSelect = document.getElementById('bookService');
  const whatsappActionBtn = document.getElementById('confirmWhatsAppBtn');
  const icsActionBtn = document.getElementById('downloadCalendarBtn');

  // Open Modal
  function openModal(defaultService = '') {
    if (defaultService && serviceSelect) {
      // Find matching option
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].text.toLowerCase().includes(defaultService.toLowerCase()) ||
            serviceSelect.options[i].value.toLowerCase().includes(defaultService.toLowerCase())) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }
    formContent.style.display = 'block';
    confirmBox.style.display = 'none';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // Close Modal
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefill = btn.getAttribute('data-service') || '';
      openModal(prefill);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // Handle Form Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('bookName').value.trim();
      const phone = document.getElementById('bookPhone').value.trim();
      const service = serviceSelect.value;
      const date = document.getElementById('bookDate').value;
      const time = document.getElementById('bookTime').value;
      const notes = document.getElementById('bookNotes').value.trim();

      // Set confirmation summary
      document.getElementById('confirmName').textContent = name;
      document.getElementById('confirmService').textContent = service;
      document.getElementById('confirmDateTime').textContent = `${date || 'Next Available Slot'} at ${time || 'Morning'}`;

      // Build WhatsApp message link
      const clinicPhone = '919876543210';
      const rawMsg = `Hi Dr. Lambert Clinic!\nI would like to book a Dermatological Consultation:\n\n• Name: ${name}\n• Phone: ${phone}\n• Service: ${service}\n• Preferred Date: ${date || 'Earliest slot'}\n• Slot: ${time}\n${notes ? `• Skin Concerns: ${notes}` : ''}\n\nPlease confirm availability. Thank you!`;
      const waUrl = `https://wa.me/${clinicPhone}?text=${encodeURIComponent(rawMsg)}`;
      whatsappActionBtn.href = waUrl;

      // Setup .ICS Calendar Download
      setupCalendarDownload(icsActionBtn, name, service, date, time);

      // Show confirmation state
      formContent.style.display = 'none';
      confirmBox.style.display = 'block';
    });
  }
}

/**
 * Generate and trigger download of an .ics calendar file
 */
function setupCalendarDownload(button, name, service, dateStr, timeStr) {
  button.onclick = (e) => {
    e.preventDefault();

    let appointmentDate = new Date();
    if (dateStr) {
      appointmentDate = new Date(dateStr);
    } else {
      appointmentDate.setDate(appointmentDate.getDate() + 1);
    }

    const startYear = appointmentDate.getFullYear();
    const startMonth = String(appointmentDate.getMonth() + 1).padStart(2, '0');
    const startDay = String(appointmentDate.getDate()).padStart(2, '0');

    let startHour = '10';
    if (timeStr && timeStr.includes('Afternoon')) startHour = '14';
    if (timeStr && timeStr.includes('Evening')) startHour = '17';

    const startTime = `${startYear}${startMonth}${startDay}T${startHour}0000`;
    const endTime = `${startYear}${startMonth}${startDay}T${parseInt(startHour, 10) + 1}0000`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Lambert Clinical Dermatology//Appointment Scheduling//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:lambert-${Date.now()}@lambertdermatology.com`,
      `DTSTAMP:${startTime}Z`,
      `DTSTART:${startTime}`,
      `DTEND:${endTime}`,
      `SUMMARY:Dr. Lambert Dermatology Consultation - ${service}`,
      `DESCRIPTION:Patient Consultation for ${name} (${service}). Clinic Helpline: +91 98765 43210`,
      'LOCATION:Lambert Dermatology Clinic, Suite 402, Elite Medical Towers, Indiranagar, Bengaluru',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Lambert-Dermatology-Appointment.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
}
