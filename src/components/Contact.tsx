import { Reveal, Parallax, motion } from '../motion'
import { Icon } from '../icons'
import { BRAND } from '../config/brand'
import { btnPrimary } from '../lib/styles'
import { founders } from '../data'
import { Pill } from './ui/Pill'
import witchImage from '../assets/images/witch.png'

/* ------------------------------------------------------------------ */
/*  DIAGNÓSTICO / CONTACTO                                             */
/* ------------------------------------------------------------------ */
export function Contact() {
  return (
    <section id="contacto" className="section-padding relative overflow-hidden bg-brio-ink scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots-dark" />
      <Parallax amount={50} className="pointer-events-none absolute -top-20 right-[10%] h-[28rem] w-[28rem] glow-radial-terra" />
      <div className="container-x relative z-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-brio-ink-dark shadow-hard-lg">
            <div className="absolute inset-0 texture-dots-dark opacity-70" />
            <div className="absolute -left-24 -top-28 h-80 w-80 rounded-full bg-brio-plum/30 blur-3xl" />
            <div className="absolute -bottom-28 right-10 h-96 w-96 rounded-full bg-brio-terra/20 blur-3xl" />
            <div className="relative grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[25rem] overflow-hidden p-7 sm:p-10 lg:min-h-[30rem]">
                <Pill dark>Diagnóstico gratis</Pill>
                <h2 className="mt-5 max-w-xl font-display text-3xl font-black leading-tight text-white md:text-5xl">
                  Mándanos <span className="text-gradient">un mensaje</span>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
                  Dinos qué parte de tu operación te está quitando tiempo. Te respondemos con una idea concreta, sin venderte humo.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <div className="flex flex-shrink-0 -space-x-3">
                    {founders.map((f) => (
                      <img key={f.name} src={f.photo} alt="" loading="lazy" className="h-10 w-10 rounded-full border-2 border-brio-ink-dark object-cover" />
                    ))}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white">Respondemos en menos de 24h</p>
                    <p className="text-xs text-white/45">Bruno, Leonardo y Simple AI, en persona.</p>
                  </div>
                </div>

                <div className="mt-8 max-w-sm space-y-8 sm:mt-16">
                  <a href={`mailto:${BRAND.email}`} className="group flex items-center gap-3 transition-all duration-300 hover:translate-x-1">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brio-plum/25 text-brio-terra ring-1 ring-white/10"><Icon.Mail className="h-4 w-4" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">Correo</span>
                      <span className="block truncate text-sm font-bold text-white/80 group-hover:text-white">{BRAND.email}</span>
                    </span>
                    <Icon.ArrowRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-brio-terra" />
                  </a>
                  <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 transition-all duration-300 hover:translate-x-1">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366] ring-1 ring-white/10"><Icon.Whatsapp className="h-4 w-4" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">WhatsApp</span>
                      <span className="block text-sm font-bold text-white/80 group-hover:text-white">+51 991 735 542</span>
                    </span>
                    <Icon.ArrowRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-brio-terra" />
                  </a>
                </div>

                <motion.img
                  src={witchImage}
                  alt="Asistente Simple AI"
                  className="pointer-events-none absolute -bottom-10 right-0 hidden w-52 opacity-95 drop-shadow-[0_30px_45px_rgba(245,225,78,0.22)] sm:block sm:w-64 lg:right-2 lg:w-72"
                  animate={{ y: [0, -12, 0], rotate: [-1, 1, -1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              <div className="relative border-t border-white/10 p-7 sm:p-10 lg:border-l lg:border-t-0">
                <form className="mx-auto max-w-md rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-hard-lg backdrop-blur-sm sm:p-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-6">
                    <div>
                      <label className="mb-3 block text-xs font-bold uppercase tracking-[0.12em] text-white/45">¿Qué tipo de negocio tienes?</label>
                      <input type="text" className="w-full rounded-2xl border border-white/10 bg-brio-ink-dark/70 px-5 py-5 text-base font-semibold text-white placeholder-white/25 outline-none transition-colors focus:border-brio-terra" placeholder="Bodega, restaurante, tienda de ropa..." />
                    </div>
                    <div>
                      <label className="mb-3 block text-xs font-bold uppercase tracking-[0.12em] text-white/45">Tu WhatsApp</label>
                      <input type="tel" className="w-full rounded-2xl border border-white/10 bg-brio-ink-dark/70 px-5 py-5 text-base font-semibold text-white placeholder-white/25 outline-none transition-colors focus:border-brio-terra" placeholder="+51 999 999 999" />
                    </div>
                    <button type="submit" className={btnPrimary('mt-24 w-full py-5 text-base')}>
                      Hacer mi diagnóstico <Icon.ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
                <div className="mx-auto mt-5 max-w-md">
                  <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-white/35">
                    <span className="h-px flex-1 bg-white/10" />
                    <span>o</span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="flex justify-center">
                    <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-[#1DB954] px-6 py-3.5 text-sm font-black text-white shadow-[0_22px_45px_-28px_rgba(29,185,84,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#19a84c] active:scale-[0.98]">
                      <Icon.Whatsapp className="h-5 w-5" /> Escríbenos por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
