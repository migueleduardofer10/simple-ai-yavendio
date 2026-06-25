import { Reveal } from '../../../motion'
import { Icon } from '../../../icons'
import { team } from '../../../data'

export function AboutTeam() {
  return (
    <section className="relative overflow-hidden bg-brio-ink">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots-dark" />

      {/* Header */}
      <div className="container-x relative z-10 pb-10 pt-16 text-center md:pb-16 md:pt-24">
        <Reveal>
          <span className="text-xs font-black uppercase tracking-[0.25em] text-brio-terra">El equipo</span>
          <h2 className="mt-4 font-black leading-[1.08] text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>
            Dos perfiles que <span className="text-brio-plum">no deberían caber</span> en una pyme.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/50 md:text-lg">
            Negocio y tecnología de primer nivel, metidos de lleno en tu operación.
          </p>
        </Reveal>
      </div>

      {/* Editorial rows */}
      <div className="relative z-10">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.05}>
            <div className={`flex flex-col border-t border-white/10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Photo */}
              <div className="group relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[520px] md:w-[45%]">
                <img src={m.photo} alt={m.name} className="h-full w-full object-cover object-top grayscale transition-all duration-700 group-hover:grayscale-0" />
                <div className={`absolute inset-0 hidden md:block ${i % 2 === 0 ? 'bg-gradient-to-r from-transparent to-brio-ink/85' : 'bg-gradient-to-l from-transparent to-brio-ink/85'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-brio-ink/75 via-transparent to-transparent md:hidden" />
                <span className="absolute bottom-4 left-6 select-none font-black leading-none text-white/[0.06]" style={{ fontSize: 'clamp(6rem, 14vw, 10rem)' }}>
                  0{i + 1}
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center px-8 py-12 md:w-[55%] md:px-16 md:py-20">
                <span className={`text-xs font-black uppercase tracking-[0.2em] ${i % 2 === 0 ? 'text-brio-terra' : 'text-brio-plum'}`}>
                  {m.role}
                </span>
                <h3 className="mt-3 font-black text-white" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', lineHeight: 1.0 }}>
                  {m.name}
                </h3>
                <div className={`mt-5 h-px w-16 ${i % 2 === 0 ? 'bg-brio-terra' : 'bg-brio-plum'}`} />
                <p className="mt-6 max-w-[38ch] leading-relaxed text-white/55" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}>
                  {m.bio}
                </p>
                <a
                  href="#"
                  aria-label={`LinkedIn de ${m.name}`}
                  className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-bold text-white/30 transition-colors duration-200 hover:text-white"
                >
                  <Icon.Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="border-t border-white/10" />
    </section>
  )
}
