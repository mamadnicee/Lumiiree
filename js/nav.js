export function initNav(){
 const toggle=document.querySelector('#menu-toggle'),sidebar=document.querySelector('.sidebar'),hero=document.querySelector('.hero');
 toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));sidebar?.classList.toggle('menu-open',open);});
 const update=()=>document.body.classList.toggle('scrolled',window.scrollY>50);window.addEventListener('scroll',update,{passive:true});update();
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=document.querySelector(a.getAttribute('href'));if(!target)return;e.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});sidebar?.classList.remove('menu-open');toggle?.setAttribute('aria-expanded','false');}));
 const sections=['home','featured','collections','worlds-section'].map(id=>document.getElementById(id)).filter(Boolean);const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;document.querySelectorAll('.side-nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}}, {rootMargin:'-30% 0px -60% 0px'});sections.forEach(s=>observer.observe(s));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){sidebar?.classList.remove('menu-open');toggle?.setAttribute('aria-expanded','false');hero?.classList.remove('focus');}});
 return()=>{observer.disconnect();window.removeEventListener('scroll',update);};
}
