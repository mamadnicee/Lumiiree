export function initTilt(elements){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const cleanups=[];
 if(reduced)return()=>{};
 elements.forEach(el=>{let rx=0,ry=0,x=0,y=0,raf=0;const move=e=>{const r=el.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width,ny=(e.clientY-r.top)/r.height;x=(.5-ny)*16;y=(nx-.5)*16;if(!raf)raf=requestAnimationFrame(render);};const render=()=>{rx+=(x-rx)*.13;ry+=(y-ry)*.13;el.style.transform=`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;if(Math.abs(x-rx)+Math.abs(y-ry)>.05)raf=requestAnimationFrame(render);else raf=0;};const leave=()=>{x=0;y=0;if(!raf)raf=requestAnimationFrame(render);};el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);cleanups.push(()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);cancelAnimationFrame(raf);});});return()=>cleanups.forEach(fn=>fn());
}
