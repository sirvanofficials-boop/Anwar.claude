/* ══════════════════════════════════════════════
   CutVolt Pro — Landing Page Interactions
   ══════════════════════════════════════════════ */

// ── Navbar: add 'scrolled' class after scrolling ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Hamburger mobile menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── FAQ accordion ──
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-answer').classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Open clicked (if it was closed)
    if (!isOpen) {
      item.classList.add('open');
      answer.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ── Countdown timer ──
function startCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;

  const KEY = 'cutvolt_countdown_end';
  let endTime = localStorage.getItem(KEY);

  if (!endTime || Date.now() > Number(endTime)) {
    // 24 hours from now
    endTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(KEY, endTime);
  }

  function tick() {
    const remaining = Math.max(0, Number(endTime) - Date.now());
    const h = Math.floor(remaining / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    const s = Math.floor((remaining % 60000) / 1000);
    el.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    if (remaining > 0) setTimeout(tick, 1000);
  }

  tick();
}

startCountdown();

// ── Scroll-reveal animations ──
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.feature-card, .material-card, .review-card, .step-card, ' +
    '.guarantee-card, .ps-card, .spec-row, .faq-item, .pricing-card'
  );

  targets.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

// Stagger children inside grids
function staggerGridChildren() {
  const grids = document.querySelectorAll(
    '.features-grid, .materials-grid, .reviews-grid, .guarantee-grid, .steps-grid'
  );
  grids.forEach(grid => {
    grid.querySelectorAll('.fade-up').forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.07}s`;
    });
  });
}

if ('IntersectionObserver' in window) {
  initScrollAnimations();
  staggerGridChildren();
}

// ── Smooth anchor scrolling with offset for fixed navbar ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 12;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── CTA buttons: simple cart click feedback (replace with real cart later) ──
document.querySelectorAll('.btn-primary[href="#"], .btn-gold[href="#"]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const original = btn.textContent;
    btn.textContent = '✓ Added to Cart!';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    btn.style.boxShadow = '0 4px 20px rgba(34,197,94,0.4)';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.boxShadow = '';
    }, 2200);
  });
});
