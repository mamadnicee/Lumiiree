export async function initScroll(){
 const [gm,sm,lm]=await Promise.all([
  import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js'),
  import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js'),
  import('https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.mjs')
 ]);
 const gsap=gm.gsap||gm.default, ScrollTrigger=sm.ScrollTrigger||sm.default, Lenis=lm.default;
 gsap.registerPlugin(ScrollTrigger);
 const lenis=new Lenis({lerp:.08,smoothWheel:true,anchors:true});
 lenis.on('scroll',ScrollTrigger.update);
 const tick=t=>lenis.raf(t*1000);gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0);
 const section=document.querySelector('#worlds-section'),worlds=[...section.querySelectorAll('.world')],bar=section.querySelector('.worlds-progress span');
 // Local canvas supplies a deep, slow-moving particle atmosphere for each scroll world.
 const canvasHost=document.querySelector('#worlds-canvas'),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');canvasHost.append(canvas);
 let w=0,h=0,particles=[];const resize=()=>{const r=canvasHost.getBoundingClientRect();w=canvas.width=Math.max(1,Math.floor(r.width*devicePixelRatio));h=canvas.height=Math.max(1,Math.floor(r.height*devicePixelRatio));canvas.style.width=r.width+'px';canvas.style.height=r.height+'px';particles=Array.from({length:260},()=>({x:Math.random()*w,y:Math.random()*h,z:Math.random(),r:.4+Math.random()*1.7}));};new ResizeObserver(resize).observe(canvasHost);resize();
 let progress=0,phase=0;
 function draw(){const dpr=devicePixelRatio||1;ctx.clearRect(0,0,w,h);const accent=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#ff2d78';for(const p of particles){p.y+=(.12+p.z*.5)*dpr+(progress*2.7*dpr);if(p.y>h)p.y=0;const alpha=.12+p.z*.48;ctx.beginPath();ctx.fillStyle=accent;ctx.globalAlpha=alpha;ctx.arc(p.x,p.y%h,p.r*dpr,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;requestAnimationFrame(draw);}requestAnimationFrame(draw);
 const tl=gsap.timeline({scrollTrigger:{trigger:section,start:'top top',end:'+=400%',pin:true,scrub:1,anticipatePin:1,onUpdate:self=>{progress=self.progress;const idx=Math.min(3,Math.floor(self.progress*4));if(idx!==phase){phase=idx;worlds.forEach((el,i)=>el.classList.toggle('is-active',i===idx));}if(bar)bar.style.transform=`scaleY(${Math.max(.25,self.progress)})`;}}});
 tl.to({}, {duration:1}).to({}, {duration:1}).to({}, {duration:1}).to({}, {duration:1});
 // Depth cues echo a forward camera dolly through the four designed worlds.
 gsap.fromTo('.world-0',{scale:1,z:0},{scale:.72,z:-160,scrollTrigger:{trigger:section,start:'top top',end:'25% top',scrub:1}});
 gsap.fromTo('.runway-card',{y:70,opacity:0,scale:.75},{y:0,opacity:1,scale:1,stagger:.15,ease:'power2.out',scrollTrigger:{trigger:section,start:'25% top',end:'50% top',scrub:1}});
 gsap.fromTo('.world-grid-preview span',{y:80,opacity:0,scale:.75},{y:0,opacity:1,scale:1,stagger:.12,scrollTrigger:{trigger:section,start:'50% top',end:'75% top',scrub:1}});
 gsap.fromTo('.world-3 .world-story',{y:30,opacity:0},{y:0,opacity:1,scrollTrigger:{trigger:section,start:'75% top',end:'bottom top',scrub:1}});
 ScrollTrigger.refresh();return {lenis,destroy(){lenis.destroy();gsap.ticker.remove(tick);ScrollTrigger.getAll().forEach(t=>t.kill());}};
}
