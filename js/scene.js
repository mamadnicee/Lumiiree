import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const DATA={
 puffer:{name:'Puffer Jacket',color:'#FF2D78',scale:1},
 trench:{name:'Trench Coat',color:'#C8A97E',scale:1.12}
};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

function createMannequin(id){
 const group=new THREE.Group();
 const matte=(color,roughness=.7,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
 const skin=matte('#c9ad9b',.48), dark=matte('#171522',.52), accent=matte('#ff2d78',.4,.12);
 const cloth=matte(id==='puffer'?'#FF2D78':'#C8A97E',id==='puffer'?.6:.8,id==='puffer'?.1:0);
 const add=(geo,mat,pos,scale)=>{const m=new THREE.Mesh(geo,mat);m.position.set(...pos);if(scale)m.scale.set(...scale);m.castShadow=true;m.receiveShadow=true;group.add(m);return m};
 // Abstract head, neck and shoulder/torso provide an unmistakable dressed figure.
 add(new THREE.SphereGeometry(.18,24,18),skin,[0,1.35,0],[.78,1.08,.72]);
 add(new THREE.CylinderGeometry(.075,.09,.2,16),skin,[0,1.1,0]);
 add(new THREE.CapsuleGeometry(.34,.72,8,16),dark,[0,.55,0],[1,.94,.62]);
 // Legs and simple boots.
 for(const s of [-1,1]){
  add(new THREE.CylinderGeometry(.095,.075,.77,14),dark,[s*.15,-.2,0]);
  add(new THREE.SphereGeometry(.105,16,12),matte('#252233',.45),[s*.15,-.64,.035],[1.1,.55,1.65]);
 }
 // Articulated arms angled naturally away from the body.
 for(const s of [-1,1]){
  const upper=add(new THREE.CylinderGeometry(.075,.105,.65,14),skin,[s*.43,.66,0]);upper.rotation.z=s*-.23;
  const hand=add(new THREE.SphereGeometry(.075,14,10),skin,[s*.5,.27,.015],[.75,1.15,.7]);
 }
 let garment;
 if(id==='puffer'){
  // Bumpy quilted silhouette with layered horizontal baffles and visible stitched channels.
  const geo=new THREE.CylinderGeometry(.43,.36,.98,40,18,true);
  const pos=geo.attributes.position;
  for(let i=0;i<pos.count;i++){const y=pos.getY(i);const phase=Math.sin((y+.5)*Math.PI*9);const bump=.025*Math.cos(phase);const x=pos.getX(i),z=pos.getZ(i);const r=Math.hypot(x,z);pos.setXYZ(i,x*(1+bump/r),y,z*(1+bump/r));}
  geo.computeVertexNormals();
  garment=new THREE.Mesh(geo,cloth);garment.position.y=.55;garment.castShadow=true;garment.receiveShadow=true;group.add(garment);
  // Hem, collar and baffle piping enhance the padded construction.
  const hem=add(new THREE.TorusGeometry(.385,.035,8,40),matte('#d91d64',.56),[0,.08,0]);hem.rotation.x=Math.PI/2;
  const collar=add(new THREE.TorusGeometry(.16,.055,10,32),matte('#ee5690',.52),[0,1.02,0]);collar.rotation.x=Math.PI/2;
  for(let y=.18;y<1.02;y+=.17){const seam=add(new THREE.TorusGeometry(.405-(y-.2)*.035,.009,5,40),matte('#ff8ab0',.7),[0,y,0]);seam.rotation.x=Math.PI/2;}
  // Puffy sleeves, cuffs, zip and pull.
  for(const s of [-1,1]){
   const sleeve=add(new THREE.CapsuleGeometry(.105,.49,6,12),cloth,[s*.43,.63,.005],[1,1,.95]);sleeve.rotation.z=s*-.24;
   const cuff=add(new THREE.TorusGeometry(.105,.025,8,20),matte('#db2366',.55),[s*.5,.35,0]);cuff.rotation.x=Math.PI/2;
  }
  const zip=add(new THREE.BoxGeometry(.012,.78,.015),matte('#f5bfd1',.35,.6),[0,.57,.383]);
 }else{
  // Flared continuous trench shell with recognizable lapels, belt, collar and double-breasted buttons.
  const points=[new THREE.Vector2(.31,-.98),new THREE.Vector2(.37,-.35),new THREE.Vector2(.34,.22),new THREE.Vector2(.28,.67),new THREE.Vector2(.20,.92)];
  const shape=new THREE.Shape();shape.moveTo(-.31,-.98);shape.lineTo(-.37,-.35);shape.lineTo(-.34,.22);shape.lineTo(-.28,.67);shape.lineTo(-.20,.92);shape.lineTo(.20,.92);shape.lineTo(.28,.67);shape.lineTo(.34,.22);shape.lineTo(.37,-.35);shape.lineTo(.31,-.98);shape.closePath();
  const coatGeo=new THREE.ExtrudeGeometry(shape,{depth:.13,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.025,bevelThickness:.025});
  garment=new THREE.Mesh(coatGeo,cloth);garment.position.set(0,.53,.05);garment.castShadow=true;garment.receiveShadow=true;group.add(garment);
  // Rear panel and sleeves in matching wool.
  add(new THREE.CylinderGeometry(.38,.5,1.45,32,1,true),cloth,[0,.33,-.035],[1,1,.35]);
  for(const s of [-1,1]){const sleeve=add(new THREE.CapsuleGeometry(.085,.56,6,12),cloth,[s*.43,.57,.02]);sleeve.rotation.z=s*-.2;}
  // Belt wraps around the waist as a pair of clean, visible bands.
  const belt=add(new THREE.TorusGeometry(.345,.035,8,48),matte('#9e805a',.75),[0,.5,.04]);belt.rotation.x=Math.PI/2;
  const buckle=add(new THREE.BoxGeometry(.12,.09,.035),matte('#dac49d',.35,.55),[.08,.5,.385]);
  // Tailored lapels as tapered folded panels.
  const lapelMat=matte('#dbc39b',.78);
  for(const s of [-1,1]){const lapel=add(new THREE.BufferGeometry(),lapelMat,[0,0,0]);const vertices=new Float32Array([s*.01,1.47,.22,s*.27,1.35,.23,s*.12,.85,.25]);lapel.geometry.setAttribute('position',new THREE.BufferAttribute(vertices,3));lapel.geometry.setIndex([0,1,2]);lapel.geometry.computeVertexNormals();lapel.material.side=THREE.DoubleSide;}
  for(const y of [.25,.02,-.2])add(new THREE.SphereGeometry(.025,10,8),matte('#5c4834',.3,.5),[.1,y,.25]);
 }
 // Elegant mannequin neck/face details and shoulder form stay visible above the garment.
 add(new THREE.CylinderGeometry(.22,.27,.12,20),cloth,[0,1.03,0]);
 const faceLine=add(new THREE.BoxGeometry(.035,.035,.012),matte('#5a4038',.5),[.05,1.38,.127]);
 group.scale.setScalar(DATA[id].scale);
 return group;
}

export function initScene(canvas,heroEl,stageEl){
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
 const scene=new THREE.Scene();scene.background=null;
 const camera=new THREE.PerspectiveCamera(26,1,.1,100);camera.position.set(0,0,8);scene.add(camera);
 const key=new THREE.DirectionalLight('#fff4e2',1.8);key.position.set(2.5,4,5);scene.add(key);
 const rim=new THREE.DirectionalLight('#bfd8ff',.6);rim.position.set(-4,2,-3);scene.add(rim);
 scene.add(new THREE.AmbientLight('#d9cde8',.45));
 const pmrem=new THREE.PMREMGenerator(renderer);const env=new RoomEnvironment();const envTarget=pmrem.fromScene(env,.04);scene.environment=envTarget.texture;scene.environmentIntensity=.9;env.dispose();pmrem.dispose();
 const rigs={};
 for(const id of Object.keys(DATA)){const pivot=new THREE.Group(),spin=new THREE.Group(),holder=new THREE.Group();scene.add(pivot);pivot.add(spin);spin.add(holder);holder.add(createMannequin(id));pivot.visible=false;rigs[id]={pivot,spin,holder};spin.rotation.order='YXZ';spin.rotation.set(.12,.75,0);}
 let current='puffer',zoom=1,targetZoom=1,lightDusk=false,disposed=false;
 let width=1,height=1,heroHeight=1,px=200,cx=0,cy=0,targets={cx:0,cy:0,px:200};
 let lastTime=performance.now(),lastInteract=performance.now(),dragging=false,lastPointer=null,velocity={x:0,y:0},turnQueue=0,homeRequested=false;
 const pointerY=new THREE.Vector3(0,1,0),pointerX=new THREE.Vector3(1,0,0),q=new THREE.Quaternion();
 const resize=()=>{const r=heroEl.getBoundingClientRect(),s=stageEl.getBoundingClientRect();width=Math.max(1,r.width);height=Math.max(1,r.height);heroHeight=height;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();const focus=heroEl.classList.contains('focus');const stageCenterX=focus?r.left+r.width/2:s.left+s.width/2;const stageCenterY=focus?r.top+r.height*.5:s.top+s.height*.44;targets.cx=stageCenterX-r.left;targets.cy=stageCenterY-r.top;targets.px=focus?Math.min(width*.5,height*.6)*1.16:Math.min(s.width*.5,s.height*.6)*1.16;};
 const ro=new ResizeObserver(resize);ro.observe(heroEl);ro.observe(stageEl);resize();
 function markInteraction(){lastInteract=performance.now();const hint=document.querySelector('.stage-hint');if(hint)hint.classList.add('hide');}
 function setZoom(value){targetZoom=clamp(value,.55,3.4);markInteraction();}
 function resetView(){homeRequested=true;targetZoom=1;markInteraction();}
 function switchItem(id){if(!rigs[id]||id===current)return;const old=rigs[current].pivot;old.visible=false;current=id;const next=rigs[id].pivot;next.visible=true;next.position.set(0,0,0);next.scale.setScalar(1);rigs[id].spin.quaternion.setFromEuler(new THREE.Euler(.12,.75,0,'YXZ'));targetZoom=1;markInteraction();}
 function setLight(on){lightDusk=typeof on==='boolean'?on:!lightDusk;heroEl.dataset.light=lightDusk?'dusk':'day';document.body.style.background=lightDusk?'#07070e':'';markInteraction();return lightDusk;}
 function setExpand(on){heroEl.classList.toggle('focus',Boolean(on));requestAnimationFrame(resize);markInteraction();}
 function queueTurn(angle){turnQueue+=angle;markInteraction();}
 stageEl.addEventListener('pointerdown',e=>{if(e.button!==undefined&&e.button!==0)return;dragging=true;lastPointer={x:e.clientX,y:e.clientY};velocity={x:0,y:0};stageEl.classList.add('dragging');stageEl.setPointerCapture?.(e.pointerId);markInteraction();});
 stageEl.addEventListener('pointermove',e=>{if(!dragging||!lastPointer)return;const dx=e.clientX-lastPointer.x,dy=e.clientY-lastPointer.y;lastPointer={x:e.clientX,y:e.clientY};const k=Math.PI/Math.max(260,px*1.6);const ax=dx*k,ay=dy*k;const spin=rigs[current].spin; q.setFromAxisAngle(pointerY,ax);spin.quaternion.premultiply(q);q.setFromAxisAngle(pointerX,ay);spin.quaternion.premultiply(q);velocity={x:ax,y:ay};});
 const endDrag=()=>{dragging=false;lastPointer=null;stageEl.classList.remove('dragging');};stageEl.addEventListener('pointerup',endDrag);stageEl.addEventListener('pointercancel',endDrag);stageEl.addEventListener('lostpointercapture',endDrag);
 stageEl.addEventListener('wheel',e=>{e.preventDefault();setZoom(targetZoom*Math.exp(-e.deltaY*(e.ctrlKey?.01:.0016)));},{passive:false});
 let pinch=null;stageEl.addEventListener('touchstart',e=>{if(e.touches.length===2){const dx=e.touches[0].clientX-e.touches[1].clientX,dy=e.touches[0].clientY-e.touches[1].clientY;pinch=Math.hypot(dx,dy);dragging=false;}},{passive:true});stageEl.addEventListener('touchmove',e=>{if(e.touches.length===2&&pinch){const dx=e.touches[0].clientX-e.touches[1].clientX,dy=e.touches[0].clientY-e.touches[1].clientY;const d=Math.hypot(dx,dy);setZoom(targetZoom*d/pinch);pinch=d;}},{passive:true});stageEl.addEventListener('touchend',()=>{pinch=null;});
 stageEl.addEventListener('dblclick',resetView);
 stageEl.addEventListener('keydown',e=>{const spin=rigs[current].spin;if(e.key==='ArrowLeft'||e.key==='ArrowRight'||e.key==='ArrowUp'||e.key==='ArrowDown'){e.preventDefault();const a=.18*(e.key==='ArrowLeft'||e.key==='ArrowUp'?-1:1);q.setFromAxisAngle(e.key==='ArrowLeft'||e.key==='ArrowRight'?pointerY:pointerX,a);spin.quaternion.premultiply(q);markInteraction();}else if(e.key==='+'||e.key==='='){setZoom(targetZoom*1.2);}else if(e.key==='-'){setZoom(targetZoom/1.2);}else if(e.key==='0')resetView();});
 rigs[current].pivot.visible=true;
 function animate(now){if(disposed)return;requestAnimationFrame(animate);const dt=Math.min(.05,(now-lastTime)/1000);lastTime=now;const t=now*.001;cx+=(targets.cx-cx)*(1-Math.exp(-dt*7));cy+=(targets.cy-cy)*(1-Math.exp(-dt*7));px+=(targets.px-px)*(1-Math.exp(-dt*7));zoom+=(targetZoom-zoom)*(1-Math.exp(-dt*6));
  camera.setViewOffset(width,height,width/2-cx,height/2-cy,width,height);camera.position.z=heroHeight/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*Math.max(px,1)*zoom);camera.updateProjectionMatrix();
  const active=rigs[current];if(!dragging){const decay=Math.exp(-dt*4.5);if(Math.abs(velocity.x)+Math.abs(velocity.y)>.0001){q.setFromAxisAngle(pointerY,velocity.x*dt*60);active.spin.quaternion.premultiply(q);q.setFromAxisAngle(pointerX,velocity.y*dt*60);active.spin.quaternion.premultiply(q);velocity.x*=decay;velocity.y*=decay;}}
  if(homeRequested){const home=new THREE.Quaternion().setFromEuler(new THREE.Euler(.12,.75,0,'YXZ'));active.spin.quaternion.slerp(home,1-Math.exp(-dt*6));if(active.spin.quaternion.angleTo(home)<.001)homeRequested=false;}
  const turnStep=turnQueue*(1-Math.exp(-dt*4.2));if(Math.abs(turnStep)>.00001){q.setFromAxisAngle(pointerY,turnStep);active.spin.quaternion.premultiply(q);turnQueue-=turnStep;}
  const idle=now-lastInteract>1800;const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;if(idle&&!reduce){active.pivot.rotation.y=Math.sin(t*.55)*.16;active.pivot.rotation.x=Math.sin(t*.9)*.03;active.pivot.position.y=Math.sin(t*1.3)*.028;}else{active.pivot.rotation.y+=(0-active.pivot.rotation.y)*(1-Math.exp(-dt*3));active.pivot.rotation.x+=(0-active.pivot.rotation.x)*(1-Math.exp(-dt*3));active.pivot.position.y+=(0-active.pivot.position.y)*(1-Math.exp(-dt*3));}
  const envTarget=lightDusk?.28:.9,keyTarget=lightDusk?2.6:1.8,rimTarget=lightDusk?1.9:.6,expo=lightDusk?1.0:1.1,rate=1-Math.exp(-dt*4);scene.environmentIntensity+=(envTarget-scene.environmentIntensity)*rate;key.intensity+=(keyTarget-key.intensity)*rate;rim.intensity+=(rimTarget-rim.intensity)*rate;renderer.toneMappingExposure+=(expo-renderer.toneMappingExposure)*rate;key.color.lerp(new THREE.Color(lightDusk?'#ffc98a':'#fff4e2'),rate);rim.color.lerp(new THREE.Color(lightDusk?'#ffe0b1':'#bfd8ff'),rate);
  renderer.render(scene,camera);
 }
 requestAnimationFrame(animate);
 return {switchItem,setLight,setZoom,setExpand,queueTurn,resetView,get zoom(){return targetZoom},get current(){return current},dispose(){disposed=true;ro.disconnect();renderer.dispose();envTarget.dispose();Object.values(rigs).forEach(r=>r.pivot.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material.dispose();}}));}};
}
