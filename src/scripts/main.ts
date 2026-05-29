import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------------- *
 * Smooth scrolling (Lenis) synced to GSAP ScrollTrigger
 * ---------------------------------------------------------------- */
if (!reduceMotion) {
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Route in-page anchor clicks through Lenis (offset for fixed nav)
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const hash = a.getAttribute('href');
      if (!hash || hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
    });
  });
}

/* ---------------------------------------------------------------- *
 * Scroll reveals — [data-reveal] fades/slides in once
 * ---------------------------------------------------------------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
);
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

/* ---------------------------------------------------------------- *
 * Kinetic headlines — words rise into place on scroll
 * ---------------------------------------------------------------- */
document.querySelectorAll<HTMLElement>('[data-kinetic]').forEach((heading) => {
  const words = heading.querySelectorAll('.kwi');
  if (!words.length) return;
  if (reduceMotion) {
    gsap.set(words, { y: 0 });
    return;
  }
  gsap.to(words, {
    y: 0,
    duration: 0.85,
    ease: 'power3.out',
    stagger: 0.07,
    scrollTrigger: { trigger: heading, start: 'top 88%' },
  });
});

/* ---------------------------------------------------------------- *
 * Staggered group reveals — [data-stagger] children
 * ---------------------------------------------------------------- */
if (!reduceMotion) {
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-stagger-item]');
    if (!items.length) return;
    gsap.from(items, {
      y: 28,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.09,
      scrollTrigger: { trigger: group, start: 'top 82%' },
    });
  });

  /* Gradient connector lines draw in */
  document.querySelectorAll<HTMLElement>('[data-draw]').forEach((line) => {
    gsap.from(line, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: line, start: 'top 85%' },
    });
  });
}

/* ---------------------------------------------------------------- *
 * Magnetic buttons — [data-magnetic]
 * ---------------------------------------------------------------- */
if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - r.left - r.width / 2;
      const my = e.clientY - r.top - r.height / 2;
      gsap.to(el, { x: mx * 0.28, y: my * 0.4, duration: 0.4, ease: 'power3.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });
}
