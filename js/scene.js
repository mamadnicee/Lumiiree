/* Hero depth and decorative gem behavior; no animation framework required. */
(() => {
  const hero=document.querySelector('.hero'), content=document.querySelector('[data-parallax]');
  const gems=document.querySelectorAll('.hero-ornament');
  if(!hero)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduced && content && matchMedia('(pointer:fine)').matches){
    let frame=0,px=0,py=0;
    hero.addEventListener('pointermove',e=>{
      const r=hero.getBoundingClientRect();px=(e.clientX-r.left)/r.width-.5;py=(e.clientY-r.top)/r.height-.5;
      if(frame)return;frame=requestAnimationFrame(()=>{content.style.transform=`translate3d(${px*-9}px,${py*-7}px,0) rotateX(${py*1.5}deg) rotateY(${px*1.5}deg)`;frame=0});
    },{passive:true});
    hero.addEventListener('pointerleave',()=>content.style.transform='');
  }
  gems.forEach((gem,i)=>{gem.style.animationDelay=`${-2.2*i}s`;});
  document.querySelectorAll('.product-card').forEach(card=>{
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();card.classList.toggle('is-flipped')}});
  });
})();
