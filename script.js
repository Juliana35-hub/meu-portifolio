/* Assistente demonstrativo + interações do portfólio. O robô 3D usa Three.js via CDN. */

const $=s=>document.querySelector(s);
setTimeout(()=>$('#intro').classList.add('off'),1800);
(function(){const cv=$('#bot'),say=$('#say'),sc=document.createElement('script');sc.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';sc.onload=()=>{(document.fonts?document.fonts.load('700 54px "Space Grotesk"'):Promise.resolve()).then(init,init)};document.head.appendChild(sc);
function init(){try{const T=THREE,r=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true,powerPreference:'high-performance'});r.setPixelRatio(Math.min(Math.max(devicePixelRatio,2),3));r.outputEncoding=T.sRGBEncoding;r.toneMapping=T.ACESFilmicToneMapping;r.toneMappingExposure=1.12;
const scene=new T.Scene(),cam=new T.PerspectiveCamera(39,1,.1,50);cam.position.set(0,.2,11);
scene.add(new T.HemisphereLight(0xffffff,0xb9a2e8,.7));const key=new T.DirectionalLight(0xffffff,1.2);key.position.set(3,5,6);scene.add(key);
const fill=new T.PointLight(0xb9a2e8,.65,30);fill.position.set(-5,1,4);scene.add(fill);const rim=new T.PointLight(0xe63859,.55,30);rim.position.set(4,2,-4);scene.add(rim);
const P=(c,ro,me,cc)=>new T.MeshPhysicalMaterial({color:c,roughness:ro,metalness:me,clearcoat:cc,clearcoatRoughness:.12}),
B=(c,o)=>{const m=new T.MeshBasicMaterial({color:c,transparent:o<1,opacity:o});m.toneMapped=false;return m},
white=P(0xf3eeff,.3,0,1),dark=P(0x171426,.18,.55,1),steel=P(0x8d90ad,.35,.85,0),
lil=new T.MeshStandardMaterial({color:0xb9a2e8,roughness:.3,emissive:0x695a88,emissiveIntensity:.18}),
red=new T.MeshStandardMaterial({color:0xe63859,roughness:.3,emissive:0xe63859,emissiveIntensity:.35}),
glow=B(0xe8e0f0,1),halo=B(0xb9a2e8,.28),pink=B(0xe63859,.85),
S=new T.SphereGeometry(1,48,48),C=new T.CylinderGeometry(1,1,1,36),R=new T.TorusGeometry(1,.1,14,56);
const root=new T.Group(),inner=new T.Group(),head=new T.Group(),eyes=new T.Group(),armL=new T.Group(),armR=new T.Group();
function mk(g,m,x,y,z,sx,sy,sz,p){const o=new T.Mesh(g,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);(p||inner).add(o);return o}
scene.add(root);root.add(inner);inner.add(head,armL,armR);head.add(eyes);head.position.y=1.1;
const stars=new T.Group(),stm=B(0xe63859,1);head.add(stars);stars.position.y=1.65;stars.visible=false;[0,1,2].forEach(i=>mk(new T.OctahedronGeometry(1,0),stm,Math.cos(i*2.094)*.8,0,Math.sin(i*2.094)*.8,.12,.12,.12,stars));
mk(S,white,0,0,0,1.65,1.3,1.32,head);mk(S,dark,0,.02,.8,1.36,.95,.55,head);
mk(S,B(0xffffff,.2),-.45,.5,1.25,.55,.1,.02,head).rotation.z=.3;
mk(R,steel,0,-.15,0,.45,.45,.9).rotation.x=Math.PI/2;
const ne=[],spr=[];[-1,1].forEach(s=>{ne.push(mk(S,halo,s*.5,.08,1.302,.32,.34,.02,eyes),mk(S,glow,s*.5,.08,1.315,.2,.25,.03,eyes),mk(S,B(0xffffff,1),s*.5+.07,.18,1.34,.06,.06,.02,eyes));const sg=new T.Group();sg.position.set(s*.5,.08,1.335);sg.visible=false;eyes.add(sg);mk(new T.TorusGeometry(.2,.03,8,32,Math.PI*1.7),glow,0,0,0,1,1,1,sg);mk(new T.TorusGeometry(.11,.03,8,24,Math.PI*1.5),glow,0,0,0,1,1,1,sg);spr.push(sg);
mk(S,lil,s*1.62,0,0,.22,.42,.42,head);mk(R,steel,s*1.75,0,0,.3,.3,.3,head).rotation.y=Math.PI/2;mk(S,glow,s*1.78,0,0,.03,.2,.2,head);
const a=mk(C,steel,s*1.66,.7,0,.045,.75,.045,head);a.rotation.z=-s*.25;mk(S,red,s*1.78,1.08,0,.12,.12,.12,head);mk(S,pink,s*.95,-.4,1.115,.17,.1,.04,head)});
const sm=mk(new T.TorusGeometry(.13,.02,8,28,Math.PI),glow,0,-.16,1.352,1,1,1,eyes);sm.rotation.z=Math.PI;
mk(S,white,0,-.85,0,.72,.68,.62);mk(R,dark,0,-.55,0,.65,.56,.3).rotation.x=Math.PI/2;
mk(S,dark,0,-.88,.57,.3,.25,.07);mk(S,halo,0,-.88,.65,.2,.2,.02);mk(S,lil,0,-.88,.65,.11,.11,.03);
const g1=mk(S,halo,0,-1.62,0,.5,.1,.5),g2=mk(S,B(0xe63859,.35),0,-1.58,0,.2,.06,.2);
armL.position.set(-.95,-.62,.1);armR.position.set(.95,-.62,.1);armR.rotation.set(0,0,-.1);
[armL,armR].forEach(a=>{mk(S,white,0,-.3,0,.2,.38,.2,a);mk(S,white,0,-.68,0,.17,.17,.17,a)});mk(S,white,-.12,-.63,.05,.07,.08,.07,armL);
const sh=new T.Mesh(new T.CircleGeometry(1.1,40),new T.MeshBasicMaterial({color:0x171426,transparent:true,opacity:.16}));sh.rotation.x=-Math.PI/2;sh.position.y=-2.3;scene.add(sh);
/* Letras do nome Luna */
const F='Poppins,system-ui,sans-serif',items=[];
function tex(w,h,f){const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'));const t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;t.anisotropy=4;return t}
function sp(t){const s=new T.Sprite(new T.SpriteMaterial({map:t,transparent:true,depthTest:true,depthWrite:false,toneMapped:false}));scene.add(s);return s}
function put(s,sz,asp,o){s.scale.set(sz*asp,sz,1);items.push(Object.assign({s:s,ph:Math.random()*6.28,off:new T.Vector3(),vel:new T.Vector3(),spin:0},o))}
const cols=['#b9a2e8','#e63859','#171426','#b9a2e8'],L=['L','U','N','A'];
L.forEach((ch,i)=>{const c=cols[i];put(sp(tex(512,512,x=>{x.beginPath();x.arc(256,256,216,0,Math.PI*2);x.fillStyle='#fff';x.shadowColor='rgba(23,20,38,.2)';x.shadowBlur=28;x.fill();x.shadowColor='transparent';x.lineWidth=12;x.strokeStyle='rgba(185,162,232,.72)';x.stroke();x.font='700 276px '+F;x.textAlign='center';x.textBaseline='middle';x.fillStyle=c;x.fillText(ch,256,256)})),.96,1,{tag:false,a0:i/L.length*6.283,sp:(i%2?-1:1)*(.25+(i%3)*.06),rx:i%2?2.7:2.55,cy:1.05,ry:1.0})});
const PH=['Oi, tudo bem?','Você já conheceu a minha humana?','Acho que você vai adorar conhecê-la!','Vamos nessa?','Bip bop!','Que bom te ver!'],CL=['Oi, tudo bem?','Oba!','Uhu!','Bip bop!'];
let mx=0,my=0,tx=0,ty=0,jump=0,play=null,nextPlay=5,dzA=0,dzB=0,dzs=0,spins=0,lastSpin=0,wasD=0,ww=0,wUntil=0,pi=0,tm,px=0,tgt=0,run=0,face=0,nextAct=4,nextRoam=6,lastT=0;
const ease=k=>k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2,Pp=new T.Vector3(),orb=new T.Vector3(),ray=new T.Raycaster(),nd=new T.Vector2(),cen=new T.Vector3();
const towardCamera=v=>{v.z=Math.abs(v.z)+1;return v.normalize()};
function speak(s,ms){say.textContent=s;say.classList.add('on');clearTimeout(tm);tm=setTimeout(()=>say.classList.remove('on'),ms)}
function hit(e){const b=cv.getBoundingClientRect();nd.set((e.clientX-b.left)/b.width*2-1,-((e.clientY-b.top)/b.height*2-1));ray.setFromCamera(nd,cam);return ray.intersectObject(root,true).length>0}
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1;document.body.style.cursor=hit(e)?'pointer':''});
addEventListener('click',e=>{if(!hit(e))return;const n=performance.now()/1000;if(n<dzB){speak(['Ui... tô tonto 😵‍💫','Calma... tudo girando 🌀','Bip... zonzo... bip'][Math.random()*3|0],1800);return}if(jump)return;spins=n-lastSpin>6?1:spins+1;lastSpin=n;jump=performance.now();wUntil=0;play=null;nextAct=n+8+Math.random()*6;
cen.set(px,.4,0);items.forEach(it=>it.vel.add(towardCamera(Pp.copy(it.s.position).sub(cen)).multiplyScalar(3+Math.random()*2)));
if(spins>=4){dzA=n+1;dzB=n+6.5;spins=0;speak('Ui, tô tonto! 😵‍💫',3000)}else speak(spins===3?'Ui... começando a ficar tonto 😅':CL[Math.random()*CL.length|0],2300)});
function rs(){const w=cv.clientWidth,h=cv.clientHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}new ResizeObserver(rs).observe(cv);rs();
(function loop(t){t/=1000;const dt=Math.min(t-lastT,.05);lastT=t;
if(!(wUntil||jump||play||t<dzB)&&t>nextAct){const q=Math.random();
if(q<.45&&run<.2){wUntil=t+2.8;speak(PH[pi++%PH.length],3200)}
else{jump=performance.now();nextAct=t+6+Math.random()*5;if(Math.random()<.5)speak('Hop!',1400)}}
if(!play&&!(wUntil||jump||t<dzB)&&t>nextPlay){const pk=['look','dance','hop','twirl','wave','cheer','headTurn'][Math.random()*7|0],d={look:3,dance:2.4,hop:1.2,twirl:1,wave:2.3,cheer:1.8,headTurn:1.6}[pk];play={k:pk,t0:t,d:d};nextPlay=t+d+3+Math.random()*4;
if(pk==='dance'&&Math.random()<.6)speak('♪ bip bop bap ♪',2000);if(pk==='wave'&&Math.random()<.7)speak('Oi, tudo bem?',2000);if(pk==='cheer'&&Math.random()<.7)speak('Eba! ✨',1600)}
if(play&&t>play.t0+play.d)play=null;
if(wUntil&&t>wUntil){wUntil=0;nextAct=t+7+Math.random()*6}
if(wUntil)tgt=px;else if(t>nextRoam){if(Math.random()<.45)tgt=Math.random()<.35?0:Math.random()*2.2-1.1;nextRoam=t+9+Math.random()*9}
const dx=tgt-px,st=Math.min(Math.abs(dx),1.7*dt*(1-.6*dzs));px+=Math.sign(dx)*st;const mv=st>.0005?1:0;run+=(mv-run)*.12;if(mv)face+=(Math.sign(dx)-face)*.12;else face*=.92;
const dz=t>=dzA&&t<dzB?1:0;if(dz)wUntil=0;dzs+=(dz-dzs)*.08;if(wasD&&!dz&&dzB){speak('Ufa! Voltei ao normal 😌',2200);dzB=0}wasD=dz;
ww+=((wUntil?1:0)-ww)*.1;tx+=(mx-tx)*.08;ty+=(my-ty)*.08;
inner.rotation.y=tx*.6+face*run*.55;inner.rotation.x=ty*.3;head.rotation.z=ww*.12;eyes.position.x=tx*.12;eyes.position.y=-ty*.08;eyes.scale.y=((t%3.6)<.12?.1:1)*(1-ww*.25);
const sw=Math.sin(t*11)*run*(1-ww);armL.rotation.z=-.2+Math.sin(t*1.6)*.05+sw*.6+ww*(-2.3+Math.sin(t*9)*.32);armR.rotation.z=-.1+sw*.15;
red.emissiveIntensity=.25+Math.sin(t*3)*.1;g1.scale.set(.5+run*.12+Math.sin(t*5)*.05,.1,.5+run*.12+Math.sin(t*5)*.05);g2.scale.y=.06+Math.sin(t*7)*.02;
let y=Math.sin(t*1.6)*.14+run*Math.abs(Math.sin(t*11))*.14,rx=0;if(jump){const k=(performance.now()-jump)/1000;if(k>=1)jump=0;else{y+=Math.sin(k*Math.PI)*1.2;rx=-(1-Math.cos(k*Math.PI))/2*Math.PI*2}}
root.position.set(px,y,0);root.rotation.x=rx;root.rotation.z=-face*run*.2+Math.sin(t*.8)*.04;sh.position.x=px;sh.scale.setScalar(1-y*.12);
root.rotation.y=0;if(play){const k=Math.min((t-play.t0)/play.d,1),e=Math.sin(k*Math.PI),n=play.k;
if(n==='look'){inner.rotation.y+=Math.sin(k*Math.PI*3)*.8*e;inner.rotation.x+=Math.sin(k*Math.PI*2)*.25*e;eyes.position.x+=Math.sin(k*Math.PI*3)*.1*e}
else if(n==='dance'){const w=Math.sin(t*7)*e;root.rotation.z+=w*.12;root.position.y+=Math.abs(w)*.08;armL.rotation.z+=w*.5;armR.rotation.z-=w*.15;head.rotation.z+=w*.1}
else if(n==='hop'){root.position.y+=Math.abs(Math.sin(k*Math.PI*2))*.5}
else if(n==='wave'){armL.rotation.z+=-2.2*e+Math.sin(k*Math.PI*8)*.3*e;head.rotation.z+=Math.sin(k*Math.PI*2)*.08*e}
else if(n==='cheer'){armL.rotation.z+=-2.2*e;armR.rotation.z+=2.2*e;root.position.y+=Math.abs(Math.sin(k*Math.PI*4))*.16*e}
else if(n==='headTurn')head.rotation.y+=Math.sin(k*Math.PI*4)*.3*e;
else if(n==='twirl')root.rotation.y=ease(k)*Math.PI*2}
const d2=dzs>.5;ne.forEach(m=>m.visible=!d2);spr.forEach(g=>{g.visible=d2;g.rotation.z=-t*8});stars.visible=dzs>.05;stars.rotation.y=t*4;stars.scale.setScalar(Math.max(dzs,.01));sm.scale.y=1-2*dzs;
if(dzs>.01){head.rotation.z+=Math.sin(t*3.2)*.22*dzs;inner.rotation.y+=Math.sin(t*2.1)*.35*dzs;root.rotation.z+=Math.sin(t*2.4)*.18*dzs;root.position.x+=Math.sin(t*3)*.15*dzs;armL.rotation.z+=Math.sin(t*3)*.25*dzs;armR.rotation.z+=Math.sin(t*3+1)*.12*dzs;if(d2)eyes.scale.y=1}
scene.updateMatrixWorld(true);
items.forEach(it=>{const a=it.a0+t*it.sp;
const depth=Math.sin(a),absDepth=Math.abs(depth),z=depth*(1.9+.8*absDepth)/Math.max(absDepth,.3);
orb.set(px*.6+Math.cos(a)*it.rx,it.cy+Math.sin(a*2)*it.ry+Math.sin(t*1.3+it.ph)*.08,z);
it.vel.addScaledVector(it.off,-14*dt).addScaledVector(it.vel,-3*dt);it.off.addScaledVector(it.vel,dt);
it.s.position.copy(orb).add(it.off);it.s.material.rotation=Math.sin(t*1.2+it.ph)*.25+it.vel.length()*.15;
const lx=it.s.position.x-root.position.x,ly=it.s.position.y-root.position.y;
const overlapsHead=(lx/2.4)**2+((ly-1.1)/1.85)**2<1,overlapsBody=(lx/1.35)**2+((ly+.85)/1.25)**2<1;
it.s.visible=!(overlapsHead||overlapsBody)||it.s.position.z>1.8});
r.render(scene,cam);requestAnimationFrame(loop)})(0)}catch(e){}}})();
const themeRoot=document.documentElement;
const savedTheme=localStorage.getItem('juliana-theme');
themeRoot.dataset.theme=savedTheme==='dark'?'dark':'light';
$('#th').setAttribute('aria-pressed',themeRoot.dataset.theme==='dark'?'true':'false');
$('#th').onclick=()=>{
  const next=themeRoot.dataset.theme==='dark'?'light':'dark';
  themeRoot.dataset.theme=next;
  localStorage.setItem('juliana-theme',next);
  $('#th').setAttribute('aria-pressed',next==='dark'?'true':'false');
};
const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('in')),{threshold:.08});
document.querySelectorAll('.fade').forEach(e=>io.observe(e));
const links=[...document.querySelectorAll('.lk a')];
const so=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+x.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('section[id]').forEach(s=>so.observe(s));
const certCarousel=document.querySelector('[data-cert-carousel]');
if(certCarousel){
  const certCards=[...certCarousel.querySelectorAll('[data-cert-card]')];
  const certDots=[...document.querySelectorAll('[data-cert-dot]')];
  let currentCert=0;
  let certScrollFrame=0;
  const setCurrentCert=(index,scroll)=>{
    currentCert=(index+certCards.length)%certCards.length;
    certCards.forEach((card,i)=>card.classList.toggle('is-active',i===currentCert));
    certDots.forEach((dot,i)=>{
      dot.classList.toggle('is-active',i===currentCert);
      dot.setAttribute('aria-current',i===currentCert?'true':'false');
    });
    if(scroll)certCards[currentCert].scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest',inline:'nearest'});
  };
  document.querySelector('[data-cert-prev]').addEventListener('click',()=>setCurrentCert(currentCert-1,true));
  document.querySelector('[data-cert-next]').addEventListener('click',()=>setCurrentCert(currentCert+1,true));
  certDots.forEach((dot,i)=>dot.addEventListener('click',()=>setCurrentCert(i,true)));
  certCarousel.addEventListener('scroll',()=>{
    cancelAnimationFrame(certScrollFrame);
    certScrollFrame=requestAnimationFrame(()=>{
      const left=certCarousel.getBoundingClientRect().left;
      let nearest=0;
      let distance=Infinity;
      certCards.forEach((card,i)=>{
        const nextDistance=Math.abs(card.getBoundingClientRect().left-left);
        if(nextDistance<distance){nearest=i;distance=nextDistance}
      });
      setCurrentCert(nearest,false);
    });
  },{passive:true});
}
const projectCarousel=document.querySelector('[data-project-carousel]');
if(projectCarousel){
  const projectCards=[...projectCarousel.querySelectorAll('[data-project-card]')];
  const projectDots=[...document.querySelectorAll('[data-project-dot]')];
  let currentProject=0;
  let projectScrollFrame=0;
  const setCurrentProject=(index,scroll)=>{
    currentProject=(index+projectCards.length)%projectCards.length;
    projectCards.forEach((card,i)=>card.classList.toggle('is-active',i===currentProject));
    projectDots.forEach((dot,i)=>{
      dot.classList.toggle('is-active',i===currentProject);
      dot.setAttribute('aria-current',i===currentProject?'true':'false');
    });
    if(scroll)projectCards[currentProject].scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest',inline:'nearest'});
  };
  document.querySelector('[data-project-prev]').addEventListener('click',()=>setCurrentProject(currentProject-1,true));
  document.querySelector('[data-project-next]').addEventListener('click',()=>setCurrentProject(currentProject+1,true));
  projectDots.forEach((dot,i)=>dot.addEventListener('click',()=>setCurrentProject(i,true)));
  projectCarousel.addEventListener('scroll',()=>{
    cancelAnimationFrame(projectScrollFrame);
    projectScrollFrame=requestAnimationFrame(()=>{
      const maxScroll=projectCarousel.scrollWidth-projectCarousel.clientWidth;
      if(maxScroll>1&&projectCarousel.scrollLeft>=maxScroll-1){
        setCurrentProject(projectCards.length-1,false);
        return;
      }
      const left=projectCarousel.getBoundingClientRect().left;
      let nearest=0;
      let distance=Infinity;
      projectCards.forEach((card,i)=>{
        const nextDistance=Math.abs(card.getBoundingClientRect().left-left);
        if(nextDistance<distance){nearest=i;distance=nextDistance}
      });
      setCurrentProject(nearest,false);
    });
  },{passive:true});
}
const words=['Front-end Developer','Back-end Developer','Full-Stack Developer','AI Builder','Apaixonada por IA'];let w=0,c=0,d=0;
(function tp(){const s=words[w];c+=d?-1:1;$('#type').textContent=s.slice(0,c);let t=d?35:80;
if(!d&&c===s.length){d=1;t=1500}else if(d&&c===0){d=0;w=(w+1)%words.length;t=400}setTimeout(tp,t)})();

// Formulário sem backend: prepara um e-mail real no aplicativo padrão do visitante.
const contactForm=$('#contact-form');
if(contactForm){
  contactForm.addEventListener('submit',event=>{
    event.preventDefault();
    if(!contactForm.reportValidity()) return;
    const name=$('#contact-name').value.trim();
    const email=$('#contact-email').value.trim();
    const message=$('#contact-message').value.trim();
    const subject=encodeURIComponent('Contato pelo portfólio — '+name);
    const body=encodeURIComponent('Nome: '+name+'\\nE-mail: '+email+'\\n\\nMensagem:\\n'+message);
    $('#form-status').textContent='Abrindo seu aplicativo de e-mail. Revise e envie a mensagem por lá.';
    window.location.href='mailto:julianavasconcelosoliver@gmail.com?subject='+subject+'&body='+body;
  });
}

const hm=()=>new Date().toTimeString().slice(0,5);
const KB=[
[/projeto|trabalh|portf/,'A Juliana criou o site da cafeteria Encanto do Grão, este portfólio e esta assistente. Os próximos projetos vão focar em IA e automação.'],
[/stack|tecnolog|skill|habilidad|linguagem/,'Tem base prática em HTML, CSS e JavaScript. Está aprofundando Python, SQL, Power BI e lógica; utiliza Git, GitHub e VS Code.'],
[/\bia\b|inteligência|automa/,'Ela usa IA para acelerar o desenvolvimento, estudar e automatizar tarefas, e concluiu o curso de soluções de IA no GitHub.'],
[/experi|trabalhou|estágio|estagi/,'Atuou com social media na UFAM, atendimento em call center na área de saúde e atualmente trabalha como jovem aprendiz na área de RH da Murano Veículos Fiat.'],
[/estuda|facul|curso|forma|certific/,'Ela cursa Análise e Desenvolvimento de Sistemas na Estácio. Para informações atualizadas sobre disciplinas e certificados, consulte diretamente a Juliana.'],
[/contato|email|falar|whats|contrat|vaga/,'Ela está disponível para estágio e aberta a trabalho remoto. Use o formulário de contato ou escreva para julianavasconcelosoliver@gmail.com.'],
[/quem|sobre|juliana|você|voce/,'Sou um assistente demonstrativo do portfólio da Juliana. Minhas respostas são pré-programadas e não uso um modelo de IA conectado. Posso ajudar com portfólio, experiência ou projetos dela.']];
function add(t,u,h){const d=document.createElement('div');d.className='m'+(u?' u':'');if(h)d.innerHTML=t;else{d.textContent=t;if(!u||1){const s=document.createElement('small');s.textContent=hm();d.append(s)}}$('#msgs').append(d);$('#msgs').scrollTop=1e9;return d}
add('Oi! Sou o assistente demonstrativo do portfólio da Juliana. Tenho respostas pré-programadas sobre o perfil, a experiência e os projetos dela.');
['Quais são os projetos?','Qual é a stack?','Como ela usa IA?','Como entrar em contato?'].forEach(t=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>ask(t);$('#sug').append(b)});
function ask(q){add(q,1);$('#sug').style.display='none';const w=add('<span class="dots"><span></span><span></span><span></span></span>',0,1);
const r=(KB.find(k=>k[0].test(q.toLowerCase()))||[0,'Ainda não sei responder isso. Pergunte sobre projetos, stack, experiência ou contato.'])[1];
setTimeout(()=>{w.textContent=r;const s=document.createElement('small');s.textContent=hm();w.append(s);$('#msgs').scrollTop=1e9},1000)}
$('#cf').onsubmit=e=>{e.preventDefault();const v=$('#ci').value.trim();if(v){$('#ci').value='';ask(v)}};
$('#fab').onclick=()=>$('#chat').classList.toggle('on');$('#x').onclick=()=>$('#chat').classList.remove('on');
