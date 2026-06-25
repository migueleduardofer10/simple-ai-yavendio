import { Reveal, motion } from '../../../motion'
import { Icon } from '../../../icons'
import { pains } from '../../../data'
import { Pill } from '../../../components/ui/Pill'

/* ------------------------------------------------------------------ */
/*  2 — TE ENTENDEMOS (sticky izq + lista notificaciones der)         */
/* ------------------------------------------------------------------ */
export function Pains() {
  return (
    <section className="section-padding relative overflow-hidden bg-brio-bone">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots" />
      <div className="container-x relative z-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Pill>Te entendemos</Pill>
            <h2 className="mt-4 font-bold leading-[1.08] text-brio-ink" style={{ fontSize: 'clamp(1.9rem, 4.4vw, 3.2rem)' }}>
              Tu negocio no necesita tecnología de punta.
            </h2>
            <div className="mt-4 flex flex-col items-start gap-5">
              <span className="inline-block -rotate-2 rounded-xl px-4 py-1.5 font-bold text-white" style={{ background: '#401646', fontSize: 'clamp(1.9rem, 4.4vw, 3.2rem)' }}>Necesita funcionar</span>
              <span className="inline-block rotate-3 rounded-xl px-4 py-1.5 font-bold text-white" style={{ background: '#401646', fontSize: 'clamp(1.9rem, 4.4vw, 3.2rem)' }}>mejor.</span>
            </div>
            <p className="mt-4 max-w-md text-base text-brio-slate md:text-lg">
              Si creciste pero todo sigue en WhatsApp, cuadernos y Excel, no estás solo. Ahí es donde entramos.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-[440px]">
            {/* Páginas detrás */}
            <div className="absolute left-10 top-3 h-full w-full rounded-2xl bg-brio-border/70" style={{ transform: 'rotate(2deg)' }} />
            <div className="absolute left-10 top-1.5 h-full w-full rounded-2xl bg-brio-cream" style={{ transform: 'rotate(0.8deg)' }} />

            {/* Hoja principal */}
            <div className="relative ml-10 overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_-16px_rgba(28,10,34,0.22)]">
              {/* Header */}
              <div className="border-b-2 border-dashed border-brio-border bg-brio-cream/60 px-6 py-4 text-center">
                <span className="font-mono text-xs font-black uppercase tracking-[0.25em] text-brio-slate">COSAS QUE NO FUNCIONAN</span>
              </div>

              {/* Ítems */}
              <ul className="px-6 py-2">
                {pains.map(({ text }, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3 border-b border-dashed border-brio-border/50 py-3.5 last:border-0"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 0.38, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Icon.Close className="h-4 w-4 flex-shrink-0 text-brio-ink" />
                    <span className="text-sm leading-snug text-brio-ink line-through decoration-brio-ink/40 decoration-1 md:text-base">{text}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="border-t border-dashed border-brio-border/50 px-6 py-3 text-center">
                <span className="font-mono text-sm font-bold tracking-widest text-brio-slate">y mucho más · · ·</span>
              </div>

              {/* Líneas horizontales de fondo tipo cuaderno */}
              <div className="pointer-events-none absolute inset-0 mt-[3.5rem]" aria-hidden>
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className="border-b border-blue-50" style={{ height: '3.1rem' }} />
                ))}
              </div>
            </div>

            {/* Espiral binding */}
            <div className="absolute left-5 top-6 bottom-6 flex flex-col justify-around z-10">
              {Array.from({ length: 11 }).map((_, i) => (
                <div
                  key={i}
                  className="h-5 w-5 rounded-full border-[3.5px] border-brio-slate/50 bg-white shadow-sm"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
