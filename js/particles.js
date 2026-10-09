/* Lightweight decorative canvas: drifting, twinkling gold facets. */
(() => {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w=0,h=0,dpr=1, particles=[];
  const rand=(a,b)=>a+Math.random()*(b-a);
  function resize(){
    const rect=canvas.getBoundingClientRect(); dpr=Math.min(devicePixelRatio||1,2);
    w=rect.width; h=rect.height; canvas.width=w*dpr; canvas.height=h*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    particles=Array.from({length:120},()=>({x:rand(0,w),y:rand(0,h),size:rand(1,3.5),speed:rand(.08,.42),phase:rand(0,Math.PI*2),alpha:rand(.2,.75),drift:rand(-.15,.15)}));
  }
  function draw(t=0){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      if(!reduce){p.y-=p.speed;p.x+=p.drift;if(p.y<-8){p.y=h+8;p.x=rand(0,w)}}
      const a=p.alpha*(.45+.55*Math.sin(t*.0015+p.phase));
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(Math.PI/4);ctx.fillStyle=`rgba(231,192,99,${a})`;ctx.shadowColor='rgba(218,173,75,.65)';ctx.shadowBlur=p.size*3;ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);ctx.restore();
    }
    if(!reduce)requestAnimationFrame(draw);
  }
  addEventListener('resize',resize,{passive:true});resize();draw();
})();
