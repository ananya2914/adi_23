export default class ConfettiEngine {
  constructor(canvas, opts = {}){
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.particles = []
    this.W = canvas.width = window.innerWidth
    this.H = canvas.height = window.innerHeight
    this.spawnRate = opts.spawnRate || 30 // particles per second when flowing
    this.maxParticles = opts.maxParticles || 800
    this.colors = opts.colors || ['#ff4d6d','#ffd166','#7fe7cc','#ffd6a5','#d6c9ff']
    this._running = false
    this._lastSpawn = 0
    this._lastTime = performance.now()
    this._wind = 0

    window.addEventListener('resize', ()=>{
      this.W = canvas.width = window.innerWidth
      this.H = canvas.height = window.innerHeight
    })
  }

  start(){
    if(this._running) return
    this._running = true
    this._lastTime = performance.now()
    requestAnimationFrame(this._frame.bind(this))
  }

  stop(){
    this._running = false
  }

  toggle(){
    this._running ? this.stop() : this.start()
  }

  burst(amount = 120){
    for(let i=0;i<amount;i++) this._createParticle(true)
    this.start()
  }

  _createParticle(fromBurst=false){
    if(this.particles.length > this.maxParticles) return
    const speed = fromBurst ? (Math.random()*6 + 2) : (Math.random()*3 + 1)
    const size = Math.random()*12 + 6
    const x = Math.random()*this.W
    const y = fromBurst ? (this.H*0.2) : (-10)
    const vx = (Math.random()-0.5)*4
    const vy = speed
    const rot = Math.random()*Math.PI*2
    const rotSpeed = (Math.random()-0.5)*0.2
    const color = this.colors[Math.floor(Math.random()*this.colors.length)]
    const shape = Math.random() > 0.5 ? 'rect' : 'circle'
    this.particles.push({x,y,vx,vy,size,rot,rotSpeed,color,shape,life:0})
  }

  _spawn(delta){
    // spawn according to spawnRate (per second)
    this._lastSpawn += delta
    const interval = 1000 / this.spawnRate
    while(this._lastSpawn > interval){
      this._createParticle(false)
      this._lastSpawn -= interval
    }
  }

  _frame(now){
    const delta = now - this._lastTime
    this._lastTime = now

    // wind oscillation
    this._wind = Math.sin(now/1200) * 0.35

    if(this._running) this._spawn(delta)

    const ctx = this.ctx
    ctx.clearRect(0,0,this.W,this.H)

    for(let i=this.particles.length-1;i>=0;i--){
      const p = this.particles[i]
      // physics
      p.vx += this._wind * 0.02
      p.vy += 0.035 + (p.size*0.0008) // gravity + slight size-based
      p.vx *= 0.999 // air drag
      p.vy *= 0.999
      p.x += p.vx
      p.y += p.vy
      p.rot += p.rotSpeed
      p.life += 1

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      if(p.shape === 'rect'){
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6)
      }else{
        ctx.beginPath(); ctx.arc(0,0,p.size/2,0,Math.PI*2); ctx.fill();
      }
      ctx.restore()

      // remove if off-screen or too old
      if(p.y - p.size > this.H + 80 || p.x < -80 || p.x > this.W + 80 || p.life > 1200) this.particles.splice(i,1)
    }

    if(this._running || this.particles.length) requestAnimationFrame(this._frame.bind(this))
  }
}
