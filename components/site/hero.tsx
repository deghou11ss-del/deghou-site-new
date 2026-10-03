import { ArrowUpRight, Infinity as InfinityIcon, Lock, Zap } from 'lucide-react'

const STATS = [
  { value: '7', label: 'платформ' },
  { value: '950', label: 'Мбит/с в среднем' },
  { value: '∞', label: 'трафик' },
]

const CHIPS = [
  { icon: Lock, label: 'Защищено', className: 'left-[-6%] top-[22%]', delay: '0s' },
  { icon: Zap, label: '950 Мбит/с', className: 'right-[-8%] top-[46%]', delay: '1.4s' },
  { icon: InfinityIcon, label: 'Безлимит', className: 'bottom-[8%] left-[8%]', delay: '2.8s' },
]

function ShieldIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="size-20 text-white drop-shadow-[0_0_14px_rgba(255,255,255,.5)]">
      <path
        d="M40 7 64 17v19c0 17-9 29-24 37C25 65 16 53 16 36V17L40 7Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="m29 40 8 8 15-17" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HeroArt() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-36 top-16 grid h-[340px] w-[340px] scale-75 place-items-center opacity-20 [perspective:1000px] md:pointer-events-auto md:relative md:right-auto md:top-auto md:mx-auto md:scale-100 md:opacity-100"
    >
      <div className="absolute size-[280px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.08),transparent_65%)]" />
      <div className="animate-orbit-breath absolute size-[320px] rounded-full border border-white/[.08]" />
      <div className="radar absolute size-[248px] rounded-full" />
      <div className="animate-spin-slow absolute size-[248px] rounded-full border border-dashed border-white/[.16]">
        <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,.9)]" />
        <span className="absolute -bottom-[3px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-white/60" />
      </div>
      <div className="animate-spin-reverse absolute size-[180px] rounded-full border border-white/10 bg-white/[.02]">
        <span className="absolute -bottom-[3px] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-white/70" />
        <span className="absolute -left-[3px] top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_#fff]" />
      </div>
      <span className="animate-signal absolute right-[13%] top-[13%] size-[11px] rounded-full bg-white" />
      <span className="animate-signal absolute bottom-[18%] left-[10%] size-1.5 rounded-full bg-white/80 [animation-delay:1.2s]" />

      <div className="shield-3d">
        <div className="shield-layer" />
        <div className="shield-layer" />
        <div className="shield-layer">
          <ShieldIcon />
        </div>
        <div className="shield-layer" />
        <div className="shield-layer" />
      </div>

      {CHIPS.map(({ icon: Icon, label, className, delay }) => (
        <div
          key={label}
          className={`animate-float absolute hidden items-center gap-2 rounded-full border border-white/15 bg-[#0d0d0d]/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-200 shadow-[0_10px_30px_rgba(0,0,0,.5),inset_0_1px_rgba(255,255,255,.08)] backdrop-blur-md md:flex ${className}`}
          style={{ animationDelay: delay }}
        >
          <Icon className="size-3 text-white" />
          {label}
        </div>
      ))}
    </div>
  )
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="animate-hero-enter relative isolate mb-4 grid items-center overflow-hidden rounded-[22px] border border-border bg-[linear-gradient(125deg,#0a0a0a_0%,#121212_48%,#050505_100%)] px-5 py-8 shadow-[inset_0_1px_rgba(255,255,255,.06),0_35px_100px_rgba(0,0,0,.6)] sm:mb-5 sm:rounded-[32px] sm:px-10 sm:py-12 md:min-h-[460px] md:grid-cols-[1.08fr_.92fr] lg:px-14"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-40" />
      <div aria-hidden="true" className="hero-beam -z-10" />
      <div
        aria-hidden="true"
        className="animate-halo absolute -right-44 -top-32 -z-10 size-[620px] rounded-full border border-white/5 shadow-[0_0_0_75px_rgba(255,255,255,.02),0_0_0_150px_rgba(255,255,255,.01),0_0_120px_rgba(255,255,255,.05)]"
      />
      <div aria-hidden="true" className="hero-border" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      <div className="relative z-10">
        <p className="animate-rise mb-6 inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-white/[.03] py-1.5 pl-2 pr-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-300 shadow-[inset_0_1px_rgba(255,255,255,.06)] backdrop-blur-sm">
          <span className="animate-signal size-2 rounded-full bg-white" aria-hidden="true" />
          Серверы онлайн
        </p>
        <h1
          id="hero-heading"
          className="animate-rise mb-8 max-w-[650px] text-[clamp(38px,9vw,78px)] font-black leading-[0.95] tracking-[-0.065em] text-white [animation-delay:.12s]"
        >
          Интернет
          <br />
          <span className="text-shimmer">без лишних границ.</span>
        </h1>

        <div className="animate-rise flex flex-wrap items-center gap-3 [animation-delay:.24s]">
          <a
            href="#setup"
            className="shine group relative inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-2xl border border-white bg-white px-7 text-[15px] font-bold text-black shadow-[0_10px_32px_rgba(255,255,255,.2)] transition-all [--shine-color:rgba(0,0,0,.1)] hover:-translate-y-1 hover:bg-neutral-200 hover:shadow-[0_16px_40px_rgba(255,255,255,.35)]"
          >
            Подключиться
            <ArrowUpRight
              className="size-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
          <a
            href="#faq"
            className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-border-strong bg-white/[.02] px-6 text-[15px] font-semibold text-neutral-300 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-white/40 hover:text-white"
          >
            Как это работает
          </a>
        </div>

        <dl className="animate-rise mt-10 grid max-w-md grid-cols-3 border-t border-border pt-6 [animation-delay:.36s]">
          {STATS.map((s, i) => (
            <div key={s.label} className={i > 0 ? 'border-l border-border pl-4 sm:pl-5' : 'pr-4'}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-mono text-2xl font-semibold tracking-tight text-white drop-shadow-[0_0_18px_rgba(255,255,255,.25)] sm:text-3xl">
                {s.value}
              </dd>
              <dd className="mt-1 text-[11px] leading-snug text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <HeroArt />
    </section>
  )
}
