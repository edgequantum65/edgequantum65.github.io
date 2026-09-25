/* ============================================================
   Edge Quantum 65 — interactions
   Navigation + révélations au défilement (léger, sans dépendance)
   ============================================================ */

(function () {
  'use strict';

  var mouvement = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- barre de navigation : fond au défilement
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 40) { nav.classList.add('scrolled'); }
      else { nav.classList.remove('scrolled'); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- révélations progressives
  var cibles = document.querySelectorAll('.reveal');

  if (mouvement || !('IntersectionObserver' in window)) {
    for (var i = 0; i < cibles.length; i++) { cibles[i].classList.add('visible'); }
    return;
  }

  var observateur = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        entree.target.classList.add('visible');
        observateur.unobserve(entree.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  cibles.forEach(function (c) { observateur.observe(c); });
})();
