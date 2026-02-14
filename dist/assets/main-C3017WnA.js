/* empty css               */(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerPolicy&&(t.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?t.credentials="include":s.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(s){if(s.ep)return;s.ep=!0;const t=n(s);fetch(s.href,t)}})();class _{constructor(e,n={}){this.canvas=e,this.ctx=e.getContext("2d"),this.particles=[],this.W=e.width=window.innerWidth,this.H=e.height=window.innerHeight,this.spawnRate=n.spawnRate||30,this.maxParticles=n.maxParticles||800,this.colors=n.colors||["#ff4d6d","#ffd166","#7fe7cc","#ffd6a5","#d6c9ff"],this._running=!1,this._lastSpawn=0,this._lastTime=performance.now(),this._wind=0,window.addEventListener("resize",()=>{this.W=e.width=window.innerWidth,this.H=e.height=window.innerHeight})}start(){this._running||(this._running=!0,this._lastTime=performance.now(),requestAnimationFrame(this._frame.bind(this)))}stop(){this._running=!1}toggle(){this._running?this.stop():this.start()}burst(e=120){for(let n=0;n<e;n++)this._createParticle(!0);this.start()}_createParticle(e=!1){if(this.particles.length>this.maxParticles)return;const n=e?Math.random()*6+2:Math.random()*3+1,i=Math.random()*12+6,s=Math.random()*this.W,t=e?this.H*.2:-10,o=(Math.random()-.5)*4,b=n,g=Math.random()*Math.PI*2,v=(Math.random()-.5)*.2,w=this.colors[Math.floor(Math.random()*this.colors.length)],x=Math.random()>.5?"rect":"circle";this.particles.push({x:s,y:t,vx:o,vy:b,size:i,rot:g,rotSpeed:v,color:w,shape:x,life:0})}_spawn(e){this._lastSpawn+=e;const n=1e3/this.spawnRate;for(;this._lastSpawn>n;)this._createParticle(!1),this._lastSpawn-=n}_frame(e){const n=e-this._lastTime;this._lastTime=e,this._wind=Math.sin(e/1200)*.35,this._running&&this._spawn(n);const i=this.ctx;i.clearRect(0,0,this.W,this.H);for(let s=this.particles.length-1;s>=0;s--){const t=this.particles[s];t.vx+=this._wind*.02,t.vy+=.035+t.size*8e-4,t.vx*=.999,t.vy*=.999,t.x+=t.vx,t.y+=t.vy,t.rot+=t.rotSpeed,t.life+=1,i.save(),i.translate(t.x,t.y),i.rotate(t.rot),i.fillStyle=t.color,t.shape==="rect"?i.fillRect(-t.size/2,-t.size/2,t.size,t.size*.6):(i.beginPath(),i.arc(0,0,t.size/2,0,Math.PI*2),i.fill()),i.restore(),(t.y-t.size>this.H+80||t.x<-80||t.x>this.W+80||t.life>1200)&&this.particles.splice(s,1)}(this._running||this.particles.length)&&requestAnimationFrame(this._frame.bind(this))}}const M=document.getElementById("app");M.innerHTML=`
  <div class="header">
    <div class="title-box">
      <h1>ADI's Birthday Countdown</h1>
      <p class="subtitle">15th Feb 🎂 — get ready to celebrate!</p>
    </div>
  </div>

  <section class="countdown" aria-label="Countdown timer">
    <div class="time-box" id="days"><span class="number">--</span><span class="label">Days</span></div>
    <div class="time-box" id="hours"><span class="number">--</span><span class="label">Hours</span></div>
    <div class="time-box" id="minutes"><span class="number">--</span><span class="label">Minutes</span></div>
    <div class="time-box" id="seconds"><span class="number">--</span><span class="label">Seconds</span></div>
  </section>

  <div class="message" id="message">ADI turns 23 — get your confetti ready! 🎈</div>

  <div style="text-align:center">
    <button id="celebrateBtn" class="btn">Celebrate!</button>
    <a href="/love-letter.html" class="btn" style="display:inline-block; margin-left:10px; text-decoration:none;">💌 Love Letter</a>
    <a href="/calendar.html" class="btn" style="display:inline-block; margin-left:10px; text-decoration:none;">📅 365 Days</a>
  </div>

  <div class="balloon b1">🎈</div>
  <div class="balloon b2">🎈</div>
  <div class="balloon b3">🎈</div>

  <div class="cake" aria-hidden="true"><div class="layers">🍰<span class="age-badge" aria-hidden="true">23</span></div></div>
  <canvas id="confetti-canvas"></canvas>
`;const h=document.querySelector("#days .number"),u=document.querySelector("#hours .number"),f=document.querySelector("#minutes .number"),m=document.querySelector("#seconds .number"),c=document.getElementById("message"),S=document.getElementById("celebrateBtn"),C=document.querySelector(".cake");document.querySelector("#app");const I=document.getElementById("confetti-canvas"),l=new _(I,{spawnRate:35,maxParticles:1e3});l.start();function p(){const a=new Date,e=a.getFullYear();let n=new Date(e,1,15,0,0,0,0);return a>n&&(n=new Date(e+1,1,15,0,0,0,0)),n}let d=p();function r(a){return String(a).padStart(2,"0")}let P=setInterval(y,1e3);y();function y(){let e=d-new Date;if(e<=0){clearInterval(P),E();return}const n=Math.floor(e/1e3)%60,i=Math.floor(e/1e3/60)%60,s=Math.floor(e/1e3/60/60)%24,t=Math.floor(e/1e3/60/60/24);h.textContent=t,u.textContent=r(s),f.textContent=r(i),m.textContent=r(n),t>0?c.textContent=`my baby turns turns 23 in ${t} ${t===1?"day":"days"}! 🎈`:c.textContent=`Only ${r(s)}:${r(i)}:${r(n)} until ADI turns 23! 🎉`}function E(){h.textContent="0",u.textContent="00",f.textContent="00",m.textContent="00",c.textContent="Happy 23rd Birthday ADI! 🎉",C.classList.add("celebrate","birthday23"),l.start()}S.addEventListener("click",()=>{l.burst(260)});setInterval(()=>{Math.abs(new Date-d)>1e3*60*60*24*365&&(d=p())},1e3*60*60);window._confetti=l;
