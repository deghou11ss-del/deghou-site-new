import { PLATFORMS } from '@/data/apps'

export function PlatformStrip() {
  const loop = [...PLATFORMS, ...PLATFORMS]
  return (
    <div className="group mb-4 flex items-center gap-6 overflow-hidden rounded-2xl border border-border bg-[#0a0a0a]/70 px-5 py-3.5 backdrop-blur-md sm:mb-5">
      <span className="hidden shrink-0 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground md:block">
        Поддержка платформ
      </span>
      <p className="sr-only">Поддерживаемые платформы: {PLATFORMS.join(', ')}</p>
      <div
        aria-hidden="true"
        className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
      >
        <div className="animate-marquee group-hover:paused flex w-max items-center gap-6 text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-300">
          {loop.map((p, i) => (
            <span key={i} className="flex items-center gap-6 whitespace-nowrap">
              {p}
              <span className="text-[8px] text-neutral-600">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
