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

    const header = document.querySelector('.site-header');
    if (header) {
      const updateHeader = () => {
        if (window.scrollY > 16) header.classList.add('scrolled'); else header.classList.remove('scrolled');
      };
      updateHeader();
      window.addEventListener('scroll', updateHeader, {passive:true});
    }

    if (useGsap) {
      window.gsap.from('.nav-link', {opacity:0, y:6, duration:.55, ease:'power3.out', stagger:.08});
    }

    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('mouseover',()=> menuBtn.classList.add('hover-glow'));
      menuBtn.addEventListener('mouseout',()=> menuBtn.classList.remove('hover-glow'));
    }

    const buttons = Array.from(document.querySelectorAll('.btn'));
    buttons.forEach((btn) => {
      btn.addEventListener('mousemove', (event) => {
        const rect = btn.getBoundingClientRect();
        btn.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
        btn.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('--pointer-x', '50%');
        btn.style.setProperty('--pointer-y', '50%');
      });
    });
  });
})();
