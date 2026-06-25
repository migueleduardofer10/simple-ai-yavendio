import { useState } from 'react'
import { Reveal, AnimatePresence, motion } from '../../../motion'
import { Icon } from '../../../icons'
import { solutions } from '../../../data'
import { Pill } from '../../../components/ui/Pill'
import { SectionCta } from '../../../components/ui/SectionCta'

/* ------------------------------------------------------------------ */
/*  4 — QUÉ RESOLVEMOS (tabs interactivas con panel vivo)             */
/* ------------------------------------------------------------------ */
export function Solutions() {
  const [active, setActive] = useState(0)
  const s = solutions[active]
  return (
    <section id="resolvemos" className="section-padding relative overflow-hidden bg-brio-muted scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots" />
      <div className="container-x relative z-10">
        <Reveal className="mb-10 max-w-2xl">
          <Pill>Qué resolvemos</Pill>
          <h2 className="mt-4 text-fluid-section font-bold leading-tight text-brio-ink">Hacemos que lo repetitivo se haga solo o más rápido</h2>
          <p className="mt-5 text-base text-brio-slate md:text-lg">No cambiamos lo que ya funciona. Quitamos lo que te roba tiempo y plata.</p>
        </Reveal>

        <div className="flex flex-wrap gap-2">
          {solutions.map((it, i) => (
            <button key={it.tab} onClick={() => setActive(i)} className={`rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${i === active ? 'bg-brio-ink text-white shadow-hard' : 'bg-white text-brio-slate hover:text-brio-ink'}`}>
              {it.tab}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 rounded-[24px] border border-brio-border bg-white p-6 shadow-hard-sm md:grid-cols-2 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-brio-plum">El dueño dice</span>
              <p className="mt-3 text-xl font-bold leading-snug text-brio-ink md:text-2xl">“{s.quote}”</p>
              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-brio-muted p-4">
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brio-terra text-brio-ink"><Icon.Check className="h-4 w-4" /></span>
                <span className="text-sm font-semibold leading-snug text-brio-ink md:text-base">{s.solution}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mini panel "vivo" */}
          <div className="flex flex-col justify-center rounded-2xl border border-brio-border bg-brio-ink-dark p-5">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }} className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-white/50"><span className="h-1.5 w-1.5 rounded-full bg-brio-terra" /> {s.exampleFrom}</div>
                <div className="max-w-[86%] rounded-2xl rounded-tl-sm bg-white/10 px-3.5 py-2.5 text-xs leading-relaxed text-white/80">{s.exampleAsk}</div>
                <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-brio-terra px-3.5 py-2.5 text-xs font-medium leading-relaxed text-brio-ink">{s.exampleDone}</div>
                <div className="text-right text-[10px] font-semibold text-brio-terra">listo para usar en el día a día</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <SectionCta text="Ver qué resolvemos para tu negocio" />
      </div>
    </section>
  )
}
