/* AtomINC — small, dependency-free site script */
(function () {
  var doc = document.documentElement;
  doc.classList.remove('no-js');

  /* Mobile navigation */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* Header shadow + back-to-top */
  var toTop = document.querySelector('.to-top');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 8);
    if (toTop) toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Reveal on scroll */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* Portfolio filter */
  var filters = document.querySelectorAll('.filter');
  var works = document.querySelectorAll('.work');
  if (filters.length) {
    filters.forEach(function (btn) {
      var f = btn.getAttribute('data-filter');
      var n = f === '*' ? works.length : document.querySelectorAll('.work[data-cat="' + f + '"]').length;
      var c = btn.querySelector('.count');
      if (c) c.textContent = n;
      if (n === 0) btn.disabled = true;
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
        works.forEach(function (w) {
          w.hidden = !(f === '*' || w.getAttribute('data-cat') === f);
        });
      });
    });
  }

  /* Portfolio lightbox */
  var box = document.querySelector('.lightbox');
  if (box && typeof box.showModal === 'function') {
    var img = box.querySelector('img');
    var cap = box.querySelector('figcaption');
    document.querySelectorAll('[data-zoom]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        img.src = a.getAttribute('data-zoom');
        img.alt = a.getAttribute('data-title') || '';
        cap.textContent = a.getAttribute('data-title') || '';
        box.showModal();
      });
    });
    box.querySelector('.close').addEventListener('click', function () { box.close(); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
  }
})();
