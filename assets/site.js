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
