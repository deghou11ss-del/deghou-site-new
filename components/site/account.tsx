'use client'

import { useSearchParams } from 'next/navigation'
import { CalendarDays, Infinity as InfinityIcon, ShieldCheck, User } from 'lucide-react'
import { Panel, SectionHeading } from './reveal'

const DEMO_EXPIRES = '31.12.2026'

export function Account() {
  const params = useSearchParams()
  const userId = params.get('user_id')?.slice(0, 40) || 'Гость'

  const metrics = [
    { icon: User, label: 'Пользователь', value: userId, mono: true },
    { icon: ShieldCheck, label: 'Статус', value: 'Активна', live: true },
    { icon: CalendarDays, label: 'Истекает', value: DEMO_EXPIRES, mono: true },
    { icon: InfinityIcon, label: 'Трафик', value: 'Безлимит' },
  ]

  return (
    <Panel id="account" aria-labelledby="account-heading">
      <div className="mb-6 flex items-start justify-between gap-4">
        <SectionHeading id="account-heading" kicker="Обзор" title="Ваш кабинет" />
        <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border-strong bg-white/[.03] px-3 py-1.5 text-[11px] font-semibold text-neutral-300">
          <span className="animate-signal size-2 rounded-full bg-white" aria-hidden="true" />
          Демо
        </span>
      </div>

      <dl className="grid grid-cols-1 gap-2.5 min-[430px]:grid-cols-2">
        {metrics.map(({ icon: Icon, label, value, mono, live }) => (
          <div
            key={label}
            className="flex min-h-[104px] flex-col justify-between gap-3 rounded-2xl border border-border bg-gradient-to-br from-[#111]/90 to-[#0a0a0a]/90 p-4 transition-all hover:-translate-y-0.5 hover:border-border-strong"
          >
            <dt className="flex items-center gap-2 text-xs text-neutral-400">
              <Icon className="size-4 text-white" aria-hidden="true" />
              {label}
            </dt>
            <dd
              className={`flex items-center gap-2 break-all text-lg font-bold leading-tight tracking-tight text-white ${
                mono ? 'font-mono text-base font-semibold' : ''
              }`}
            >
              {live && <span className="size-1.5 shrink-0 rounded-full bg-white shadow-[0_0_10px_#fff]" aria-hidden="true" />}
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-[11px] leading-relaxed text-neutral-500">
        Поля показаны для макета. Подключите API, чтобы выводить реальные данные.
      </p>
    </Panel>
  )
}
