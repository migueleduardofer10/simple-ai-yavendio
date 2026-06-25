import { motion, Counter, Marquee, Tilt } from '../../../motion'
import { Icon } from '../../../icons'
import { BRAND } from '../../../config/brand'
import { btnPrimary } from '../../../lib/styles'
import { channels } from '../../../data'
import { InboxMockup } from '../../../components/InboxMockup'

/* ------------------------------------------------------------------ */
/*  1 — HERO (2 columnas, mockup gigante)                              */
/* ------------------------------------------------------------------ */
export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-brio-ink-dark pt-28 md:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 75% -10%, rgba(138,46,146,0.42), transparent 60%), radial-gradient(70% 60% at 0% 100%, rgba(176,60,160,0.22), transparent 60%)' }} />
        <div className="absolute inset-0 texture-dots-dark opacity-50" />
      </div>

      <div className="container-x relative z-10">
        <div className="grid items-center gap-12 pb-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:pb-24">
          {/* Texto */}
          <div>
            <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brio-terra" /> IA simple para negocios de verdad
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }} className="font-display font-extrabold leading-[1.03] tracking-[-0.035em] text-white" style={{ fontSize: 'clamp(2.4rem, 5.4vw, 4.4rem)' }}>
              Llevamos los negocios a la <span className="text-gradient">era de la IA</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.16 }} className="mt-6 max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
              Entramos a tu operación y usamos IA, automatización o herramientas simples para que vendas más, pierdas menos tiempo y trabajes con menos desorden.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.24 }} className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className={btnPrimary('px-7 py-4 text-base')}>
                <Icon.Whatsapp className="h-5 w-5" /> Quiero revisar mi negocio
              </a>
              <a href="#casos" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 md:text-base">
                Ver ejemplos por rubro <Icon.ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* Mockup gigante */}
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }} className="relative">
            <Tilt className="relative">
              <InboxMockup />
            </Tilt>
            {/* Badges flotantes con contador */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="absolute -right-3 top-16 hidden items-center gap-2 rounded-xl border border-white/10 bg-brio-ink px-3.5 py-2.5 shadow-hard-lg sm:flex">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brio-terra/20 text-brio-terra"><Icon.Cash className="h-4 w-4" /></span>
              <span className="leading-tight">
                <Counter to={55826} prefix="S/ " className="block text-sm font-extrabold text-white" />
                <span className="block text-[10px] text-white/50">vendido hoy</span>
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.85, duration: 0.6 }} className="absolute -left-3 bottom-10 hidden items-center gap-2 rounded-xl border border-white/10 bg-brio-ink px-3.5 py-2.5 shadow-hard-lg sm:flex">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brio-terra/20 text-brio-terra"><Icon.Check className="h-4 w-4" /></span>
              <span className="leading-tight">
                <Counter to={38} prefix="+" suffix=" pedidos" className="block text-sm font-extrabold text-white" />
                <span className="block text-[10px] text-white/50">atendidos sin que muevas un dedo</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Marquee de canales */}
      <div className="relative z-10 border-t border-white/10 py-6">
        <Marquee speed={26}>
          {channels.concat(channels, channels).map(({ icon: I, label }, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-2 text-sm font-bold text-white/45">
              <I className="h-4 w-4 text-brio-terra" /> {label}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
