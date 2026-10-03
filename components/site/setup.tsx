'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, ChevronDown, Copy, Share2 } from 'lucide-react'
import { APPS, BOT_URL, OS_OPTIONS, type AppEntry, type OSKey } from '@/data/apps'
import { useDetectOS } from '@/hooks/use-detect-os'
import { AppIcon } from './app-icon'
import { Panel, SectionHeading } from './reveal'

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = async (text: string, key = text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1800)
    } catch {
      window.prompt('Скопируйте ссылку', text)
    }
  }
  return { copied, copy }
}

function Step({ n, title, last, children }: { n: number; title: string; last?: boolean; children: React.ReactNode }) {
  return (
    <li className={`relative grid grid-cols-[34px_1fr] gap-4 ${last ? '' : 'pb-7'}`}>
      {!last && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[16.5px] top-[38px] w-px bg-gradient-to-b from-white/30 to-white/[.04]"
        />
      )}
      <span className="grid size-[34px] place-items-center rounded-full bg-white font-mono text-[13px] font-bold text-black shadow-[0_0_0_4px_rgba(255,255,255,.08),0_8px_20px_rgba(0,0,0,.4)]">
        {n}
      </span>
      <div className="min-w-0 pt-1">
        <h3 className="mb-1.5 text-[15px] font-semibold text-white">{title}</h3>
        {children}
      </div>
    </li>
  )
}

const ghostBtn =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-border-strong bg-white/[.04] px-4 py-2.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/10'

function AppInstructions({ app }: { app: AppEntry }) {
  const { copied, copy } = useCopy()

  return (
    <ol className="flex flex-col" aria-live="polite">
      <Step n={1} title="Установка приложения">
        <div className="flex flex-col gap-4">
          {app.instructions.map((ins) => (
            <div key={ins.title}>
              {app.instructions.length > 1 || ins.title !== 'Установка' ? (
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">{ins.title}</p>
              ) : null}
              <p className="whitespace-pre-line text-[13px] leading-relaxed text-muted-foreground">{ins.text}</p>
            </div>
          ))}

          {app.address && (
            <div className="overflow-hidden rounded-xl border border-border bg-black/40">
              <p className="border-b border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">
                Адрес для Казахстана
              </p>
              <dl className="divide-y divide-border">
                {app.address.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-3 px-4 py-2">
                    <dt className="text-xs text-muted-foreground">{row.label}</dt>
                    <dd className="flex items-center gap-2">
                      <span className="font-mono text-[13px] text-white">{row.value}</span>
                      <button
                        type="button"
                        onClick={() => copy(row.value, row.label)}
                        aria-label={`Скопировать ${row.label}`}
                        className="grid size-7 place-items-center rounded-md text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {copied === row.label ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                      </button>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {app.installs.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border-strong bg-white/[.04] px-3 py-2 text-xs font-semibold text-neutral-200 transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/10 hover:text-white"
              >
                {link.label}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </Step>

      <Step n={2} title="Добавление подписки">
        <p className="text-[13px] text-muted-foreground">Нажмите на кнопку ниже, чтобы скопировать ссылку.</p>
        <button type="button" onClick={() => copy(BOT_URL, 'sub')} className={`${ghostBtn} mt-3 w-full`}>
          {copied === 'sub' ? (
            <>
              <Check className="size-4" aria-hidden="true" /> Ссылка скопирована
            </>
          ) : (
            <>
              <Copy className="size-4" aria-hidden="true" /> Скопировать
            </>
          )}
        </button>
      </Step>

      <Step n={3} title="Подключение и использование" last>
        <p className="whitespace-pre-line text-[13px] leading-relaxed text-muted-foreground">{app.connect}</p>
      </Step>
    </ol>
  )
}

export function Setup() {
  const detected = useDetectOS()
  const [chosen, setChosen] = useState<OSKey | null>(null)
  const [appIndex, setAppIndex] = useState(0)
  const [shared, setShared] = useState(false)

  const os = chosen ?? detected ?? 'windows'
  const apps = APPS[os]
  const app = apps[Math.min(appIndex, apps.length - 1)]

  const onShare = async () => {
    const data = { title: 'DeGhouVPN', text: 'Инструкция по подключению DeGhouVPN', url: BOT_URL }
    try {
      if (navigator.share) {
        await navigator.share(data)
      } else {
        await navigator.clipboard.writeText(BOT_URL)
        setShared(true)
        setTimeout(() => setShared(false), 1800)
      }
    } catch (e) {
      if ((e as Error).name !== 'AbortError') window.prompt('Скопируйте ссылку', BOT_URL)
    }
  }

  return (
    <Panel id="setup" aria-labelledby="setup-heading">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <SectionHeading
          id="setup-heading"
          kicker="Пошагово"
          title="Подключите устройство"
          sub="Подберём инструкцию под вашу систему."
        />
        <label className="relative block shrink-0 sm:w-44">
          <span className="sr-only">Операционная система</span>
          <select
            value={os}
            onChange={(e) => {
              setChosen(e.target.value as OSKey)
              setAppIndex(0)
            }}
            className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-border-strong bg-white/[.04] pl-3.5 pr-10 text-[13px] font-semibold text-white transition-colors hover:border-white/40"
          >
            {OS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-neutral-950">
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-white"
            aria-hidden="true"
          />
        </label>
      </div>

      <div role="group" aria-label="Приложения" className="mb-7 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap">
        {apps.map((a, i) => {
          const active = a.name === app.name
          return (
            <button
              key={a.name}
              type="button"
              aria-pressed={active}
              onClick={() => setAppIndex(i)}
              className={`flex items-center gap-3 rounded-xl border py-2 pl-2 pr-4 text-[13px] font-semibold transition-all hover:-translate-y-0.5 ${
                active
                  ? 'border-white bg-white/[.09] text-white shadow-[0_8px_22px_rgba(0,0,0,.4),0_0_24px_rgba(255,255,255,.06)]'
                  : 'border-border-strong bg-white/[.03] text-neutral-300 hover:border-white/50 hover:text-white'
              }`}
            >
              <AppIcon src={a.icon} name={a.name} />
              {a.name}
            </button>
          )
        })}
      </div>

      <AppInstructions key={`${os}-${app.name}`} app={app} />

      <div className="mt-7 flex flex-col gap-2.5 border-t border-border pt-6 sm:flex-row">
        <a
          href={BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shine group inline-flex min-h-[52px] flex-1 items-center justify-center gap-2.5 rounded-2xl border border-white bg-white px-7 text-[15px] font-bold text-black shadow-[0_10px_32px_rgba(255,255,255,.15)] transition-all [--shine-color:rgba(0,0,0,.1)] hover:-translate-y-0.5 hover:bg-neutral-200"
        >
          Получить подписку
          <ArrowUpRight
            className="size-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
        <button type="button" onClick={onShare} className={`${ghostBtn} min-h-[52px] rounded-2xl px-6`}>
          {shared ? <Check className="size-4" aria-hidden="true" /> : <Share2 className="size-4" aria-hidden="true" />}
          {shared ? 'Скопировано' : 'Поделиться'}
        </button>
      </div>
    </Panel>
  )
}
