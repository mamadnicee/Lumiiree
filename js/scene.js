(() => {
  const canvas=document.querySelector('#bg-canvas'); if(!canvas||!window.THREE)return;
  const T=window.THREE,scene=new T.Scene(); scene.background=new T.Color(0x0D0B1A);
  const camera=new T.PerspectiveCamera(55,innerWidth/innerHeight,.1,500);camera.position.set(0,1.8,5);
  const renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=T.SRGBColorSpace;
  const grid=new T.Mesh(new T.PlaneGeometry(200,200,40,40),new T.MeshBasicMaterial({color:0x00F5FF,wireframe:true,transparent:true,opacity:.3}));grid.rotation.x=-Math.PI/2;grid.position.y=-2.5;scene.add(grid);
  const count=2000,pos=new Float32Array(count*3),colors=new Float32Array(count*3),pink=new T.Color(0xFF2D78),cyan=new T.Color(0x00F5FF);
  for(let i=0;i<count;i++){pos[i*3]=(Math.random()-.5)*100;pos[i*3+1]=(Math.random()-.5)*55;pos[i*3+2]=(Math.random()-.5)*100;const c=Math.random()>.5?pink:cyan;colors.set([c.r,c.g,c.b],i*3)}
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(pos,3));geo.setAttribute('color',new T.BufferAttribute(colors,3));const particles=new T.Points(geo,new T.PointsMaterial({size:.075,vertexColors:true,transparent:true,opacity:.9, sizeAttenuation:true}));scene.add(particles);
  const knot=new T.Mesh(new T.TorusKnotGeometry(1,.28,120,16),new T.MeshStandardMaterial({color:0xFF2D78,metalness:.5,roughness:.25,emissive:0x50051e,emissiveIntensity:.6}));knot.position.set(4,1,-8);scene.add(knot);
  const ico=new T.Mesh(new T.IcosahedronGeometry(1.3,1),new T.MeshStandardMaterial({color:0xAAFF00,wireframe:true,emissive:0x234400,emissiveIntensity:.3}));ico.position.set(-4,-.1,-15);scene.add(ico);
  scene.add(new T.AmbientLight(0xffffff,.65));const light=new T.PointLight(0x00F5FF,3,35);light.position.set(0,4,-5);scene.add(light);
  let mx=0,my=0,targetX=0,targetY=0;
  addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5)*2;my=(e.clientY/innerHeight-.5)*2},{passive:true});
  function resize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)}addEventListener('resize',resize,{passive:true});
  const clock=new T.Clock();function render(){requestAnimationFrame(render);const t=clock.getElapsedTime();const max=Math.max(1,document.documentElement.scrollHeight-innerHeight),p=scrollY/max;camera.position.z=5-25*p;camera.position.y=1.8-.9*p;targetX=-.08*p+my*.02;targetY=mx*.02;camera.rotation.x+=(targetX-camera.rotation.x)*.035;camera.rotation.y+=(targetY-camera.rotation.y)*.035;knot.rotation.x=t*.15;knot.rotation.y=t*.22;ico.rotation.x=-t*.1;ico.rotation.y=t*.18;particles.rotation.y=t*.008;renderer.render(scene,camera)}render();
})();