'use client'

import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  r: number
  depth: number
  base: number
  phase: number
  speed: number
  bright: boolean
}

type Meteor = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
  len: number
}

function makeGlowSprite(size: number) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  const half = size / 2
  const grad = g.createRadialGradient(half, half, 0, half, half, half)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.12, 'rgba(255,255,255,0.85)')
  grad.addColorStop(0.35, 'rgba(255,255,255,0.18)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, size, size)
  return c
}

export function ParticlesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let frame = 0
    let stars: Star[] = []
    let meteors: Meteor[] = []
    let nextMeteor = performance.now() + 2500
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const glow = makeGlowSprite(64)
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }

    const setup = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(420, (w * h) / 4200))
      stars = Array.from({ length: count }, () => {
        const depth = Math.pow(Math.random(), 2.2)
        const bright = Math.random() < 0.035
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          depth,
          r: bright ? 1.1 + Math.random() * 0.8 : 0.25 + depth * 1.1,
          base: bright ? 0.9 : 0.25 + depth * 0.6,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.6,
          bright,
        }
      })
    }

    const spawnMeteor = () => {
      const angle = Math.PI * (0.15 + Math.random() * 0.12)
      const speed = 9 + Math.random() * 6
      const fromLeft = Math.random() < 0.5
      meteors.push({
        x: fromLeft ? Math.random() * w * 0.5 : w * 0.5 + Math.random() * w * 0.5,
        y: Math.random() * h * 0.4,
        vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
        vy: Math.sin(angle) * speed,
        life: 0,
        max: 55 + Math.random() * 30,
        len: 120 + Math.random() * 120,
      })
    }

    const drawSpikes = (x: number, y: number, size: number, alpha: number) => {
      ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.55})`
      ctx.lineWidth = 0.6
      ctx.beginPath()
      ctx.moveTo(x - size, y)
      ctx.lineTo(x + size, y)
      ctx.moveTo(x, y - size)
      ctx.lineTo(x, y + size)
      ctx.stroke()
    }

    const render = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      pointer.x += (pointer.tx - pointer.x) * 0.04
      pointer.y += (pointer.ty - pointer.y) * 0.04
      const scroll = window.scrollY
      const time = t / 1000

      for (const s of stars) {
        const shift = 6 + s.depth * 34
        let x = s.x + pointer.x * shift
        let y = s.y - scroll * (0.02 + s.depth * 0.12) + pointer.y * shift
        y = ((y % h) + h) % h
        x = ((x % w) + w) % w

        const twinkle = reduced ? 1 : 0.55 + 0.45 * Math.sin(time * s.speed + s.phase)
        const alpha = s.base * twinkle

        if (s.bright) {
          const size = s.r * 9 * (0.85 + twinkle * 0.3)
          ctx.globalAlpha = alpha * 0.9
          ctx.drawImage(glow, x - size / 2, y - size / 2, size, size)
          ctx.globalAlpha = 1
          drawSpikes(x, y, s.r * 7 * twinkle, alpha)
        } else if (s.r > 0.9) {
          const size = s.r * 6
          ctx.globalAlpha = alpha * 0.7
          ctx.drawImage(glow, x - size / 2, y - size / 2, size, size)
          ctx.globalAlpha = 1
        }

        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduced) {
        if (t > nextMeteor) {
          spawnMeteor()
          nextMeteor = t + 3500 + Math.random() * 6000
        }
        meteors = meteors.filter((m) => m.life < m.max)
        for (const m of meteors) {
          m.life++
          m.x += m.vx
          m.y += m.vy
          const fade = Math.sin((m.life / m.max) * Math.PI)
          const mag = Math.hypot(m.vx, m.vy)
          const tx = m.x - (m.vx / mag) * m.len
          const ty = m.y - (m.vy / mag) * m.len
          const grad = ctx.createLinearGradient(m.x, m.y, tx, ty)
          grad.addColorStop(0, `rgba(255,255,255,${0.9 * fade})`)
          grad.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.2
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(m.x, m.y)
          ctx.lineTo(tx, ty)
          ctx.stroke()
          ctx.globalAlpha = fade
          ctx.drawImage(glow, m.x - 8, m.y - 8, 16, 16)
          ctx.globalAlpha = 1
        }
      }
    }

    const loop = (t: number) => {
      render(t)
      frame = requestAnimationFrame(loop)
    }

    const onMove = (e: MouseEvent) => {
      pointer.tx = e.clientX / w - 0.5
      pointer.ty = e.clientY / h - 0.5
    }
    const onResize = () => {
      setup()
      if (reduced) render(0)
    }
    const onScroll = () => {
      if (reduced) render(0)
    }

    setup()
    if (reduced) render(0)
    else frame = requestAnimationFrame(loop)

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="particles pointer-events-none fixed inset-0 -z-20"
    />
  )
}
