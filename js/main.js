/* Site interactions: loading state, mobile navigation, counters, form. */
document.addEventListener('DOMContentLoaded',()=>{
 const preloader=document.getElementById('preloader');document.body.classList.add('is-loading');setTimeout(()=>{preloader?.classList.add('is-hidden');document.body.classList.remove('is-loading');setTimeout(()=>preloader?.remove(),800)},2500);
 const toggle=document.getElementById('menuToggle'),menu=document.getElementById('navLinks');
 toggle?.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'بستن منو':'باز کردن منو')});
 menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}));
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=document.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})}}));
 const counters=document.querySelectorAll('[data-count]');const animate=el=>{const goal=Number(el.dataset.count)||0,start=performance.now(),duration=1500;function tick(now){const p=Math.min(1,(now-start)/duration),ease=1-Math.pow(1-p,4);el.textContent=Math.round(goal*ease).toLocaleString('en-US')+'+';if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)};
 if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){animate(e.target);io.unobserve(e.target)}}),{threshold:.5});counters.forEach(el=>io.observe(el))}else counters.forEach(animate);
 const form=document.getElementById('contactForm'),status=document.getElementById('formStatus');form?.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const name=form.elements.name.value.trim();status.textContent=`سپاسگزاریم ${name} عزیز؛ درخواست شما ثبت شد. به‌زودی با شما تماس می‌گیریم.`;form.reset()});
});
