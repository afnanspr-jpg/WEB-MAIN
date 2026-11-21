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
  const setMenu = (o) => { nav.classList.toggle('open', o); mb.setAttribute('aria-expanded', o); mb.setAttribute('aria-label', o ? 'Tutup menu' : 'Buka menu'); };
  mb.onclick = () => setMenu(!nav.classList.contains('open'));
  nav.onclick = (e) => e.target.closest('a') && setMenu(false);
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); mb.focus(); } });

  /* Gulir: progres, header, paralaks, tombol ke atas */
  const prog = $('.prog'), de = document.documentElement, hd = $('.top'), bg = $('.slides'), fab = $('.fab'), ring = $('.fab circle + circle');
  let ly = 0, tick = false;
  const onScroll = () => {
    tick = false;
    const y = scrollY, p = y / Math.max(de.scrollHeight - innerHeight, 1);
    prog.style.width = p * 100 + '%';
    hd.classList.toggle('sh', y > 10);
    hd.classList.toggle('hide', y > ly && y > 160 && !nav.classList.contains('open'));
    ly = y;
    if (!calm && y < innerHeight) bg.style.setProperty('--sy', Math.min(y * 0.25, 60) + 'px');
    fab.classList.toggle('on', y > 600);
    ring.style.strokeDashoffset = 100 - p * 100;
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  fab.onclick = () => scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' });

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
  const kids = ['.trio', '.gal', '.quick', '.stats .wrap', '.fgrid', '.cols', '.salam'];
  $$(kids.join()).forEach((p) => [...p.children].forEach((c, i) => c.style.setProperty('--d', Math.min(i, 5) * 0.1 + 's')));
  $$('.rv, .bar-fill, [data-count], ' + kids.map((k) => k + ' > *').join()).forEach((el) => io.observe(el));

  /* Menu aktif sesuai bagian */
  const links = $$('.top nav a[href^="#"]');
  const spy = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) links.forEach((a) => a.classList.toggle('on', a.hash === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((a) => { const s = $(a.hash); if (s) spy.observe(s); });

  /* Tab dengan penanda geser */
  $$('[data-tabs]').forEach((box) => {
    const list = $('[role=tablist]', box), tabs = $$('[role=tab]', box), pill = document.createElement('i');
    pill.className = 'pill'; pill.setAttribute('aria-hidden', 'true'); pill.style.transition = 'none'; list.prepend(pill);
    let cur = tabs[0];
    const move = (t) => { cur = t; Object.assign(pill.style, { width: t.offsetWidth + 'px', height: t.offsetHeight + 'px', transform: `translate(${t.offsetLeft}px,${t.offsetTop}px)` }); };
    const pick = (t) => {
      move(t);
      tabs.forEach((x) => {
        const on = x === t;
        x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
        $('#' + x.getAttribute('aria-controls')).hidden = !on;
      });
    };
    tabs.forEach((t, i) => {
      t.onclick = () => pick(t);
      t.onkeydown = (e) => {
        const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (d) { const n = tabs[(i + d + tabs.length) % tabs.length]; pick(n); n.focus(); }
      };
    });
    pick(tabs[0]);
    requestAnimationFrame(() => requestAnimationFrame(() => { pill.style.transition = ''; }));
    addEventListener('resize', () => move(cur));
    if (document.fonts) document.fonts.ready.then(() => move(cur));
  });

  /* Grafik umur: jumlah atau persen */
  $$('[data-mode]').forEach((b) => b.onclick = () => {
    $$('[data-mode]').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
    $$('.age').forEach((r) => { $('b', r).textContent = r.dataset[b.dataset.mode]; });
  });

  /* Agenda: status otomatis dan filter */
  const today = new Date().setHours(0, 0, 0, 0);
  $$('.ag').forEach((a) => {
    const d = Math.round((new Date($('time', a).dateTime) - today) / 864e5), up = d >= 0;
    a.dataset.s = up ? 'soon' : 'done';
    $('.bd', a).textContent = !up ? 'Selesai' : d === 0 ? 'Hari ini' : d + ' hari lagi';
  });
  $$('[data-f]').forEach((b) => b.onclick = () => {
    $$('[data-f]').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
    $$('.ag').forEach((a) => { a.hidden = b.dataset.f !== 'all' && a.dataset.s !== b.dataset.f; });
  });

  /* Galeri: panah, papan ketik, dan geser */
  const lb = $('#lb'), gs = $$('.g img'), big = $('img', lb);
  let gi = 0, sx = 0;
  const view = (n) => {
    gi = (n + gs.length) % gs.length;
    big.src = gs[gi].src; big.alt = gs[gi].alt;
    $('p', lb).textContent = (gi + 1) + ' / ' + gs.length + '. ' + gs[gi].dataset.c;
  };
  gs.forEach((img, n) => { img.parentNode.onclick = () => { view(n); if (lb.showModal) lb.showModal(); else open(img.src, '_blank', 'noopener'); }; });
  $('.prev', lb).onclick = () => view(gi - 1);
  $('.next', lb).onclick = () => view(gi + 1);
  lb.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') view(gi - 1); if (e.key === 'ArrowRight') view(gi + 1); });
  lb.addEventListener('pointerdown', (e) => { sx = e.clientX; });
  lb.addEventListener('pointerup', (e) => { const d = e.clientX - sx; if (Math.abs(d) > 50) view(gi + (d < 0 ? 1 : -1)); });
  lb.onclick = (e) => { if (e.target === lb) lb.close(); };

  /* Formulir: kirim lewat WhatsApp */
  $('#wa').onsubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const msg = `Halo Pak Dukuh, saya ${f.get('n')}. Keperluan: ${f.get('k')}.\n${f.get('m')}`;
    open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  };

  /* Judul hero per kata dan kunang-kunang */
  const h1 = $('h1');
  h1.innerHTML = h1.textContent.trim().split(/\s+/).map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`).join(' ');
  if (!calm) {
    const fl = document.createElement('div');
    fl.className = 'fl'; fl.setAttribute('aria-hidden', 'true');
    for (let i = 0, n = innerWidth < 760 ? 8 : 16; i < n; i++) {
      const f = document.createElement('i');
      f.style.cssText = `--x:${Math.random() * 100}%;--s:${3 + Math.random() * 5}px;--t:${9 + Math.random() * 9}s;--d:-${Math.random() * 14}s;--dx:${Math.random() * 120 - 60}px`;
      fl.append(f);
    }
    $('.hero').append(fl);
  }

  /* Pita kata berjalan */
  const mq = $('.marq'), words = ['Padukuhan Puton', 'Watu Ngelak', 'Kali Opak', 'Trimulyo', 'Jetis', 'Bantul'];
  if (mq) mq.innerHTML = [0, 1].map(() => '<div>' + words.concat(words).map((t) => `<span>${t}</span>`).join('') + '</div>').join('');

  /* Efek kursor: sorot, miring, magnet, paralaks (perangkat dengan mouse) */
  if (!calm && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $$('.tile, .trio .card').forEach((c) => {
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        c.style.setProperty('--mx', x + 'px'); c.style.setProperty('--my', y + 'px');
        c.style.setProperty('--rx', (0.5 - y / r.height) * 8 + 'deg'); c.style.setProperty('--ry', (x / r.width - 0.5) * 8 + 'deg');
      });
      c.addEventListener('pointerleave', () => { ['--rx', '--ry'].forEach((k) => c.style.setProperty(k, '0deg')); c.style.setProperty('--my', '-200px'); });
    });
    $$('.btn').forEach((b) => {
      b.addEventListener('pointermove', (e) => { const r = b.getBoundingClientRect(); b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.2}px ${(e.clientY - r.top - r.height / 2) * 0.3}px`; });
      b.addEventListener('pointerleave', () => { b.style.translate = ''; });
    });
    $('.hero').addEventListener('pointermove', (e) => bg.style.setProperty('--px', (e.clientX / innerWidth - 0.5) * -24 + 'px'));
  }
})();
