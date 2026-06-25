import { useState } from 'react'
import { Reveal, Stagger, StaggerItem, Tilt } from '../../../motion'
import { Icon } from '../../../icons'
import { founders } from '../../../data'
import { Pill } from '../../../components/ui/Pill'

function FounderAvatar({ photo, initials, ring }: { photo: string; initials: string; ring: string }) {
  const [failed, setFailed] = useState(false)
  const base = 'h-28 w-28 flex-shrink-0 rounded-full object-cover ring-4 ring-offset-4 ring-offset-brio-bone'
  if (failed) return <span className={`flex items-center justify-center text-2xl font-extrabold text-brio-ink ${base} ${ring}`}>{initials}</span>
  return <img src={photo} alt="" loading="lazy" onError={() => setFailed(true)} className={`${base} ${ring}`} />
}

/* ------------------------------------------------------------------ */
/*  11 — NOSOTROS (bloque del home)                                   */
/* ------------------------------------------------------------------ */
export function Team() {
  return (
    <section id="equipo" className="section-padding relative overflow-hidden bg-brio-bone scroll-mt-20 texture-dots">
      <div className="absolute -top-40 right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-brio-terra/20 blur-3xl" />
      <div className="absolute -bottom-40 left-[-8rem] h-[26rem] w-[26rem] rounded-full bg-brio-plum/10 blur-3xl" />
      <div className="container-x relative z-10">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <Pill>Nosotros</Pill>
          <h2 className="mt-4 text-fluid-section font-black leading-tight tracking-tight text-brio-ink">
            Gente que entra a tu operación
            <span className="block text-brio-plum">y resuelve contigo.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-brio-slate md:text-lg">
            Hablamos como socio operativo, no como proveedor técnico. Negocio y tecnología en la misma mesa.
          </p>
          <div className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-2">
            {['operación real', 'IA aplicada', 'ventas', 'automatización'].map((tag) => (
              <span key={tag} className="rounded-full border border-brio-border bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-brio-plum shadow-hard-sm">
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-1/2 top-1/2 hidden h-44 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brio-plum/20 md:block" />
          <Stagger className="grid gap-6 sm:grid-cols-2">
            {founders.map((f, i) => (
              <StaggerItem key={f.name} className={i === 1 ? 'sm:translate-y-8' : ''}>
                <Tilt strength={5} className="h-full">
                  <div className="group relative flex h-full min-h-[24rem] flex-col overflow-hidden rounded-[30px] border border-brio-border bg-white p-7 text-center shadow-hard-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-hard-lg">
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brio-terra via-brio-plum to-brio-terra opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute -right-4 -top-7 font-mono text-[8rem] font-black leading-none text-brio-ink/[0.035]">{f.initials}</span>
                    <div className="relative mx-auto rounded-full bg-gradient-to-br from-brio-terra/35 via-white to-brio-plum/20 p-2 shadow-hard-lg transition-transform duration-300 group-hover:scale-105">
                      <FounderAvatar photo={f.photo} initials={f.initials} ring={f.ring} />
                    </div>
                    <h3 className="relative mt-6 text-2xl font-black tracking-tight text-brio-ink">{f.name}</h3>
                    <p className="relative mt-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-brio-plum">{f.role}</p>
                    <p className="relative mt-5 flex-1 text-sm leading-relaxed text-brio-slate">{f.bio}</p>
                    <div className="relative mt-6 flex items-center justify-center gap-3 border-t border-brio-border pt-5">
                      <a href="#" aria-label={`LinkedIn de ${f.name}`} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brio-border text-brio-slate/60 transition-all duration-300 hover:border-brio-plum hover:text-brio-plum hover:-translate-y-0.5"><Icon.Linkedin className="h-4 w-4" /></a>
                    </div>
                  </div>
                </Tilt>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
