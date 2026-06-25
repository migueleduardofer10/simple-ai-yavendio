import { useState } from 'react'
import { Reveal, Stagger, StaggerItem, motion, AnimatePresence } from '../../../motion'
import { Icon } from '../../../icons'
import { faqs } from '../../../data'
import { Pill } from '../../../components/ui/Pill'

/* ------------------------------------------------------------------ */
/*  12 — FAQ (acordeón con motion)                                     */
/* ------------------------------------------------------------------ */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="overflow-hidden rounded-2xl border border-brio-border bg-white shadow-hard-sm"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex w-full items-center gap-3 px-5 py-4 text-left" tabIndex={0} onClick={() => setOpen((v) => !v)}>
        <h3 className="flex-1 font-bold text-brio-ink">{q}</h3>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className={open ? 'text-brio-plum' : 'text-brio-slate/50'}><Icon.ChevronDown className="h-5 w-5" /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <p className="px-5 pb-5 text-sm leading-relaxed text-brio-slate">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() {
  return (
    <section className="section-padding bg-brio-muted">
      <div className="container-x">
        <Reveal className="mb-12 max-w-2xl">
          <Pill>Preguntas frecuentes</Pill>
          <h2 className="mt-4 text-fluid-section font-bold leading-tight text-brio-ink">Preguntas honestas, respuestas honestas</h2>
        </Reveal>
        <Stagger className="grid max-w-5xl gap-3 md:grid-cols-2 md:items-start">
          {faqs.map((f, i) => (
            <StaggerItem key={i}><FaqItem q={f.q} a={f.a} /></StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
