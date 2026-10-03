'use client'

import { useEffect, useRef, type ComponentPropsWithoutRef, type PointerEvent } from 'react'

export function Panel({ className = '', children, ...props }: ComponentPropsWithoutRef<'section'>) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    el.classList.add('reveal')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.08 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <section ref={ref} onPointerMove={handlePointerMove} className={`panel p-5 sm:p-7 ${className}`} {...props}>
      <span className="panel-spot" aria-hidden="true" />
      <span className="panel-edge" aria-hidden="true" />
      <div className="relative z-[1]">{children}</div>
    </section>
  )
}

export function SectionHeading({
  kicker,
  title,
  sub,
  id,
}: {
  kicker: string
  title: string
  sub?: string
  id?: string
}) {
  return (
    <div>
      <p className="mb-2.5 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        <span className="size-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,.9)]" aria-hidden="true" />
        <span className="h-px w-5 bg-gradient-to-r from-white/60 to-transparent" aria-hidden="true" />
        {kicker}
      </p>
      <h2 id={id} className="text-balance text-xl font-bold tracking-tight text-white sm:text-2xl">
        {title}
      </h2>
      {sub && <p className="mt-2 text-sm text-muted-foreground">{sub}</p>}
    </div>
  )
}
