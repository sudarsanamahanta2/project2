/* ═══════════════════════════════════════
   LENS & LIGHT — Photography Portfolio
   script.js
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────
     CUSTOM CURSOR
  ────────────────────────────────── */
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursor-dot');

  if (cursor && cursorDot) {
    let mouseX = 0, mouseY = 0;
    let curX   = 0, curY   = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top  = mouseY + 'px';
    });

    // Smooth lag for the ring cursor
    (function animateCursor() {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      cursor.style.left = curX + 'px';
      cursor.style.top  = curY + 'px';
      requestAnimationFrame(animateCursor);
    })();

    // Hover state
    const hoverEls = document.querySelectorAll('a, button, .gallery-item, .filter-btn');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }


  /* ──────────────────────────────────
     NAV — scroll shrink
  ────────────────────────────────── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  /* ──────────────────────────────────
     MOBILE MENU
  ────────────────────────────────── */
  const menuBtn    = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMenu(open) {
    mobileMenu.classList.toggle('open', open);
    menuBtn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  menuBtn?.addEventListener('click', () => {
    toggleMenu(!mobileMenu.classList.contains('open'));
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });


  /* ──────────────────────────────────
     SCROLL REVEAL
  ────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .gallery-item, .stat, .intro-label, .intro-heading, .intro-body, .intro-stats, .contact-label, .contact-heading, .contact-body, .contact-info').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Trigger hero reveals immediately (they are above the fold)
  document.querySelectorAll('.hero .reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100);
  });


  /* ──────────────────────────────────
     GALLERY FILTER
  ────────────────────────────────── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show / hide items with staggered animation
      galleryItems.forEach((item, i) => {
        const matches = filter === 'all' || item.classList.contains(filter);

        if (matches) {
          item.classList.remove('hidden');
          item.style.transitionDelay = (i * 0.06) + 's';
        } else {
          item.classList.add('hidden');
          item.style.transitionDelay = '0s';
        }
      });
    });
  });


  /* ──────────────────────────────────
     LIGHTBOX
  ────────────────────────────────── */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxCap   = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev  = document.getElementById('lightboxPrev');
  const lightboxNext  = document.getElementById('lightboxNext');

  // Collect all visible gallery images
  let currentIndex = 0;

  function getVisibleItems() {
    return [...galleryItems].filter(item => !item.classList.contains('hidden'));
  }

  function openLightbox(index, items) {
    const item = items[index];
    const img  = item.querySelector('.gallery-img');
    const cap  = item.querySelector('.caption-title');

    if (img && img.src && !img.style.display.includes('none')) {
      lightboxImg.src = img.src;
      lightboxImg.style.display = '';
    } else {
      lightboxImg.src = '';
      lightboxImg.style.display = 'none';
    }

    lightboxCap.textContent = cap ? cap.textContent : '';
    currentIndex = index;

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    const items = getVisibleItems();
    currentIndex = (currentIndex + dir + items.length) % items.length;
    openLightbox(currentIndex, items);
  }

  // Attach click to gallery items
  galleryItems.forEach((item, _) => {
    item.addEventListener('click', () => {
      const visible = getVisibleItems();
      const idx     = visible.indexOf(item);
      if (idx >= 0) openLightbox(idx, visible);
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', () => navigate(-1));
  lightboxNext?.addEventListener('click', () => navigate(1));

  // Close on backdrop click
  lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Touch swipe support
  let touchStartX = 0;
  lightbox?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox?.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
  });


  /* ──────────────────────────────────
     CONTACT FORM
  ────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  const formStatus  = document.getElementById('formStatus');
  const submitBtn   = document.getElementById('submitBtn');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className   = 'form-status ' + type;
  }

  function markError(field) {
    field.classList.add('error');
    field.addEventListener('input', () => field.classList.remove('error'), { once: true });
  }

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameField    = document.getElementById('name');
    const emailField   = document.getElementById('email');
    const messageField = document.getElementById('message');

    const name    = nameField.value.trim();
    const email   = emailField.value.trim();
    const message = messageField.value.trim();

    let valid = true;

    if (!name)               { markError(nameField);    valid = false; }
    if (!validateEmail(email)){ markError(emailField);  valid = false; }
    if (!message)            { markError(messageField); valid = false; }

    if (!valid) {
      setStatus('Please fill in all fields correctly.', 'error');
      return;
    }

    // Simulate sending
    submitBtn.disabled = true;
    const btnText = submitBtn.querySelector('.btn-text');
    btnText.textContent = 'Sending…';
    setStatus('', '');

    await new Promise(r => setTimeout(r, 1400)); // simulate async

    setStatus('Message sent! I\'ll be in touch soon.', 'success');
    btnText.textContent = 'Send Message';
    submitBtn.disabled = false;
    contactForm.reset();

    // Clear status after 6s
    setTimeout(() => setStatus('', ''), 6000);
  });


  /* ──────────────────────────────────
     SMOOTH ANCHOR LINKS
  ────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
