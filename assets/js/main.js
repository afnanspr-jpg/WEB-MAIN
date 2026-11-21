/* Padukuhan Puton: interaksi ringan, tanpa dependensi. */
(() => {
  'use strict';
  const WA = ''; // GANTI: nomor WhatsApp dukuh, format 62812xxxxxxx (kosong = pilih kontak sendiri)
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const now = new Date(), hr = now.getHours();

  /* Sapaan, tanggal, tahun */
  $('#hi').textContent = hr < 11 ? 'Sugeng enjang' : hr < 15 ? 'Sugeng siang' : hr < 18 ? 'Sugeng sonten' : 'Sugeng dalu';
  $('#dt').textContent = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(now);
  $('#year').textContent = now.getFullYear();

  /* Menu seluler */
  const nav = $('#nav'), mb = $('.menu');
  const setMenu = (o) => { nav.classList.toggle('open', o); mb.setAttribute('aria-expanded', o); mb.textContent = o ? 'Tutup' : 'Menu'; };
  mb.onclick = () => setMenu(!nav.classList.contains('open'));
  nav.onclick = (e) => e.target.closest('a') && setMenu(false);
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); mb.focus(); } });

  /* Garis progres gulir */
  const prog = $('.prog'), de = document.documentElement;
  addEventListener('scroll', () => { prog.style.width = (scrollY / Math.max(de.scrollHeight - innerHeight, 1)) * 100 + '%'; }, { passive: true });

  /* Hero: pergantian foto */
  const slides = $$('.slides img'), dots = $('.dots'), credit = $('.credit');
  let cur = 0, timer;
  const show = (i) => {
    cur = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('on', k === cur));
    $$('button', dots).forEach((d, k) => d.classList.toggle('on', k === cur));
    credit.textContent = slides[cur].dataset.c;
  };
  const play = () => { clearInterval(timer); if (!calm) timer = setInterval(() => show(cur + 1), 6500); };
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.setAttribute('aria-label', 'Foto ' + (i + 1));
    b.onclick = () => { show(i); play(); };
    dots.append(b);
  });
  show(0); play();

  /* Muncul saat digulir: bagian, batang grafik, angka */
  const count = (el) => {
    const end = +el.dataset.count, fmt = (n) => n.toLocaleString('id-ID');
    if (calm) { el.textContent = fmt(end); return; }
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / 1400, 1);
      el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    if (e.target.dataset.count) count(e.target);
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -8% 0px' });
  $$('.rv, .bar-fill, [data-count]').forEach((el) => io.observe(el));

  /* Menu aktif sesuai bagian */
  const links = $$('.top nav a[href^="#"]');
  const spy = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) links.forEach((a) => a.classList.toggle('on', a.hash === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((a) => { const s = $(a.hash); if (s) spy.observe(s); });

  /* Tab */
  $$('[data-tabs]').forEach((box) => {
    const tabs = $$('[role=tab]', box);
    const pick = (t) => tabs.forEach((x) => {
      const on = x === t;
      x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
      $('#' + x.getAttribute('aria-controls')).hidden = !on;
    });
    tabs.forEach((t, i) => {
      t.onclick = () => pick(t);
      t.onkeydown = (e) => {
        const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (d) { const n = tabs[(i + d + tabs.length) % tabs.length]; pick(n); n.focus(); }
      };
    });
    pick(tabs[0]);
  });

  /* Grafik umur: jumlah atau persen */
  $$('[data-mode]').forEach((b) => b.onclick = () => {
    $$('[data-mode]').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
    $$('.age').forEach((r) => { $('b', r).textContent = r.dataset[b.dataset.mode]; });
  });

  /* Agenda: status otomatis dan filter */
  const today = new Date().setHours(0, 0, 0, 0);
  $$('.ag').forEach((a) => {
    const up = new Date($('time', a).dateTime) >= today;
    a.dataset.s = up ? 'soon' : 'done';
    $('.bd', a).textContent = up ? 'Akan datang' : 'Selesai';
  });
  $$('[data-f]').forEach((b) => b.onclick = () => {
    $$('[data-f]').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
    $$('.ag').forEach((a) => { a.hidden = b.dataset.f !== 'all' && a.dataset.s !== b.dataset.f; });
  });

  /* Galeri */
  const lb = $('#lb');
  $$('.g').forEach((g) => g.onclick = () => {
    const i = $('img', g), big = $('img', lb);
    big.src = i.src; big.alt = i.alt;
    $('p', lb).textContent = i.dataset.c;
    if (lb.showModal) lb.showModal(); else open(i.src, '_blank', 'noopener');
  });
  lb.onclick = (e) => { if (e.target === lb) lb.close(); };

  /* Formulir: kirim lewat WhatsApp */
  $('#wa').onsubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const msg = `Halo Pak Dukuh, saya ${f.get('n')}. Keperluan: ${f.get('k')}.\n${f.get('m')}`;
    open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  };
})();
