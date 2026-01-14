// Countdown to ADI's birthday (15th Feb, local time)
(function(){
  const daysEl = document.querySelector('#days .number')
  const hoursEl = document.querySelector('#hours .number')
  const minutesEl = document.querySelector('#minutes .number')
  const secondsEl = document.querySelector('#seconds .number')
  const messageEl = document.getElementById('message')
  const celebrateBtn = document.getElementById('celebrateBtn')
  const cake = document.querySelector('.cake')
  const wrap = document.querySelector('.wrap')

  function getNextBirthday(){
    const now = new Date()
    const year = now.getFullYear()
    // month is 0-based: Feb = 1
    let target = new Date(year, 1, 15, 0, 0, 0, 0)
    if(now > target) target = new Date(year+1, 1, 15, 0, 0, 0, 0)
    return target
  }

  let target = getNextBirthday()

  function pad(n){return String(n).padStart(2,'0')}

  let countdownInterval = setInterval(update,1000)
  update()

  function update(){
    const now = new Date()
    let diff = target - now
    if(diff <= 0){
      clearInterval(countdownInterval)
      showBirthday()
      return
    }
    const secs = Math.floor(diff/1000)%60
    const mins = Math.floor(diff/1000/60)%60
    const hours = Math.floor(diff/1000/60/60)%24
    const days = Math.floor(diff/1000/60/60/24)

    daysEl.textContent = days
    hoursEl.textContent = pad(hours)
    minutesEl.textContent = pad(mins)
    secondsEl.textContent = pad(secs)
    messageEl.textContent = `Time until ${target.toLocaleDateString(undefined, {day:'numeric', month:'short'})}`
  }

  function showBirthday(){
    daysEl.textContent = '0'
    hoursEl.textContent = '00'
    minutesEl.textContent = '00'
    secondsEl.textContent = '00'
    messageEl.textContent = "Happy Birthday ADI! 🎉"
    cake.classList.add('celebrate')
    wrap.classList.add('celebrate')
    // launch confetti for a while
    confettiBurst({duration:8000})
  }

  celebrateBtn.addEventListener('click', ()=>{
    confettiBurst({duration:5000})
  })

  // --- simple confetti ---
  const canvas = document.getElementById('confetti-canvas')
  const ctx = canvas.getContext('2d')
  let W = canvas.width = window.innerWidth
  let H = canvas.height = window.innerHeight
  let particles = []

  window.addEventListener('resize', ()=>{
    W = canvas.width = window.innerWidth
    H = canvas.height = window.innerHeight
  })

  function random(min,max){return Math.random()*(max-min)+min}

  function createParticles(amount){
    const colors = ['#ff4d6d','#ffd166','#7fe7cc','#ffd6a5','#d6c9ff']
    for(let i=0;i<amount;i++){
      particles.push({
        x: random(0,W),
        y: random(-H*0.2, -10),
        vx: random(-1.5,1.5),
        vy: random(2,7),
        size: random(6,14),
        rot: random(0,Math.PI*2),
        rotSpeed: random(-0.08,0.08),
        color: colors[Math.floor(Math.random()*colors.length)],
        shape: Math.random()>0.5? 'rect':'circle',
        life: 0
      })
    }
  }

  let animating = false
  let animStart
  function confettiBurst({duration=5000, amount=140} = {}){
    createParticles(amount)
    animStart = performance.now()
    if(!animating){animating = true; requestAnimationFrame(render)}
    setTimeout(()=>{
      // stop creating new particles; let existing ones fall out
    }, duration)
  }

  function render(now){
    ctx.clearRect(0,0,W,H)
    for(let i=particles.length-1;i>=0;i--){
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.05 // gravity
      p.rot += p.rotSpeed
      p.life += 1

      ctx.save()
      ctx.translate(p.x,p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      if(p.shape === 'rect'){
        ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*0.6)
      }else{
        ctx.beginPath(); ctx.arc(0,0,p.size/2,0,Math.PI*2); ctx.fill();
      }
      ctx.restore()

      // remove if off-screen
      if(p.y - p.size > H + 40 || p.x < -80 || p.x > W + 80) particles.splice(i,1)
    }

    if(particles.length || (animating && performance.now() - animStart < 4000)){
      requestAnimationFrame(render)
    }else{
      animating = false
      ctx.clearRect(0,0,W,H)
    }
  }

  // For accessibility: recalc target if system date changed
  setInterval(()=>{ if(Math.abs(new Date()-target) > 1000*60*60*24*365) target = getNextBirthday() }, 1000*60*60)

})();
