// Operando desde marzo de 2019 — se recalcula solo cada vez que se abre la página,
// no requiere actualizar el número a mano cada año.
(function () {
  var founded = new Date(2019, 2, 1); // marzo (mes índice 2) de 2019
  var now = new Date();
  var years = now.getFullYear() - founded.getFullYear();
  var hadAnniversary =
    now.getMonth() > founded.getMonth() ||
    (now.getMonth() === founded.getMonth() && now.getDate() >= founded.getDate());
  if (!hadAnniversary) { years -= 1; }

  document.querySelectorAll('[data-years]').forEach(function (el) {
    el.textContent = years;
  });
})();

// El header es sticky y su alto cambia en mobile según cuántas líneas ocupe el menú;
// medimos el alto real para que los anclas (#recorridos, etc.) no queden tapados al saltar.
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  function setNavHeight() {
    document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
  }
  setNavHeight();
  window.addEventListener('resize', setNavHeight);
  window.addEventListener('load', setNavHeight);
})();

// Menú hamburguesa en mobile: el header no debe tapar la pantalla, así que
// el listado de links se esconde y solo se muestra al tocar el botón.
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  function closeMenu() {
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 760) { closeMenu(); }
  });
})();

// Indicador de página activa: en vez de ocultar el link de la página actual,
// se marca con una línea debajo que se desliza al link que se pasa el mouse por encima.
(function () {
  var navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;
  var links = Array.prototype.filter.call(navLinks.querySelectorAll('a'), function (a) {
    return !a.classList.contains('btn');
  });
  if (!links.length) return;

  var indicator = document.createElement('span');
  indicator.className = 'nav-indicator';
  navLinks.appendChild(indicator);

  var currentPage = location.pathname.split('/').pop() || 'index.html';
  var activeLink = links[0];
  links.forEach(function (a) {
    var page = (a.getAttribute('href') || '').split('#')[0].split('/').pop();
    if (page === currentPage) { activeLink = a; }
  });
  activeLink.classList.add('active');

  function moveIndicatorTo(el, animate) {
    if (window.innerWidth <= 760) return;
    if (!animate) { indicator.style.transition = 'none'; }
    indicator.style.left = el.offsetLeft + 'px';
    indicator.style.width = el.offsetWidth + 'px';
    indicator.style.opacity = '1';
    if (!animate) {
      indicator.offsetHeight; // reflow, así el próximo cambio sí anima
      indicator.style.transition = '';
    }
  }

  moveIndicatorTo(activeLink, false);
  window.addEventListener('load', function () { moveIndicatorTo(activeLink, false); });
  window.addEventListener('resize', function () { moveIndicatorTo(activeLink, false); });

  links.forEach(function (a) {
    a.addEventListener('mouseenter', function () { moveIndicatorTo(a, true); });
  });
  navLinks.addEventListener('mouseleave', function () { moveIndicatorTo(activeLink, true); });
})();
