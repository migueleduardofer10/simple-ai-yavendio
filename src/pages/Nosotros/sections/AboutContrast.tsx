import { Reveal } from '../../../motion'
import { Icon } from '../../../icons'
import { contrastRows } from '../../../data'
import { Pill } from '../../../components/ui/Pill'

export function AboutContrast() {
  return (
    <section className="relative overflow-hidden bg-brio-muted">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots" />

      {/* Header */}
      <div className="container-x relative z-10 pb-12 pt-16 text-center md:pt-24">
        <Reveal>
          <Pill>Para que quede claro</Pill>
          <h2 className="mt-4 font-bold leading-[1.1] text-brio-ink" style={{ fontSize: 'clamp(1.9rem, 5vw, 3.2rem)' }}>
            Lo que <span className="text-brio-ink/25 line-through decoration-2">no</span> somos.{' '}
            <span className="text-brio-plum">Y lo que sí.</span>
          </h2>
        </Reveal>
      </div>

      {/* Filas editoriales */}
      <div className="relative z-10 border-t border-brio-border pb-16 md:pb-24">
        {contrastRows.map((r, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="group border-b border-brio-border transition-colors duration-500 hover:bg-brio-ink/[0.02]">
              <div className="container-x grid grid-cols-1 gap-6 py-8 md:grid-cols-2 md:gap-0 md:py-10">
                {/* NO */}
                <div className="flex items-start gap-4 md:pr-12">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brio-ink/[0.07] text-brio-ink/30">
                    <Icon.Close className="h-3 w-3" />
                  </span>
                  <p className="text-base leading-relaxed text-brio-ink/30 line-through decoration-brio-ink/15 md:text-lg">{r.no}</p>
                </div>
                {/* SÍ */}
                <div className="flex items-start gap-4 md:border-l md:border-brio-border md:pl-12">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brio-plum/10 text-brio-plum">
                    <Icon.Check className="h-3 w-3" />
                  </span>
                  <p className="text-base font-bold leading-relaxed text-brio-ink md:text-lg">{r.si}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
