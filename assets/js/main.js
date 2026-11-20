/* Padukuhan Puton — interaksi ringan, tanpa dependensi. */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const toTop = document.querySelector('.to-top');
  const menu = document.getElementById('mobile-menu');
  const toggle = document.querySelector('.menu-toggle');

  /* Header shadow + tombol kembali ke atas */
  const onScroll = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 8);
    toTop?.classList.toggle('is-visible', window.scrollY > 600);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* Menu seluler */
  let lastFocused = null;
  const menuIsOpen = () => Boolean(menu && !menu.hidden);

  const openMenu = () => {
    if (!menu || !toggle) return;
    lastFocused = document.activeElement;
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Tutup menu');
    document.body.classList.add('menu-open');
    const firstLink = menu.querySelector('a, button');
    requestAnimationFrame(() => firstLink?.focus());
  };

  const closeMenu = (restoreFocus = true) => {
    if (!menu || !toggle) return;
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Buka menu');
    document.body.classList.remove('menu-open');
    if (restoreFocus && lastFocused instanceof HTMLElement) lastFocused.focus();
  };

  toggle?.addEventListener('click', () => {
    menuIsOpen() ? closeMenu() : openMenu();
  });

  menu?.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (!menuIsOpen() || !menu) return;

    if (event.key === 'Escape') {
      closeMenu();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusables = [...menu.querySelectorAll('a[href], button:not([disabled])')];
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.matchMedia('(min-width: 981px)').addEventListener('change', (event) => {
    if (event.matches && menuIsOpen()) closeMenu(false);
  });

  /* Sorot menu sesuai bagian yang sedang dibaca */
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('main section[id]')];

  if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id === 'sambutan' ? 'beranda' : entry.target.id;

        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('is-active', active);
          if (active) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach((section) => spy.observe(section));
  }

  /* Munculkan elemen saat masuk layar */
  const reveals = [...document.querySelectorAll('.reveal')];

  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    reveals.forEach((element) => revealObserver.observe(element));
  }

  /* Grafik batang masuk saat bagian infografis terlihat */
  const infografis = document.getElementById('infografis');

  if (infografis) {
    if (!('IntersectionObserver' in window)) {
      infografis.classList.add('is-visible');
    } else {
      const chartObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          infografis.classList.add('is-visible');
          observer.disconnect();
        });
      }, { threshold: 0.15 });

      chartObserver.observe(infografis);
    }
  }

  /* Angka berjalan */
  const counters = [...document.querySelectorAll('[data-count]')];
  const numberFormat = new Intl.NumberFormat('id-ID');

  const animateCounter = (element) => {
    const target = Number.parseInt(element.dataset.count, 10);
    if (!Number.isFinite(target)) return;

    if (reduceMotion) {
      element.textContent = numberFormat.format(target);
      return;
    }

    const duration = 1500;
    const start = performance.now();

    const frame = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = numberFormat.format(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  };

  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
    } else {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.6 });

      counters.forEach((counter) => counterObserver.observe(counter));
    }
  }

  /* Tahun berjalan */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
