import { Link } from 'react-router-dom'
import { Reveal, Counter } from '../../../motion'
import { Icon } from '../../../icons'
import { BRAND } from '../../../config/brand'
import { btnPrimary } from '../../../lib/styles'
import { Pill } from '../../../components/ui/Pill'

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-brio-ink-dark pt-28 pb-0 md:pt-36">
      {/* Glow central fuerte */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
             style={{ background: 'radial-gradient(ellipse, rgba(138,46,146,0.45) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 texture-dots-dark opacity-30" />
      </div>

      {/* Titular centrado — enorme */}
      <div className="container-x relative z-10 pb-14 text-center md:pb-20">
        <Reveal>
          <Pill dark><span className="h-1.5 w-1.5 rounded-full bg-brio-terra" /> Nosotros</Pill>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mx-auto mt-6 max-w-5xl font-black tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', lineHeight: 1.0 }}>
            No vendemos IA.<br />
            <span className="text-gradient">Ordenamos tu negocio.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-white/50 md:text-xl">
            Entramos a tu operación real y la dejamos funcionando mejor.<br className="hidden md:block" />
            A veces con IA. A veces con una hoja de cálculo bien hecha.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className={btnPrimary('px-8 py-4 text-base')}>
              <Icon.Whatsapp className="h-5 w-5" /> Hablemos con el equipo
            </a>
            <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-7 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 md:text-base">
              Ver lo que hacemos <Icon.ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Métricas — franja inferior elegante, todo en terra */}
      <div className="relative z-10 border-t border-white/10 bg-white/[0.02]">
        <div className="container-x grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { to: 24, suffix: 'h', label: 'Te respondemos en menos de' },
            { to: 3,  suffix: '',  label: 'Frentes: IA · automatización · digital' },
            { to: 0,  suffix: '',  label: 'Tecnicismos. Cero humo.' },
          ].map((m, i) => (
            <Reveal key={m.label} delay={0.1 + i * 0.08}>
              <div className="flex flex-col items-center py-10 text-center md:py-14">
                <div style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', lineHeight: 1 }}>
                  <Counter to={m.to} suffix={m.suffix} className="font-black text-brio-terra" />
                </div>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-white/35 md:text-sm">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
