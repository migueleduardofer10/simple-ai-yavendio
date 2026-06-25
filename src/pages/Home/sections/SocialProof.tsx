import { Reveal, Marquee } from '../../../motion'
import { testimonials } from '../../../data'
import { Pill } from '../../../components/ui/Pill'

/* ------------------------------------------------------------------ */
/*  9 — TESTIMONIOS (marquee de cards)                                */
/* ------------------------------------------------------------------ */
function TestimonialCard({ initials, name, business, quote, photo }: typeof testimonials[number]) {
  return (
    <div className={'mx-2.5 flex w-[20rem] flex-col rounded-[20px] border border-brio-border bg-white p-6 shadow-hard-sm sm:w-[24rem]'}>
      <span className={'mb-4 text-sm tracking-wide text-brio-terra'}>{'★★★★★'}</span>
      <p className={'flex-1 text-sm leading-relaxed text-brio-ink md:text-base'}>{'”'}{quote}{'”'}</p>
      <div className={'mt-6 flex items-center gap-3 border-t border-brio-border pt-4'}>
        {photo
          ? <img src={photo} alt={name} className={'h-10 w-10 flex-shrink-0 rounded-full object-cover'} />
          : <span className={'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brio-plum/10 text-xs font-bold text-brio-plum'}>{initials}</span>
        }
        <span className={'leading-tight'}>
          <span className={'block text-sm font-bold text-brio-ink'}>{name}</span>
          <span className={'block text-xs text-brio-slate'}>{business}</span>
        </span>
      </div>
    </div>
  )
}

export function SocialProof() {
  return (
    <section className="section-padding relative overflow-hidden bg-brio-bone">
      <div className="container-x relative z-10">
        <Reveal className="mb-10 max-w-2xl">
          <Pill>Casos en marcha</Pill>
          <h2 className="mt-4 font-bold leading-tight text-brio-ink" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            Lo importante no es que la IA suene moderna. <span className="text-brio-plum">Es que tu equipo la use.</span>
          </h2>
          <p className="mt-5 text-base text-brio-slate md:text-lg">Estamos arrancando con negocios reales. Primeras mejoras en semanas, no en meses.</p>
        </Reveal>
      </div>
      <div className="relative z-10" style={{ maskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)' }}>
        <Marquee speed={38}>
          {testimonials.map((t) => <TestimonialCard key={t.initials} {...t} />)}
        </Marquee>
      </div>
    </section>
  )
}
