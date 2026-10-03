import { ArrowUpRight } from 'lucide-react'
import { BOT_URL } from '@/data/apps'
import { Panel, SectionHeading } from './reveal'

export function HelpPanel() {
  return (
    <Panel aria-labelledby="help-heading">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 right-4 select-none text-[210px] font-black leading-none text-white/[.03]"
      >
        ?
      </span>
      <SectionHeading id="help-heading" kicker="На связи" title="Нужна помощь?" />
      <p className="mb-5 mt-3 max-w-xs text-sm text-muted-foreground">
        Напишите в бот, если возник вопрос с установкой или подпиской.
      </p>
      <a
        href={BOT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm font-bold text-white transition-colors hover:border-white"
      >
        Перейти в Telegram
        <ArrowUpRight
          className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </a>
    </Panel>
  )
}
