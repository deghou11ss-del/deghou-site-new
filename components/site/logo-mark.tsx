import Image from 'next/image'

export function LogoMark({ className = 'size-11' }: { className?: string }) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full border border-border-strong bg-gradient-to-br from-[#161616] to-black shadow-[0_10px_30px_rgba(0,0,0,.5),inset_0_0_20px_rgba(255,255,255,.05)] ${className}`}
    >
      <Image
        src="/logo.png"
        alt="Логотип"
        fill
        sizes="80px"
        className="object-cover"
      />
      <span
        aria-hidden="true"
        className="animate-brand-shine absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,rgba(255,255,255,.16)_50%,transparent_60%)]"
      />
    </span>
  )
}