import { Reveal, Stagger, StaggerItem } from '../../../motion'
import { Icon } from '../../../icons'
import { process } from '../../../data'
import { Pill } from '../../../components/ui/Pill'
import { SectionCta } from '../../../components/ui/SectionCta'

/* ------------------------------------------------------------------ */
/*  5 — CÓMO TRABAJAMOS (stepper horizontal con mini-mocks)           */
/* ------------------------------------------------------------------ */
function StepMock({ n }: { n: number }) {
  // pequeña UI decorativa distinta por paso
  const common = 'mt-5 rounded-xl border border-brio-border bg-brio-muted p-3'
  // Paso 1 — Diagnóstico: checklist de áreas revisadas
  if (n === 0) return (
    <div className={common}>
      {[['Ventas', true], ['Cobranza', true], ['Atención', false], ['Stock', false]].map(([label, done]) => (
        <div key={label as string} className="flex items-center gap-2 py-1">
          <span className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded ${done ? 'bg-brio-plum text-white' : 'border border-brio-border bg-white'}`}>
            {done && <Icon.Check className="h-2.5 w-2.5" />}
          </span>
          <div className={`h-1.5 flex-1 rounded ${done ? 'bg-brio-plum/40' : 'bg-brio-border'}`} />
          <span className="text-[9px] font-bold text-brio-slate">{label as string}</span>
        </div>
      ))}
    </div>
  )
  // Paso 2 — Prototipo: chat WhatsApp antes/después
  if (n === 1) return (
    <div className={common + ' space-y-1.5'}>
      <div className="max-w-[80%] rounded-lg rounded-tl-sm bg-white px-2 py-1.5 text-[9px] leading-tight text-brio-slate shadow-hard-sm">¿Tienes talla M en negro?</div>
      <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-sm bg-brio-terra px-2 py-1.5 text-[9px] font-bold leading-tight text-brio-ink">Sí, S/.89. ¿Te lo aparto? 👇</div>
      <span className="inline-block rounded-md bg-brio-plum/10 px-1.5 py-0.5 text-[8px] font-bold text-brio-plum">Vista previa del prototipo</span>
    </div>
  )
  // Paso 3 — Implementación: flujo de nodos conectados
  if (n === 2) return (
    <div className={common + ' flex items-center justify-between gap-1'}>
      {[['WA', 'bg-[#25D366] text-white'], ['IA', 'bg-brio-plum text-white'], ['Hoja', 'bg-brio-terra text-brio-ink']].map(([label, cls], i, arr) => (
        <div key={label as string} className="flex items-center gap-1">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-[9px] font-black ${cls}`}>{label as string}</div>
          {i < arr.length - 1 && <div className="h-px w-3 border-t-2 border-dashed border-brio-border" />}
        </div>
      ))}
      <span className="ml-1 text-[9px] font-bold text-brio-terra">✓ listo</span>
    </div>
  )
  // Paso 4 — Acompañamiento: métricas de mejora
  if (n === 3) return (
    <div className={common}>
      <div className="flex items-end gap-1">
        {[30, 42, 38, 55, 61, 80].map((h, i) => (
          <span key={i} className={`w-full rounded-t transition-all ${i === 5 ? 'bg-brio-terra' : 'bg-brio-plum/30'}`} style={{ height: `${h * 0.38}px` }} />
        ))}
      </div>
      <div className="mt-2 text-[9px] font-bold text-brio-plum">↑ mejora continua</div>
    </div>
  )
  return null
}

export function Process() {
  return (
    <section id="como-trabajamos" className="section-padding relative overflow-hidden bg-brio-bone scroll-mt-20">
      <div className="container-x relative z-10">
        <Reveal className="mb-10 max-w-2xl">
          <Pill>Cómo trabajamos</Pill>
          <h2 className="mt-4 text-fluid-section font-bold leading-tight text-brio-ink">Miramos tu negocio por dentro antes de tocar tecnología</h2>
        </Reveal>
        <Stagger className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-4 lg:overflow-visible">
          {process.map((p, i) => (
            <StaggerItem key={p.n} className="w-[78%] flex-shrink-0 snap-start sm:w-[44%] lg:w-auto">
              <div className="flex h-full flex-col rounded-[20px] border border-brio-border bg-white p-6 shadow-hard-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-hard-lg">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-brio-plum px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">Paso {p.n}</span>
                <h3 className="mt-4 text-lg font-bold leading-snug text-brio-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brio-slate">{p.body}</p>
                <StepMock n={i} />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <SectionCta text="Agendar mi diagnóstico" />
      </div>
    </section>
  )
}
