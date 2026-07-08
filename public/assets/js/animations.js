/* Lightweight animation initialisation using GSAP (if available).
   Respects prefers-reduced-motion. Adds reveal on scroll for elements with
   class 'rise' (existing site uses these), and subtle background motion.
*/
(function(){
  if (typeof window === 'undefined') return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function ready(fn){ if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  ready(()=>{
    // Reveal elements with class 'rise' using IntersectionObserver as fallback
    const els = Array.from(document.querySelectorAll('.rise'));
    if (prefersReduced || els.length === 0) {
      els.forEach(e => e.classList.add('anim-reveal','visible'));
      return;
    }

    // If GSAP + ScrollTrigger available use them for smoother control
    const useGsap = window.gsap && window.gsap.registerPlugin;
    if (useGsap && window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.gsap.utils.toArray('.rise').forEach((el, i) => {
        el.style.opacity = 0;
        window.gsap.fromTo(el, {y: 12, opacity: 0}, {y:0, opacity:1, duration: .65, ease: 'power3.out', delay: i*0.06, scrollTrigger:{trigger: el, start: 'top 92%'}});
      });
    } else {
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if (e.isIntersecting) { e.target.classList.add('anim-reveal','visible'); io.unobserve(e.target); }
        });
      },{threshold:0.08});
      els.forEach(el=>io.observe(el));
    }

    // Subtle background particle movement using CSS variables (if any SVG present)
    const bg = document.querySelector('.animated-bg');
    if (bg && useGsap) {
      window.gsap.to(bg, {rotation:0.02, repeat:-1, yoyo:true, duration:12, ease:'sine.inOut', overwrite:true});
    }
  });
})();
