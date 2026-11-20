// ဓာတ်ပုံအမည်၊ စာတန်းနှင့် Password ကို ဒီဖိုင်ထဲမှာ ပြင်နိုင်ပါတယ်။
const slides = [
  {src:'images/photo1.jpg', caption:''},
  {src:'images/photo2.jpg', caption:''},
  {src:'images/photo3.jpg', caption:''},
  {src:'images/photo4.jpg', caption:''},
  {src:'images/photo5.jpg', caption:''},
];
let current = 0;
const slide = document.getElementById('slide');
if (slide) {
  const caption = document.getElementById('caption');
  const dots = document.getElementById('dots');
  function showSlide(n) {
    current = (n + slides.length) % slides.length;
    slide.src = slides[current].src;
    caption.textContent = slides[current].caption;
    dots.innerHTML = slides.map((_,i)=>`<span class="dot ${i===current?'active':''}"></span>`).join('');
  }
  document.getElementById('prev').addEventListener('click',()=>showSlide(current-1));
  document.getElementById('next').addEventListener('click',()=>showSlide(current+1));
  showSlide(0);
  setInterval(()=>showSlide(current+1),4500);
}
const candle = document.getElementById('candle');
if (candle) candle.addEventListener('click',()=>{
  candle.classList.toggle('out');
  document.getElementById('wish').textContent = candle.classList.contains('out') ? 'နောင့်ရဲ့ဆုတောင်းလေးတွေအမြန်ဆုံးပြည့်ဝတော့မှာဖြစ်ပါတယ်ခင်ဗျာ 🎉' : 'နောင့်ရဲ့ ဆန္ဒလေးတွေ အားလုံး ပြည့်ဝပါစေနော်။ ✨';
});
const gift = document.getElementById('gift');
if (gift) gift.addEventListener('click',()=>{
  gift.classList.add('open');
  document.getElementById('gift-message').classList.remove('hidden');
});
const form = document.getElementById('secret-form');
if (form) form.addEventListener('submit',e=>{
  e.preventDefault();
  // Demo only: client-side password is visible in source code. Not secure for confidential messages.
  const correctPassword = '2/10/2026';
  const ok = document.getElementById('password').value === correctPassword;
  document.getElementById('error').textContent = ok ? '' : 'စကားဝှက် မမှန်သေးပါ။ ထပ်ကြိုးစားကြည့်ပါ။';
  if (ok) {
    document.getElementById('unlock-message').classList.remove('hidden');
    form.querySelector('button').disabled = true;
    startFireworks();
    setTimeout(()=>{ window.location.href = 'memories.html'; }, 1800);
  }
});
// Floating hearts / flowers effect
const holder = document.querySelector('.floating-hearts');
if (holder) setInterval(()=>{
  const el = document.createElement('span');
  el.className='heart'; el.textContent=Math.random()>.25?'♥':'✿';
  el.style.left=Math.random()*100+'%'; el.style.fontSize=(12+Math.random()*20)+'px';
  el.style.animationDuration=(7+Math.random()*6)+'s'; holder.appendChild(el);
  setTimeout(()=>el.remove(),14000);
},650);
// Lightweight canvas fireworks on the final page
function startFireworks(){
  const canvas=document.getElementById('fireworks'); if(!canvas || canvas.dataset.running) return;
  canvas.dataset.running='1'; const ctx=canvas.getContext('2d'); let particles=[];
  function resize(){canvas.width=innerWidth;canvas.height=innerHeight} resize(); addEventListener('resize',resize);
  function burst(){
    const x=Math.random()*canvas.width,y=Math.random()*canvas.height*.55;
    for(let i=0;i<55;i++){const a=Math.PI*2*i/55,s=1+Math.random()*4;particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:70+Math.random()*30});}
  }
  for(let i=0;i<5;i++) setTimeout(burst,i*450);
  function frame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles=particles.filter(p=>p.life-->0);
    for(const p of particles){p.x+=p.vx;p.y+=p.vy;p.vy+=.025;ctx.globalAlpha=Math.max(0,p.life/100);ctx.fillStyle=['#ff9bc8','#ffe49a','#c8a8ff'][p.life%3|0];ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill();}
    ctx.globalAlpha=1; if(particles.length) requestAnimationFrame(frame);
  } frame();
}