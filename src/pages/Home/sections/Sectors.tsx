import type { ReactNode } from 'react'
import { Reveal, Marquee } from '../../../motion'
import type { IconProps } from '../../../icons'
import { sectors } from '../../../data'
import { Pill } from '../../../components/ui/Pill'
import { SectionCta } from '../../../components/ui/SectionCta'

/* ------------------------------------------------------------------ */
/*  6 — CASOS POR RUBRO (2 marquees opuestos)                         */
/* ------------------------------------------------------------------ */
function SectorChip({ icon: I, title, quote }: { icon: (p: IconProps) => ReactNode; title: string; quote: string }) {
  return (
    <div className="mx-2.5 flex w-[19rem] items-start gap-3 rounded-2xl border border-brio-border bg-white p-5 shadow-hard-sm">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brio-terra text-brio-ink">{I({ className: 'h-5 w-5' })}</span>
      <span>
        <span className="block text-base font-bold text-brio-ink">{title}</span>
        <span className="mt-1 block text-sm leading-snug text-brio-slate">{quote}</span>
      </span>
    </div>
  )
}

export function Sectors() {
  return (
    <section id="casos" className="section-padding relative overflow-hidden bg-brio-muted scroll-mt-20">
      <div className="container-x relative z-10">
        <Reveal className="mb-10 max-w-2xl">
          <Pill>Casos por rubro</Pill>
          <h2 className="mt-4 text-fluid-section font-bold leading-tight text-brio-ink">Ejemplos reales de lo que podemos simplificar</h2>
        </Reveal>
      </div>
      <div className="relative z-10 space-y-4" style={{ maskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)' }}>
        <Marquee speed={160}>
          {sectors.map((c) => <SectorChip key={c.title} {...c} />)}
        </Marquee>
        <Marquee speed={190} reverse>
          {sectors.slice().reverse().map((c) => <SectorChip key={c.title} {...c} />)}
        </Marquee>
      </div>
      <div className="container-x relative z-10">
        <SectionCta text="Encontrar mi caso" />
      </div>
    </section>
  )
}
