// ========== SPLASH SCREEN ==========
const splash = document.getElementById('splash');

function hideSplash() {
  splash.style.animation = 'splashFade 0.8s ease forwards';
  document.body.style.overflow = '';
}

// Start splash timer on load
window.addEventListener('load', () => {
  document.body.style.overflow = 'hidden';
  setTimeout(hideSplash, 3200);
});

// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && nav) {
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    const expanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', expanded);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ========== SMOOTH SCROLL ==========
function getHeaderHeight() {
  const headerEl = document.getElementById('header');
  return headerEl ? headerEl.offsetHeight : 0;
}

function scrollToTarget(target) {
  if (!target) return;
  const headerH = getHeaderHeight();
  const targetPos = target.getBoundingClientRect().top + window.scrollY - headerH;
  const start = window.scrollY;
  const dist = targetPos - start;
  const dur = 1000;
  let startTime = null;
  function ease(t) {
    return t < 0.5
      ? 16 * t * t * t * t * t
      : 1 - Math.pow(-2 * t + 2, 5) / 2;
  }
  function animate(curTime) {
    if (!startTime) startTime = curTime;
    const elapsed = curTime - startTime;
    const prog = Math.min(elapsed / dur, 1);
    window.scrollTo(0, Math.round(start + dist * ease(prog)));
    if (prog < 1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    scrollToTarget(target);
  });
});

// Handle initial hash on page load (after splash)
if (window.location.hash) {
  const hashTarget = document.querySelector(window.location.hash);
  if (hashTarget) {
    setTimeout(() => scrollToTarget(hashTarget), 3400);
  }
}

// ========== HEADER SCROLL EFFECT ==========
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ========== ACTIVE NAV LINK ==========
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// ========== COUNTER ANIMATION ==========
const statNumbers = document.querySelectorAll('.stat-num');
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;
  countersStarted = true;

  statNumbers.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = Math.ceil(target / 60);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + '+';
        return;
      }
      counter.textContent = current;
      requestAnimationFrame(updateCounter);
    };

    updateCounter();
  });
}

// ========== SCROLL REVEAL ==========
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      if (entry.target.classList.contains('about-stats') && !countersStarted) {
        startCounters();
      }
    }
  });
}, observerOptions);

const animateElements = document.querySelectorAll(
  '.service-card, .why-card, .about-grid, .contact-grid, .section-header, .cta-inner, .footer-inner'
);

animateElements.forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Also trigger counters when about section is visible
const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounters();
    }
  });
}, { threshold: 0.3 });
aboutObserver.observe(aboutSection);

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const formMessage = document.getElementById('formMessage');
    const originalText = btn ? btn.textContent : 'Send Message';

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending...';
      btn.setAttribute('aria-busy', 'true');
    }

    if (formMessage) {
      formMessage.hidden = false;
      formMessage.className = 'form-message';
      formMessage.textContent = '';
    }

    try {
      const action = contactForm.getAttribute('action');
      const formData = new FormData(contactForm);

      if (action && action.includes('formspree.io')) {
        // Submit to Formspree
        const resp = await fetch(action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (!resp.ok) throw new Error('Submission failed');
      } else if (action) {
        // Generic POST
        await fetch(action, { method: 'POST', body: formData });
      } else {
        // Fallback: mailto
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const phone = formData.get('phone') || '';
        const message = formData.get('message') || '';
        const mailto = `mailto:?subject=${encodeURIComponent('Quote request')}&body=${encodeURIComponent(name + '\n' + phone + '\n' + email + '\n\n' + message)}`;
        window.location.href = mailto;
      }

      if (formMessage) {
        formMessage.classList.add('success');
        formMessage.textContent = 'Thanks — your message was sent. We will get back to you within 1 business day.';
      }

      contactForm.reset();
    } catch (err) {
      if (formMessage) {
        formMessage.classList.add('error');
        formMessage.textContent = 'Sorry — something went wrong. Please try again or call us.';
      }
      console.error(err);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalText;
        btn.removeAttribute('aria-busy');
      }
    }
  });
}

// Dynamic current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
