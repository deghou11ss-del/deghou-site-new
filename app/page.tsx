import { Suspense } from 'react'
import { Account } from '@/components/site/account'
import { FAQ } from '@/components/site/faq'
import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header'
import { HelpPanel } from '@/components/site/help-panel'
import { Hero } from '@/components/site/hero'
import { ParticlesCanvas } from '@/components/site/particles-canvas'
import { PlatformStrip } from '@/components/site/platform-strip'
import { Setup } from '@/components/site/setup'
import { Speed } from '@/components/site/speed'

export default function Page() {
  return (
    <>
      <div className="milky" aria-hidden="true" />
      <div className="aurora" aria-hidden="true" />
      <ParticlesCanvas />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1180px] px-3 pb-10 pt-3 sm:px-7 sm:pb-16 sm:pt-7">
        <Header />

        <main id="top">
          <Hero />
          <PlatformStrip />

          <div className="grid gap-3 sm:gap-5 min-[861px]:grid-cols-[minmax(0,1.4fr)_minmax(300px,.75fr)]">
            <div className="flex flex-col gap-3 sm:gap-5">
              <Setup />
              <Speed />
              <FAQ />
              <HelpPanel />
            </div>
            <aside className="flex flex-col gap-3 sm:gap-5 min-[861px]:sticky min-[861px]:top-6 min-[861px]:self-start">
              <Suspense fallback={null}>
                <Account />
              </Suspense>
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
