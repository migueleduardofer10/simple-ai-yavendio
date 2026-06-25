import { Reveal, Stagger, StaggerItem } from '../../../motion'
import { Icon } from '../../../icons'
import { BRAND } from '../../../config/brand'
import { transformation } from '../../../data'
import { Pill } from '../../../components/ui/Pill'

/* ------------------------------------------------------------------ */
/*  7 — ANTES / DESPUÉS (diff con reveal lateral)                     */
/* ------------------------------------------------------------------ */
export function BeforeAfter() {
  return (
    <section className="section-padding relative overflow-hidden bg-brio-bone">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots" />
      <div className="container-x relative z-10">
        <Reveal className="mb-12 max-w-2xl">
          <Pill>Antes / Después</Pill>
          <h2 className="mt-4 font-bold leading-[1.1] text-brio-ink" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>El mismo negocio,<br /><span className="text-brio-slate">operando distinto</span></h2>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[22px] border border-brio-border bg-white p-6 shadow-hard-sm sm:p-8">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brio-ink/[0.04] px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-brio-slate/50" />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-brio-slate">Hoy</span>
              </div>
              <ul className="space-y-4">
                {transformation.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-snug text-brio-slate md:text-base">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brio-slate/10 text-brio-slate"><Icon.Close className="h-3 w-3" /></span>
                    <span>{t.today}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="h-full rounded-[22px] border border-brio-terra/30 bg-brio-ink p-6 shadow-hard-lg sm:p-8">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brio-terra/15 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-brio-terra" />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-brio-terra-light">Con {BRAND.short}</span>
              </div>
              <Stagger className="space-y-4">
                {transformation.map((t, i) => (
                  <StaggerItem key={i} y={0}>
                    <div className="flex items-start gap-3 text-sm leading-snug text-white/85 md:text-base">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brio-terra/20 text-brio-terra-light"><Icon.Check className="h-3 w-3" /></span>
                      <span>{t.after}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
