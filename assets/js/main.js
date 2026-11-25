/* Padukuhan Puton: GSAP + ScrollTrigger + Lenis. Gerak memakai transform dan clip-path saja: tanpa gradien, tanpa transparansi. */
(() => {
  'use strict';
  const WA = ''; // GANTI: nomor WhatsApp dukuh, format 62812xxxxxxx (kosong = pilih kontak sendiri)
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const G = !!(window.gsap && window.ScrollTrigger);
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const M = G && !calm; // gerak penuh: GSAP termuat dan pengguna tidak meminta gerak dikurangi
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const out4 = (t) => 1 - Math.pow(1 - t, 4);
  if (G) gsap.registerPlugin(ScrollTrigger); else document.documentElement.classList.remove('js');

  /* Lenis: gulir halus, disambung ke ticker GSAP */
  const L = M && window.Lenis ? new Lenis({ lerp: 0.09 }) : null;
  if (L) {
    L.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => L.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* Sapaan, tanggal, tahun */
  const now = new Date(), hr = now.getHours();
  $('#hi').textContent = hr < 11 ? 'Sugeng enjang' : hr < 15 ? 'Sugeng siang' : hr < 18 ? 'Sugeng sonten' : 'Sugeng dalu';
  $('#dt').textContent = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(now);
  $('#year').textContent = now.getFullYear();

  /* Menu seluler */
  const nav = $('#nav'), mb = $('.menu'), hd = $('.top'), fab = $('.fab');
  const setMenu = (o) => {
    nav.classList.toggle('open', o);
    mb.setAttribute('aria-expanded', o);
    mb.setAttribute('aria-label', o ? 'Tutup menu' : 'Buka menu');
    if (M && o) gsap.from('#nav a', { x: -40, duration: 0.5, stagger: 0.05, ease: 'power3.out', clearProps: 'transform' });
  };
  mb.onclick = () => setMenu(!nav.classList.contains('open'));
  nav.onclick = (e) => e.target.closest('a') && setMenu(false);
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); mb.focus(); } });

  /* Tautan jangkar: gulir halus lewat Lenis */
  $$('a[href^="#"]:not(.skip)').forEach((a) => a.addEventListener('click', (e) => {
    const t = a.hash.length > 1 && $(a.hash);
    if (!t) return;
    e.preventDefault();
    history.pushState(null, '', a.hash);
    if (L) L.scrollTo(t, { offset: -56, duration: 1.4, easing: out4 });
    else t.scrollIntoView({ behavior: calm ? 'auto' : 'smooth' });
  }));
  fab.onclick = () => (L ? L.scrollTo(0, { duration: 1.6, easing: out4 }) : scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' }));

  /* Pecah kata untuk judul bertirai */
  const split = (el) => {
    const t = el.textContent.trim();
    el.setAttribute('aria-label', t);
    el.innerHTML = t.split(/\s+/).map((w) => `<span class="w" aria-hidden="true"><span>${w}</span></span>`).join(' ');
    return $$('.w > span', el);
  };

  /* Hero: pergantian foto dengan tirai clip-path */
  const hero = $('.hero'), slides = $$('.slides img'), dots = $('.dots'), credit = $('.credit');
  let cur = 0, timer;
  const mark = () => { $$('button', dots).forEach((d, k) => d.classList.toggle('on', k === cur)); credit.textContent = slides[cur].dataset.c; };
  const show = (i) => {
    i = (i + slides.length) % slides.length;
    if (i === cur) return;
    const n = slides[i], p = slides[cur];
    cur = i; mark();
    if (!M) { slides.forEach((s, k) => { s.style.visibility = k === i ? 'visible' : 'hidden'; }); return; }
    gsap.killTweensOf(slides);
    gsap.set(slides, { zIndex: 0 });
    gsap.set(p, { zIndex: 1 });
    gsap.set(n, { zIndex: 2, visibility: 'visible', clipPath: 'inset(0% 0% 0% 100%)', scale: 1.25 });
    gsap.to(n, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut', onComplete: () => slides.forEach((s) => { if (s !== n) s.style.visibility = 'hidden'; }) });
    gsap.to(n, { scale: 1, duration: 2.4, ease: 'power3.out' });
  };
  const play = () => { clearInterval(timer); if (!calm) timer = setInterval(() => show(cur + 1), 6500); };
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.setAttribute('aria-label', 'Foto ' + (i + 1));
    b.onclick = () => { show(i); play(); };
    dots.append(b);
  });
  mark(); play();

  /* Pembuka hero */
  if (G) gsap.set(['h1', '.lead', '.actions', '.dots'], { visibility: 'visible' });
  if (M) {
    const words = split($('h1'));
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.info span', { yPercent: -100, duration: 0.7, stagger: 0.08 })
      .from('.logo', { y: -12, duration: 0.7 }, 0.05)
      .from('#nav a', { y: -10, duration: 0.6, stagger: 0.05 }, 0.1)
      .from(words, { yPercent: 70, duration: 1, stagger: 0.09 }, 0.25)
      .from('.lead', { y: 24, duration: 0.8 }, 0.6)
      .from('.actions .btn', { y: 16, duration: 0.7, stagger: 0.08 }, 0.7)
      .from('.dots button', { scaleX: 0, duration: 0.5, stagger: 0.06 }, 0.9);
    const px = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    if (innerWidth > 940) gsap.to('.slides', { y: 50, ease: 'none', scrollTrigger: { ...px } });
    gsap.to('.hero-in', { y: -50, ease: 'none', scrollTrigger: { ...px } });
  }

  /* Gulir: progres, header, tombol ke atas, menu aktif */
  if (G) {
    const all = { start: 0, end: 'max' };
    gsap.to('.prog', { scaleX: 1, ease: 'none', scrollTrigger: { ...all, scrub: calm ? true : 0.3 } });
    gsap.to('.fab circle + circle', { strokeDashoffset: 0, ease: 'none', scrollTrigger: { ...all, scrub: true } });
    let hid = false, up = false;
    fab.inert = true;
    if (M) gsap.set(fab, { scale: 0, rotate: -90 });
    ScrollTrigger.create({ ...all, onUpdate: (s) => {
      const y = s.scroll(), h = y > 160 && s.direction === 1 && !nav.classList.contains('open'), f = y > 600;
      hd.classList.toggle('sh', y > 10);
      if (M && h !== hid) { hid = h; gsap.to(hd, { yPercent: h ? -100 : 0, duration: 0.5, ease: 'power3.out', overwrite: true }); }
      if (f !== up) {
        up = f; fab.inert = !f;
        if (M) gsap.to(fab, { scale: f ? 1 : 0, rotate: f ? 0 : -90, duration: 0.5, ease: f ? 'back.out(2)' : 'power2.in', overwrite: true });
        else fab.classList.toggle('on', f);
      }
    } });
    $$('.top nav a[href^="#"]').forEach((a, _, links) => {
      const s = $(a.hash);
      if (s) ScrollTrigger.create({ trigger: s, start: 'top 50%', end: 'bottom 50%', onToggle: (t) => t.isActive && links.forEach((x) => x.classList.toggle('on', x === a)) });
    });
    addEventListener('load', () => ScrollTrigger.refresh());
    if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
  }

  /* Foto wisata dibungkus agar bisa berparalaks */
  $$('.photo img').forEach((img) => { const m = document.createElement('div'); m.className = 'mask'; img.replaceWith(m); m.append(img); });

  /* Muncul saat digulir tanpa fade: geser, putar, dan tirai clip-path */
  const batch = (sel, from) => {
    if (!M || !$(sel)) return;
    const to = {};
    Object.keys(from).forEach((k) => { to[k] = k === 'clipPath' ? 'inset(0% 0% 0% 0%)' : k === 'scale' ? 1 : 0; });
    gsap.set(sel, from);
    ScrollTrigger.batch(sel, { start: 'top 90%', once: true, onEnter: (b) => gsap.to(b, { ...to, duration: 1.1, ease: 'power4.out', stagger: 0.12, clearProps: 'transform,clipPath' }) });
  };
  const wipe = 'inset(0% 0% 100% 0%)';
  if (M) {
    $$('h2').forEach((h) => gsap.from(split(h), { yPercent: 55, duration: 0.9, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 90%', once: true } }));
    batch('.head p, .quick .tile, .stats .wrap > div, .salam > :first-child, .salam > div > :not(h2):not(blockquote), .sec > .wrap > .cols > *, .sec > .cols > *, .trio .card, .g, .ag, .qa details, .fgrid > *, .fbottom > *', { y: 24 });

    gsap.from('.bar-fill', { scaleX: 0, duration: 1.5, ease: 'power4.out', stagger: 0.1, scrollTrigger: { trigger: '.age', start: 'top 85%', once: true } });
    gsap.from('.split span', { scaleX: 0, transformOrigin: '0 50%', duration: 1.5, ease: 'power4.out', stagger: 0.15, scrollTrigger: { trigger: '.split', start: 'top 88%', once: true } });
    $$('[data-count]').forEach((el) => {
      const end = +el.dataset.count, o = { v: 0 };
      el.textContent = '0';
      ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => gsap.to(o, { v: end, duration: 2, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('id-ID'); } }) });
    });
    $$('.arch img, .mask img').forEach((img) => gsap.fromTo(img, { yPercent: -9, scale: 1.2 }, { yPercent: 9, ease: 'none', scrollTrigger: { trigger: img.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } }));

  }

  /* Tab dengan penanda geser */
  $$('[data-tabs]').forEach((box) => {
    const list = $('[role=tablist]', box), tabs = $$('[role=tab]', box), pill = document.createElement('i');
    pill.className = 'pill'; pill.setAttribute('aria-hidden', 'true'); list.prepend(pill);
    let cur = tabs[0];
    const move = (t, anim) => {
      const v = { x: t.offsetLeft, y: t.offsetTop, width: t.offsetWidth, height: t.offsetHeight };
      if (M) gsap[anim ? 'to' : 'set'](pill, { ...v, duration: 0.55, ease: 'power4.out', overwrite: true });
      else Object.assign(pill.style, { width: v.width + 'px', height: v.height + 'px', transform: `translate(${v.x}px,${v.y}px)` });
    };
    const pick = (t, anim) => {
      cur = t; move(t, anim);
      tabs.forEach((x) => {
        const on = x === t, p = $('#' + x.getAttribute('aria-controls'));
        x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; p.hidden = !on;
        if (on && anim && M) gsap.fromTo(p, { y: 28, clipPath: wipe }, { y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power4.out', clearProps: 'transform,clipPath' });
      });
      if (anim && G) ScrollTrigger.refresh();
    };
    tabs.forEach((t, i) => {
      t.onclick = () => pick(t, true);
      t.onkeydown = (e) => {
        const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (d) { const n = tabs[(i + d + tabs.length) % tabs.length]; pick(n, true); n.focus(); }
      };
    });
    pick(tabs[0], false);
    addEventListener('resize', () => move(cur, false));
    if (document.fonts) document.fonts.ready.then(() => move(cur, false));
  });

  /* Grafik umur: jumlah atau persen */
  $$('[data-mode]').forEach((b) => { b.onclick = () => {
    $$('[data-mode]').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
    $$('.age').forEach((r) => { $('b', r).textContent = r.dataset[b.dataset.mode]; });
    if (M) gsap.from('.age b', { y: -14, rotate: -6, duration: 0.5, stagger: 0.06, ease: 'back.out(2)', clearProps: 'transform' });
  }; });

  /* Agenda: status otomatis dan filter */
  const today = new Date().setHours(0, 0, 0, 0);
  $$('.ag').forEach((a) => {
    const d = Math.round((new Date($('time', a).dateTime) - today) / 864e5), upc = d >= 0;
    a.dataset.s = upc ? 'soon' : 'done';
    $('.bd', a).textContent = !upc ? 'Selesai' : d === 0 ? 'Hari ini' : d + ' hari lagi';
  });
  $$('[data-f]').forEach((b) => { b.onclick = () => {
    $$('[data-f]').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
    $$('.ag').forEach((a) => { a.hidden = b.dataset.f !== 'all' && a.dataset.s !== b.dataset.f; });
    if (M) gsap.from($$('.ag:not([hidden])'), { y: 40, scale: 0.96, duration: 0.7, stagger: 0.1, ease: 'power4.out', clearProps: 'transform' });
    if (G) ScrollTrigger.refresh();
  }; });

  /* FAQ: buka dan tutup dengan tinggi beranimasi */
  if (M) $$('details').forEach((d) => {
    const p = $('p', d), done = () => { gsap.set(p, { clearProps: 'height,paddingTop,paddingBottom' }); ScrollTrigger.refresh(); };
    $('summary', d).addEventListener('click', (e) => {
      e.preventDefault();
      if (d.open) gsap.to(p, { height: 0, paddingTop: 0, paddingBottom: 0, duration: 0.45, ease: 'power3.inOut', onComplete: () => { d.open = false; done(); } });
      else { d.open = true; gsap.from(p, { height: 0, paddingTop: 0, paddingBottom: 0, duration: 0.6, ease: 'power3.out', onComplete: done }); }
    });
  });

  /* Galeri: panah, papan ketik, dan geser */
  const lb = $('#lb'), gs = $$('.g img'), big = $('img', lb);
  let gi = 0, sx = 0;
  const view = (n, d = 0) => {
    gi = (n + gs.length) % gs.length;
    big.src = gs[gi].src; big.alt = gs[gi].alt;
    $('p', lb).textContent = (gi + 1) + ' / ' + gs.length + '. ' + gs[gi].dataset.c;
    if (M) gsap.from(big, { x: d * 100, rotate: d ? d * 2 : -3, scale: d ? 0.92 : 0.8, duration: 0.7, ease: 'power4.out', clearProps: 'transform' });
  };
  gs.forEach((img, n) => { img.parentNode.onclick = () => { if (lb.showModal) { lb.showModal(); if (L) L.stop(); view(n); } else open(img.src, '_blank', 'noopener'); }; });
  lb.addEventListener('close', () => { if (L) L.start(); });
  $('.prev', lb).onclick = () => view(gi - 1, -1);
  $('.next', lb).onclick = () => view(gi + 1, 1);
  lb.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') view(gi - 1, -1); if (e.key === 'ArrowRight') view(gi + 1, 1); });
  lb.addEventListener('pointerdown', (e) => { sx = e.clientX; });
  lb.addEventListener('pointerup', (e) => { const d = e.clientX - sx; if (Math.abs(d) > 50) view(gi + (d < 0 ? 1 : -1), d < 0 ? 1 : -1); });
  lb.onclick = (e) => { if (e.target === lb) lb.close(); };

  /* Formulir: kirim lewat WhatsApp */
  $('#wa').onsubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const msg = `Halo Pak Dukuh, saya ${f.get('n')}. Keperluan: ${f.get('k')}.\n${f.get('m')}`;
    open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  };
})();
