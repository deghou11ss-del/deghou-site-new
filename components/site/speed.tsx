'use client'

import { useEffect, useRef, useState } from 'react'
import { Panel, SectionHeading } from './reveal'

const TARGET = 950
const MAX = 1000
const DURATION = 1800

export function Speed() {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / DURATION, 1)
        setValue(Math.floor(TARGET * (1 - Math.pow(1 - p, 3))))
        if (p < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  const pct = (value / MAX) * 100

  return (
    <Panel aria-labelledby="speed-heading">
      <SectionHeading id="speed-heading" kicker="Скорость" title="Средняя скорость" />
      <div ref={ref} className="mt-6 flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-5xl font-semibold tracking-tighter text-white tabular-nums drop-shadow-[0_0_24px_rgba(255,255,255,.25)] sm:text-6xl">
            {value}
          </p>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Мбит/с</span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={MAX}
          aria-valuenow={value}
          aria-label="Средняя скорость, Мбит/с"
          className="relative h-3 rounded-full border border-border bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.05)_0_2px,transparent_2px_10px)]"
        >
          <div
            className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-neutral-700 via-neutral-300 to-white shadow-[0_0_24px_rgba(255,255,255,.45)]"
            style={{ width: `${pct}%` }}
          >
            <div className="bar-shimmer absolute inset-0" />
          </div>
          <span
            aria-hidden="true"
            className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black bg-white shadow-[0_0_0_4px_rgba(255,255,255,.12),0_0_20px_rgba(255,255,255,.9)]"
            style={{ left: `${pct}%`, opacity: value > 0 ? 1 : 0 }}
          />
        </div>
        <div className="flex justify-between font-mono text-[10px] text-neutral-600" aria-hidden="true">
          <span>0</span>
          <span>250</span>
          <span>500</span>
          <span>750</span>
          <span>1000</span>
        </div>
        <p className="text-xs text-neutral-500">Замеры по нашим серверам в часы пик.</p>
      </div>
    </Panel>
  )
}
