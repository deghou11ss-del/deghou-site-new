import { ArrowUpRight } from 'lucide-react'
import { BOT_URL } from '@/data/apps'
import { LogoMark } from './logo-mark'

export function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden sm:mt-14">
      <div
        aria-hidden="true"
        className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
      <div className="flex flex-col gap-4 pt-6 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
        <span className="flex items-center gap-2.5 text-sm font-black tracking-tighter text-white">
          <LogoMark className="size-7" />
          DeGhouVPN
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Надежд не будет. Будет интернет.</span>
        <a
          href={BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-white"
        >
          Помощь <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
      <p
        aria-hidden="true"
        className="wordmark pointer-events-none mt-6 select-none whitespace-nowrap text-center text-[clamp(56px,16.5vw,196px)] font-black leading-[0.8] tracking-[-0.07em]"
      >
        DeGhouVPN
      </p>
    </footer>
  )
}
