import { ArrowUpRight } from 'lucide-react'
import { BOT_URL } from '@/data/apps'
import { LogoMark } from './logo-mark'

const NAV = [
  { href: '#setup', label: 'Установка' },
  { href: '#faq', label: 'Вопросы' },
]

export function Header() {
  return (
    <header className="animate-fade-drop sticky top-2 z-30 mb-4 flex items-center justify-between gap-5 rounded-2xl border border-border bg-[#07090e]/80 px-2.5 py-2 shadow-[0_12px_35px_rgba(0,0,0,.5)] backdrop-blur-xl sm:static sm:mb-10 sm:border-transparent sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none">
      <a href="#top" className="flex items-center gap-3 text-lg font-black tracking-tighter text-white sm:text-xl">
        <LogoMark className="size-9 sm:size-11" />
        DeGhouVPN
      </a>

      <nav aria-label="Разделы" className="hidden md:block">
        <ul className="flex items-center gap-1 rounded-full border border-border bg-white/[.02] p-1 backdrop-blur-md">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-full px-4 py-1.5 text-[13px] font-semibold text-muted-foreground transition-colors hover:bg-white/[.06] hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a
        href={BOT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram бот"
        className="shine inline-flex size-10 items-center justify-center gap-2 rounded-xl border border-border-strong bg-white/[.02] text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/[.06] hover:shadow-[0_0_30px_rgba(255,255,255,.15)] sm:h-auto sm:w-auto sm:rounded-full sm:px-[18px] sm:py-2.5"
      >
        <ArrowUpRight className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Telegram бот</span>
      </a>
    </header>
  )
}
