/* Padukuhan Puton: menu seluler dan animasi batang grafik. Tanpa dependensi. */
(() => {
  'use strict';
  const nav = document.getElementById('nav');
  const btn = document.querySelector('.menu');
  const set = (open) => {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? 'Tutup' : 'Menu';
  };
  btn.addEventListener('click', () => set(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { set(false); btn.focus(); }
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const bars = document.querySelectorAll('.bar-fill');
  if (!('IntersectionObserver' in window)) { bars.forEach((b) => b.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: 0.4 });
  bars.forEach((b) => io.observe(b));
})();
