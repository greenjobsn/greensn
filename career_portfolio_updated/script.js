const menuBtn=document.querySelector('.menu-btn');
const navLinks=document.querySelector('.nav-links');
menuBtn?.addEventListener('click',()=>navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

if(window.gsap){
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.reveal').forEach((el,i)=>gsap.to(el,{opacity:1,y:0,duration:.9,delay:(i%4)*.04,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}}));
  gsap.utils.toArray('.reveal-left').forEach(el=>gsap.to(el,{opacity:1,x:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 84%',once:true}}));
  gsap.utils.toArray('.parallax').forEach(el=>gsap.to(el,{yPercent:-8,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:true}}));
  gsap.utils.toArray('.parallax-soft').forEach(el=>gsap.to(el,{scale:1.08,yPercent:-4,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:true}}));
  gsap.from('.hero-copy > *',{opacity:0,y:28,duration:.9,stagger:.13,ease:'power3.out'});

  // 파친코/슬롯머신 숫자 효과
  document.querySelectorAll('.slot-number').forEach((numberEl,index)=>{
    const target=numberEl.dataset.value;
    const suffix=numberEl.dataset.suffix||'';
    numberEl.textContent='';
    [...target].forEach((char,digitIndex)=>{
      const viewport=document.createElement('span');
      viewport.className='slot-digit';
      const reel=document.createElement('span');
      reel.className='slot-reel';
      const finalDigit=Number(char);
      const spins=3+((index+digitIndex)%3);
      let sequence=[];
      for(let s=0;s<spins;s++) for(let n=0;n<=9;n++) sequence.push(n);
      for(let n=0;n<=finalDigit;n++) sequence.push(n);
      reel.innerHTML=sequence.map(n=>`<span>${n}</span>`).join('');
      viewport.appendChild(reel);
      numberEl.appendChild(viewport);
      const steps=sequence.length-1;
      gsap.set(reel,{y:0});
      ScrollTrigger.create({
        trigger:numberEl,
        start:'top 88%',
        once:true,
        onEnter:()=>gsap.to(reel,{y:`-${steps}em`,duration:1.35+digitIndex*.12,ease:'power4.out',delay:index*.06+digitIndex*.05})
      });
    });
    if(suffix){const s=document.createElement('span');s.className='slot-suffix';s.textContent=suffix;numberEl.appendChild(s)}
  });

  const sections=document.querySelectorAll('main section[id]');
  sections.forEach(section=>ScrollTrigger.create({trigger:section,start:'top center',end:'bottom center',onToggle:self=>{if(self.isActive){document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${section.id}`));}}}));
}
window.addEventListener('scroll',()=>document.querySelector('.site-header')?.classList.toggle('scrolled',window.scrollY>20));
