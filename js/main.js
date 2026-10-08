/* =====================================================
   Navexa Pharmaceutical (SMC) Pvt Ltd — Main JavaScript
   ===================================================== */

// ── BRAND LOADER (PREMIUM CORPORATE ANIMATION)
const brandLoader = document.getElementById('brand-loader');
if (brandLoader) {
  try { sessionStorage.removeItem('navexa_brand_intro'); } catch(e) {}
  let dismissed = false;
  const dismissLoader = () => {
    if (dismissed) return;
    dismissed = true;
    setTimeout(() => {
      brandLoader.classList.add('brand-loader--hidden');
      setTimeout(() => {
        brandLoader.remove();
      }, 450);
    }, 1500);
  };

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    dismissLoader();
  } else {
    window.addEventListener('DOMContentLoaded', dismissLoader);
  }
}

// ── NAV SCROLL EFFECT
const nav = document.getElementById('main-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── HAMBURGER MENU
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav__links--open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close when clicking any link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav__links--open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close if resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navLinks.classList.contains('nav__links--open')) {
      navLinks.classList.remove('nav__links--open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ── SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const id = this.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navLinks && navLinks.classList.contains('nav__links--open')) {
        navLinks.classList.remove('nav__links--open');
        hamburger && hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  });
});

// ── CONTACT FORM
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('contact-submit-btn');
    const original = btn ? btn.textContent : 'Send Inquiry';
    if (btn) {
      btn.textContent = 'Sending Inquiry...';
      btn.disabled = true;
    }
    setTimeout(() => {
      if (btn) {
        btn.textContent = 'Inquiry Submitted';
        btn.style.background = '#047857';
      }
      setTimeout(() => {
        if (btn) {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
        }
        contactForm.reset();
      }, 3000);
    }, 1000);
  });
}

// ── NAV ACTIVE LINK TRACKING
const trackedSections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav__link');
if (trackedSections.length && navAnchors.length) {
  window.addEventListener('scroll', () => {
    let current = '';
    trackedSections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAnchors.forEach(a => {
      if (a.getAttribute('href') === '#' + current) {
        navAnchors.forEach(el => el.classList.remove('nav__link--active'));
        a.classList.add('nav__link--active');
      }
    });
  }, { passive: true });
}
