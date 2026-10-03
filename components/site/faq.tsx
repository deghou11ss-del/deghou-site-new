import { Plus } from 'lucide-react'
import { FAQ as ITEMS } from '@/data/apps'
import { Panel, SectionHeading } from './reveal'

export function FAQ() {
  return (
    <Panel id="faq" aria-labelledby="faq-heading">
      <SectionHeading id="faq-heading" kicker="Помощь" title="Частые вопросы" />
      <div className="mt-6 flex flex-col gap-2">
        {ITEMS.map((item, i) => (
          <details
            key={item.q}
            className="group overflow-hidden rounded-xl border border-border bg-[#0c0c0c]/70 transition-colors hover:border-border-strong open:border-border-strong open:bg-[#121212]/80"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 px-4 py-4 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
              <span className="font-mono text-[11px] text-neutral-600" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1">{item.q}</span>
              <Plus className="size-4 shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="px-4 pb-4 pl-[52px] text-[13px] leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </Panel>
  )
}
