'use client'

import { useEffect, useRef, useState } from 'react'

export function AppIcon({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(!src)
  const imgRef = useRef<HTMLImageElement>(null)
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)

  useEffect(() => {
    const img = imgRef.current
    // Images that errored before hydration never trigger React's onError.
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])

  return (
    <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-[11px] border border-border-strong bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] shadow-[inset_0_1px_rgba(255,255,255,.05),0_5px_16px_rgba(0,0,0,.4)] sm:size-11">
      {failed ? (
        <span className="font-mono text-sm font-semibold text-white" aria-hidden="true">
          {initials}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt=""
          width={44}
          height={44}
          decoding="async"
          onError={() => setFailed(true)}
          className="size-full object-contain grayscale"
        />
      )}
    </span>
  )
}
