(() => {
  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  // Service filters
  const filters = document.querySelectorAll('.filter');
  const services = document.querySelectorAll('.service');
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      filters.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      services.forEach((s) => {
        const show = f === 'all' || s.dataset.cat === f;
        s.hidden = !show;
        s.classList.remove('is-in');
        if (show) { void s.offsetWidth; s.classList.add('is-in'); }
      });
    });
  });

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    const targets = document.querySelectorAll('.section-head, .practice, .vmmc-list li, .contact-card, .address-card');
    targets.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach((el) => io.observe(el));
  }
})();
