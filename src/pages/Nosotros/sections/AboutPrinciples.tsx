import { Reveal } from '../../../motion'
import { principles } from '../../../data'
import { Pill } from '../../../components/ui/Pill'

export function AboutPrinciples() {
  return (
    <section className="relative overflow-hidden bg-brio-bone">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots" />

      {/* Header */}
      <div className="container-x relative z-10 pb-12 pt-16 md:pt-24">
        <Reveal className="max-w-2xl">
          <Pill>Cómo pensamos</Pill>
          <h2 className="mt-4 font-bold leading-[1.1] text-brio-ink" style={{ fontSize: 'clamp(1.9rem, 5vw, 3.2rem)' }}>
            Cuatro reglas que no <span className="text-brio-plum">negociamos</span>
          </h2>
        </Reveal>
      </div>

      {/* Filas editoriales */}
      <div className="relative z-10 border-t border-brio-border">
        {principles.map((p, i) => {
          const PIcon = p.icon
          const isEven = i % 2 === 0
          return (
            <Reveal key={p.n} delay={i * 0.05}>
              <div className="group border-b border-brio-border transition-colors duration-500 hover:bg-brio-ink">
                <div className="container-x flex flex-col gap-6 py-8 md:flex-row md:items-center md:gap-10 md:py-10">
                  {/* Número */}
                  <span className="flex-shrink-0 font-black leading-none text-brio-ink/[0.08] transition-colors duration-500 group-hover:text-white/[0.07]" style={{ fontSize: 'clamp(4.5rem, 9vw, 7rem)' }}>
                    {p.n}
                  </span>
                  {/* Icono + Título */}
                  <div className="flex-shrink-0 md:w-60">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${isEven ? 'bg-brio-terra/15 text-brio-terra group-hover:bg-brio-terra group-hover:text-brio-ink' : 'bg-brio-plum/15 text-brio-plum group-hover:bg-brio-plum group-hover:text-white'}`}>
                      <PIcon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 text-xl font-black tracking-tight text-brio-ink transition-colors duration-500 group-hover:text-white md:text-2xl">
                      {p.title}
                    </h3>
                  </div>
                  {/* Separador vertical desktop */}
                  <div className="hidden h-16 w-px flex-shrink-0 bg-brio-border transition-colors duration-500 group-hover:bg-white/10 md:block" />
                  {/* Texto */}
                  <p className="flex-1 text-base leading-relaxed text-brio-slate transition-colors duration-500 group-hover:text-white/55 md:text-lg">
                    {p.body}
                  </p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
