/* Accessible cursor-driven 3D tilt and moving gold sheen. */
(() => {
  if(!matchMedia('(pointer:fine)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  document.querySelectorAll('.tilt-card').forEach(card=>{
    let rect,rx=0,ry=0,x=0,y=0,raf=0,active=false;
    const paint=()=>{raf=0;if(!active)return;rx+=(x-rx)*.16;ry+=(y-ry)*.16;card.style.transform=`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;if(Math.abs(rx-x)>.02||Math.abs(ry-y)>.02)raf=requestAnimationFrame(paint)};
    card.addEventListener('pointermove',e=>{rect=card.getBoundingClientRect();const nx=(e.clientX-rect.left)/rect.width,ny=(e.clientY-rect.top)/rect.height; x=(.5-ny)*15;y=(nx-.5)*15;card.style.setProperty('--mx',`${nx*100}%`);card.style.setProperty('--my',`${ny*100}%`);active=true;if(!raf)raf=requestAnimationFrame(paint)});
    card.addEventListener('pointerleave',()=>{active=false;card.style.transform='perspective(1000px) rotateX(0deg) rotateY(0deg)';card.style.setProperty('--mx','50%');card.style.setProperty('--my','50%')});
  });
})();
