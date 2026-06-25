import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { motion, Reveal, useMotionValue, useSpring } from '../../../motion'
import { Icon } from '../../../icons'
import { BRAND } from '../../../config/brand'
import { btnPrimary } from '../../../lib/styles'
import { trainingOrbit } from '../../../data'

/* ------------------------------------------------------------------ */
/*  8 — CAPACITAMOS (bento)                                            */
/* ------------------------------------------------------------------ */
export function Training() {
  const sectionRef = useRef<HTMLElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const glowX = useSpring(rawX, { stiffness: 280, damping: 28 })
  const glowY = useSpring(rawY, { stiffness: 280, damping: 28 })

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set(e.clientX - rect.left)
    rawY.set(e.clientY - rect.top)
  }

  return (
    <section ref={sectionRef} onMouseMove={handleMouseMove} className="relative overflow-hidden bg-brio-bone py-20 md:py-24">
      <svg aria-hidden viewBox="0 0 1200 760" preserveAspectRatio="none" className="absolute inset-x-[-10%] inset-y-0 h-full w-[120%] text-brio-ink">
        <defs>
          <pattern id="training-paint-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.055)" />
          </pattern>
          <filter id="training-paint-edge" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035 0.11" numOctaves="3" seed="11" result="tornNoise" />
            <feDisplacementMap in="SourceGraphic" in2="tornNoise" scale="7" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <path
          className="fill-current"
          filter="url(#training-paint-edge)"
          d="M-90 38C-35 18 18 31 72 18C119 7 161 43 209 27C267 8 323 29 382 14C438 0 488 34 548 20C606 7 655 47 716 31C776 15 833 42 889 21C949 -2 1000 32 1054 22C1133 8 1204 43 1290 30V717C1227 733 1172 705 1113 722C1063 736 1014 699 963 718C906 739 853 703 798 727C738 753 682 710 623 730C561 751 514 711 454 726C391 742 337 700 276 718C217 736 163 700 105 724C43 750-19 714-90 731V38Z"
        />
        <path
          fill="url(#training-paint-dots)"
          filter="url(#training-paint-edge)"
          d="M-90 38C-35 18 18 31 72 18C119 7 161 43 209 27C267 8 323 29 382 14C438 0 488 34 548 20C606 7 655 47 716 31C776 15 833 42 889 21C949 -2 1000 32 1054 22C1133 8 1204 43 1290 30V717C1227 733 1172 705 1113 722C1063 736 1014 699 963 718C906 739 853 703 798 727C738 753 682 710 623 730C561 751 514 711 454 726C391 742 337 700 276 718C217 736 163 700 105 724C43 750-19 714-90 731V38Z"
        />
      </svg>
      <motion.div
        className="pointer-events-none absolute h-[26rem] w-[26rem] rounded-full bg-brio-terra/20 blur-3xl"
        style={{ left: glowX, top: glowY, translateX: '-50%', translateY: '-50%' }}
      />
      <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-brio-plum/30 blur-3xl" />
      <div className="container-x relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="mt-4 text-fluid-section font-bold leading-tight text-white">
            Tu equipo ya usa esas herramientas.
            <span className="block text-gradient">Ahora va a usarlas mejor.</span>
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-brio-terra" />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
            WhatsApp, Instagram, Excel y Sheets conectados a frases, plantillas y rutinas que tu equipo sí entiende. Nada de teoría: capacitación con casos reales de tu negocio.
          </p>
        </Reveal>

        {/* MOBILE: lista compacta */}
        <div className="mt-8 space-y-2.5 md:hidden">
          {trainingOrbit.map((item) => {
            const OrbitIcon = item.icon
            return (
              <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3.5 backdrop-blur-sm">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-brio-terra">
                  <OrbitIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-brio-terra">{item.label}</span>
                  <span className="mt-0.5 block text-sm font-bold leading-snug text-white">{item.phrase}</span>
                </span>
              </div>
            )
          })}
        </div>

        {/* DESKTOP: orbit layout */}
        <Reveal className="relative mx-auto mt-2 hidden h-[30rem] max-w-5xl md:block sm:mt-4 sm:h-[34rem]">
          <div className="absolute bottom-8 left-1/2 h-[25rem] w-[50rem] -translate-x-1/2 rounded-t-full border border-b-0 border-dashed border-white/15 sm:h-[30rem] sm:w-[62rem]" />
          <div className="absolute bottom-8 left-1/2 h-[16rem] w-[32rem] -translate-x-1/2 rounded-t-full border border-b-0 border-dashed border-white/20 sm:h-[20rem] sm:w-[42rem]" />
          <motion.div
            aria-hidden
            className="absolute bottom-8 left-1/2 h-[9rem] w-[18rem] -translate-x-1/2 rounded-t-full border border-b-0 border-dashed border-brio-terra/70 sm:h-[12rem] sm:w-[26rem]"
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute bottom-0 left-[40%] z-20 flex h-28 w-28 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_34%_24%,#ffffff_0%,#ffffff_28%,#f8f4f9_54%,#f5e14e_112%)] px-3 text-base font-black tracking-[-0.055em] text-brio-ink shadow-[0_48px_105px_-38px_rgba(138,46,146,0.9),0_24px_60px_-34px_rgba(28,10,34,0.95),inset_12px_16px_28px_rgba(255,255,255,0.95),inset_-18px_-28px_34px_rgba(138,46,146,0.14),inset_0_-16px_0_rgba(245,225,78,0.2)] ring-[7px] ring-brio-plum/20 sm:bottom-2 sm:left-[42%] sm:h-36 sm:w-36 sm:px-4 sm:text-xl"
            animate={{ y: [0, -12, 0], scale: [1, 1.03, 1], boxShadow: ['0 48px 105px -38px rgba(138,46,146,0.9), 0 24px 60px -34px rgba(28,10,34,0.95), inset 12px 16px 28px rgba(255,255,255,0.95), inset -18px -28px 34px rgba(138,46,146,0.14), inset 0 -20px 0 rgba(245,225,78,0.2)', '0 64px 140px -44px rgba(138,46,146,1), 0 30px 70px -38px rgba(28,10,34,1), inset 14px 18px 30px rgba(255,255,255,0.98), inset -22px -34px 42px rgba(138,46,146,0.18), inset 0 -24px 0 rgba(245,225,78,0.25)', '0 48px 105px -38px rgba(138,46,146,0.9), 0 24px 60px -34px rgba(28,10,34,0.95), inset 12px 16px 28px rgba(255,255,255,0.95), inset -18px -28px 34px rgba(138,46,146,0.14), inset 0 -20px 0 rgba(245,225,78,0.2)'] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="relative inline-flex max-w-full items-baseline whitespace-nowrap drop-shadow-sm">
              {BRAND.short}
              <span className="ml-1 text-brio-plum">AI</span>
              <Icon.Sparkles className="absolute -right-4 -top-3 h-4 w-4 text-brio-terra sm:-right-5 sm:-top-4 sm:h-5 sm:w-5" />
            </span>
          </motion.div>

          {trainingOrbit.map((item) => {
            const OrbitIcon = item.icon
            return (
              <motion.div
                key={item.label}
                className="absolute z-30 max-w-[12rem] -translate-x-1/2 -translate-y-1/2"
                style={{ left: item.x, top: item.y }}
                initial={{ opacity: 0, y: 18, scale: 0.88 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-15%' }}
                animate={{ translateY: [0, -10, 0] }}
                transition={{ duration: 0.7, delay: item.delay, ease: [0.16, 1, 0.3, 1], translateY: { duration: 4 + item.delay * 4, repeat: Infinity, ease: 'easeInOut' } }}
              >
                <div className="group flex h-24 w-52 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-2.5 pr-4 shadow-hard-lg backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-brio-terra">
                    <OrbitIcon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-brio-terra">{item.label}</span>
                    <span className="mt-0.5 block text-xs font-bold leading-snug text-white sm:text-sm">{item.phrase}</span>
                  </span>
                </div>
              </motion.div>
            )
          })}
        </Reveal>

        <Reveal className="mx-auto mt-7 flex justify-center sm:mt-8">
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className={btnPrimary('w-full px-7 py-4 sm:w-fit')}>
            <Icon.Whatsapp className="h-5 w-5" /> Capacitar a mi equipo
            <Icon.ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
