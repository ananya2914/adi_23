import './styles.css'
import ConfettiEngine from './confetti.js'

// Build DOM
const app = document.getElementById('app')
app.innerHTML = `
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
`

// Elements
const daysEl = document.querySelector('#days .number')
const hoursEl = document.querySelector('#hours .number')
const minutesEl = document.querySelector('#minutes .number')
const secondsEl = document.querySelector('#seconds .number')
const messageEl = document.getElementById('message')
const celebrateBtn = document.getElementById('celebrateBtn')
const cake = document.querySelector('.cake')
const wrap = document.querySelector('#app')

// Confetti
const canvas = document.getElementById('confetti-canvas')
const confetti = new ConfettiEngine(canvas, { spawnRate: 35, maxParticles: 1000 })

// Start confetti flowing by default
confetti.start()

// Countdown logic
function getNextBirthday(){
  const now = new Date()
  const year = now.getFullYear()
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
  // cute dynamic message: days, otherwise show hh:mm:ss and mention turning 23
  if (days > 0) {
    messageEl.textContent = `my baby turns turns 23 in ${days} ${days === 1 ? 'day' : 'days'}! 🎈`
  } else {
    messageEl.textContent = `Only ${pad(hours)}:${pad(mins)}:${pad(secs)} until ADI turns 23! 🎉`
  }
}

function showBirthday(){
  daysEl.textContent = '0'
  hoursEl.textContent = '00'
  minutesEl.textContent = '00'
  secondsEl.textContent = '00'
  messageEl.textContent = "Happy 23rd Birthday ADI! 🎉"
  cake.classList.add('celebrate','birthday23')
  // Make confetti flow automatically at celebration
  confetti.start()
}

celebrateBtn.addEventListener('click', ()=>{
  confetti.burst(260)
})

// Accessibility: adjust if system date changes
setInterval(()=>{ if(Math.abs(new Date()-target) > 1000*60*60*24*365) target = getNextBirthday() }, 1000*60*60)

// Export for console fiddling
window._confetti = confetti
